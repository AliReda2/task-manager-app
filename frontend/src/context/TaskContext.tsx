import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { fetchTasks, addTask, updateTask, deleteTask } from "../services/api";

// Define task type
export interface Task {
  _id: string; // Change from number to string to match MongoDB ObjectId
  title: string;
  description: string;
  status: boolean;
}

// Define context type
interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addNewTask: (task: Omit<Task, "_id">) => void; // No _id when adding a task
  updateExistingTask: (id: string, task: Partial<Task>) => void; // Use _id as string
  removeTask: (_id: string) => void; // Use _id as string
}

// Create Context
const TaskContext = createContext<TaskContextType | null>(null);

// Create Custom Hook
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

// Create Provider Component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const { data } = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const addNewTask = async (task: Omit<Task, "_id">) => {
    try {
      const { data } = await addTask(task);
      setTasks((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateExistingTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      await updateTask(id, updatedTask);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTask = async (_id: string) => {
    try {
      await deleteTask(_id);
      setTasks((prev) => prev.filter((task) => task._id !== _id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, addNewTask, updateExistingTask, removeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
