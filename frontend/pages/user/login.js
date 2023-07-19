import Navbar from '@/components/Navbar';
import { useUserContext } from '@/pages/context';
import { Alert, Button, CircularProgress, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import style from '../../styles/login.module.css';
const Login = () => {
  const router = useRouter();
  const [state,setValue]=useState(false)
  const [state2,set]=useState(false)
  const [state3,set3]=useState(false)
  const [inputs,setvalue]=useState({
    email:"",
    password:""
 }) 
 setTimeout(() => {
  set(true)
 }, 1500);
 const handelChange=(e)=>{
  setvalue({
    ...inputs,
    [e.target.name]: e.target.value
  })
 }
const value=useUserContext();
 const formdata=async (e)=>{
  set3(true)
      e.preventDefault();
              try {
                  const {data} = await axios.post('https://blogweb-uxhj.onrender.com/login', {
                  email: inputs.email,
                  password: inputs.password
                })
 
              if(data.result==='successed'){ 
                 value.current=true;
                 if (typeof window !== 'undefined') {
                  localStorage.setItem('info',data.user._id)
                  localStorage.setItem('pic',data.user.profileImg)
                  localStorage.setItem('name',data.user.username)
                  localStorage.removeItem('catval')
  
                }
                set3(false)
                 router.push('/')        
                }

              else
                {
                  set3(false)
                  setValue(true)
                }
                
               } catch (error) {
                console.log(error)  
              }
 }


  return (
    <div > 
    
    {!state2  && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}
  {state3  && <div style={{display:'flex', justifyContent:'center',paddingTop:"150px",overflow:'hidden',position:'fixed',zIndex:"100",
        backgroundColor: "rgba(228, 236, 250, 0.507)",width:'100%',height:"100%"}}> <CircularProgress  color='success'/> </div>}
            <Navbar/>
       <div className={style.main}>
          <div className={style.login}>
          <Typography variant='h3 ' component="h2" sx={{color:'#FF8000'}}>LOGIN</Typography>
      <form className={style.form} onSubmit={formdata}>
          <TextField   
            id="outlined-basic"  
            onChange={handelChange} 
            value={inputs.email} 
            required label="email" 
            name="email"
            variant="outlined" 
            style={{width:'100%',marginBottom:'15px'}}/>

            <TextField 
           
            id="outlined-basic" 
            type='password' 
            required 
            name="password"
            onChange={handelChange} 
            value={inputs.password} 
            label="password" 
            variant="outlined"
            style={{width:'100%',marginBottom:'15px'}}/> 
            {state? <Alert sx={{marginBottom:'10px'}} severity="error">Your password or email was incorrect. Please try again!</Alert> : ''}
         <div>
               <Button  type="submit"  variant="contained"> submit</Button>
      
         </div>
     </form>
        </div> 
    </div>
    
    </div>
   
  )
}

export default Login