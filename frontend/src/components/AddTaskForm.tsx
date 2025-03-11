import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const AddTaskForm = () => {
  const { addNewTask } = useTaskContext();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addNewTask(task);
      setTask({ title: "", description: "", status: false });
    } catch (err) {
      setError("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Title:
        <input
          type="text"
          placeholder="Task Name"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.checked })}
        />
        Completed
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddTaskForm;
