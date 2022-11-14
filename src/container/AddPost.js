import React,{useEffect, useState} from 'react'
import { addPost } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../uiComponent/Button";
const AddPost = () => {
  const [inputs,setInputs] = useState({
    message:"",
    image:"",
    postDate:""
  })
  const handleChange =(event)=>{
    setInputs((prevState)=>({
      ...prevState,
      [event.target.name]:event.target.value,
     }))
  }
  const handlePhoto =(event)=>{
    setInputs({...inputs,image:event.target.files[0]});
  }
  const handleSubmit = async(event)=>{
      event.preventDefault();
      const formData = new FormData();
      for(let key in inputs){
          formData.append(`${key}`,inputs[key])
      }
      await addPost(formData).then((res)=>{toast(res.message)}).then(setInputs({ message:"",image:"",postDate:""}));
  }
  return (
    <>
      <form enctype='multipart/form-data' onSubmit={handleSubmit} className='bg-gray-200 px-5 py-3  shadow-xl w-96 mt-24 flex gap-4 flex-col mx-auto  '>
          <label for="post" class="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-400">Enter Your Post</label>
          <textarea required  onChange={handleChange} name="message" value={inputs.message} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a Post..."></textarea>
          <input onChange={handleChange} className='w-full' type="datetime-local"  name="postDate"/>
          <input name="image" required  accept='.png, .jpg, .jpeg'  onChange={handlePhoto} class="block w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"  type="file"  />
          <Button name="Post" type="submit"/>
     </form>
      <ToastContainer />
    </>
  )
}

export default AddPost