import { useState } from "react";
import { UserSignUp } from "../services/IdeaServices";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const errors = { username: "", email: "", password: "" };
    let isValid = true;
    if (!formData.username) {
      errors.username = "Username is required";
      isValid = false;
    }
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    }
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }
    setFormErrors(errors);
    if (isValid) {
      try {
        setIsLoading(true);
        const res = await UserSignUp(formData);
        navigate("/login");
        toast.success(res.message);
      } catch (error) {
        console.log(error);
        toast.error("SignUp Failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 p-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl bg-white p-8">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-gray-800 font-sans">
            Sign Up
          </h3>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold font-lato mb-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="john-doe"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
            />
            {formErrors.username && (
              <p className="text-sm text-red-600 mt-1">{formErrors.username}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold font-lato mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold font-lato mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <p className="text-sm text-red-600 mt-1">{formErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            {isLoading ? (
              <div className="flex gap-2 justify-center items-center">
                <div className="w-5 h-5 rounded-full border-white border-dotted border-4 animate-spin "></div>
                <span>Signing Up</span>
              </div>
            ) : (
              "SignUp"
            )}
          </button>
          <p className="text-gray-600 text-base text-center">
            Already have an account?
            <NavLink to="/login" className="text-blue-500">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
