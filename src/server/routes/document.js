import * as DocumentController from '../controllers/document.controller';

module.exports.setup = function(app, prefix) {


    /**
     * @swagger
     * /api/document:
     *   get:
     *     summary: Returns documents
     *     description: Returns documents
     *     tags:
     *      - Documents
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: document
     */
    app.get(prefix, DocumentController.getDocuments);



    /**
     * @swagger
     * /api/document/{cuid}:
     *   get:
     *     summary: Returns a document by his cuid
     *     description: Returns a docuemnt by his cuid
     *     tags: [Documents]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name : cuid
     *        description: numeric id of the document to get
     *        schema:
     *          type: string
     *        required: true
     *
     *     responses:
     *       200:
     *         description: document's information
     */
    app.get(prefix+'/:cuid', DocumentController.getDocumentById);

    app.get(prefix+'/allversions/:cuid', DocumentController.getAllVersionsById);


    app.post(prefix+'/like/:cuidDoc', DocumentController.likeDocumentById);


    app.post(prefix+'/comment/:cuidDoc', DocumentController.addComment);


    /**
     * @swagger
     * /api/document:
     *   put:
     *     summary: Create a document
     *     tags: [Documents]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: body
     *        name: document to upload
     *        required: true
     *        schema:
     *          properties:
     *              document:
     *                  type: object
     *                  properties:
     *                      name:
     *                          type: string
     *                      path:
     *                          type: string
     *     responses:
     *       201:
     *         description: Created
     */

    app.put(prefix, DocumentController.uploadDocuments);

    /**
     * @swagger
     * /api/document/{cuid}:
     *   delete:
     *     summary: Delete a document by his cuid
     *     description: Delete a document by his cuid
     *     tags: [Documents]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name : cuid
     *        description: numeric id of the document to delete
     *        schema:
     *          type: string
     *        required: true
     *
     *
     *     responses:
     *       200:
     *         description: division's information
     */
    app.delete(prefix+'/:cuid', DocumentController.deleteDocument);

    /**
     * @swagger
     * /api/document/comment/{cuid}:
     *   delete:
     *     summary: Delete a document's comment by his cuid
     *     description: Delete a document's comment by his cuid
     *     tags: [Documents]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name : cuid
     *        description: numeric id of the document's comment to delete
     *        schema:
     *          type: string
     *        required: true
     *
     *
     *     responses:
     *       200:
     *         description: division's information
     */
    app.delete(prefix+'/comment/:cuid', DocumentController.deleteComment);
};

