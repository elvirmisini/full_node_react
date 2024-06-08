import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Registration from './pages/Registration'
import "./App.css"
import {AuthContext} from "./helpers/AuthContext"
import { useState,useEffect } from 'react';
import axios from 'axios'

function App() {
  
  const [authState,setAuthState]=useState({
  username:"",
  id:0,
  status:false
})

  useEffect(()=>{

      axios.get('http://localhost:3001/users/auth',{headers:{
        accessToken:localStorage.getItem('accessToken')
      }}).then((response)=>{
        if(response.data.error){
          setAuthState({...authState,status:false})
        }
        else{
          setAuthState({
            username:response.data.username,
            id:response.data.id,
            status:true
          })
        }
      })
    },[])

    const logout=()=>{
      sessionStorage.removeItem("accessToken")
      setAuthState({ username:"",
        id:0,
        status:false})
    }


    return (   
    <div className="App">
      <AuthContext.Provider value={{authState,setAuthState}}>
      <Router>
        <div className='navbar'>
          
        {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
                  <Link to="/createpost"> Create A Post</Link>
                </>
              )}
          <h1>{authState.username}</h1>
        </div>
      <Routes>
        
        <Route exact path="/" element={<Home/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<Post/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
