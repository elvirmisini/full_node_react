import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function CreatePost () {

    const initialValues={
        title:"",
        postText:"",
        username:""
    }

    const validationSchema=Yup.object().shape({
        title:Yup.string().required("You must input a title"),
        postText:Yup.string().required(),
        username:Yup.string().min(3).max(15).required()
    })
    const onSubmit=(data)=>{
        axios.post("http://localhost:3001/posts/",data).then((response)=>{
            console.log('It worked')
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
                <label>Username:</label>
                
                <ErrorMessage name='username' component="span"></ErrorMessage>
                <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="John"/>

                <button type='submit'> Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}


export default CreatePost