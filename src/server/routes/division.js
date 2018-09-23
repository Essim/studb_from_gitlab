import * as DivisionController from '../controllers/division.controller';

module.exports.setup = function(app,prefix) {

    /**
     * @swagger
     * /api/division:
     *   get:
     *     summary: Returns divisions
     *     description: Returns divisions
     *     tags:
     *      - Divisions
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: division
     */
    app.get(prefix, DivisionController.getDivisions);

    /**
     * @swagger
     * /api/division/{cuid}:
     *   get:
     *     summary: Returns a division by his cuid
     *     description: Returns a division by his cuid
     *     tags: [Divisions]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name : cuid
     *        description: numeric id of the division to get
     *        schema:
     *          type: string
     *        required: true
     *
     *     responses:
     *       200:
     *         description: division's information
     */
    app.get(prefix+'/:cuid', DivisionController.getDivision);


    /**
     * @swagger
     * /api/division:
     *   post:
     *     summary: Create a division
     *     tags: [Divisions]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: body
     *        name: division
     *        required: true
     *        schema:
     *          properties:
     *              division:
     *                  type: object
     *                  properties:
     *                      acronym:
     *                          type: string
     *     responses:
     *       201:
     *         description: Created
     */
    app.post(prefix, DivisionController.addDivision);

    /**
     * @swagger
     * /api/division/{cuid}:
     *   delete:
     *     summary: Delete a division by his cuid
     *     description: Delete a division by his cuid
     *     tags: [Divisions]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name : cuid
     *        description: numeric id of the division to delete
     *        schema:
     *          type: string
     *        required: true
     *
     *     responses:
     *       200:
     *         description: division's information
     */
    app.delete(prefix+'/:cuid', DivisionController.deleteDivision);

    /**
     * @swagger
     * /api/division/course/{cuid}:
     *   delete:
     *     summary: Delete a course by his cuid
     *     description: Delete a course by his cuid
     *     tags: [Divisions]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name : cuid
     *        description: numeric id of the course's division
     *        required: true
     *      - in: body
     *        name: course
     *        required: true
     *        schema:
     *          properties:
     *              course:
     *                  type: object
     *                  properties:
     *                      cuid:
     *                          type: string
     *
     *     responses:
     *       200:
     *         description: division's information
     */
    app.delete(prefix+'/course/:cuid', DivisionController.deleteCourse);

    /**
     * @swagger
     * /api/division/course/{cuid}:
     *   post:
     *     summary: Create a division's course
     *     tags: [Divisions]
     *     produces:
     *       - application/json
     *     parameters:
     *      - in: path
     *        name : cuid
     *        description: numeric id of the course's division
     *        schema:
     *          type: string
     *        required: true
     *      - in: body
     *        name: course
     *        required: true
     *        schema:
     *          properties:
     *              course:
     *                  type: object
     *                  properties:
     *                      grade:
     *                          type: integer
     *                      name:
     *                          type: string
     *     responses:
     *       201:
     *         description: Created
     */
    app.post(prefix+'/course/:cuid', DivisionController.addCourse);

};
