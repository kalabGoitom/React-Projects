import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";

function TaskSection({ tasks, deleteTask, editTask, toggleTask }) {
  return (
    <section className="task-section">
      <div className="container">
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => {
              return (
                <li key={task.id}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />

                    <span
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.name}
                    </span>
                  </div>
                  <div className="btn-container">
                    <span
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>

                    <span
                      className="edit-btn"
                      onClick={() => editTask(task.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <h2>No tasks available!</h2>
        )}
      </div>
    </section>
  );
}

export default TaskSection;
