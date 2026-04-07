import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { registerUser } from "../store/auth.thunk";
import toast from "react-hot-toast";

// ✅ Form type
type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// ✅ Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      //  Call thunk
      const res = await dispatch(registerUser(data));

      //  Check success
      if (res.meta.requestStatus === "fulfilled") {
        const user = res.payload;

        //  Redirect based on role
        if (user.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/");
        }

        toast.success("Registration successful ✅");
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
              Create your <span className="text-[#FFA400]">Account</span> today.
            </h2>
          </div>
          <p className="text-gray-400 text-sm">© 2026 Rental App</p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-8">Sign up to get started</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <div
                className={`flex items-center gap-3 border-b-2 py-2 ${errors.name ? "border-red-500" : "border-gray-200"}`}
              >
                <User size={20} />
                <input
                  {...register("name")}
                  placeholder="Full Name"
                  className="w-full outline-none"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <div
                className={`flex items-center gap-3 border-b-2 py-2 ${errors.email ? "border-red-500" : "border-gray-200"}`}
              >
                <Mail size={20} />
                <input
                  {...register("email")}
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
                  {...register("password")}
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

            {/* Confirm Password */}
            <div>
              <div
                className={`flex items-center gap-3 border-b-2 py-2 ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
              >
                <Lock size={20} />
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  className="w-full outline-none"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-[#FFA400] font-bold py-4 rounded-[20px]"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>
          <div className="text-center mt-1">
          <Link to="/" className="text-black font-bold underline">
            Back to Home
          </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
