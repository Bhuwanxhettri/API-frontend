import axios from 'axios'
const BASE_URL =process.env.REACT_APP_BASE_URL;

export const login = async(inputs)=>{
    const res =  await axios.post(`${BASE_URL}/auth/login`,inputs).then((res)=>{
        return res.data;
    }).catch(()=>{console.log("Calling Api error")});
    return res;
}

export const register = async(inputs)=>{
    const res =  await axios.post(`${BASE_URL}/auth/register`,inputs).then((res)=>{
        return res.data;
    }).catch(()=>{console.log("Calling Api error")});
    return res;
}

export const addPost = async(fromData)=>{
     const res =  await axios.post(`${BASE_URL}/post/addpost`,fromData).then((res)=>{
        return res.data;
    }).catch(()=>{console.log("Calling Api error")});
     return res;
}
export const getPost = async()=>{
    const res =  await axios.get(`${BASE_URL}/post/getallpost`).then((res)=>{
        return res.data;
    }).catch(()=>{console.log("Calling Api error")});
    return res;
}

export const deletePost = async(facebook_post_id)=>{
    const res =  await axios.delete(`${BASE_URL}/post/deletepost/${facebook_post_id}`).then((res)=>{
        return res.data;
    }).catch(()=>{console.log("Calling Api error")});
    return res;
}

export const viewComment = async(facebook_post_id)=>{
    const res = await axios.get(`${BASE_URL}/post/getcomment/${facebook_post_id}`).then((res)=>{
        return res.data;
    }).catch(()=>{console.log("Calling Api error")});
   return res;
}

export const deleteComment = async(comment_id)=>{
    const res = await axios.delete(`${BASE_URL}/post/deletecomment/${comment_id}`).then((res)=>{
        return res.data;
    }).catch(()=>{console.log("Calling Api error")});
    return res;
}