import React, { useContext } from 'react'
import '../App.css';
import axios from "axios";
import { useEffect,useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext';
function Home() {
     
  const [listOfPosts,setListOfPosts]=useState([])
  const [likedPosts,setLikedPosts]=useState([])
  const {authState}=useContext(AuthContext)
  let history=useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      history('/login')
    }else{

    

    axios.get("http://localhost:3001/posts/all-posts",{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
    setListOfPosts(response.data.listOfPosts)
    setLikedPosts(response.data.likedPosts.map((like)=>{
      return like.PostId
      }))
    });}
  },[])

  const likeAPost=(postId)=>{
    axios.post("http://localhost:3001/likes",{PostId:postId},{headers:{
      accessToken:localStorage.getItem("accessToken")
    }}).then((response)=>{

    setListOfPosts(listOfPosts.map((post)=>{
      if(post.id===postId){
        if(response.data.liked){
        return {...post,Likes:[...post.Likes,0]}
        }else{
          const likesArray=post.Likes
          likesArray.pop()
          return {...post,Likes:likesArray}
        }
      }else{
        return post
      }
    }))
    if(likedPosts.includes(postId)){
      setLikedPosts(likedPosts.filter((id)=>{return id!==postId}))
    }else{
      setLikedPosts([...likedPosts,postId])
    }
    });
  }
  return (
    <div>
       {listOfPosts.map((value,key)=>{
        return (
          <div className='post'>
            <div className='title'>{value.title}</div>
            <div className='body'  onClick={()=>{history(`/post/${value.id}`)}}>{value.postText}</div>
            <div className='footer'>{value.username}{" "}
            <div  className='buttons'>
            <ThumbUpIcon onClick={()=>
           {
            likeAPost(value.id)
           } } className={likedPosts.includes(value.id)?"unlikeBttn":"likeBttn"}/> 
           {/* <ThumbUpIcon onClick={()=>
           {
            likeAPost(value.id)
           } } className='unlikeBttn'/> */}
            </div>
            <label>{value.Likes.length||0} Likes</label>
            </div>
          </div>)})} 
    </div>
  )
}

export default Home
