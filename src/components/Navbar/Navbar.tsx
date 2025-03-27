import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

interface User {
  username: string;
  email: string;
}

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth() as {
    isAuthenticated: boolean;
    logout: () => void;
    user: User | null;
  };

  return (
    <nav className="bg-zinc-500 dark:bg-zinc-700 my-3 flex justify-between items-center py-5 px-10 rounded-lg">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="text-lg">Welcome {user?.username}</li>
            <Button>
              <Link to="/add-task" className=" px-4 py-1 rounded-sm">
                Add task
              </Link>
            </Button>
            <Button>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </Button>
            <ModeToggle />
          </>
        ) : (
          <>
            <Button>
              <Link to="/login" className=" px-4 py-1 rounded-sm">
                Login
              </Link>
            </Button>
            <Button>
              <Link to="/register" className="px-4 py-1 rounded-sm">
                Register
              </Link>
            </Button>
            <ModeToggle />
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
