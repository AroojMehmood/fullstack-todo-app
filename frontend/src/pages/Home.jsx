import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import TodoSkeleton from "../components/TodoSkeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useTodos } from "../context/TodoContext.jsx";

function Home() {
  const { logout } = useAuth();
 const { todos, loading, error, reloadTodos } = useTodos();

  const handleLogout = () => {
    logout();
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app-shell">
      <div className="aurora-bg" aria-hidden="true"></div>

      <main className="todo-card">
        <div className="todo-header-row">
          <header className="todo-header" style={{ marginBottom: 0, textAlign: "left" }}>
            <h1>My Todos</h1>
            {!loading && todos.length > 0 && (
              <p className="todo-subtext">
                {completedCount} of {todos.length} completed
              </p>
            )}
          </header>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <TodoForm />

       <ErrorMessage message={error} onRetry={reloadTodos} />

        {loading ? <TodoSkeleton /> : <TodoList />}
      </main>
    </div>
  );
}

export default Home;