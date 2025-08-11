import React, { useContext, useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin, formType }) => {
  const { url, setToken } = useContext(ShopContext);
  const [state, setState] = useState(formType);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (state === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto flex items-center justify-center p-4">
      <form onSubmit={onLogin} className="bg-white w-full max-w-sm p-7 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold text-slate-900">{state}</h4>
          <FaXmark
            onClick={() => setShowLogin(false)}
            className="cursor-pointer text-xl text-gray-600 hover:text-black"
          />
        </div>

        <div className="flex flex-col gap-4 my-6">
          {state === "Sign Up" && (
            <input
              onChange={onChangeHandler}
              value={data.name}
              name="name"
              type="text"
              placeholder="Name"
              required
              className="border border-slate-300 p-2 pl-4 rounded-md outline-none"
            />
          )}

          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder="Email"
            required
            className="border border-slate-300 p-2 pl-4 rounded-md outline-none"
          />

          <div className="relative">
            <input
              onChange={onChangeHandler}
              value={data.password}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full border border-slate-300 p-2 pl-4 pr-10 rounded-md outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {state === "Sign Up" && (
            <div className="relative">
              <input
                onChange={onChangeHandler}
                value={data.confirmPassword}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                className="w-full border border-slate-300 p-2 pl-4 pr-10 rounded-md outline-none"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}
        </div>

        {state === "Sign Up" && (
          <div className="flex items-start gap-2 mb-4 text-sm text-slate-700">
            <input type="checkbox" required />
            <p>
              By continuing you agree to our{' '}
              <span className="text-blue-600 underline cursor-pointer">Terms of Service</span> and{' '}
              <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>

        <p className="text-sm mt-4 text-center">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{' '}
          <span
            className="text-orange-500 cursor-pointer"
            onClick={() => setState(prev => (prev === "Sign Up" ? "Login" : "Sign Up"))}
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
