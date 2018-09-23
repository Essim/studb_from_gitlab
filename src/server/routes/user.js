import * as UserController from '../controllers/userController';

module.exports.setup = function(app, prefix) {
    /**
     * @swagger
     * /api/user:
     *   get:
     *     summary: Returns users
     *     description: Returns users
     *     tags:
     *      - Users
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: users
     */
    app.get(prefix, UserController.getUsers);

    /**
     * @swagger
     * /api/user/{cuid}:
     *   get:
     *     summary: Returns a user by his cuid
     *     description: Returns a user by his cuid
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name : cuid
     *        description: numeric id of the user to get
     *        schema:
     *          type: string
     *        required: true
     *
     *     responses:
     *       200:
     *         description: user's information
     */
    app.get(prefix+'/:cuid', UserController.getUser);


    /**
     * @swagger
     * /api/user/signin:
     *   post:
     *     summary: Signin a user
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: body
     *        name: user to signin
     *        required: true
     *        schema:
     *          properties:
     *              user:
     *                  type: object
     *                  properties:
     *                      login:
     *                          type: string
     *                      password:
     *                          type: string
     *     responses:
     *       200:
     *         description: user's information
     */
    app.post(prefix+'/signin', UserController.signIn);
    /**
     * @swagger
     * /api/user/signinoauth:
     *   post:
     *     summary: Signin a user with OAuth
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: body
     *        name: user to signin
     *        required: true
     *        schema:
     *          properties:
     *              user:
     *                  type: object
     *                  properties:
     *                      userID:
     *                          type: string
     *                      email:
     *                          type: string
     *     responses:
     *       200:
     *         description: user's information
     */

    app.post(prefix+'/signinoauth', UserController.signInOauth);

    /**
     * @swagger
     * /api/user/init:
     *   post:
     *     summary: Initialize an user connection
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: user's information
     */
    app.post(prefix+'/init', UserController.init);

    /**
     * @swagger
     * /api/user/logout:
     *   post:
     *     summary: Log an user out
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: empty json
     */
    app.post(prefix+'/logout', UserController.logout);

    /**
     * @swagger
     * /api/user/signup:
     *   post:
     *     summary: Create a user
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: body
     *        name: user to signin
     *        required: true
     *        schema:
     *          properties:
     *              user:
     *                  type: object
     *                  properties:
     *                    division:
     *                       type: string
     *                    email:
     *                        type: string
     *                    pseudo:
     *                        type: string
     *                    password:
     *                        type: string
     *                    userID:
     *                        type: string
     *                    grades:
     *                        type: array
     *                        items:
     *                          type: integer
     *     responses:
     *       201:
     *         description: Created
     */
    app.post(prefix+'/signup', UserController.signUp);

    /**
     * @swagger
     * /api/user/update/division/{cuid}:
     *   patch:
     *     summary: Update a user's division
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: body
     *        name: user to update division
     *        required: true
     *        schema:
     *          properties:
     *            division:
     *              type: string
     *      - in: path
     *        name: cuid
     *        schema:
     *          type: string
     *        required: true
     *        description: Numeric ID of the user to update.
     *     responses:
     *       200:
     *         description: Ok
     */
    app.patch(prefix+'/update/division/:cuid', UserController.updateUserDivision);
    /**
     * @swagger
     * /api/user/update/grades/{cuid}:
     *   patch:
     *     summary: Update a user's grades
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: body
     *        name: user to update grades
     *        required: true
     *        schema:
     *          properties:
     *            grades:
     *              type: array
     *              items:
     *                type: integer
     *      - in: path
     *        name: cuid
     *        schema:
     *          type: string
     *        required: true
     *        description: Numeric ID of the user to update.
     *     responses:
     *       200:
     *         description: Ok
     */
    app.patch(prefix+'/update/grades/:cuid', UserController.updateUserGrades);
    /**
     * @swagger
     * /api/user/update/password/{cuid}:
     *   patch:
     *     summary: Update a user's password
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: body
     *        name: user to update password
     *        required: true
     *        schema:
     *          properties:
     *            oldPassword:
     *              type: string
     *            newPassword:
     *              type: string
     *      - in: path
     *        name: cuid
     *        schema:
     *          type: string
     *        required: true
     *        description: Numeric ID of the user to update.
     *     responses:
     *       200:
     *         description: Ok
     */
    app.patch(prefix+'/update/password/:cuid', UserController.updateUserPassword);

    /**
     * @swagger
     * /api/user/update/role/{cuid}:
     *   post:
     *     summary: Update a user's role
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: body
     *        name: user to signin
     *        required: true
     *        schema:
     *          properties:
     *            role:
     *              type: string
     *      - in: path
     *        name: cuid
     *        schema:
     *          type: int
     *        required: true
     *        description: Numeric ID of the user to update.
     *     responses:
     *       200:
     *         description: user's information
     */
    app.post(prefix+'/update/role/:cuid', UserController.updateRole);

    /**
     * @swagger
     * /api/user/ban/{cuid}:
     *   post:
     *     summary: Ban a user
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name: cuid
     *        schema:
     *          type: string
     *        required: true
     *        description: Numeric ID of the user to update.
     *     responses:
     *       200:
     *         description: user's information
     */
    app.post(prefix+'/ban/:cuid', UserController.ban);

    /**
     * @swagger
     * /api/user/unban/{cuid}:
     *   post:
     *     summary: Unban a user
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name: cuid
     *        schema:
     *          type: string
     *        required: true
     *        description: Numeric ID of the user to update.
     *     responses:
     *       200:
     *         description: user's information
     */
    app.post(prefix+'/unban/:cuid', UserController.unBan);

    /**
     * @swagger
     * /api/user/pseudo/{pseudo}:
     *   get:
     *     summary: Returns a user based on his pseudo
     *     description: Returns users
     *     tags:
     *      - Users
     *     produces:
     *      - application/json
     *     parameters:
     *      - in: path
     *        name: pseudo
     *        schema:
     *          type: string
     *        required: true
     *        description: Pseudo of the user to get
     *     responses:
     *       200:
     *         description: users
     */
    app.get(prefix+'/pseudo/:pseudo', UserController.getUserByPseudo);
};
