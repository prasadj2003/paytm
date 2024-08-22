import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
        await axios.post("http://localhost:3000/api/v1/user/signup", {
          firstName,
          lastName,
          username: email,
          password,
        });
        // Navigate to the login page after successful signup
        
          // Navigate to the login page
          navigate("/signin");
      } catch (error) {
        console.error("Signup failed", error);
      }
  }
  function navigateToLogin() {
    navigate('/signin')
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="grid justify-items-center border border-black p-5 shadow-lg w-1/5 rounded-lg justify-center">
          <h1 className="text-4xl font-bold pb-5">Sign up</h1>
          <h2 className="text-lg text-slate-400 pb-5">
            enter your information to create account
          </h2>
          <form className="grid justify-items-center">
            <label for="first name" className="font-bold">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              className="mb-2 border border-gray-300 rounded-md p-1"
              onChange={(e) => setFirstName(e.target.value)}
              required
            ></input>

            <label for="last name" className="font-bold">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              className="mb-2 border border-gray-300 rounded-md p-1"
              onChange={(e) => setLastName(e.target.value)}
              required
            ></input>

            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mb-2 border border-gray-300 rounded-md p-1"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>

            <label for="email" className="font-bold">
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@gmail.com"
              className="mb-5 border border-gray-300 rounded-md p-1"
              onChange={(e) => setEmail(e.target.value)}
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
              Already have an account{" "}
              <button
                type="button"
                className="underline underline-offset-2"
                onClick={navigateToLogin}
              >
                login?
              </button>
            </p>
          </form>
      </div>
    </div>
  );
}
export default Signup;
