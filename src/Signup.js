import React from 'react'
import axios from 'axios';
import {useState} from 'react';
import eye from './img/eye.png'
import hide from './img/hide.png'
import alert from './img/alert.png'
const Signup = () => {
    const [name,setname]=useState('')
    const [error,setError]=useState('null')
    const [loader,setloader]=useState(false)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [pass_change,setPass_change]=useState(false)
    const [repass_change,setRepass_change]=useState(false)
    const [repassword,setRepassword]=useState('')
    const setDataToserver=async(e)=>{
      e.preventDefault();
      setloader(true)
      let _id=localStorage.getItem("9ouenbcvgetywMhIOEJD") || 'null'
      if(password===repassword){
      try{
     let response =await axios.post('https://shopping-backend-neon.vercel.app/signup',{
      id:_id,
      name:name,
      email:email,
      password:password,
    })
    setloader(false)
    if(response.data==="Already Have a account Going to Login page"){setError(response.data)}
    else{
    await localStorage.setItem("9ouenbcvgetywMhIOEJD",response.data)
    }
      }
      catch(err){
     console.log(err)
      }
    }
  }
  const handleClick=()=>{
    setPass_change(!pass_change)
  }
  let pass_type=pass_change?'text':'password';
  let pass_img=pass_change?hide:eye
  const handle_Click=()=>{
    setRepass_change(!repass_change)
  }
  let repass_type=repass_change?'text':'password';
  let repass_img=repass_change?hide:eye
  return (
      <section>
    <div id="loginBox">
    {loader ?
      <div style={{height:'50%',width:'50%',display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',position:'absolute',zIndex:2,gap:20}}>
      <div className="loader"></div><p  style={{fontSize:20,fontWeight:900}}>SignUp....</p>
      </div>
      :<></>
}
      <form onSubmit={setDataToserver}>
        <h2>SignUp</h2>
        <div className="input-box">
          <input type="text" required name="name" onChange={(e)=>setname(e.target.value)} value={name}/>
          <label> User name</label>
        </div>
        <div className="input-box">
          <span className="icon"><ion-icon name="mail"></ion-icon> </span>
          <input type="email" required name="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
          <label> Email</label>
        </div>
        <div className="input-box">
          <span className="icon"><img src={pass_img} alt="image_click_chacked_change" id="handlePasswordClick" onClick={()=>handleClick()}/></span>
          <input type={pass_type} required name="password" id="enterpassword" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <label>Enter Password</label>
        </div>
        <div className="input-box">
        <span className="icon"><img src={repass_img} alt="image_click_handle_checked_image" id="handlePassword_Click" onClick={()=>handle_Click()}/></span>
          <input type={repass_type} required name="repassword" id="repassword" value={repassword} onChange={(e)=>setRepassword(e.target.value)}/>
            <label>Re-Password</label>
          </div>
          {error==='null'?<></>:
          <div id="errors">
            <img src={alert} alt='alert_image'/>
        <p className="errorMessage">{error}</p>
         </div>
}
        <button type="Submit" value='Signup'>signup</button></form>
    </div>
  </section>
  )
}

export default Signup
