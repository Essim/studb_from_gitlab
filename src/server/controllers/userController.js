/* eslint-disable no-param-reassign,no-unused-vars */
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import bcrypt from 'bcrypt-nodejs';
import regex from 'regex-email';
import User, {USER_ROLE, ADMIN_ROLE, TEACHER_ROLE} from '../models/userSchema';
import Division from '../models/divisionSchema';

/**
 * Get all users
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function getUsers(req, res, next) {
    User.find({ group: { $gt: -1 } }).exec((err, users) => {
        if (err)
            next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
        else {
            users.forEach((user) => user.password = '');
            res.json({ users });
        }
    });
}


/**
 * Save a user
 * Set res.status at 403 if user.name is missing.
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function signUp(req, res, next) {
    if(!req.body.user)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status:412 }));
    const { user } = req.body;
    if (!user.division || !user.pseudo || !user.password || !user.email || !user.userID || !user.grades)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status:412 }));
    user.grades.forEach((grade) => {
       if(grade > 3 || grade < 1)
           throw new Error(JSON.stringify({ message: 'Année(s) incorrecte(s)', status:400 }));
    });
    if(!regex.test(user.email)) {
        throw new Error(JSON.stringify({ message: 'Adresse mail incorrecte', status:400 }));
    }
    new Promise(() => {
        User.findOne({ name: user.pseudo }).exec((err) => {
            if (err)
                throw new Error(JSON.stringify({ message: 'Erreur lors de l\'obtention du pseudo', status: 500}));
        }).then((userName) => {
            if (userName)
                throw new Error(JSON.stringify({ message: 'Pseudo déjà existant', status: 403}));
        }).then(() => {
            User.findOne({token: user.userID}).exec((err) => {
                if (err)
                    throw new Error(JSON.stringify({message: 'Erreur lors de l\'obtention du token', status: 500}));
            }).then((userToken) => {
                if (userToken)
                    throw new Error(JSON.stringify({message: 'Compte déjà associé à Google / Facebook', status: 403}));
            }).then(() => {
                User.findOne({email: user.email}).exec((err) => {
                    if (err)
                        throw new Error(JSON.stringify({
                            message: 'Erreur lors de l\'obtention de l\'adresse mail',
                            status: 500
                        }));
                }).then((userEmail) => {
                    if (userEmail)
                        throw new Error(JSON.stringify({message: 'Adresse Email déjà utilisée', status: 403}));
                }).then(() => {
                    Division.findOne(({ cuid: user.division })).exec((err) => {
                        if(err)
                            throw new Error(JSON.stringify({
                                message: 'Erreur lors de l\'obtention de la division',
                                status: 500
                            }));
                    }).then((division) => {
                        if(!division)
                            throw new Error(JSON.stringify({message: 'Division inconnue', status: 400}));
                    }).then(() => {
                        const newUser = new User();
                        newUser.name = sanitizeHtml(user.pseudo);
                        newUser.token = sanitizeHtml(user.userID);
                        newUser.password = sanitizeHtml(user.password);
                        bcrypt.genSalt(10, (err, salt) => {
                            // eslint-disable-next-line consistent-return
                            bcrypt.hash(newUser.password, salt, null, (err2, hash) => {
                                if (err2)
                                    next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
                                newUser.password = hash;
                            });
                        });
                        newUser.cuid_division = sanitizeHtml(user.division);
                        newUser.date_creation = new Date();
                        newUser.date_connection = new Date();
                        newUser.email = sanitizeHtml(user.email);
                        newUser.role = USER_ROLE; //At the begining we were dust
                        newUser.group = [];
                        user.grades.map((grade) => {
                            newUser.group.push(sanitizeHtml(grade));
                        });
                        newUser.group.sort();
                        newUser.cuid = cuid();
                        newUser.save((err) => {
                            if (err)
                                next(new Error(
                                    JSON.stringify({ message: 'Erreur lors de la sauvegarde dans la base de données', status: 403})));
                            else {
                                req.session.user = newUser.email;
                                newUser.password = "";
                                res.status(200).json({cuid: newUser.cuid});
                            }
                        }).catch((error) => {
				next(error);
			});
                    }).catch((error) => {
                        next(error);
                    });
                }).catch((error) => {
                    next(error);
                });
            }).catch((error) => {
                next(error);
            });
        }).catch((error) => {
            next(error);
        });
    }).catch((error) => {
        next(error);
    });
}


function sendUserToClient(req, res, userDb, user, next){
    if (!userDb)
        throw new Error(JSON.stringify({message: 'Adresse email / Pseudo inconnu', status: 403}));
    new Promise(() => {
        bcrypt.compare(user.password, userDb.password, (err, isMatch) => {
            console.log(userDb);
            if (err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
            else if(!isMatch)
                next(new Error(JSON.stringify({ message: 'Mot de passe incorrect', status:403 })));
            else if(userDb.logicalDelete)
                next(new Error(JSON.stringify({ message: 'Malheureusement vous êtes bannis', status: 403})));
            else {
                const date = new Date();
                User.update(
                    { cuid: userDb.cuid },
                    { $set: { date_connection: date } }
                ).exec((errUpdate) => {
                    if (errUpdate)
                       next(new Error(
                           JSON.stringify({ message: 'Erreur lors de la sauvegarde dans la base de données', status: 403})));
                    else {
                        userDb.date_connection = date;
                        req.session.user = userDb.email;
                        userDb.password = "";
                        res.status(200).json(userDb);
                    }
                });
            }
        });
    });
}

export function signIn(req, res, next) {
    if(!req.body.user)
        throw new Error(JSON.stringify({ message: 'Informations Manquantes', status: 412 }));
    const { user } = req.body;
    if (!user.login || !user.password)
        throw new Error(JSON.stringify({ message: 'Informations Manquantes', status: 412 }));
    new Promise(() => {
        if(!regex.test(user.login)) {
            User.findOne({name: user.login}).exec((err) => {
                if (err)
                    throw new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500}));
            }).then((userDb) => {
                sendUserToClient(req, res, userDb, user, next);
            }).catch((error) => {
                next(error);
            });
        } else {
            User.findOne({email: user.login}).exec((err) => {
                if (err)
                    throw new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500}));
            }).then((userDb) => {
                sendUserToClient(req, res, userDb, user, next);
            }).catch((error) => {
                next(error);
            });
        }
    });
}

export function signInOauth(req, res, next) {
    if(!req.body.user)
        throw new Error(JSON.stringify({ message: 'Informations Manquantes', status: 412 }));
    const { user } = req.body;
    if (!user.userID || !user.email)
           throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412 }));
    new Promise(() => {
        User.findOne({ email: user.email }).exec((err) => {
            if (err)
                throw new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 }));
        }).then((userDb) => {
            if(!userDb)
                res.status(200).json("");
            else if (user.userID !== userDb.token)
                next(new Error(JSON.stringify(
                    { message: 'l\'adresse mail ne correspond pas au compte Facebook / Google', status: 403 })));
            else if (userDb.logicalDelete)
                next(new Error(JSON.stringify({ message: 'Malheureusement vous êtes bannis', status: 403 })));
            else {
                const date = new Date();
                User.update(
                    {cuid: userDb.cuid},
                    {$set: {date_connection: date}}
                ).exec((errUpdate) => {
                    if (errUpdate)
                        next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
                    else {
                        userDb.date_connection = date;
                        req.session.user = userDb.email;
                        userDb.password = "";
                        res.status(200).json(userDb);
                    }
                });
            }
        }).catch((error) => {
            next(error);
        });
    });
}

export function init(req, res, next) {
    new Promise((resolve, reject) => {
        if(!req.session.isPopulated)
            reject(new Error());
        resolve(true);
    }).then(() => {
        User.findOne({ email: req.session.user }).exec((err) => {
            if (err)
                throw new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500}));
        }).then((user) => {
            if(!user)
                res.json('');
            else if(user.logicalDelete) {
                req.session = null;
                res.json('');
            } else {
                const date = new Date();
                User.update(
                    {cuid: user.cuid},
                    {$set: {date_connection: date}}
                ).exec((errUpdate) => {
                    if (errUpdate)
                        next(new Error(JSON.stringify({message: 'Erreur du serveur', status: 500})));
                    else {
                        user.date_connection = date;
                        req.session.user = user.email;
                        user.password = "";
                        res.status(200).json(user);
                    }
                });
            }
        }).catch((error) => {
            next(error);
        });
    });
}

/**
 * Logout a user.
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function logout(req, res, next) {
    if(!req.session.isPopulated)
        next(new Error(JSON.stringify({ message: 'Aucun utilisateur à déconnecté', status:403})));
    else {
        req.session = null;
        res.status(200).json('');
    }
}

/**
 * update a user's division
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function updateUserDivision(req, res, next) {
    if(!req.session.isPopulated)
        throw new Error(JSON.stringify({ message: 'Vous devez être connecté', status: 403}));
    else if (!req.body.division)
        throw new Error(JSON.stringify({ message: 'Veuilliez spécifier un bachelier', status: 412}));
    new Promise((resolve, reject) => {
        User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
            if (err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
            else if(req.session.user !== user.email)
                next(new Error(JSON.stringify({ message: 'Il semblerait qu\'il ne s\'agisse pas de votre compte', status: 403})));
            else {
                Division.findOne({ cuid: req.body.division }).exec((err, division) => {
                   if(err)
                       next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
                   else if (!division)
                       next(new Error(JSON.stringify({ message: 'Division inconnue', status: 400 })));
                   else if (division.logicalDelete)
                       next(new Error(JSON.stringify({ message: 'Division supprimée', status: 403 })));
                   else {
                       User.update(
                           { cuid: req.params.cuid },
                           { $set: { cuid_division: sanitizeHtml(req.body.division) } }
                       ).exec((err, user) => {
                           if (err)
                               next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
                           else {
                               user.password = "";
                               res.json({user});
                           }
                       });
                   }
                });
            }
        });
    });
}

/**
 * Get a user's grades
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function updateUserGrades(req, res, next) {
    if(!req.session.isPopulated)
        throw new Error(JSON.stringify({ message: 'Vous devez être connecté', status: 403}));
    else if (!req.body.grades || req.body.grades.length === 0)
        throw new Error(JSON.stringify({ message: 'Veuilliez spécifier un ou plusieurs blocs de cours', status: 412}));
    req.body.grades.forEach((grade) => {
        if(grade > 3 || grade < 1)
            throw new Error(JSON.stringify({ message: 'Année(s) incorrecte(s)', status:400 }));
    });
    new Promise((resolve, reject) => {
        User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
            if (err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
            else if(req.session.user !== user.email)
                next( new Error(JSON.stringify({ message: 'Il semblerait qu\'il ne s\'agisse pas de votre compte', status: 403})));
            else {
                const grades = req.body.grades.map((grade) => {
                    return parseInt(sanitizeHtml(grade));
                });
                grades.sort();
                User.update(
                    { cuid: req.params.cuid },
                    { $set: { group: grades } }
                ).exec((err, user) => {
                    if (err)
                        next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
                    else {
                        user.password = "";
                        res.json({ user });
                    }
                });
            }
        });
    });
}

/**
 * Get a user's password
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function updateUserPassword(req, res, next) {
    if(!req.session.isPopulated)
        throw new Error(JSON.stringify({ message: 'Vous devez être connecté', status: 403}));
    else if (!req.body.newPassword || !req.body.oldPassword)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412}));
    new Promise((resolve, reject) => {
        User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
            if (err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
            else if(req.session.user !== user.email)
                next( new Error(JSON.stringify({ message: 'Il semblerait qu\'il ne s\'agisse pas de votre compte', status: 403})));
            else {
                bcrypt.compare(req.body.oldPassword, user.password, (err, isMatch) => {
                    if(err)
                        next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
                    else if(!isMatch)
                        next(new Error(JSON.stringify({ message: 'Mot de passe incorrect', status: 403})));
                    else {
                        const newPassword = sanitizeHtml(req.body.newPassword);
                        bcrypt.genSalt(10, (err, salt) => {
                            // eslint-disable-next-line consistent-return
                            bcrypt.hash(newPassword, salt, null, (err2, hash) => {
                                if (err2)
                                    next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
                                else
                                    resolve(hash);
                            });
                        });
                    }
                });
            }
        });
    }).then((hashedPassword) => {
        User.update(
            { cuid: req.params.cuid },
            { $set: { password: hashedPassword } }
        ).exec((err, user) => {
            if (err)
                next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500})));
            else {
                user.password = "";
                res.json({user});
            }
        });
    });
}

function setLogicalDelete(req, res, next, logicalDelete) {
    if (!req.session.isPopulated)
        throw new Error(JSON.stringify({message: 'Vous devez être connecté', status: 403}));
    if (!req.params.cuid)
        throw new Error(JSON.stringify({message: 'Informations manquantes', status: 412}));
    new Promise((resolve, reject) => {
        User.findOne({email: req.session.user}).exec((err, user) => {
            if (err)
                next(new Error(JSON.stringify({message: 'Erreur du serveur', status: 500})));
            else if (user.role !== ADMIN_ROLE)
                next(new Error(JSON.stringify({message: 'Action réservée aux admins', status: 403})));
            else
                resolve(true);
        });
    }).then(() => {
        User.findOne({ cuid : req.params.cuid}).exec((err, user) => {
           if(err)
               next(new Error(JSON.stringify({message: 'Erreur du serveur', status: 500})));
           else if (!user)
               next(new Error(JSON.stringify({message: 'Utilisateur inconnu', status: 400})));
           else {
               User.update(
                   {cuid: req.params.cuid},
                   {$set: {logicalDelete: logicalDelete}}
               ).exec((err, user) => {
                   if (err)
                       next(new Error(JSON.stringify({message: 'Erreur du serveur', status: 500})));
                   else
                       res.json({message: 'Utilisateur bannis/débannis avec succès'});
               });
           }
        });
    });
}

export function ban(req, res, next) {
    setLogicalDelete(req, res, next, true);
}

export function unBan(req, res, next) {
    setLogicalDelete(req, res, next, false);
}

export function updateRole(req, res, next) {
    if(!req.session.isPopulated)
        throw new Error(JSON.stringify({ message: 'Vous devez être connecté', status: 403 }));
    if(!req.params.cuid || !req.body.role)
        throw new Error(JSON.stringify({ message: 'Informations manquantes', status: 412}));
    if(req.body.role !== ADMIN_ROLE && req.body.role !== TEACHER_ROLE && req.body.role !== USER_ROLE)
        throw new Error(JSON.stringify({ message: 'Rôle invalide', status: 400}));
    new Promise((resolve, reject) => {
        User.findOne({email: req.session.user}).exec((err, user) => {
            if (err)
                next(new Error(JSON.stringify({message: 'Erreur du serveur', status: 500})));
            else if (user.role !== ADMIN_ROLE)
                next(new Error(JSON.stringify({message: 'Action réservée aux admins', status: 403})));
            else
                resolve(true);
        });
    }).then(() => {
        User.findOne({ cuid : req.params.cuid }).exec((err, user) => {
            if(err)
                next(new Error(JSON.stringify({message: 'Erreur du serveur', status: 500})));
            else if (!user)
                next(new Error(JSON.stringify({message: 'Utilisateur inconnu', status: 400})));
            else {
                User.update(
                    {cuid: req.params.cuid},
                    {$set: {role: parseInt(req.body.role)}}
                ).exec((err) => {
                    if (err)
                        next(new Error(JSON.stringify({message: 'Erreur du serveur', status: 500})));
                    else
                        res.json({message: 'Utilisateur promu avec succès'});
                });
            }
        });
    });
}

/**
 * Get a single user by his cuid
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export function getUser(req, res, next) {
    User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
        if (err)
            next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
        else if (!user)
            next(new Error(JSON.stringify({ message: 'Aucun utilisateur correspondant à ce cuid', status:400 })));
        else {
            user.password = "";
            res.json({user});
        }
    });
}

/**
 * Get a user by his pseudo
 * @param req
 * @param res
 * @param next
 */
export function getUserByPseudo(req, res, next) {
    User.findOne({name : req.params.pseudo}).exec((err, user) => {
        if(err)
            next(new Error(JSON.stringify({ message: 'Erreur du serveur', status: 500 })));
        else if (!user)
            next(new Error(JSON.stringify({ message: 'Utilisateur inconnu', status: 400 })));
        else {
            user.password = "";
            res.json({user});
        }
    });
}

export function getUserOfRequest(req, callback) {
    if (!req.session.isPopulated)
        throw new Error(JSON.stringify({message: 'Vous devez être connecté', status: 403}));

    return new Promise((resolve, reject) => {
        User.findOne({email: req.session.user}).exec((err, user) => {
            if (err)
                reject({message: 'Erreur du serveur', status: 500});
            else {
                if (callback)
                    callback(user);

                resolve(user);
            }
        });
    })
}
