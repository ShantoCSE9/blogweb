
import Masonry from 'react-masonry-css';
import DraftCard from './DraftCard';
const draft = ({value}) => {
  return (
    <>
         { value?  <Masonry
        breakpointCols={{
          default:5,
          1500:4,
          1200:3,
          1000:2,
          700:1,
          

        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
       
       { value.map((item)=>{
        return   <DraftCard key={item._id} value={item}/> 
      }) } </Masonry>:" "
    }
    
    </>
  
  )
}

export default draft