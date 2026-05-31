import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TaskSection({ tasks, deleteTask }) {
  return (
    <section className="task-section">
      <div className="container">
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => {
              return (
                <li key={task.id}>
                  {task.name}
                  <span onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
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
