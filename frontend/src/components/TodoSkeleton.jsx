// Skeleton loader — jab todos fetch ho rahe hon to blank screen ya sirf
// spinner dikhane ke bajaye, actual todo-item jaisi shape ke placeholder
// boxes dikhata hai (shimmer animation ke sath).
const TodoSkeleton = () => {
  return (
    <ul className="todo-list" aria-busy="true" aria-label="Loading todos">
      {[1, 2, 3].map((n) => (
        <li className="todo-item skeleton-item" key={n}>
          <div className="skeleton skeleton-checkbox"></div>
          <div className="skeleton skeleton-text"></div>
        </li>
      ))}
    </ul>
  );
};

export default TodoSkeleton;