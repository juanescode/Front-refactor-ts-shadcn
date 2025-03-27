import { Link } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { useTasks } from "../../context/TaskContext";
import { Task } from "../../types/Task.types";
dayjs.extend(utc);

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => task._id && deleteTask(task._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            delete
          </button>
          <Link to={`/tasks/${task._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            edit
          </Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{task.date ? dayjs(task.date).utc().format("DD/MM/YYYY") : "No date"}</p>
    </div>
  );
}

export default TaskCard;
