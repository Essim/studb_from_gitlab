import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import Division from '../models/divisionSchema';
import Course from '../models/courseSchema';
import User, { ADMIN_ROLE } from '../models/userSchema';


/**
 * Get all divisions
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function getDivisions(req, res, next) {
    Division.find().exec((err, divisions) => {
        if (err)
            next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
        else
            res.json({ divisions });
    });
}

/**
 * Save a division
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function addDivision(req, res, next) {
    if(!req.session.isPopulated)
        throw new Error(JSON.stringify({ message: 'Vous devez être connecté', status: 403 }));
    if(!req.body.division || !req.body.division.acronym)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412 }));
    new Promise((resolve) => {
        User.findOne({email: req.session.user}).exec((err, user) => {
            if (err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
            else if (user.role !== ADMIN_ROLE)
                next(new Error(JSON.stringify({ message: 'Action réservée aux admins', status: 403 })));
            else
                resolve(true);
        });
    }).then(() => {
        const newDivision = new Division(req.body.division);
        newDivision.acronym = sanitizeHtml(newDivision.acronym);
        newDivision.name = sanitizeHtml(newDivision.acronym);
        newDivision.cuid = cuid();
        newDivision.save((err, saved) => {
            if (err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
            res.status(200).json({ division: saved });
        });
    }).catch((err) => {
        next(err);
    });
}

/**
 * Get a single division
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function getDivision(req, res, next) {
    Division.findOne({ cuid: req.params.cuid }).exec((err, division) => {
        if (err)
            next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
        else if(!division)
            next(new Error(JSON.stringify({ message: 'Aucune division de ce nom', status: 400})));
        else
            res.json({ division });
    });
}

/**
 * Delete a division
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function deleteDivision(req, res, next) {
    if(!req.session.isPopulated)
        throw new Error(JSON.stringify({ message: 'Vous devez être connecté', status: 403 }));
    if(!req.params.cuid)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412}));
    new Promise((resolve) => {
        User.findOne({email: req.session.user}).exec((err, user) => {
            if (err)
                next(new Error(JSON.stringify({message: 'Erreur du serveur', status: 500})));
            else if (user.role !== ADMIN_ROLE)
                next(new Error(JSON.stringify({message: 'Action réservée aux admins', status: 403})));
            else
                resolve(true);
        });
    }).then(() => {
        Division.update(
            { cuid: req.params.cuid },
            { $set: {logicalDelete:  true }}
        ).exec((err) => {
            if(err)
                next(new Error(JSON.stringify({message: 'Erreur du serveur', status: 500})));
            else
                res.json({message: 'Division supprimée avec succès'});
        });
    }).catch((err) => {
        next(err);
    });
}

/**
 * Delete a course of a given division
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function deleteCourse(req, res, next) {
    if(!req.session.isPopulated)
        throw new Error(JSON.stringify({ message: 'Vous devez être connecté', status: 403 }));
    if(!req.params.cuid || !req.body.course || !req.body.course.cuid)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412 }));
    new Promise((resolve) => {
        User.findOne({email: req.session.user}).exec((err, user) => {
            if (err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
            else if (user.role !== ADMIN_ROLE)
                next(new Error(JSON.stringify({ message: 'Action réservée aux admins', status: 403 })));
            else
                resolve(true);
        });
    }).then(() => {
        Division.findOne({ cuid: req.params.cuid }).exec((err, division) => {
            if(err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
            else if(!division)
                next(new Error(JSON.stringify({ message: 'Division non valide', status: 412 })));
            else {
                const filter = division.courses.filter((course) => course.cuid === req.body.course.cuid);
                if(filter.length === 0) {
                    next(new Error(JSON.stringify({ message: 'Cours non valide', status: 500 })));
                } else {
                    filter[0].logicalDelete = true;
                    Division.update(
                        { cuid: req.params.cuid },
                        { $set: {courses: division.courses }}
                    ).exec((err) => {
                        if(err)
                            next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
                        else
                            res.status(200).json({ message: 'Cours supprimé avec succès' })
                    });
                }
            }
        });
    }).catch((err) => {
        next(err);
    });
}

/**
 * Delete a course of a given division
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function addCourse(req, res, next) {
    if(!req.session.isPopulated)
        throw new Error(JSON.stringify({ message: 'Vous devez être connecté', status: 403 }));
    if(!req.body.course || !req.params.cuid || !req.body.course.name || !req.body.course.grade)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412 }));
    if(req.body.course.grade > 3 || req.body.course.grade < 1)
        throw new Error(JSON.stringify({ message: 'Année Incorrecte', status: 412 }));
    new Promise((resolve) => {
        User.findOne({email: req.session.user}).exec((err, user) => {
            if (err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
            else if (user.role !== ADMIN_ROLE)
                next(new Error(JSON.stringify({ message: 'Action réservée aux admins', status: 403 })));
            else
                resolve(true);
        });
    }).then(() => {
        const newCourse = new Course();
        newCourse.name = sanitizeHtml(req.body.course.name);
        newCourse.grade = sanitizeHtml(req.body.course.grade);
        newCourse.logicalDelete = false;
        newCourse.cuid = cuid();
        return newCourse.save((err) => {
            if(err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
            else
                return newCourse;
        });
    }).then((course) => {
        Division.findOne({ cuid: req.params.cuid }).exec((err, division) => {
            if(err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
            else if(!division)
                next(new Error(JSON.stringify({ message: 'Division non valide', status: 412 })));
            else {
                division.registerCourse(course).then(() => {
                    console.log("Saving", course);
                    Division.update(
                        { cuid: req.params.cuid },
                        { $set: {courses: division.courses }}
                    ).exec((err) => {
                        if(err)
                            next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
                        else
                            res.status(200).json({ course, })
                    });
                });
                // division.courses.push(course);
            }
        });
    }).catch((err) => {
        next(err);
    });
}
