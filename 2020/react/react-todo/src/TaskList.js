function TaskList({ tasks }) {
  return (
    <table>
      <tbody>
        {tasks.map((t, i) => {
          return (
            <tr key={i}>
              <td>{t.status}</td>
              <td>{t.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TaskList;
