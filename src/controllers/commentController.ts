import { Request, Response } from 'express';
import Comment from '../models/comment';
import * as commentService from '../services/commentService';
import mongoose from 'mongoose';

export const createCommentController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { author, activity, content } = req.body;
        
        if (!author || !activity || !content) {
          res.status(400).json({ message: 'Faltan datos obligatorios' });
          return;
        }
        
        const newComment = await commentService.createComment(author, activity, content);
        
        res.status(201).json({
          message: 'Comentario creado con éxito',
          comment: newComment
        });
      } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ message: 'Error al crear comentario' });
      }
};

export const getCommentByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
      const commentId = req.params.id;
      const comment = await commentService.getCommentById(commentId);
      
      if (!comment) {
        res.status(404).json({ message: 'Comentario no encontrado' });
        return;
      }
      
      res.status(200).json(comment);
    } catch (error) {
      console.error('Error al obtener comentario:', error);
      res.status(500).json({ message: 'Error al obtener comentario' });
    }
};

export const updateCommentController = async (req: Request, res: Response): Promise<void> => {
    try {
      const commentId = req.params.id;
      const { content } = req.body;
  
      if (!content) {
        res.status(400).json({ message: 'El contenido no puede estar vacío' });
        return;
      }
  
      const updatedComment = await commentService.updateComment(commentId, content);
  
      if (!updatedComment) {
        res.status(404).json({ message: 'Comentario no encontrado' });
        return;
      }
  
      res.status(200).json({
        message: 'Comentario actualizado correctamente',
        comment: updatedComment
      });
    } catch (error) {
      console.error('Error al actualizar comentario:', error);
      res.status(500).json({ message: 'Error al actualizar comentario' });
    }
};

export const deleteCommentController = async (req: Request, res: Response): Promise<void> => {
    try {
      const commentId = req.params.id;
      const deletedComment = await commentService.deleteComment(commentId);
  
      if (!deletedComment) {
        res.status(404).json({ message: 'Comentario no encontrado' });
        return;
      }
  
      res.status(200).json({
        message: 'Comentario eliminado correctamente',
        comment: deletedComment
      });
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      res.status(500).json({ message: 'Error al eliminar comentario' });
    }
};

export const getPaginatedCommentsController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { activityId } = req.params;
      const page = parseInt(req.query.page?.toString() || '1', 10);
      const limit = parseInt(req.query.limit?.toString() || '10', 10);
  
      if (!activityId) {
        res.status(400).json({ message: 'ID de actividad requerido' });
        return;
      }
  
      if (page < 1 || limit < 1 || limit > 100) {
        res.status(400).json({ message: 'Parámetros de paginación inválidos' });
        return;
      }
  
      const result = await commentService.getPaginatedComments(activityId, page, limit);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al obtener comentarios paginados:', error);
      res.status(500).json({ message: 'Error al obtener comentarios' });
    }
};
export const searchCommentsController = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.content?.toString();
      console.log('Search query:', query); // Debug log
  
      if (!query) {
        res.status(400).json({ message: 'Se requiere una consulta de búsqueda' });
        return;
      }
  
      const comments = await commentService.searchComments(query);
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error al buscar comentarios:', error); // Log the error
      res.status(500).json({ message: 'Error al buscar comentarios' });
    }
};