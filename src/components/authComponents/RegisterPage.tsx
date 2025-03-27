import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
}

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (values) => {
    signup(values);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-500 dark:bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {RegisterErrors?.map((error: string, i: number) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}

        <h1 className="text-2xl font-bold">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md cursor-pointer my-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

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
            Register
          </button>
        </form>

        <p className="flex gap-x-2 justify-between">
          Already have an account?
          <Link to="/login" className=" font-bold dark:text-sky-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
