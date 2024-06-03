import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import {useNavigate} from 'react-router-dom'


function Registration() {
const initialValues={
  username:"",
  password:""
}
let history=useNavigate()
const validationSchema=Yup.object().shape({
  username:Yup.string().min(3).max(15).required("You must input a title"),
  password:Yup.string().min(4).max(20).required(),
})
const onSubmit=(data)=>{
  axios.post("http://localhost:3001/users/",data).then((response)=>{
      history("/")
      });
}


  return (
    <div className='createPostPage'>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form className='formContainer'>
                        
            <label>Username:</label>
            <ErrorMessage name='username' component="span"></ErrorMessage>
            <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="John"/>

             <label>Password:</label>
            <ErrorMessage name='password' component="span"></ErrorMessage>
            <Field autocomplete="off" id="inputCreatePost" type="password" name="password" placeholder="Your Password"/>

            <button type='submit'> Create Post</button>
        </Form>
    </Formik>
    </div>
  )
}

export default Registration
