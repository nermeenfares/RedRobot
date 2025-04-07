import mongoose, { Document, Schema } from 'mongoose';

interface ITodo extends Document {
  text: string;
  completed: boolean;
  createdAt: Date;
}

const TodoSchema = new Schema<ITodo>({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const TodoModel = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);
export default TodoModel;