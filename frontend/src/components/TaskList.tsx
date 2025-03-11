import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, loading } = useTaskContext();

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="task-list">
      <h2>Task List</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task._id} task={task} />)
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
