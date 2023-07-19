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
    const [activePage,setPage]=useState(1);
   
    let cat;
    const [state,set]=useState([]);
    const [state3,set3]=useState([]);
    const [totalBlog,setValue]=useState();
    const limit=5;
    
    const [state2,set2]=useState(false)

    if(typeof window !== 'undefined') {
    cat=localStorage.getItem('cat') ;
     let catval=localStorage.getItem('catval');
      if(cat=="1"){
        set([])
        setPage(activePage-activePage+1)
      }
       localStorage.setItem('cat',2) 
     }
           const fetchdata=async()=>{ 
            await axios.get(`https://blogweb-uxhj.onrender.com/category/${category}`,{
            params:{
            page:activePage,
            size:limit
          }
        }).then(({data})=>{
        
           set([...state,...data.blog ])
           setPage(activePage+1) 
           setValue(data.total)          
           setTimeout(() => {
            set2(true)
           }, 3000);
        }).catch((error)=>{
          console.log(error)
        })
      }
        
  
  useEffect(()=>{
    set2(false)
    fetchdata()

  },[category])           // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <div>
      {!state2 && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}
      <Navbar/>

   <>
  
      <InfiniteScroll
       dataLength={state.length}
       next={fetchdata}
       hasMore={state.length<totalBlog}
       loader={state2&& <div style={{display:'flex', justifyContent:'center',margin:'20px',overflow:'hidden'}}><CircularProgress color='success'/> </div>}
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