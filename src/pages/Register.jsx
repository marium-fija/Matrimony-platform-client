import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import useAxios from "../hooks/useAxios";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, googleLogin } = useAuth();
   const axiosInstance = useAxios();
   const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';


  

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    
    try {
      // 1️⃣ Firebase এ account create
      const user = await registerUser(
        data.name,
        data.email,
        data.password,
        data.photoURL
      );

      
      const userInfo = {
        name: data.name,
        email: data.email,
        role: 'user',
        photoURL: data.photoURL,
        
      };

      
      await axiosInstance.post("/users", userInfo);

      Swal.fire("Success", "Account Created Successfully!", "success");
      navigate(from);
    } catch (error) {
      console.error("Register Error:", error);
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
    <div className="py-10">
    <div className="max-w-md lg:max-w-lg p-4 shadow-xl shadow-sky-400 mx-auto rounded-2xl ">
      <h2 className="text-4xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-5 text-xl">
        <input {...register("name", { required: true })} placeholder="Name" className="input input-bordered w-full border rounded-2xl p-3" />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input {...register("photoURL")} placeholder="Photo URL" className="input input-bordered w-full border rounded-2xl p-3" />

        <input {...register("email", { required: true })} placeholder="Email" className="input input-bordered w-full border rounded-2xl p-3" />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Password" className="input input-bordered bg-transparent w-full border rounded-2xl p-3" />
        {errors.password && <p className="text-red-500">Password must be at least 6 characters</p>}

        

        <button type="submit" className=" bg-cyan-700 p-2 rounded-full w-full">Register</button>

        <button onClick={handleGoogleLogin} className="p-2 rounded-xl bg-purple-400 w-full mt-3 flex justify-center gap-2 items-center"><FcGoogle size={20}/> Login with Google</button>
      </form>
      <p className="mt-3 text-center">Already have an account? <Link to="/auth/login" className="text-blue-600">Login</Link></p>
    </div>
    </div>
  );
};

export default Register;