import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

interface LoginFormInputs {
  email: string;
  password: string;
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    signin(data);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-500 dark:bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signinErrors?.map((error: string, i: number) => (
          <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))}

        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md cursor-pointer my-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md cursor-pointer my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-2 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="flex gap-x-2 justify-between">
          Don't have an account?
          <Link to="/register" className=" font-bold dark:text-sky-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
