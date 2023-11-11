import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState("signin");
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const SignUpVariant = () => {
    setVariant("signin");
  };
  const SignInVariant = () => {
    setVariant("signup");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  const handleSignIn = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res)
      navigate('/profile')
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        {variant === "signin" ? "Sign In" : "Sign Up"}
      </h1>
      <form
        onSubmit={variant === "signup" ? handleSignUp : handleSignIn}
        className="flex flex-col gap-4"
      >
        {variant === "signin" ? null : (
          <input
            onChange={handleChange}
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg"
            id="username"
          />
        )}
        <input
          onChange={handleChange}
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 
           rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading
            ? "Loading..."
            : variant === "signin"
            ? "Sign In"
            : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-2 mt-5">
        <p>
          {variant === "signin"
            ? "Don't have an Account ?"
            : "Have an account ?"}
        </p>
        <p>
          <span
            onClick={variant === "signin" ? SignInVariant : SignUpVariant}
            className="text-blue-700 hover:cursor-pointer hover:underline"
          >
            {variant === "signin" ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
