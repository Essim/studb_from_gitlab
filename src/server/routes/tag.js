import * as TagController from '../controllers/tag.controller';

module.exports.setup = function(app,prefix) {


    /**
     * @swagger
     * /api/tag:
     *   get:
     *     summary: Returns tags
     *     description: Returns tags
     *     tags:
     *      - Tags
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: tags
     */
    app.get(prefix, TagController.getTags);

    /**
     * @swagger
     * /api/tag/number/{numid}:
     *   get:
     *     summary: Returns a tag by his numid
     *     description: Returns a tag by his numid
     *     tags: [Tags]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name : numid
     *        description: numeric id of the tag to get
     *        schema:
     *          type: string
     *        required: true
     *
     *     responses:
     *       200:
     *         description: tag's information
     */
    app.get(prefix+'/number/:numid', TagController.getTagByNumid);

    /**
     * @swagger
     * /api/tag/{cuid}:
     *   get:
     *     summary: Returns a tag by his cuid
     *     description: Returns a tag by his cuid
     *     tags: [Tags]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name : cuid
     *        description: cuid of the tag to get
     *        schema:
     *          type: string
     *        required: true
     *
     *     responses:
     *       200:
     *         description: tag's information
     */
    app.get(prefix+'/:cuid', TagController.getTag);
    /**
     * @swagger
     * /api/tag:
     *   post:
     *     summary: Create a tag
     *     tags: [Tags]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: body
     *        name: tag
     *        required: true
     *        schema:
     *          properties:
     *            tag:
     *              type: object
     *              properties:
     *                name:
     *                  type: string
     *     responses:
     *       200:
     *         description: tag's information
     */
    app.post(prefix, TagController.addTag);
};
