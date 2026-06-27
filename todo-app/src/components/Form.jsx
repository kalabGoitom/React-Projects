import { useState, useEffect } from "react";
import TaskSection from "./Task";

function Form() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");

    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [success, setSuccess] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    const name = taskName.trim();
    setSuccess(name ? true : false);
    setVisible(true);

    if (!name) {
      return;
    }

    if (editingId) {
      setTasks((prev) =>
        prev.map((task) => (task.id === editingId ? { ...task, name } : task)),
      );

      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        name,
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
    }

    setTaskName("");
  }

  function deleteTask(taskId) {
    setTasks((prev) => {
      return prev.filter((item) => item.id !== taskId);
    });
  }

  function editTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) return;

    setTaskName(task.name);
    setEditingId(task.id);
  }

  function toggleTask(taskId) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  return (
    <>
      <section className="form-section">
        <div className="container">
          <form action={addTask}>
            <input
              type="text"
              name="task"
              placeholder="Enter task..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />

            <button> {editingId ? "Update Task" : "+ Add"}</button>
          </form>
          {visible && (
            <div className="alert">
              {" "}
              <p className={success ? "success" : "danger"}>
                {" "}
                {success ? "Task Added" : "Enter a valid task!"}
              </p>{" "}
            </div>
          )}
        </div>
      </section>

      <TaskSection
        tasks={tasks}
        deleteTask={deleteTask}
        editTask={editTask}
        toggleTask={toggleTask}
      />
    </>
  );
}

export default Form;
