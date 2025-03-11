import { useTaskContext } from "../context/TaskContext";

const TaskItem = ({
  task,
}: {
  task: { _id: string; title: string; description: string; status: boolean };
}) => {
  const { loading, updateExistingTask, removeTask } = useTaskContext();

  if (loading) return <p>Loading task...</p>; 

  return (
    <div className="task-item">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status ? "Completed" : "Pending"}</p>
        <button onClick={() => updateExistingTask(task._id, { status: true })}>
          Complete
        </button>
        <button onClick={() => removeTask(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
