
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiOutlineBars3 } from 'react-icons/hi2';
import styles from '../styles/Navbar.module.css';
import Profile from './Profile';
const Navbar = () => {
 const router=useRouter();
 const [state,set]=useState(false);
 const [state2,set2]=useState({
  userID:" ",
  userImg:" ",
  userNamge:" "
})
const query=router.query;
 useEffect(()=>{
  let l= localStorage.getItem('info')
  let m= localStorage.getItem('pic')
  let n= localStorage.getItem('name')
  set2({
   userID:l,
   userImg:m,
   userName:n
  });
 },[])


 const category=(e)=>{
   router.push(`/category/${e.target.attributes[1].value}`)
   setTimeout(() => {
    router.reload()
   }, 2000);
 
 }


  return (
              <div style={{}}>
                 <div className={styles.heading}>
                  <div style={{ }}>

                  <Image  src={'/BanglaBlog.jpg' } alt='' width={30} height={30} style={{width:'30px',height:'30px',objectFit:'cover',borderRadius:'50%'}}/>
                    
                    </div>
                   <h1 style={{
                     textAlign:"center",
                     color:'green',
                     cursor:'pointer',
                     fontSize:'25px',
              
                      }} onClick={()=>{
                        router.push('/')
                        setTimeout(() => {
                          router.reload()
                         }, 2000);
                      }
                      
                     
                    }>Bangla<span style={{
                        opacity:'.8',
                        color:"red"
                      }}>Blog</span>
                      
                   </h1>                  
                  <div style={{}}>
                    
                      <div style={{display:'flex',justifyContent:'end'}}>
                       <HiOutlineBars3 style={{fontSize:'30px',backgroundColor:'#EBEDEF',padding:'5px',borderRadius:'50%',cursor:'pointer'}} onClick={()=>set(!state)}/>
                       {state&& <Profile value={state2} />}
                      </div>
                    
                  </div>
                </div>
                           
                           <div className={styles.navMenu}> 
                              <ul className={styles.navUl}>
                                <li className={styles.navLi} name='history' onClick={category}> ইতিহাস </li>
                                <li className={styles.navLi} name='sports' onClick={category}> খেলা </li>
                                <li className={styles.navLi} name='science' onClick={category} > বিজ্ঞান </li>
                                <li className={styles.navLi} name='book_and_cinema' onClick={category}> বই ও সিনেমা</li>
                                <li className={styles.navLi} name='bd' onClick={category}> বাংলাদেশ</li>
                                <li className={styles.navLi} name='world' onClick={category}> বিশ্ব </li>
                              </ul>
                          </div>
             </div>
    
  )
}

export default Navbar