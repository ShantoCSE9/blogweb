import Navbar from "@/components/Navbar";
import { Button, CircularProgress } from "@mui/material";
import axios from 'axios';
import * as htmlparser2 from "htmlparser2";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { useState } from 'react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import style from '../../styles/createBlog.module.css';
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});



export default function CreateBlog() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState(null);
  const [state,set]=useState("")
  const [state3,set3]=useState(false)
  const [state4,set4]=useState(false)
  const [state2,setValue]=useState({
    title:'',
    category:'',
  })
  setTimeout(() => {
    set3(true)
   }, 1500);

  let b=""
  b+=state;
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

 const handleChange=(e)=>{
  setValue({
    ...state2,
    [e.target.name]:e.target.value
  })  
 }



  const saveDb=async(e)=>{
    e.preventDefault();
    set4(true)
    let info;
    if (typeof window !== 'undefined') {
     info= localStorage.getItem('info')
    }
       try {
      
              const data2=await axios.post('https://blogweb-uxhj.onrender.com/create-blog', {
              title:state2.title,
              category:state2.category,
              coverImg:selectedFile,
              blog:b,
              user: info
            })
       
            const data3=await axios.post('https://blogweb-uxhj.onrender.com/draft-blog', {
              title:state2.title,
              category:state2.category,
              coverImg:selectedFile,
              blogId:data2.data.newBlog._id,
              user: info
            })
      
       
       if(data2&&data3) {
        
        alert('Thank you for creating a blog in our website.') 
        set4(false)
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
  {!state3  && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}
        
  {state4  && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}
       
  <Navbar />
   
   <div className={style.heading} >
      <h1 >CREATE A BLOG</h1>
   </div>
    <form onSubmit={saveDb} >
       <div className={style.title}>
        <h1  sx={{paddingBottom:'10px'}}>Title:</h1> 
        <input className={style.input} maxLength={100} name='title' required onChange={handleChange} type="text" /> 
       </div>
       <div  className={style.title}>
       <h1 >Category:</h1> 
       <input onChange={handleChange} name="category" className={style.input}  required type="text" /> 
       </div>
      <div  className={style.title}>
         <h1 >Cover Image:</h1> 
         <input className={style.input}   required onChange={handleFileChange}  type="file" /> 
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
           />
          </div>   
          <div className={style.bsubmit} >
          <Button className={style.submit} type="submit" variant="contained">SUBMIT</Button>
          </div>
    </form>
   

  </>
}
