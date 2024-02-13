import React from 'react'
import homepage from './data'
import image from './img/finally.jpg'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div style={{display:'flex',padding:'2rem',marginTop:50,height:'100vh',flexWrap:'wrap',flexFlow:'column',gap:'2rem'}}>
        <div
        style={{
          display:'flex',
          width:'100%',
          height:'400px',
          position:'relative',
          justifyContent:'center',
          alignItems:'center'
        }}
        >
<img  src={image} style={{width:"100%",height:'100%',filter:'blur(1px)',borderRadius:15}} alt='image_used'/>
<p style={{position:'absolute',color:'rgb(0,0,0)',fontFamily:'initial',fontSize:23,fontWeight:'900',textShadow:'rgba(52, 52, 113, 0.9) 2px 2px 0px',textAlign:'center'}}>Get Unlimited shopping Experience</p>
        </div>
        <h1 style={{fontSize:23}}>Products & <span style={{color:'red'}}>Details</span></h1>
        {
            homepage.map((item,index)=>(
                <div key={`container${index}`} style={{flex:'.5 ',border:'1px solid black',borderRadius:20,boxShadow:'0 4px 5px rgba(0,0,0,.5)',width:'100%',gap:'2rem',padding:'1rem',display:'flex',flexWrap:'wrap',flexDirection:'row'}} >
                    <img src={item.url} alt={item.alt} style={{width:250,height:250,objectFit:'contain',flex:'1 0 10rem'}} key={`image_ele${index}`} />
                   <div key={`contentcontainer${index}`} style={{flex:'1 0 10rem',display:'flex',flexDirection:'column',gap:'2rem',justifyContent:'center',alignItems:'center'}}>
                    <p key={`para${index}`}>{item.content}</p>
                    <Link to={item.alt} key={`link_tag${index}`} style={{textDecoration:'none',borderRadius:20,color:'white',width:'120px',height:'40px',backgroundColor:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <p key={`shop_key${index}`} style={{color:'white',textAlign:'center',position:'relative',top:-1.2,fontSize:18,fontWeight:600}}>Shop</p>
                        <img src='https://cdn-icons-png.flaticon.com/128/8213/8213451.png' style={{height:20,width:20,position:'relative',right:-10}} alt='arrow'/></Link>
                    </div></div>
            ))
        }
        <h2 style={{fontSize:16}}>
          @copyright <Link to='https://github.com/sivaprasath2004'>sivaprasath2004</Link>
        </h2>
    </div>
  )
}

export default Home