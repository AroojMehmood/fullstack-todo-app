import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import TodoSkeleton from "../components/TodoSkeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useTodos } from "../context/TodoContext.jsx";

function Home() {
  const { todos, loading, error, reloadTodos } = useTodos();

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <main className="todo-card">
      <header className="todo-header" style={{ textAlign: "left" }}>
        <h1>My Todos</h1>
        {!loading && todos.length > 0 && (
          <p className="todo-subtext">
            {completedCount} of {todos.length} completed
          </p>
        )}
      </header>

      <TodoForm />

      <ErrorMessage message={error} onRetry={reloadTodos} />

      {loading ? <TodoSkeleton /> : <TodoList />}
    </main>
  );
}

export default Home;