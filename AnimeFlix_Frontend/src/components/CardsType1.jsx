export default function ({ name, poster, rank }) {
    return (
        <>
            <div className="flex w-52 h-72 ">
                <div className="w-1/6 h-full  absolute bg-hookers-green  flex flex-col ">
                    <p className="text-xl text-black">{rank<10 ? "#0"+rank : "#"+rank }</p>
                    <span className="px-4   text-black text-ellipse  whitespace-nowrap rotate-90">{name}</span></div>
                <div className="h-full ">
                    <img className="object-cover" src={poster} alt="" /></div>
            </div>
        </>
    )
}   