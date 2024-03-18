import * as React from 'react';
import img from '../public/icon.webp'
import { useState } from 'react';



function Login(props) {
  const [inputValue,setInputValue]=useState({
    email:"",
    password:""
  })



  const handleChange=(e)=>{
    setInputValue({...inputValue,[e.target.name]:e.target.value})
    }


   const handleSubmit=()=>{
      console.log("Form submitted")
   }

  return (
    <main className="mx-auto flex min-h-screen w-10/12 items-center justify-center bg-gray-900 text-white">
    <section className="flex w-[30rem] flex-col space-y-10">
    <img className="mx-auto h-32 cursor-pointer w-auto" src={img} alt="Workflow" />
        <div className="text-center text-4xl font-medium">Log In</div>

          
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input type="text" name='email' value={inputValue.email} onChange={handleChange}  placeholder="Email or Username" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" required/>
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input type="password" name='password' value={inputValue.password} onChange={handleChange} placeholder="Password" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" required/>
        </div>

        <button onClick={handleSubmit} className="transform rounded-sm bg-indigo-600 py-2 px-6 font-bold duration-300 hover:bg-indigo-400 hover:shadow-md">LOG IN</button>



        

        <p className="text-center text-lg">
            No account?
            <a href="#" className="font-medium text-indigo-500 underline-offset-4 hover:underline">Create One</a>
        </p>
    </section>
</main>
);
}

export default Login;