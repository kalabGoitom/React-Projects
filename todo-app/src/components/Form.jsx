import { useState, useEffect } from "react";
import TaskSection from "./Task";

function Form() {
  const [tasks, setTasks] = useState([]);
  const [success, setSuccess] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [visible]);

  function addTask(formData) {
    const name = formData.get("task").trim();
    setSuccess(name ? true : false);
    setVisible(true);

    if (!name) {
      return;
    }

    const newTask = {
      name,
      id: Date.now(),
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function deleteTask(taskId) {
    console.log(taskId);
    setTasks((prev) => {
      return prev.filter((item) => item.id !== taskId);
    });
  }

  return (
    <>
      <section className="form-section">
        <div className="container">
          <form action={addTask}>
            <input type="text" name="task" placeholder="Enter task..." />
            <button> + Add </button>
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

      <TaskSection tasks={tasks} deleteTask={deleteTask} />
    </>
  );
}

export default Form;
