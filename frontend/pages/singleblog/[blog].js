import Navbar from '@/components/Navbar';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from '../../styles/blog.module.css';
const Blog = () => {
    const router = useRouter();
    const [state,set]=useState('')
    const [state2,set2]=useState('')
    const [state3,set3]=useState(false)
    const id=router.query.blog
    useEffect(()=>{
    let l= localStorage.getItem('info')
    localStorage.removeItem('catval') 
    set2(l);
    const getblog=async()=>{
        const {data}=  await axios.get(`https://blogweb-uxhj.onrender.com/single-blog/${id}`)
        set(data.singleBlog)
        setTimeout(() => {
          set3(true)
         }, 1000);
       
    }
    if(id) getblog()
   },[id])
 console.log(state)
    return (
   
    <div style={{backgroundColor:'#002335',minHeight:'100vh'}}>
  {!state3  && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}

        <Navbar value={state2}/>
      <div style={{}}>
        
        {state&&  <div className={style.blog}>
        <div className={style.blogFirstPart}>
         <div className={style.userInfo}>
            <h1 className={style.title} >{state.title} </h1>
            <div style={{fontSize:'20px',border:'1px solid gray',borderRadius:"40px", margin:"10px 0", height:"37px",display:'inline-block'}}
            
            onClick={()=>{
              router.push(`/userblog/${state.user._id}`)
            }}
            >
              
            <Image src={state.user.profileImg} width={35} height={35} style={{borderRadius:"50%",marginTop:'0px', objectFit:"cover",objectPosition:'center'}} alt=''/> <span style={{position:'relative',top:'-10px',padding:'0px 10px'}}>{state.user.username}</span>
              
              </div>
            <div style={{display:'flex',margin:'5px 0px'}}> 
            <div style={{marginRight:'5px',marginBottom:'10px',fontSize:'13px'}}>{state.category}</div>
            <span style={{marginRight:'5px',marginBottom:'10px',fontSize:'15px'}}> || </span>
            <div>{state.date.slice(0,10)}</div>
            </div>
         </div>
         <Image src={state.coverImg} width={0} height={0} sizes='100vw' alt='' className={style.blogCover}/>
        </div>
            <div  style={{fontSize:'18px !important'}} dangerouslySetInnerHTML={{__html:state.blog}}/>
            </div>}
      </div>
    </div>
  )
}

export default Blog