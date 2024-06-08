import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import {useNavigate} from 'react-router-dom'
import {useContext,useEffect } from 'react'
import { AuthContext } from '../helpers/AuthContext';
function CreatePost () {
    const {authState}=useContext(AuthContext)

    const initialValues={
        title:"",
        postText:""
    }
    let history=useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem("accessToken")){
            history("/login")
        }
    })

    const validationSchema=Yup.object().shape({
        title:Yup.string().required("You must input a title"),
        postText:Yup.string().required(),
        
    })
    const onSubmit=(data)=>{
        axios.post("http://localhost:3001/posts/",data,{headers:{accessToken:localStorage.getItem('accessToken')}}).then((response)=>{
            history("/")
            });
    }

    

  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
            <Form className='formContainer'>
                <label>Title:</label>
                <ErrorMessage name='title' component="span"></ErrorMessage>
                <Field autocomplete="off" id="inputCreatePost" name="title" placeholder="John"/>
                <label>Posts:</label>
                
                <ErrorMessage name='posts' component="span"></ErrorMessage>
                <Field autocomplete="off" id="inputCreatePost" name="postText" placeholder="John"/>                
                
                
                <button type='submit'> Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}


export default CreatePost