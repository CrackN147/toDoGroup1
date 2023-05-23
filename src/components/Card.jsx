export function Card(props) {
  const { taskData } = props;
  return (
    <div className="card--container">
      <p>{taskData.title}</p>
    </div>
  );
}