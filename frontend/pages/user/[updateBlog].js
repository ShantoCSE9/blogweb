import Navbar from "@/components/Navbar";
import { Button, CircularProgress } from "@mui/material";
import axios from 'axios';
import * as htmlparser2 from "htmlparser2";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import style from '../../styles/updateBlog.module.css';
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});



export default function UpdateBlog() {
  const router = useRouter();
  const blogId=router.query.updateBlog;
  const [selectedFile, setSelectedFile] = useState(null);
  const [state,set]=useState("")
  const [state2,setValue]=useState({
    title:'',
    category:'',
  
  })

  let b=""
  const [state3,set3]=useState('')
  b+=state;
  const [state4,set4]=useState(false) 
  
  const handleFileChange = async(e) => { 
    const file=e.target.files[0];
    const base64=await convertBase64(file)
    setSelectedFile(base64);
}

const convertBase64=(file)=>{
  return new Promise((resolve,reject)=>{
   const fileReader= new FileReader();
   fileReader.readAsDataURL(file)
   fileReader.onload=()=>{
     resolve(fileReader.result)
   }
 
   fileReader.onerror=()=>{
    reject(error)
   }
  })
 
 
 }

  useEffect(()=>{
    const getblog=async()=>{
      const {data}=  await axios.get(`http://localhost:5000/update-blog/${blogId}`)
      set3(data.blog) 

        set(data.blog[0].blog)
        setValue({
          title:data.blog[0].title,
          category:data.blog[0].category
        }) 
        setTimeout(() => {
          set4(true)
         }, 2000);
   
  }
  if(blogId) getblog()
 },[blogId])
 
 const handleChange=(e)=>{
  setValue({
    ...state2,
    [e.target.name]:e.target.value
  })  
 }
  const saveDb=async(e)=>{
    e.preventDefault();
    let info;
    if (typeof window !== 'undefined') {
     info= localStorage.getItem('info')
    }
       try {
             
              const data=await axios.put(`http://localhost:5000/Update-Blog/${blogId}`, {
              title:state2.title,
              category:state2.category,
              coverImg:selectedFile,
              blog:b,
              user: info
            })
      
       
      if(data){
        alert('Your blog is updated successfully')
        router.push({
          pathname: '/',     
        });
    }
}

    catch (error) {
      console.log(error)  
    }
  }
 
const parser = new htmlparser2.Parser({
        onopentag(name, attributes) {
            if (name === 'img') {
            b=b.replaceAll(`<img`,`<img style='width:100%; margin:10px 0px; border-radius:20px; height:100%; object-fit:cover'`)  
            
            }
                    
        },
        });
        parser.write(
        state
        );
        parser.end();
        

  return <>
 {!state4 && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}
  <Navbar />
   
  {state3  && <>
    
    <div className={style.heading} >
      <h1 >UPDATE  YOUR  BLOG</h1>
   </div>
    <form onSubmit={saveDb} >
       <div className={style.title}>
        <h1  sx={{paddingBottom:'10px'}}>Title:</h1> 
        <input className={style.input} maxLength={100} name='title' defaultValue={state3[0].title} required onChange={handleChange} type="text" /> 
       </div>
       <div  className={style.title}>
       <h1 >Category:</h1> 
       <input onChange={handleChange} name="category" className={style.input} defaultValue={state3[0].category}  required type="text" /> 
       </div>
      <div  className={style.title}>
         <h1 >Cover Image:</h1> 
         <input className={style.input}  required onChange={handleFileChange}  type="file" /> 
      </div>
          <div className={style.textEditor}>
          <SunEditor 
              onChange={set}
              setOptions={{
                buttonList:[
                  [  'fontSize','bold', 'italic', 'underline', 'strike','blockquote','link','image','align' ]
                ]
              }}
             setDefaultStyle="min-height:50vh"
             defaultValue={state3[0].blog}
           />
          </div>   
          <div className={style.bsubmit} >
          <Button className={style.submit} type="submit" variant="contained">SUBMIT</Button>
          </div>
    </form>
   

  </>}
  

   
 
  </>
}
