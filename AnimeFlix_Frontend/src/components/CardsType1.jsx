export default function ({ name, poster, rank }) {
    return (
        <>
            <div className="flex h-full">
                <div className="w-1/5  flex flex-col ">
                    <p className="text-xl text-hookers-green-700">{rank<10 ? "#0"+rank : "#"+rank }</p>
                    <span className="px-4 whitespace-nowrap rotate-90">{name}</span></div>
                <div className=" ">
                    <img src={poster} alt="" /></div>
            </div>
        </>
    )
}   