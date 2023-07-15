import Grid from '@/components/Grid';
import Navbar from '@/components/Navbar';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
export default function Home() {
  const [state,set]=useState([]);
  const [totalBlog,setValue]=useState();
  const [activePage,setPage]=useState(1);
  const limit=10;
  const [state2,set2]=useState(false)

      const fetchdata=async()=>{
        await axios.get('https://blogweb-uxhj.onrender.com/',{
          params:{
            page:activePage,
            size:limit
          }
        }).then(({data})=>{
           set([...state,...data.blog ])
          
           setValue(data.total)
          
            set2(true)
         
           setPage(activePage+1)
        }).catch((error)=>{
          console.log(error)
        })
       
      }

      useEffect(()=>{    
        fetchdata();
      },[]) // eslint-disable-line react-hooks/exhaustive-deps
     
      
  return (
    
    <div className=''>
      {!state2  && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}

      <Navbar/>
      {state2&&<>
    
      <InfiniteScroll
       dataLength={state.length}
       next={fetchdata}
       hasMore={state.length<totalBlog}
       endMessage={
        <p style={{textAlign:'center',fontSize:'20px',color:'gray',padding:"20px"}}>

          {state.length>=totalBlog&&"-- You have seen it all --"}
        </p>
       }
       loader={ <div style={{display:'flex', justifyContent:'center',margin:'20px',overflow:'hidden'}}><CircularProgress color='success'/> </div>}
      >
      <Grid value={state}/>
      </InfiniteScroll>
    </>}
    </div>
  )
}
