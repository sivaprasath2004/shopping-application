import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react';
import eye from './img/eye.png'
import hide from './img/hide.png'
import alert_img from './img/alert.png'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [message,setMessage]=useState('null')
    const navigate=useNavigate()
    const [redirect,setRedirect]=useState(false)
    const [loader,setloader]=useState(false)
    const [pass_change,setPass_change]=useState(false)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const setDataToserver=async(e)=>{
      setMessage('null')
     e.preventDefault()
     setloader(true)
     let post=await axios.post('https://shopping-backend-neon.vercel.app/login',{
      email:email,
      password:password
     })
     setMessage(post.data)
     setloader(false)
     if(post.data!=='Email Incorrect' && post.data!=='Email or password is not match'){
      setMessage('null')
      console.log(post.data)
    localStorage.setItem("9ouenbcvgetywMhIOEJD",post.data)
      setRedirect(true)
     }
    }
    useEffect(() => {
      if (redirect) {
        navigate('/'); 
      }
    }, [redirect, navigate]);
    const handleClick=()=>{
      setPass_change(!pass_change)
    }
    let pass_type=pass_change?'text':'password';
  let pass_img=pass_change?hide:eye
  return (
    <main>
    <div id="loginBox">
    {loader?
      <div style={{height:'50%',width:'50%',display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',position:'absolute',zIndex:2,gap:20}}>
      <div className="loader"></div><p  style={{fontSize:20,fontWeight:900}}>checking...</p>
      </div>
      :<></>
}
      <form onSubmit={setDataToserver}>
        <h2>Login</h2>
        <div className="input-box">
          <input type="email" required name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <label> Email</label>
        </div>
        <div className="input-box">
          <span className="icon"><img src={pass_img} alt="image_clicked_handle" id="handlePasswordClick" onClick={()=>handleClick()}/></span>
          <input type={pass_type} required name="password" id="enterpassword" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <label>Enter Password</label>
        </div>
        <div className="remember-forget">
          <label>
            <input type="checkbox" /><span>Remember Me</span>
          </label>
          <a href='/signup'>Forget Password</a>
        </div>
        {message==='null'?<></>:
        <div id="errors">
         <img src={alert_img} alt='alert_image_settled' />
        <p className="errorMessage">{message}</p>
        </div>
}
        <button type="Submit">Login</button>
        <div className="register-link">
          <p id="account">Don't have an account?
            <a href="/signup">Register</a>
          </p>
        </div>
      </form>
    </div>
</main>
  )
}

export default Login