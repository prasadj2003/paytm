import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/v1/user/signin", {
        username: email,
        password
      })
    } catch (error) {
      console.error("Signin failed", error);
    }
    
  }

  function navigateToSignup(){
    navigate('/signup')
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid justify-items-center border border-black p-5 shadow-lg w-1/5 rounded-lg justify-center">
        <h1 className="text-4xl font-bold pb-5">Sign in</h1>
        <h2 className="text-lg text-slate-400 pb-5">
          enter your credentials to access your account
        </h2>
        <form className="grid justify-items-center">
          <label for="email" className="font-bold">
            email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@gmail.com"
            className="mb-2 border border-gray-300 rounded-md p-1"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>

          <label for="password" className="font-bold">
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder=""
            className="mb-2 border border-gray-300 rounded-md p-1"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <button
              type="submit"
              className="border-solid border-sky-500 bg-black text-white p-2 rounded-2xl w-full hover:bg-slate-700"
              onClick={handleSubmit}
            >
              Submit
          </button>
          <p>
              Don't have an account{" "}
              <button
                type="button"
                className="underline underline-offset-2"
                onClick={navigateToSignup}
              >
                Signup?
              </button>
            </p>
        </form>
      </div>
    </div>
  );
}
export default Signin;
