import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { viewComment,deleteComment } from '../services/api';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostComment = () => {
  let { id } = useParams();
  const [readMore, setReadmore] = useState("");
  const [comments,setComments]=useState([]);
  const handleReadMore = (id)=>{
    setReadmore(id);
  }
  const fetchComment =async()=>{
    const data =  await viewComment(id);
    setComments(data);
   }
  useEffect(()=>{
    fetchComment();
  },[])
  const handleDeleteComment = async(id)=>{
    toast("Comment Delelteing...")
    const res = await deleteComment(id).then(()=>{ window.location.reload(false);})
  }
  return (
    <>
      <div className='h-full ml-14 mt-14 mb-10 md:ml-64'>
          <div className="grid-cols-3 grid w-[800] gap-4">
            {comments.length>0?<> {
              comments?.map((comment,id)=>{
                  return(
                    <>
                        <div className="px-5">
                            <div className="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
                                  <div className="mt-4">
                                    <h1 className="text-lg text-gray-700 font-semibold  cursor-pointer">{comment["from"].name}</h1>
                                    <div className="flex mt-2">
                                 <h1>{moment(comment.created_time).fromNow()}</h1>   
                                    </div>
                                    <div className={readMore===id?'duration-500 h-52 overflow-hidden transition-all':'h-10 overflow-hidden'}>
                                    <p className="mt-4 text-md text-gray-600">{comment.message}</p>
                                    </div>
                                    {comment.message.length>50 &&
                                     <button onClick={()=>{
                                     handleReadMore(id)
                                    }}
                                     className="my-2 text-blue-600 hover:underline">Read More</button>
                                    }
                                    <div className="flex justify-between items-center">
                                      <span onClick={()=>{handleDeleteComment(comment.id)}} className="p-2 bg-red-700  flex items-center justify-center text-md text-white mt-4 shadow-lg cursor-pointer">Delete</span>
                                    </div>
                                  </div>
                            </div>
                        </div>
                    </>
                  )
              })
            }</>:<h1 className="font-bold">NO Comments for this post</h1> }
            <ToastContainer />
          </div>
      </div>
    </>
  )
}

export default PostComment