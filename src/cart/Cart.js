import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './cart.css'
import AOS from 'aos'
import { Link,useNavigate } from 'react-router-dom'
const Cart =() => {
    const [quantity,setQuantity]=useState({loading:false})
    const [datas,setData]=useState('')
    const navigate=useNavigate()
    useEffect(()=>{
      AOS.init()  
    const cart=async()=>{
      AOS.refresh({
        duration:800,
      })
      let check=localStorage.getItem("9ouenbcvgetywMhIOEJD") || 'null'
      if(check==='null'){
        setData('nothing')
      }
      else{
        try{
          setQuantity({loading:true})
            let response=await axios.post('https://shopping-backend-neon.vercel.app/cart',{
                _id:localStorage.getItem("9ouenbcvgetywMhIOEJD")
            })
            setData(response.data)
            setQuantity({loading:false})
        }
        catch(err){
            console.log(err)  
        }
    }
  }
    cart()
},[])
const remove=async(id)=>{ 
    await axios.post('https://shopping-backend-neon.vercel.app/cart/remove',{
      _id:id,
      id:localStorage.getItem("9ouenbcvgetywMhIOEJD")
    })
    const element=document.getElementById(id)
    element.remove()
}
const increment=(itemId)=>{
    setQuantity((prevoius)=>({
      ...prevoius,[itemId]:(prevoius[itemId]||0)+1
    }))
}
const decrement=(itemId)=>{
    setQuantity((prevoius)=>({
      ...prevoius,[itemId]:prevoius[itemId]>=1?prevoius[itemId]-1:0
    }))
  }
  const order=(SELLprize,productName,_id)=>{
    navigate('/order', { state: { SELLprize:SELLprize,productName:productName,id:_id,_id:localStorage.getItem("9ouenbcvgetywMhIOEJD")} })
  }
  return (
    <div id='cart_page'  style={quantity.loading?{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}:{display:'flex',flexWrap:'wrap'}}>
      {quantity.loading?
      <div style={{height:'50%',width:'50%',display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',position:'absolute'}}>
      <div className="loader"></div>
      </div>
      :<></>
}
        {datas==='nothing'?<div style={{display:'grid',placeItems:'center',alignSelf:'center'}}>
          <p>You will not a Login or signup.please login or signup To use a cart page</p>
          <a href='/login'><button className='btn-hover btn-cart'>Login</button></a>
          <p>OR</p>
          <a href='/signup'><button className='btn-hover btn-cart'>Signup</button></a>
          </div>
        :
        <div className='cart_paging'> 
     {Object.values(datas).map((item,index)=>(
        <div className='cart_detail' id={item._id}  key={`div_tag${item.productName}`} data-aos="fade-up">
         <img src={item.img[0].url} alt={`image_product${item.productName}`} id={`cart_img`} />
         <div className='cart_product_details'>
         <h1 id='card_product'>{item.productName.length>22?item.productName.slice(0,21)+'....':item.productName}</h1>
         <h1 id='cart_SELLprize'>{`₹${item.SELLprize}`}</h1>
         <div id='cart_offer'>
                <span id='cart_MRPprize'>{`₹${item.MRPprize}`}</span>
                <span id='cart_offer_percentage'>{` ${Math.floor((item.MRPprize-item.SELLprize)/item.MRPprize*100)}%  off`}</span>
         </div>
         
         <div id='buttons_details'>
          <span className='Quantity'>Quantity:</span>
         <button key={`decre${item.productName}`} onClick={()=>decrement(index)}>-</button>
         <span>{quantity[index] || 0}</span>
         <button key={`incre${item.productName}`}  onClick={()=>increment(index)}>+</button>
         <h4 id='current_prize_ctegory'>prize:</h4><span id='current_prize'>₹{item.SELLprize*quantity[index] || 0}</span>
         </div><div id='cart_options' style={{gap:13}}>
          <Link to={`/${item.category}/${item._id}`}>
          <button id='view'>
            <img src='https://cdn-icons-png.flaticon.com/128/535/535193.png' alt={`image_alts${index}`} key={`image_alts_index${index}`}/>
            </button></Link>
         <button id='remove' onClick={()=>remove(item._id)}>
         <img src='https://cdn-icons-png.flaticon.com/128/6861/6861362.png' alt={`image_delete_alts${index}`} key={`image_delete_alts_index${index}`}/>
          </button>      
          <button className='order_but' onClick={()=>order(item.SELLprize*quantity[index] || 0,item.productName,item._id)}>
          <img src='https://cdn-icons-png.flaticon.com/128/9485/9485826.png' alt={`image_order_alts${index}`} key={`image_order_alts_index${index}`}/>
         </button>
         </div>
         </div>
         </div>
        ))}</div>
     }
    </div>
  )
}

export default Cart
