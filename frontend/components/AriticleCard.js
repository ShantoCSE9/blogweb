import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import style from '../styles/ArticleCard.module.css';
const AriticleCard = ({value}) => {
let f=value.date.slice(0,10)
const router=useRouter();
AOS.init();
const eve=(e)=>{
  if(value.blogId)
  router.push(`/singleblog/${value.blogId}`) 
  else
  router.push(`/singleblog/${value._id}`)
}
return (
  
            <div className={style.gridItem}  data-aos="fade-up" onClick={eve}>
                <div> 
       <Image src={value.coverImg}
                    style={{borderTopLeftRadius:'25px',borderTopRightRadius:'25px',objectFit:'cover',width:'100%',height:'200px'}}  
                    width={0} height={0} sizes='50vw' alt='' />
                </div>
                 <div className={style.allInfo}>
                <h3 style={{margin:'5px 15px',boxSizing:'border-box',wordBreak:'break-word'}}>
                 {value.title}
                </h3>
                <p style={{margin:'5px 15px',textAlign:'justify',wordBreak:'break-word',fontSize:'14px'}}>
                  {value.desc}
                 </p>
              
                <div style={{margin:'5px 15px'}} >
                  <div style={{fontSize:'15px',color:'rgb(100, 100, 100)'}}>Author: {value.user.username}</div>
                
                   <div className={style.info}>
                    <div>{value.category} </div>
                    <div style={{padding:'0px 5px'}}> || </div>
                    <div style={{paddingTop:'1px'}}>{f}</div>
                   </div>
                </div>
                </div>
             
            </div>


  )
}

export default AriticleCard