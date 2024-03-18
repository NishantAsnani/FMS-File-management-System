import { useState } from "react";
import axios from 'axios'


function Signup(){

const [input,setInput]=useState({
    email:"",
    Username:"",
    password:"",
})

const [pic, setPic] = useState(""); 

const handleChange=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
}

const handlePhotoChange=(e)=>{
    setPic(e.target.files[0])
}


const handleSubmit= async (e)=>{
    e.preventDefault();
    const data=new FormData()
    data.append("email",input.email)
    data.append("Username",input.Username)
    data.append("password",input.password)

    const response=axios.post('http://localhost:3001/Signup',data)
    if (!response.data) {
        throw new Error("Cannot fetch data");
      }
      else{
      console.log(response.message)
      }
}
    return (
        <div className="bg-transparent text-white min-h-screen flex items-center justify-center">
          <div className="bg-gray-800 w-2/4 rounded-lg p-8">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block mb-1">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  placeholder="Enter your username"
                  value={input.Username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">Email:</label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  placeholder="Enter your email"
                  value={input.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-1">Password:</label>
                <input
                  type="password"
                  id="password"
                  name='password'
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  placeholder="Enter your password"
                  value={input.password}
                  onChange={handleChange}
                />
              </div>
              <div>
            <label htmlFor="profilePhoto" className="block mb-1">Profile Photo:</label>
            <input
              type="file"
              id="profilePhoto"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              onChange={handlePhotoChange}
              name='photo'
            />
          </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      );
}


export default Signup;