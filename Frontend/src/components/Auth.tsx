import { Link } from "react-router-dom";
import { useState } from "react";
import LabelledInput from "./LabelledInput";
import { SignupInput, SigninInput } from "@eye_uchiha/medium123";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from "./config";

type Inputs = SignupInput & Partial<SigninInput>;

function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<Inputs>({
    name: type === 'signup' ? "" : undefined,
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`, postInputs);
      const token = response.data.jwt;
      console.log("token",token)
      localStorage.setItem('token', token);
      navigate('/blogs');
    } catch (error) {
      setError("An error occurred while trying to authenticate. Please try again.");
      console.error('Error during authentication:', error);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="px-20 w-3/4">
          <div className="text-3xl font-bold w-full">
            {type === 'signup' ? "Create an account" : "Sign In"}
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>} {/* Display error message */}
          <div className="text-slate-500 mt-2">
            {type === 'signin' ? "Don't have an account?" : "Already have an account?"}
            <Link to={type === 'signin' ? '/signup' : '/signin'} className="underline pl-2">
              {type === 'signin' ? 'Sign up' : 'Sign in'}
            </Link>
          </div>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            {type === 'signup' && <LabelledInput label="Name" name="name" placeholder="Enter your username" onChange={handleInputChange} />}
            <LabelledInput label="Email" name="email" placeholder="m@example.com" onChange={handleInputChange} />
            <LabelledInput label="Password" type="password" name="password" placeholder="" onChange={handleInputChange} />
            <div className="flex justify-center">
              <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-4">
                {type === 'signup' ? "Sign up" : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;