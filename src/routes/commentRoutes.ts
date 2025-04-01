import express from 'express';
import * as commentController from '../controllers/commentController';

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - author
 *         - activity
 *         - content
 *       properties:
 *         author:
 *           type: string
 *           format: objectId
 *           description: ID de l'usuari que fa el comentari
 *           default: ''
 *         activity:
 *           type: string
 *           format: objectId
 *           description: ID de l'activitat comentada
 *         content:
 *           type: string
 *           description: Contingut del comentari
 *         isEdited:
 *           type: boolean
 *           description: Indica si el comentari ha estat editat
 *       example:
 *         author: "67dd9a1cded18031f09d930d"
 *         activity: "67e9d481d4a51ff22fea7d78"
 *         content: "Great activity!"
*/

/**
 * @openapi
 * /api/comments:
 *   post:
 *     summary: Create a new comment associated with an activity of a user
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - activity
 *               - content
 *               - isEdited
 *             properties:
 *               author:
 *                 type: objectId
 *                 description: The ID of the user who created the activity
 *               activity:
 *                 type: objectId
 *                 description: The ID of the activity being commented on
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *               isEdited:
 *                 type: boolean
 *                 description: Indicates if the comment has been edited
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post('/', commentController.createCommentController);

/**
 * @openapi
 * /api/comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment details
 *       404:
 *         description: Comment not found
 */
router.get('/:id', commentController.getCommentByIdController);

/**
 * @openapi
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated content of the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error updating comment
 */
router.put('/:id', commentController.updateCommentController);

/**
 * @openapi
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error deleting comment
 */
router.delete('/:id', commentController.deleteCommentController);

/**
 * @openapi
 * /api/comments/search:
 *   get:
 *     summary: Search comments by content
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: content
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword to search in the comments' content
 *     responses:
 *       200:
 *         description: List of comments containing the search term
 *       500:
 *         description: Error searching comments
 */
router.get('/search', commentController.searchCommentsController);

export default router;