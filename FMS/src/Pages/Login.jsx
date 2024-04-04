import img from '../../public/poster.webp'
import { useState, useContext } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../AuthContext';
import '../App.css'

function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: ""
  })
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:3001/Login", inputValue)
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token)
      navigate('/Display')
    }
    catch (err) {
      console.log("Error fetching Data:", err.response);
      setToken(null)
      localStorage.removeItem("token");
      if (err.response.status == 500) {
        toast.error("Error logging in ")
        navigate('/Login')
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
              {{ backgroundImage: `url(${img})` }}></div>

            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Log into Your Account</h3>
              <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name='email'
                    placeholder="Email"
                    onChange={handleChange}
                    value={inputValue.email}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name='password'
                    onChange={handleChange}
                    value={inputValue.password}
                    placeholder="************"
                  />
                </div>



                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    type="Submit"
                  >
                    Log in
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                </div>
                <div className="text-center">
                  <a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                    href="/">
                    Create an account !!!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Login;