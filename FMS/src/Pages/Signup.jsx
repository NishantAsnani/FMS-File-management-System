import { useState } from "react";
import axios from 'axios'
import img from '../../public/poster.webp'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

function Signup() {

  const [input, setInput] = useState({
    email: "",
    Firstname: "",
    Lastname: "",
    password: "",
  })

  const navigate = useNavigate();


  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/Signup', input);
      if (!response.data) {
        throw new Error("Cannot fetch data");
      } else {
        console.log(response.data.message);
        toast.success("User signed up ");
        setInput({
          email: "",
          Firstname: "",
          Lastname: "",
          password: "",
        })
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("User Already Exists");
        setInput({
          email: "",
          Firstname: "",
          Lastname: "",
          password: "",
        })
      } else {
        console.error("Error during signup:", error);
        toast.error("An error occurred during signup. Please try again later.");
      }
    }
  }
  return (
    <div className="h-full">
      <Toaster />
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">

          <div className="w-full xl:w-3/4 lg:w-11/12 flex">

            <div className="hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style=
              {{
                backgroundImage: `url(${img})`,
                backgroundPosition: 'center right',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                transform: 'translateY(-10%)',
              }}></div>

            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Sign Up</h3>
              <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      name='Firstname'
                      value={input.Firstname}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      name='Lastname'
                      value={input.Lastname}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    name='email'
                    value={input.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      name='password'
                      value={input.password}
                      onChange={handleChange}
                      placeholder="******************"
                    />

                  </div>

                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    type="Submit"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                </div>
                <div className="text-center">
                  <a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                    href="/Login">
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}


export default Signup;