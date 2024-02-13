import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Products.css'
import AOS from 'aos'
const Products = ({datas}) => {
    const navigate=useNavigate()
    let data=datas
    let {id}=useParams()
    const [Result,setResult]=useState({})
    const [image,setimage]=useState({first:true,second:false,newloader:false})
    const [loader,setloader]=useState(false)
    useEffect(()=>{
        AOS.init({
            duration:800,
        })
        const products=async()=>{
            AOS.refresh()
            try{
                setloader(true)
                let value=await axios.get(`https://shopping-backend-neon.vercel.app/${data}/products`,{params:{_id:id}})
                setloader(false)
                setResult(value.data)
            }
            catch(err){
                console.log(err)
            }
        }
        products()
    },[])
    const order=(SELLprize,productName,_id)=>{
        let user=localStorage.getItem("9ouenbcvgetywMhIOEJD") || 'null'
        if(user==='null'){
            navigate('/login')
        }
        else{
        navigate('/order',{ state: { SELLprize:SELLprize,productName:productName,id:_id,_id:localStorage.getItem("9ouenbcvgetywMhIOEJD")} })
        }
      }
    const addtocart=async()=>{
        let user=localStorage.getItem("9ouenbcvgetywMhIOEJD") || 'null'
        if(user==='null'){
            navigate('/login')
        }
        else{
            setimage(pre=>({...pre,newloader:true}))
            await axios.get('https://shopping-backend-neon.vercel.app/Addtocart',{
               params:{ _id:user,
                id:id,
               }
            })
            setimage(pre=>({...pre,newloader:undefined}))
            setTimeout(()=>{
                setimage(pre=>({...pre,newloader:false}))
            },1000)
        }
      }
      const clickSizes=(index)=>{
        for(let i=0;i<=5;i++){
            let button=document.getElementsByTagName('button')[i];
            button.style.border='none'
        }
        let clicked=document.getElementsByTagName('button')[index]
        clicked.style.border='2px solid cyan'
      }
  return (
    <div id='product_page' data-aos="zoom-out"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="1000" style={loader?{overflow:'hidden'}:{}}>
        {loader?<span id="loader" key={`loader${loader}`} style={{position:'absolute'}}></span>:<></>}
    {Object.values(Result).map((item,index)=>(
        <div className='container' key={`container_1${index}`}>
                <div className='child'>
        <img src={image.first?item.img[0].url:item.img[1].url} key={`Image_product${index}`}className='childimage' alt={`first_img_index${index}`}/>
        </div>
        <div style={{paddingLeft:'2rem',paddingTop:10}}>
        <img src={item.img[0].url} onClick={()=>setimage({first:true,second:false,newloader:false})} key={`Image_product_adjust${index}`} alt={`first_img_index${index}`} style={{height:100,width:100,borderRadius:5,padding:10,border:image.first?'1px solid black':'none'}}/>
        <img src={item.img[1].url} onClick={()=>setimage({first:false,second:true,newloader:false})} key={`second_img_adjus${index}`} alt={`second_img_index${index}`} style={{height:100,width:100,borderRadius:5,padding:10,border:!image.first?'1px solid black':'none'}}/>
            </div>
       
        <div id='difference_prize'>
        <div id='prizes'>
        <div id='prize'>
            <span id='sellprize'>{`₹${item.SELLprize} `}</span>
        </div>
            <span id='MRPprize'>{`₹${item.MRPprize}`}</span>
            <span id='offer'>{` ${Math.floor((Number(item.MRPprize)-Number(item.SELLprize))/Number(item.MRPprize)*100)}%  off`}</span>
            <h3 id={item.stock.replace(/\s/g,'')}>{`${item.stock==='stocks'?'In Stock':item.stock}`}</h3>
            </div></div>
        <div id='details_box'>
        <h4 key={`productname_${index}`} id='productname'>{item.productName}</h4>
        <li key={`Color_${index}`}>{`Color  :${item.details[0].color}`}</li>
        {data==='fashion' || data==='furniture'?<>
        <li >{`Material:${item.details[0].material} `}</li>
        <h5 id='sizes'>Sizes</h5>
        <div id='size_buttons'>
        {item.size?.map((size,index)=>(
        <button className='size_button' onClick={()=>clickSizes(index)} key={`itemsize${index}`}>{size}</button>
        ))}
        </div>
        </>:
        <>
        {item.details[0].ram==='N/A'?<></>:
        <li key={`ram${index}`} id='extradetails'>
        <span >{`${item.details[0].ram} | `}</span><span>{item.details[0].rom}</span></li>}
        {item.details[0].battery==='N/A'?<></>:
        <li key={`Battery_${index}`}>{`Battery :${item.details[0].battery}`}</li>
}
        <li key={`Display_${index}`}>{`Display:${item.details[0].display}`}</li>
        <li key={`warrenty_${index}`}>{`warrenty :${item.details[0].warrenty===undefined?'1year':item.details[0].warrenty}`}</li>
    </>
    }
        {data==='laptop' || data==='toys' || data==='fashion' || data==='furniture'?<></>:<>
        <li key={`Front_Camera_${index}`}>{`Front Camera : ${item.details[0].camera[0].front}`}</li>
        <li key={`Back_Camera_${index}`}>{`Back Camera  : ${item.details[0].camera[0].back}`}</li></>}
        </div>
        <div>
        {  image.newloader===true?
            <div className='buttons' style={{display:'flex',justifyContent:'center',gap:'1rem'}}>
            <div className="checker"></div> 
            <p style={{fontWeight:'900'}}>Loading...</p>
            </div>
            :image.newloader===undefined?<div className='buttons' style={{display:'flex',justifyContent:'center',gap:'1rem'}}>
                <img src='https://cdn-icons-png.flaticon.com/128/5291/5291043.png' alt='added' /> <p style={{fontWeight:'900'}}>Added..</p>
            </div>:<></>
        } 
            </div>
        <div className='buttons'>
    <button id='order' onClick={()=>order(item.SELLprize,item.productName,item._id)}>order</button>
    <button id='cart' onClick={()=>addtocart()}>Add to Cart</button>
    </div>
        </div>
        
    ))}
    </div>
  )
}

export default Products
