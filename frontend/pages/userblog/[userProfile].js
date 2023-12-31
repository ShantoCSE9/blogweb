import Draft from '@/components/Draft'
import Grid from '@/components/Grid'
import Navbar from '@/components/Navbar'
import { Button, CircularProgress } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
const UserProfile = () => {
  const router=useRouter()
  const {userProfile}=router.query
  const [state2,set2]=useState('')  
  const [state,set]=useState([]);
  const [totalBlog,setValue]=useState();
  const [activePage,setPage]=useState(1);
  const limit=7;
  const [state3,set3]=useState(false)  
  const [state4,set4]=useState()
  const [state5,set5]=useState(false)  
 const fetchdata= async()=>{
  if(typeof window !== 'undefined') {
    const userBlog=localStorage.getItem('userBlog','false')
    if(userBlog==='false'||userBlog===null){
      set4(userBlog)
      await axios. get(`https://blogweb-uxhj.onrender.com/userPending-blog/${userProfile}`,{
        params:{
        page:activePage,
        size:limit
      }
    }).then(({data})=>{
       set([...state,...data.blog ])
       setValue(data.total)
       setPage(activePage+1)
      
        set3(true)
     
    }).catch((error)=>{
      console.log(error)
    })
    }
  else{
    set4(userBlog)

    await axios.get(`https://blogweb-uxhj.onrender.com/user-blog/${userProfile}`,{
        params:{
        page:activePage,
        size:limit
      }
      }).then(({data})=>{
       set([...state,...data.blog ])
       setValue(data.total)
       setPage(activePage+1)  
        set3(true)

      }).catch((error)=>{
      console.log(error)
      })
  }
} 
 
}


  useEffect(()=>{
    let l= localStorage.getItem('info')
    let m= localStorage.getItem('pic')
    let n= localStorage.getItem('name')
   
      localStorage.removeItem('catval')
    let userBlog= localStorage.getItem('userBlog')
  
  
    set2({
     userID:l,
     userImg:m,
     userName:n
    });

   if(userProfile) {
    set([''])
    fetchdata()
  }
 
 },[userProfile]) // eslint-disable-line react-hooks/exhaustive-deps
  console.log(state)
  return (
    <div className='hgt' >
      {!state3  && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}
        <Navbar/>
      <div>
        <div>
           <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center',marginTop:'30px'}}>  
        {state2.userImg &&  <Image  src={state2.userImg} alt='' width={80} height={80} style={{borderRadius:'50%',objectFit:'cover',border:'4px solid #d3d3d3'}}/>}
           <h5 style={{fontSize:'16px',color:'#f4f4f4',margin:"10px 0px",fontWeight:'normal'}}>Author</h5>
           <h2 style={{margin:'0px',color:'#f4f4f4'}}>{state2 && `${state2.userName}`}</h2>
         </div> 
        </div>
        <div style={{display:'flex',justifyContent:'center', margin:'20px 40px',}}>
          <Button sx={{margin:'5px',borderRadius:'5px',fontSize:'11px'}} 
          variant="contained" color="success" size='medium'
          onClick={()=>{
            set5(true)
        }}>
           
            Published</Button> 
          <Button sx={{margin:'5px',borderRadius:'5px',fontSize:'11px'}} 
          variant="contained" color='secondary' size='medium' onClick={()=>{
            set5(false)
          
          }}>Pending</Button> 
        
          </div>
      </div> 

      <div  >
    
   {state3 && <InfiniteScroll
     dataLength={state.length}
     next={fetchdata}
     hasMore={state.length<totalBlog}
     endMessage={
      <p style={{textAlign:'center',fontSize:'15px',color:'gray',margin:'10px'}}>

        {state.length>=totalBlog&&"-- THE END --"}
      </p>
     }
     loader={ <div style={{display:'flex', justifyContent:'center',margin:'20px',overflow:'hidden'}}><CircularProgress color='success'/> </div>}
    >
   {state5 ? <Grid value={state}/> : <Draft value={state}/> }
  

    </InfiniteScroll>}
  </div>
    </div>
  )
}

export default UserProfile