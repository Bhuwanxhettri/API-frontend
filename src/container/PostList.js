import React, { useEffect, useState } from 'react';
import { getPost,deletePost } from '../services/api';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [postList,setPostList] = useState([]);
  useEffect(()=>{
     const fetchData = async()=>{
       await getPost().then((data)=>{setPostList(data.result)});
     }
     fetchData()
  },[])
 
  const postDelete = async(facebook_post_id)=>{
         await deletePost(facebook_post_id)
  }
  return (
    <div className='grid  ml-60 place-items-center mt-5 '>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-white dark:text-gray-400">
                <thead className="text-md text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            Post Title
                        </th>
                        <th scope="col" className="py-3 px-6">
                            <span className="flex items-center">Image</span>
                        </th>
                        <th scope="col" className="py-3 px-6">
                            <div className="flex items-center">
                                Date
                            </div>
                        </th>
                       
                        <th scope="col" className="py-3 px-6">
                            <div className="flex items-center">
                                Status
                            </div>
                        </th>
                        <th scope="col" className="py-3 px-6">
                            <div className="flex items-center">
                               Posted Date
                            </div>
                        </th>
                        <th scope="col" className="py-3 px-6">
                            <div className="flex items-center">
                               Action
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {postList?.map((post)=>{
                        return(
                            <>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100  border-b border-gray-600">
                                    <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {post.content}
                                    </td>
                                    <td class="py-4 px-6">
                                        <div className='w-16 h-16'>
                                           <img src={post.image} alt='img' className='w-full h-full'/>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        {moment(post.post_date).fromNow()}
                                    </td>
                                    <td className="py-4 px-6">
                                        {post.post_status}
                                        <br></br><br></br>
                                        {post.post_status === "posted"?<Link to={`/postcomment/${post.facebook_post_id}`} ><button className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>View Comments</button></Link>:""}
                                    </td>
                                    <td className="py-4 px-6">
                                        {moment(post.createdAt).fromNow()}
                                    </td>
                                    <td classN="py-4 px-6 text-right">
                                        <span href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
                                        <span  className="font-medium mx-2 text-red-600 cursor-pointer dark:text-red-500 hover:underline" onClick={()=>{postDelete(post.facebook_post_id)}}>Delete</span>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    
  );
};

export default PostList;
