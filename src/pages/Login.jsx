import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from '../assets/Img/login.jpg';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser, googleLogin } = useAuth();
  const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

  
  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      await loginUser(data.email, data.password);
      Swal.fire("Success", "Login Successful!", "success");
      navigate(from);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      Swal.fire("Success", "Google Login Successful!", "success");
      navigate(from);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto ">
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-3 mt-20 py-5">

{/* form */}
    <div className="max-w-md lg:max-w-lg p-4 shadow-2xl shadow-cyan-300 mx-auto rounded-2xl">
      <h2 className="text-4xl font-bold text-center mb-4">Login Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-5 text-xl">
        <input {...register("email", { required: true })} placeholder="Email" className="input input-bordered w-full border rounded-2xl p-3" />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <input {...register("password", { required: true })} type="password" placeholder="Password" className="input input-bordered bg-gray-800 w-full border rounded-2xl p-3" />
        {errors.password && <p className="text-red-500">Password is required</p>}

        <button type="submit" className=" bg-indigo-400 p-2 rounded-full w-full">Login</button>
     
      <button onClick={handleGoogleLogin} className="p-2 rounded-full bg-purple-400 w-full mt-3 flex justify-center gap-2 items-center"><FcGoogle size={20}/> Login with Google</button>
       </form>
      <p className="mt-3 text-center">Don't have an account? <Link to="/auth/register" className="text-blue-600">Register</Link></p>
    </div>

{/* img */}
    <div className="max-w-md lg:max-w-lg mx-auto p-5 justify-center items-center">
        <img className=" rounded-2xl" src={login} alt="" />
    </div>
    
    </div>
    </div>
  );
};

export default Login;
