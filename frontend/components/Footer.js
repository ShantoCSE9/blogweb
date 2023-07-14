import { useRouter } from 'next/router';
import React from 'react'
import style from '../styles/Footer.module.css'
const Footer = () => {
  const router=useRouter();
 
  const category=(e)=>{
   let catValue;
   console.log(e);
   if(e.target.attributes[0].value==='history')
    catValue='history'
    if(e.target.attributes[0].value==='book_and_cinema')
    catValue='book_and_cinema'
    if(e.target.attributes[0].value==='sports')
    catValue='sports'
    if(e.target.attributes[0].value==='science')
    catValue='science'
    if(e.target.attributes[0].value==='bd')
    catValue='bd'
    if(e.target.attributes[0].value==='world')
    catValue='world'
    
  return  router.push(`/category/${catValue}`)
   
  }
  return (
  
  <div className={style.footer}>
           <div className={style.firstPart}>
              <div>
                  <h1 className={style.h1} onClick={()=>router.push('/')}>Bangla<span style={{
                        opacity:'.8',
                        color:"red"
                      }}>Blog</span></h1>
              </div>
              <div className={style.aboutBlog}>Lorem ipsum dolor sit amet. Eos quia explicabo non        galisum atque qui atque perferendis sitconsequatur quaerat in 
              tempora laborum vel voluptatibus blanditiis.Hic aliquid deserunt vel
              dicta autem ut quam suscipit eum aperiam nostrum qui quia accusamus eum ipsum expedita. </div>
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
                <p>Contact:01307362599</p>
          </div>
    </div>
  )
}

export default Footer