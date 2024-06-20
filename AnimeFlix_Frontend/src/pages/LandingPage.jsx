import { useNavigate } from "react-router-dom";
import LandingPageInfo from "../components/LandingPageInfo";

export default function LandingPage() {
    const navigate = useNavigate('');  

    const handleEnterClick = () => {
        navigate('/home');  
    }; 

    return (
        <>
            <div className=" bgMain text-slate-100  w-full xl:h-screen h-auto   flex  "  >
                <div className="  flex flex-col   justify-between items-center xl:flex-row w-11/12 xl:w-7/12 xl:h-3/4 h-full rounded-3xl bg-slate-900  m-auto backdrop-blur-md">
                    <div className="flex overflow-y-auto flex-col   md:w-1/2 w-11/12 h-3/4 py-6 xl:pl-16 " >
                        <div className=" flex justify-around">
                            <a href="/home">Home</a>
                            <a href="">Explore</a>
                            <a href="">Most Popular</a>
                            <a href="">Trending</a>
                        </div>
                        <div className="flex justify-center py-12">
                            <img className="w-52 h-16" src="/logo.png" alt="logo" />
                        </div>
                        <div className="">
                            {/* search */}
                        </div>
                        <div className='text-start'>
                            <span className="text-sm "><span className=" font-semibold">Suggestion</span><span className="text-ellipse " >: Solo Leveling, Overflow (Uncensored), Mashle: Magic and Muscles Season 2, Frieren: Beyond Journey's End, Classroom of the Elite III, Black Clover, Ninja Kamui, Tsukimichi -Moonlit Fantasy- Season 2, Hokkaido Gals Are Super Adorable!, Classroom of the Elite 2nd Season</span></span>
                        </div>
                        <div className="pt-8">
                            <button onClick={handleEnterClick} className='w-fit font-bold mx-auto p-4 bg-blue-500 rounded-3xl '>Enter AnimeFlix  <i className="pl-2 fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-11/12 h-3/4  p-8 xl:py-6 xl:px-12" >

                        <LandingPageInfo />

                    </div>

                </div>
            </div >
        </>
    )
}