import { useContext, useState } from "react";
import { AuthContext } from "../Pages/AuthProvider";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { register, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    setError("");

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 special character."
      );
      return;
    }

    register(email, password)
      .then(async (result) => {
        const user = result.user;
        await updateProfile(user, { displayName: name, photoURL });

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome, ${name}!`,
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => navigate("/"))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
            <input
              name="photoURL"
              type="text"
              placeholder="Photo URL (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter a strong password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-1 bg-red-100 p-2 rounded border border-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogle}
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-400 hover:bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg transition duration-200"
        >
          <FcGoogle size={20} /> Register with Google
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
