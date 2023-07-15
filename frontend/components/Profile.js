import { useUserContext } from '@/pages/context';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import style from '../styles/Profile.module.css';
const Profile = (props) => {
  const router=useRouter();
  const value=useUserContext()

  value.current=props.value;
 const query=router.query
  const createBlogPage=()=>{
    router.push('/user/createBlog')
  }
  const userProfile=()=>{
    router.push(`/userblog/${value.current.userID}`)
   }
 

   const loginPage=()=>{
    if(typeof window !== 'undefined') localStorage.removeItem('info')
     router.push({pathname: '/user/login'});
    
    }

  const registrationPage=()=>{
  router.push({pathname: '/user/registration'});

 }
 

  return (
    <div className={style.profile} >
       <div>
      
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginTop:'10px',alignItems:'center'}}>
      {value.current.userID?<Button size='small'  sx={{margin:'10px',width:'200px'}} color="secondary" onClick={userProfile}  variant="outlined">My Profile</Button>: ""}
      {value.current.userID? <Button size='small' sx={{margin:'10px',width:'200px'}} onClick={createBlogPage} color="success" variant="outlined">Create An Article</Button>
       : <Button size='small' sx={{margin:'10px',width:'200px'}} onClick={registrationPage} color="success" variant="outlined">Registration</Button>
      }
      {value.current.userID? <Button size='small' sx={{margin:'10px',width:'200px'}} onClick={loginPage}  variant="outlined">Log out</Button>
       : <Button size='small' sx={{margin:'10px',width:'200px'}} onClick={loginPage} variant="outlined">Log in</Button>
      }
      </div>
       </div>
    </div>
  )
}

export default Profile