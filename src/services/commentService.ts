import CommentModel, {IComment} from "../models/comment";
import mongoose from 'mongoose';

// Crear commentari
export const createComment = async (authorId: string, activityId: string, content: string): Promise<IComment> => {
    const newComment = new CommentModel({ author: authorId, activity: activityId, content });
    return await newComment.save();
};

// Obtenir commentari per ID
export const getCommentById = async (commentId: string): Promise<IComment | null> => {
    return await CommentModel.findById(commentId).populate('author', 'username').populate('activity', 'name');
};

// Actualitzar commentari
export const updateComment = async (commentId: string, newContent: string): Promise<IComment | null> => {
    return await CommentModel.findByIdAndUpdate(
      commentId,
      { content: newContent, isEdited: true },
      { new: true }
    );
};

// Eliminar commentari
export const deleteComment = async (commentId: string): Promise<IComment | null> => {
    return await CommentModel.findByIdAndDelete(commentId);
};

// paginació
export const getPaginatedComments = async (activityId: string, page: number = 1, limit: number = 10): Promise<{
    comments: IComment[];
    totalComments: number;
    totalPages: number;
    currentPage: number;
  }> => {
    const skip = (page - 1) * limit;
    
    const query = { activity: new mongoose.Types.ObjectId(activityId) };
    const comments = await CommentModel.find(query)
      .populate('author', 'username')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // Ordenamos del más reciente al más antiguo
      .exec();
    
    const totalComments = await CommentModel.countDocuments(query);
    const totalPages = Math.ceil(totalComments / limit);
  
    return { comments, totalComments, totalPages, currentPage: page };
};

export const searchComments = async (query: string): Promise<IComment[]> => {
    try {
      return await CommentModel.find({ content: { $regex: query, $options: 'i' } })
        .populate('author', 'username')
        .populate('activity', 'name');
    } catch (error) {
      console.error('Error in searchComments service:', error); // Log the error
      throw new Error('Error al buscar comentarios');
    }
  };