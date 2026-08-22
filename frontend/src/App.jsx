import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import Admin from "./pages/Admin.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/AppLayout.jsx";
import { TodoProvider } from "./context/TodoContext.jsx";
import { ProjectProvider } from "./context/ProjectContext.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
               <Route
          path="projects"
          element={
            <ProjectProvider>
              <Projects />
            </ProjectProvider>
          }
        />
                <Route path="projects/:id" element={<ProjectDetails />} />
        <Route
          path="admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="todos"
          element={
            <TodoProvider>
              <Home />
            </TodoProvider>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;