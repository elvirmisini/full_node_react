import { useEffect,useState } from 'react';
import './App.css';
import axios from "axios";

function App() {

  
  const [listOfPosts,setListOfPosts]=useState([])

    useEffect(()=>{
      axios.get("http://localhost:3001/posts/all-posts").then((response)=>{
      setListOfPosts(response.data)
      });
    },[])
    return (   
    <div className="App">
      {listOfPosts.map((value,key)=>{
        return (
          <div className='post'>
            <div className='title'>{value.title}</div>
            <div className='body'>{value.postText}</div>
            <div className='footer'>{value.username}</div>
          </div>)})} 
    </div>
  );
}

export default App;
