import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

export const fetchTasks = () => axios.get(API_URL);
export const addTask = (task: {
  title: string;
  description: string;
  status: boolean;
}) => axios.post(API_URL, task);
export const updateTask = (_id: string, updatedTask: any) =>
  axios.patch(`${API_URL}/${_id}`, updatedTask);
export const deleteTask = (_id: string) => axios.delete(`${API_URL}/${_id}`);
