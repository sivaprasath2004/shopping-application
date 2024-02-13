import React, { useState } from 'react'
import {Link,useNavigate } from 'react-router-dom';
const Navigate = () => {
    const [menuUse,setMenuUse]=useState(true)
    const navigate=useNavigate()
  const menuBar=()=>{
    setMenuUse(!menuUse)
  }
  let menu=menuUse?'https://cdn-icons-png.flaticon.com/128/5036/5036960.png':'https://cdn-icons-png.flaticon.com/128/10288/10288720.png'
  let classname=menuUse?'true':'false'
  const cart=()=>{
    let user_id=localStorage.getItem("9ouenbcvgetywMhIOEJD") || 'null'
    if(user_id==='null'){
      navigate('/login')
    }
    else{
    navigate('/cart')
    }
  }
  return (
    <>
    <div className='menubar'>
     <img id='menuBar'  src={menu} alt='Menu' onClick={menuBar} />
     </div>
    <nav id={`naviation${classname}`}>
    <h1 id='h1'>shopper.com</h1>
    <Link to='/'>Home</Link>
      <Link to='/signup'>Signup</Link>
      <Link to='/login'>Login</Link>
      <img src='https://cdn-icons-png.flaticon.com/128/4290/4290722.png' alt='cart' className='cart' onClick={cart} />
    </nav>
    <div className='menus' id={classname}>
    <Link to='/'>
      <img src='https://cdn-icons-png.flaticon.com/128/25/25694.png' alt='home' />
      <p>Home</p></Link>
      <Link to='/signup'>
        <img src='https://cdn-icons-png.flaticon.com/128/7542/7542128.png' alt='signup'/>
       <p>Signup</p></Link>
      <Link to='/login'><img src='https://cdn-icons-png.flaticon.com/128/14575/14575259.png' alt='login' /><p>Login</p></Link>
      <Link to='/mobile'><img src='https://cdn-icons-png.flaticon.com/128/1551/1551353.png' alt='mobile' /><p>Mobile</p></Link>
      <Link to='/laptop'><img src='https://cdn-icons-png.flaticon.com/128/99/99488.png' alt='laptop' /><p>Laptop</p></Link>
      <Link to='/toys'><img src='https://cdn-icons-png.flaticon.com/128/3171/3171959.png' alt='Toys' /><p>Toys</p></Link>
      <Link to='/cart'><img src='https://cdn-icons-png.flaticon.com/128/4290/4290722.png' alt='Cart' /><p>Cart</p></Link>
      <Link to='https://github.com/sivaprasath2004'><img src='https://cdn-icons-png.flaticon.com/128/4460/4460756.png' alt='Cart' /><p>Support</p></Link>
    </div>
    </>
  )
}

export default Navigate