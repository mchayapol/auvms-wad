/*
Not necessary to use context to send things around
especially this component only requires addTask
*/
import { useLocalStorage } from "./useLocalStorage";
import { useContext } from "react";
import { TaskContext } from "./task-context";

function ToDoForm({ addTask }) {
  const [name, setName] = useLocalStorage("name", "");
  const [checked, setChecked] = useLocalStorage("checked", false);
  const context = useContext(TaskContext)

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Name</label>
            </td>
            <td><input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </td>
          </tr>
          <tr><td>
            <label>Checked</label>
          </td>
            <td>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button onClick={() => context.addTask(name)}>ADD</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ToDoForm;
