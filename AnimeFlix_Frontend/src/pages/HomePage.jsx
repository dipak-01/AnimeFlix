// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import Swiper from '../components/Swiper'
import TrendingCards from '../components/TrendingCards'
export default function HomePage() {

    return (
        <>
            <div className='px-12  text-slate-50'>
                {/* <Navbar /> */}
                <Swiper />
                <div className='text-3xl text-start py-8'>Trending</div>
                <TrendingCards  />
                <div>

                </div>
                {/* <Footer /> */}
            </div></>
    )
}