import Footer from '@/components/Footer';
import '@/styles/globals.css';
import '@fontsource/roboto/500.css';
import AppStore from './context';

export default function App({ Component, pageProps }) {
  return   <div className='hgt' style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
    <AppStore >
     <Component {...pageProps} />
     <Footer/>
  </AppStore>
  </div>
}
