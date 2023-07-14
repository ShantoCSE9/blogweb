import Grid from '@/components/Grid';
import Navbar from '@/components/Navbar';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
const Category = () => {
    const router=useRouter()
   const category=router.query.category;
    const [state,set]=useState([]);
    const [totalBlog,setValue]=useState();
    const [activePage,setPage]=useState(1);
    const limit=5;

    const [state2,set2]=useState(false)
           const fetchdata=async()=>{ 
    
            await axios.get(`http://localhost:5000/category/${category}`,{
            params:{
            page:activePage,
            size:limit
          }
        }).then(({data})=>{
           set([...state,...data.blog ])
       
           setValue(data.total)
           setPage(activePage+1)
           setTimeout(() => {
            set2(true)
           }, 3500);
        }).catch((error)=>{
          console.log(error)
        })
      }
        
  
  useEffect(()=>{
    fetchdata()

  },[category])           // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <div>
      {!state2  && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}
      <Navbar/>

   <>
  
      <InfiniteScroll
       dataLength={state.length}
       next={fetchdata}
       hasMore={state.length<totalBlog}
     
 
       loader={ <div style={{display:'flex', justifyContent:'center',margin:'20px',overflow:'hidden'}}><CircularProgress color='success'/> </div>}
      >
      <Grid value={state}/> 

      </InfiniteScroll>
    </>
     { state.length===totalBlog && state.length!=0 && <p style={{textAlign:'center',fontSize:'20px', color:'gray',padding:'20px'}}>
          "-- You have seen it all --"
        </p>}
    </div>
  )

      }
export default Category