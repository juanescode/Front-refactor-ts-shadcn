import LoginPage from "./components/authComponents/LoginPage";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "./components/authComponents/RegisterPage";
import Navbar from "./components/Navbar/Navbar";
import { TaskProvider } from "./context/TaskContext";
import TasksPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
            <main className="container mx-auto px-10">
              <Navbar />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                </Route>
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
              </Routes>
            </main>
          </BrowserRouter>
        </ThemeProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
