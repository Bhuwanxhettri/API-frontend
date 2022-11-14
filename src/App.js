import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddPost from './container/AddPost';
import Feedback from './container/Feedback';
import Notifications from './container/Notifications';
import PostList from './container/PostList'
import Event from './container/Event';
import Dashboard from './container/Dashboard';
import LoginPage from './components/LoginPage';
import SideBar from './components/SideBar';
import PostComment from "./container/PostComment";
import { useSelector} from 'react-redux'
import { useEffect } from 'react';
function App() {
  const {isLoggedIn} = useSelector(state=>state.auth);
  const nagivate = useNavigate();
  useEffect(()=>{
    if(isLoggedIn===false || isLoggedIn=== "false"){
      nagivate('/')
    }else{
      nagivate('/home')
    }
  },[])

  return (
    <>
     <div className='App'>
      <Routes>
          <Route path='/' element={<LoginPage/>}></Route>   
      </Routes>    
        <div className="flex">
            <div>
              {
                (isLoggedIn === true || isLoggedIn === "true") &&  <SideBar />
              }
            </div>
            <div className='mx-auto'>   
                <Routes>
                {
                (isLoggedIn === true || isLoggedIn === "true") && 
                  <>
                   <Route path='/home' element={<Dashboard />}></Route>
                    <Route path='/addpost' element={<AddPost />}></Route>
                    <Route path='/feedback' element={<Feedback />}></Route>
                    <Route path='/notification'element={<Notifications />}></Route>
                    <Route path='/postlist' element={<PostList />}></Route>
                    <Route path='/postcomment/:id' element={<PostComment />}></Route>
                    <Route path='/addEvent' element={<Event/>}></Route>
                  </>
                }
                </Routes>
            </div>
        </div>
    </div>
    </>
  );
}

export default App;
