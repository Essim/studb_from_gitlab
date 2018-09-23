/* eslint-disable no-param-reassign */
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import formidable from 'formidable';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import zipFolder from 'zip-folder';
import Document from '../models/documentSchema';
import User, { ADMIN_ROLE } from '../models/userSchema';
import {UPLOAD_STATUS_ABORTED, UPLOAD_STATUS_ERROR} from "../../client/constants";
import {getUserOfRequest} from "./userController";


/**
 * Get all documents
 * @param req nothing
 * @param res the json of the documents
 * @returns void
 */
export function getDocuments(req, res) {
    Document.find().exec((err, documents) => {
        if (err)
            res.status(500).send(err);

        const host =`http://${req.headers['host']}` ;

        const new_documents = documents.map(function(document) {
            return addDocumentFilesFullPath(document,host);
        });

        res.json({documents: new_documents });
    });
}


function addDocumentFilesFullPath (document,host){
    if (!document || !host) {
        return document;
    }

    document.path = `${host}/files/${document.path}`;
    document.files = addHostPrefix(document.files, host);

    return document;
}

function addHostPrefix(files, host) {
    if (typeof files !== "undefined" && files._contents) {
        files._contents = files._contents.map(file => {
            if (file.path.indexOf("files/") !== 0) {
                file.path = `${host}/files/${file.path}`;
            } else  {
                file.path = `${host}/${file.path}`;
            }

            return file;
        });

        Object.keys(files).forEach(directory => {
            if (files.hasOwnProperty(directory) && directory !== '_contents') {
                files[directory] = addHostPrefix(files[directory], host);
            }
        });
    }
    else{
        files.path = `${host}/${files.path}`;

    }

    return files;
}

/**
 * Get all documents containing the tags passed in the params
 * @param req the tags needed in the documents
 * @param res the json of the documents
 * @returns void
 */
export function getDocumentsByTags(req, res) {
    Document.find({
        tags: { $in: req.params.tags },
    }).exec((err, documents) => {
        if (err)
            res.status(500).send(err);
        const host =`http://${req.headers['host']}` ;
        const new_documents = documents.map(function(document) {
            return addDocumentFilesFullPath(document,host);
        });
        res.json({documents: new_documents });
    });
}

export function getDocumentsByTagsNumber(req, res) {
    Document.find({
        tagsNumber: { $in: req.params.tagsNumber },
    }).exec((err, documents) => {
        if (err)
            res.status(500).send(err);
        const host =`http://${req.headers['host']}` ;
        const new_documents = documents.map(function(document) {
            return addDocumentFilesFullPath(document,host);
        });
        res.json({documents: new_documents });
    });
}

/**
 * @param req the user, the id of the document, the id of the version and the opinion
 * @param res the json of the document
 * @returns void
 */
export function likeDocumentById(req, res) {
    Document.findOne({ cuid: req.params.cuidDoc }).exec((err, document) => {
        const opinion = req.body.opinion;

        if (err)
            res.status(500).send(err);

        if (document) {

            getUserOfRequest(req).then((user) => {
                opinion.name_author = user.name;
                opinion.cuid_author = user.cuid;

                document = document.addOpinion(user.cuid, opinion);

                if (document) {
                    document.save(function(err) {
                        if (err)
                            res.status(500).send(err);

                        const host =`http://${req.headers['host']}` ;
                        res.json({ document : addDocumentFilesFullPath(document, host) })
                    });
                } else {
                    res.json({});
                }
            });
        } else {
            res.json({});
        }
    });
}

/**
 * @param req the user, the id of the document, the id of the version and the comment
 * @param res the json of the document
 * @returns void
 */
export function addComment(req, res) {
    const host =`http://${req.headers['host']}` ;
    const comment  = req.body.comment;

    // Defaults
    comment.date = new Date();
    comment.cuid = cuid();
    comment.logicalDelete = false;
    comment.comments = [];
    comment.opinions = [];

    // Sanitize
    comment.text = sanitizeHtml(comment.text);
    // comment.name_author = sanitizeHtml(comment.name_author);

    getUserOfRequest(req).then((user) => {
        comment.name_author = user.name;
        comment.cuid_author = user.cuid;

        Document.findOneAndUpdate({
            cuid: req.params.cuidDoc
        }, {
            $push : {
                comments : req.body.comment
            }
        }, { new: true })
            .populate("tags")
            .exec(function(err, document) {
                if (err)
                    res.status(500).send(err);

                res.json({ document : addDocumentFilesFullPath(document, host)});
            });
    });
}

export function deleteComment(req, res, next) {
    if(!req.session.isPopulated)
        throw new Error(JSON.stringify({ message: 'Vous devez être connecté', status: 403 }));
    if(!req.params.cuid || !req.body.comment)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412}));
    new Promise((resolve, reject) => {
        User.findOne({email: req.session.user}).exec((err, user) => {
            if (err)
                throw new Error(JSON.stringify({message: 'Erreur du serveur', status: 500}));
            if (user.role !== ADMIN_ROLE)
                throw new Error(JSON.stringify({message: 'Action réservée aux admins', status: 403}));
            resolve(true);
        });
    }).then(() => {
        Document.findOne({ cuid: req.params.cuid }).exec((err, document) => {
            if(err)
                throw new Error(JSON.stringify({message: 'Erreur du serveur', status: 500}));
            if(!document)
                throw new Error(JSON.stringify({ message: 'Document inexistant', status: 400}));
            document.comments .filter((comment) => comment.cuid === req.body.comment.cuid)[0].logicalDelete = true;
            Document.update(
                {cuid: req.params.cuid},
                {$set: {comments: document.comments}}
            ).exec((err, documentAfterDelete) => {
                if (err)
                    throw new Error(JSON.stringify({message: 'Erreur du serveur', status: 500}));
                res.json({message: 'Commentaire supprimé avec succès'});
            })
        });
    }).catch((err) => {
        next(err);
    });
}

function garbageDocument(res, document, message) {
    console.log("Garbaging document, error :", message);

    rimraf("files/" + document.cuid, (e) => {
        if (e) {
            console.log("Unable to garbage collect files after " + message.status  + ":" + message.stage + " : " + e);
        }

        // Document already saved
        if (!document.isNew) {
            return document.remove((e) => {
                if (e) {
                    console.log("Unable to garbage collect MongoDocument after " + message.status + ":" + message.stage + " : " + e);
                }

                res.status(500).json(message);
            });
        }

        res.status(500).json(message);
    });
}

export function uploadDocuments(req, res) {
    const host =`http://${req.headers['host']}`;

    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = "files/";

    const document = new Document();
    document.cuid = cuid();

    let documentPromise;

    form
        .on('field', (field, value) => {
            if (field !== 'data') {
                return;
            }

            // Parse fields value
            let meta;
            try {
                meta = JSON.parse(value);
            } catch (err) {
                res.status(500).send({ error: err })
            }

            /*
             * Create a new document
             */
            document.path = document.cuid;
            document.cuid_division = meta.division_cuid;
            document.cuid_course = meta.course_cuid;

            // @fixme Useless?
            document.name = sanitizeHtml(meta.title ? meta.title : (meta.multiplePath ? "Groupe de fichiers " : "Fichier") + document.cuid);
            document.multiplePath = (meta.multiplePath) ? true : false;
            document.isRep = document.multiplePath || (Array.isArray(meta.files) && meta.files.length > 0 && meta.files[0].type === 'directory');

            // @todo select user based on request

            document.date = new Date();

            document.description = sanitizeHtml(meta.description);
            document.opinions = [];
            document.comments = [];

            document.tags = [];
            documentPromise = document.registerTags(meta.tags);

            document.logicalDelete = false;

            if (meta.parent_version) {
                document.parent_version = meta.parent_version;
            }
        })
        // Rename files
        .on('fileBegin', function(name, file) {
            let extension;


            if (file.name.split('.').length > 1){
                extension = file.name.split('.').pop();

                console.log("extension :" + extension);
            }

            if (document.multiplePath) {
                file.path = form.uploadDir + document.cuid + "/" + file.name;
            } else if (document.isRep) {
                const sep = file.name.indexOf("/");
                file.path = form.uploadDir + document.cuid + "/" + file.name.substr(sep + 1);
            } else {
                file.path = form.uploadDir + document.cuid;
            }

            if (document.isRep) {
                document.registerFile(file);
            } else {
                file.path += (extension ? "." + extension : "");
                document.path += (extension ? "." + extension : "");

                document.files = {
                    name: file.name,
                    path : file.path,
                    type: file.type,
                }
            }

            mkdirp.sync(file.path.substr(0, file.path.lastIndexOf("/")));
        })
        // Request has error, cleanup
        .on('error', (err) => {
            return garbageDocument(res, document, {
                status: UPLOAD_STATUS_ERROR,
                stage: "upload",
                error: err
            });
        })
        // Request is aborted, cleanup
        .on('aborted', err => {
            garbageDocument(res, document, {
                status: UPLOAD_STATUS_ABORTED,
                stage: "upload",
                error: err
            });
        })
        // End of transfert, potential zipping here + save doc + send response
        .on('end', () => {
            // Upload is done
            new Promise((resolve) => {
                if (!document.isRep) {
                    getUserOfRequest(req, (user) => {
                        document.cuid_author = user.cuid;
                        document.name_author = user.name;
                    }).then(() => resolve());
                    return;
                }

                zipFolder(form.uploadDir + document.cuid, form.uploadDir + document.cuid + ".zip", (err) => {
                    if (err) {
                        return garbageDocument(res, document, {
                            status: UPLOAD_STATUS_ERROR,
                            stage: "zip-creation",
                            error: err
                        })
                    }

                    getUserOfRequest(req, (user) => {
                        document.cuid_author = user.cuid;
                        document.name_author = user.name;
                    }).then(() => resolve());
                });
            }).then(() => {
                console.log("Then save doc to db");
                documentPromise.then(() => {
                    document.tags = document.tags.map(tag => tag._id);

                    document.save(function(err) {
                        if (err) {
                            console.log(err);
                            return garbageDocument(res, document, {
                                status: UPLOAD_STATUS_ERROR,
                                stage: "db-saving",
                                error: err,
                            });
                        }

                        document.populate("tags", (err) => {
                            if (err) {
                                res.status(500).json({ error : err });
                            } else {
                                res.status(200).json({ document: addDocumentFilesFullPath(document, host) });
                            }
                        })
                    });
                });
            })
        });

    form.parse(req);
}


/**
 * Get a single document
 * @param req the cuID of the document
 * @param res the document
 * @returns void
 */
export function getDocumentById(req, res, next) {
    Document.findOne({ cuid: req.params.cuid },(err, document) => {
        const host =`http://${req.headers['host']}` ;
        res.json({ document : addDocumentFilesFullPath(document, host) });
    }).catch((err) => {
        next(err);
    });
}

export function getAllVersionsById(req, res, next) {
    let cuidToFetch = req.params.cuid;
    const allVersions = { versions : []};
    console.log(cuidToFetch);
    let waiting = false;
    while (!waiting || (cuidToFetch !== "" && cuidToFetch !== null)){
        while (!waiting) {
            console.log("In while");
            waiting = true;
            Document.findOne({ cuid: cuidToFetch },(err, document) => {
                console.log("Hello in response ?");
                allVersions.push(document);
                cuidToFetch = document.parent_version;
                console.log(cuidToFetch);
                waiting = false;
            }).catch((err) => {
                console.log("ERROR");
                next(err);
            });
        }
    }
    console.log("Response sent");
    res.json(allVersions);
}


export function deleteDocument(req, res, next) {
    if(!req.session.isPopulated)
        throw new Error(JSON.stringify({ message: 'Vous devez être connecté', status: 403 }));
    if(!req.params.cuid)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412}));
    new Promise((resolve, reject) => {
        User.findOne({email: req.session.user}).exec((err, user) => {
            if (err)
                throw new Error(JSON.stringify({message: 'Erreur du serveur', status: 500}));
            if (user.role !== ADMIN_ROLE)
                throw new Error(JSON.stringify({message: 'Action réservée aux admins', status: 403}));
            resolve(true);
        });
    }).then(() => {
        Document.update(
            { cuid: req.params.cuid},
            { $set: {logicalDelete:  true }}
        ).exec((err, document) => {
            if(err)
                throw new Error(JSON.stringify({message: 'Erreur du serveur', status: 500}));
            res.json({message: 'Document supprimé avec succès'});
        });
    }).catch((err) => {
        next(err);
    });
}
