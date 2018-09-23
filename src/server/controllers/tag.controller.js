import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import Tag from '../models/tagSchema';

/**
 * Get all tags
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function getTags(req, res, next) {
    Tag.find().exec((err, tags) => {
        if (err)
            next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
        else
            res.json({ tags });
    });
}

/**
 * Save a tag
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function addTag(req, res, next) {
    if(!req.body.tag || !req.body.tag.name)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412 }));
    const newTag = new Tag(req.body.tag);
    // Sanitizing string inputs
    newTag.name = sanitizeHtml(newTag.name);
    newTag.cuid = cuid();
    newTag.save((err, saved) => {
        if (err)
            next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
        else
            res.json({ tags: saved });
    });
}

/**
 * Get a single tags
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function getTag(req, res, next) {
    if(!req.params.cuid)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412 }));
    Tag.findOne({ cuid: req.params.cuid }).exec((err, tags) => {
        if (err)
            next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
        else
            res.json({ tags });
    });
}

/**
 * Get a single tags
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function getTagByNumid(req, res, next) {
    if(!req.params.numid)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412 }));
    Tag.findOne({ numid: req.params.numid }).exec((err, tags) => {
        if (err)
            next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
        else
            res.json({ tags });
    });
}
