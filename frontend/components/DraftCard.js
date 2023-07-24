import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import style from '../styles/DraftCard.module.css';
const DraftCard = ({value}) => {
  AOS.init();
const router=useRouter();
const eve=(e)=>{
     router.push({
        pathname:`/user/${value.blogId}`
      })
    
}
 const category=router.query.category;
 return (
  
            <div className={style.draftItem} data-aos="fade-up" onClick={eve}>
                <div > 
                    < Image  src={value.coverImg} 
                    width={0} height={0} sizes='50vw' alt=''  style={{borderRadius:'5%',objectFit:'cover',opacity:'.7',width:'100%',minHeight:'250px'}}  />
                </div>  
                <div  style={{width:'100%',height:'100%',
                               position:'absolute',top:'0',left:'0',display:'flex',
                               justifyContent:'center',alignItems:'center',flexDirection:'column',color:"black"}} >
                   <div style={{backgroundColor:'black',color:"white",borderRadius:"10px",padding:'10px',textAlign:'center'}}>
                    <h3>Pending...</h3>
                    <h5>Click here to edit your article</h5>
                   </div>
                </div>   
            </div>


  )
}

export default  DraftCard