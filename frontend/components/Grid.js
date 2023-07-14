import { CircularProgress } from '@mui/material';
import Masonry from 'react-masonry-css';
import AriticleCard from './AriticleCard';
const Grid = ({value}) => {
  return (
    <>
 
       { value?  <div className=''>
        <Masonry
        breakpointCols={{
          default:5,
          1600:3,
          1000:2,
          700:1,
          

        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
       
       { value.map((item)=>{
        return   <AriticleCard key={item._id} value={item}/> 
      }) } </Masonry>
       </div>:" "
    }
    
    </>
  
  )
}

export default Grid