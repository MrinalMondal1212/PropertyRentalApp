import { useForm } from "react-hook-form";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { loginUser } from "../store/auth.thunk";
import toast from "react-hot-toast";
import { account } from "../lib/appwriteConfig";

// ✅ Form type
type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      // ✅ Call thunk
      const res = await dispatch(loginUser(data));
      toast.success("login Successfull!!!!");

      // ✅ Success check
      if (res.meta.requestStatus === "fulfilled") {
        const user = res.payload;

        setTimeout(
          async () => {
            await account.deleteSession("current");
            window.location.href = "/login";
          },
          30 * 60 * 1000,
        ); // 30 mins

        // 🔥 Redirect based on role
        if (user.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-[40px] flex max-w-4xl w-full overflow-hidden border border-gray-100">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-black p-12 flex-col justify-between text-white">
          <div>
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-10 brightness-200"
            />
            <h2 className="text-4xl font-bold mt-10">
              Welcome <span className="text-[#FFA400]">Back</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm">© 2026 Rental App</p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
          <p className="text-gray-500 mb-8">Enter your credentials</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <div
                className={`flex items-center gap-3 border-b-2 py-2 ${errors.email ? "border-red-500" : "border-gray-200"}`}
              >
                <Mail size={20} />
                <input
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email Address"
                  className="w-full outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div
                className={`flex items-center gap-3 border-b-2 py-2 ${errors.password ? "border-red-500" : "border-gray-200"}`}
              >
                <Lock size={20} />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Password"
                  className="w-full outline-none"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-[#FFA400] font-bold py-4 rounded-[20px] flex justify-center items-center gap-2"
            >
              {loading ? "Logging in..." : "Login"}
              <ArrowRight size={20} />
            </button>
           
          </form>

          {/* Register Redirect */}
          <p className="text-center text-sm text-gray-500 flex gap-1 mt-8">
            Don’t have an account?{" "}
            <Link to="/register" className="text-black font-bold underline">
              Register
            </Link>
            <p>:</p>
            <Link to="/" className="text-black font-bold underline">
            Back to Home
            </Link>
           
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
