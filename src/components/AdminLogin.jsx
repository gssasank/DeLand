import React from "react";
import { useForm } from "./useForm";
import { Link } from "react-router-dom";

function AdminLogin(props) {
  const [values, handleChange] = useForm({ name: "", password: "" });

  const handleSubmit = () => {
    if (values.name === "admin" && values.password === "admin101") {
      console.log("lolllll");
      props.setadmin();
    }
  };

  return (
    <div className="bg-white h-screen py-6 sm:py-8 lg:py-48">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
          Admin Login
        </h2>

        <form className="max-w-lg bg-white shadow-2xl rounded-lg mx-auto">
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label
                for="name"
                className="inline-block text-black text-lg font-semibold mb-2"
              >
                Name
              </label>
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                className="w-full bg-gray-50  text-black focus:ring-4 focus:ring-back-light shadow-md rounded outline-none px-3 py-2"
              />
            </div>

            <div>
              <label
                for="password"
                className="inline-block text-black text-lg font-semibold mb-2"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                value={values.passoword}
                onChange={handleChange}
                className="w-full bg-gray-50  text-black focus:ring-4 focus:ring-back-light shadow-md rounded outline-none px-3 py-2"
              />
            </div>
            <button
              onClick={handleSubmit}
              class="font-semibold block bg-black hover:bg-back-light active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base  text-center rounded-lg outline-none transition duration-100 px-8 py-3 mt-5"
            >
              Log in
            </button>
            <Link
              to={`/`}
              className="block bg-white text-center focus-visible:ring ring-gray-300 text-gray-400 hover:text-primary-light text-sm md:text-base font-semibold rounded-lg outline-none border-4 hover:border-primary-light transition duration-100 px-8 py-3 mt-5"
            >
              <button class="font-semibold">User</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
