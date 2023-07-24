import Grid from '@/components/Grid';
import Navbar from '@/components/Navbar';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// ..

const Category = () => {

    const router=useRouter()
    const category=router.query.category;
    const [activePage,setPage]=useState(1);
    let catValue;
        if(category==='history')
        catValue='ইতিহাস'
        if(category==='book_and_cinema')
        catValue='বই ও সিনেমা'
        if(category==='sports')
        catValue='খেলা'
        if(category==='science')
        catValue='বিজ্ঞান'
        if(category==='bd')
        catValue='বাংলাদেশ'
        if(category==='world')
        catValue='বিশ্ব'
   
    let cat;
    const [state,set]=useState([]);
    const [state3,set3]=useState([]);
    const [totalBlog,setValue]=useState();
    const limit=7;
    
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
           }, 1000);
        }).catch((error)=>{
          console.log(error)
        })
      }
        
  
  useEffect(()=>{
  
    set2(false)
    fetchdata()

  },[category])           // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <div className='hgt '  >
      {!state2 && <div style={{display:'flex', justifyContent:'center',paddingTop:"180px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}
      <Navbar/>
     

   <div>
   <h3 style={{textAlign:'center',color:'#e8e8e8',paddingTop:'20px'}}>{catValue} </h3>
      <hr style={{width:'150px',margin:'5px auto'}}></hr>
      <InfiniteScroll 
       dataLength={state.length}
       next={fetchdata}
       hasMore={state.length<totalBlog}
       className='g'
       loader={state2&& <div style={{display:'flex', justifyContent:'center',margin:'20px',overflow:'hidden'}}><CircularProgress color='success'/> </div>}
      >
      <Grid value={state} 
  /> 

      </InfiniteScroll>
    </div>
     { state.length===totalBlog && state.length!=0 && <p style={{textAlign:'center',fontSize:'17px', color:'gray',padding:'20px'}}>
          "-- You have seen it all --"
        </p>}
    </div>
  )

      }
export default Category