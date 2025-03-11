import { TaskProvider } from "./context/TaskContext";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import "./App.css";

const App = () => {
  return (
    <TaskProvider>
      <div className="app-container">
        <header>
          <h1>Task Manager</h1>
        </header>
        <main>
          <AddTaskForm />
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
};

export default App;
