import Navbar from '@/components/Navbar';
import { Alert, Button, CircularProgress, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import style from '../../styles/registration.module.css';
const Register = () => {
 const router = useRouter();
 const [selectedFile, setSelectedFile] = useState(null);
 const [state2,set]=useState('')
 const [state,setValue]=useState(false)
 const [state3,set3]=useState(false)
 const [inputs,setinfo]=useState({
    username:"",
    email:"",
    password:""
 }) 
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
setTimeout(() => {
  set(true)
 }, 3500);

 const handelChange=(e)=>{
  
  setinfo({
    ...inputs,
    [e.target.name]: e.target.value
  })
 
 }
 const formdata=async (e)=>{
e.preventDefault();
set3(true)
  try {

      const {data} = await axios.post('https://blogweb-uxhj.onrender.com/register', {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
      profileImg:selectedFile
      
    })
    if(data.message!=='successed'){
      set3(false)
      setValue(true)
    }
    if(data.message==='successed'){
       alert("registration is completed")
       set3(false)
        router.push({
          pathname: '/user/login',
          
        });
      
    }
  }

  
       
  catch (error) {
    console.log(error)
  }
 }
  return (
    
   
   <div style={{}}>
    {!state2  && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}
    {state3  && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}
       
    <Navbar/>
   
    <div  className={style.main}>
      
      <div className={style.registration}>
      <Typography variant='h3 ' component="h2" sx={{color:'#FF8000',marginBottom:'20px'}}>REGISTRATION</Typography>
      <form className='form' onSubmit={formdata}>
      <TextField 
         style={{width:'100%',marginBottom:'15px'}}
         id="outlined-basic" 
         onChange={handelChange} 
         value={inputs.username} 
         required  
         label='username'
         name="username"
         variant="outlined"/>
        
       <TextField 
      style={{width:'100%',marginBottom:'15px'}}
       id="outlined-basic" 
       onChange={handelChange}
       type={'email'} 
       name="email"
       label="email"
       required  
       value={inputs.email}  
       variant="outlined" /> 
 
       <TextField 
      style={{width:'100%',marginBottom:'15px'}}
       id="outlined-basic" 
       onChange={handelChange}
       type={'password'} 
       required  
       label="password"
       name="password"
       value={inputs.password}  
       variant="outlined" />
       <div style={{marginTop:'5px',marginBottom:'20px'}}>
        <p style={{fontSize:'20px',color:'gray',marginBottom:'10px'}}>Profile Image: </p>
         <input required onChange={handleFileChange} type="file"  accept="image/*"/>
       </div>
        {state? <Alert sx={{marginBottom:'10px'}} severity="error">Your username or email id is already
        existing our server or email id is not valid Please try again!</Alert> : ''}
      <div >
          <Button size='median' type='submit' variant="contained">submit</Button>
      </div>
      <div></div>
      </form>
       </div> 
    </div>
  
   </div>
 
  )
}

export default Register