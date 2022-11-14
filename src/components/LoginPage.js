import React, { useState } from 'react'
import  Button  from '../uiComponent/Button'
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { register } from '../services/api';
import { useDispatch } from 'react-redux';
import {loginRedux} from '../store/slice/authSlice'

const LoginPage = () => {
 const navigation = useNavigate();
 const dispatch = useDispatch();
 const [inputs,setInputs] = useState(
    { 
     user_name: '',
     password:'',
     fname:'',
     lname:'',
     email:'',
     address:''
    }
    );
 const [toggle,setToggle] =useState(true); 
 const [errmsg,seterrMsg] = useState({
    user_nameErr : "",
    emailErr:"",
    passwordErr:""

 });
 const handleSubmitLogin = async(event)=>{
    event.preventDefault();
    await login(inputs).then((data)=>{
         if(data.status === 202){
            navigation("/home")
            dispatch(loginRedux({token:data.token,user_name:"bhuwan@1"}))
         }else if(data.status === 404){
             seterrMsg({...errmsg,user_nameErr:data.message})
         }
         else if(data.status===401){
            seterrMsg({...errmsg,passwordErr:data.message})
         }
    })
}
const handleSubmitRegister = async(event)=>{
    event.preventDefault();
    await register(inputs).then((data)=>{
        if(data.message ==='username already exist'){
            seterrMsg({...errmsg,user_nameErr:data.message})
        }
        else if(data.message === 'Email already exist'){
            seterrMsg({...errmsg,emailErr:data.message})
        }
    });
}
 const handleChange =(event)=>{
    setInputs((prevState)=>({
      ...prevState,
      [event.target.name]:event.target.value,
     }))
  }
  return (
    <>
      <div>

       {
           toggle ? <>
            {/* Login From */}
            <div style={{backgroundImage: `url("https://www.business2community.com/wp-content/uploads/2017/12/34537775_xl.jpg")`, backgroundPosition: 'center',
             backgroundSize: 'cover', }} className="h-screen w-full bg-white flex flex-col space-y-10 justify-center items-center">
            <div className="bg-white p-5 w-96 shadow-xl rounded ">
                <h1 className="text-3xl font-medium">Welcome</h1>
                <p className="text-sm">Minimal login page for day to day use</p>
                <Formik className="space-y-5 mt-5 p-5"  >
                        <Form onSubmit={handleSubmitLogin} >
                            <Field required onChange={handleChange}  className="form-control my-2 block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="user_name" type="text"  placeholder="User Name"/>
                             {errmsg.user_nameErr? <span className='text-red-600 text-sm mx-2'>{errmsg.user_nameErr}</span>:""}  
                            <Field required onChange={handleChange} type="password" className="form-control my-2 block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="password" placeholder="Password" />
                             {errmsg.passwordErr? <span className='text-red-600 text-sm'>{errmsg.passwordErr}</span>:""} 
                            <Button name="login" width="w-full my-2" />
                            <div className='flex flex-col'>
                                <a  className="cursor-pointer text-white w-full bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                                    <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
                                    Sign in with Facebook
                                </a>
                                <a  className=" cursor-pointer text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                    <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                    Sign in with Google
                                </a>
                            </div>
                            <div className="text-grey-dark mt-6">
                                Create a account
                            <span onClick={()=>{setToggle(false)}} className="cursor-pointer text-blue-600 hover:underline hover:text-blue-500 border-b border-blue text-blue mx-2">Sign up</span>.
                           </div>
                        </Form>
               </Formik>
            </div>
          </div>
            </>:<>
            {/* Register from */}
             <div  className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container w-96 mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-96">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <Formik className="space-y-5 mt-5 p-5"  >
                            <Form onSubmit={handleSubmitRegister} >
                                <div className="flex gap-3">
                                    <Field required onChange={handleChange}  className="form-control my-2 block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="fname" type="text"  placeholder="First Name"/>
                                    <Field required onChange={handleChange}  className="form-control my-2 block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="lname" type="text" placeholder="Last Name" />
                                </div>
                                <Field required onChange={handleChange}  className="form-control my-2 block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="user_name" type="text"  placeholder="User Name"/>
                                {errmsg.user_nameErr? <span className='text-red-600 text-sm mx-2'>{errmsg.user_nameErr}</span>:""}  
                                <Field required onChange={handleChange}  className="form-control my-2 block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="email" type="email"  placeholder="Email"/>
                                {errmsg.emailErr? <span className='text-red-600 text-sm mx-2'>{errmsg.emailErr}</span>:""}  
                                <Field required onChange={handleChange}  className="form-control my-2 block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="password" type="password"  placeholder="Password"/>
                                <Field required onChange={handleChange}  className="form-control my-2 block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="address" type="text"  placeholder="address"/>
                                <Button name="Sign in" width="w-full my-2" />
                            </Form>
                       </Formik>
                        <div className="text-grey-dark mt-6">
                            Already have an account? 
                            <span onClick={()=>{setToggle(true)}} className="cursor-pointer hover:underline hover:text-blue-500 border-b border-blue text-blue">Log in </span>.
                        </div>
                    </div>
                </div>
             </div>
           </>
       } 

      </div>
      
    </>
  )
}

export default LoginPage
