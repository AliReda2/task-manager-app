import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  status: boolean;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
