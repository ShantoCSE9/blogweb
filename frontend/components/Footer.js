import { useRouter } from 'next/router';
import React from 'react'
import style from '../styles/Footer.module.css'
const Footer = () => {
  const router=useRouter();
 
  const category=(e)=>{
   

    if(typeof window !== 'undefined') {
      localStorage.setItem('cat',1)
      let r= localStorage.getItem('catval')
      if(r!==e.target.attributes[0].value){
        localStorage.setItem('catval',e.target.attributes[0].value)
        router.push({
          pathname: `/category/${e.target.attributes[0].value}`
          
        })
       
      }
      
      }

   
  }
  return (
  
  <div className={style.footer}>
           <div className={style.firstPart}>
              <div>
                  <h1 className={style.h1} onClick={()=>router.push('/')}>Bangla<span style={{
                    
                        color:"red"
                      }}>Media</span></h1>
              </div>
              <div className={style.aboutBlog}>Lorem ipsum dolor sit amet. Eos quia explicabo non galisum atque qui atque perferendis sitconsequatur quaerat in 
              tempora laborum vel voluptatibus blanditiis.Hic aliquid deserunt vel
            . </div>
           </div>   

           <div className={style.secondPart}>
                  <ul className={style.ul}>
                                <li  name='history' className={style.li} onClick={category}> ইতিহাস </li>
                                <li  name='sports' className={style.li} onClick={category}> খেলা </li>
                                <li  name='science' className={style.li} onClick={category} > বিজ্ঞান </li>
                                <li  name='book_and_cinema' className={style.li} onClick={category}> বই ও সিনেমা</li>
                                <li  name='bd' className={style.li} onClick={category}> বাংলাদেশ</li>
                                <li  name='world' className={style.li} onClick={category}> বিশ্ব </li>
                  </ul>
           </div>

           <div className={style.thirdPart}>
                <p className={style.contact}>Email us for general inquiries and copyright information</p>
                <p>Contact: 01307362599</p>
          </div>
    </div>
  )
}

export default Footer