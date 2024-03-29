export default function ({ name, otherInfo, duration, poster }) {
    return (
        <>
            <div className="flex h-full">
                <div className=" ">
                    <img src={poster} alt="" />
                </div>
                <div className="w-1/5  flex   ">
                    <p className="text-xl  ">
                        {name}
                    </p>
                    <span className="px-4  ">{otherInfo[0]}</span>
                </div>
            </div>
        </>
    );
}
