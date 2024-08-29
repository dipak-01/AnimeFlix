export default function SeasonsSlider({ seasons,handleClick }) {
  return (
    <>
      <div className="lg:w-8/12">
        {seasons && seasons.length > 0 && (
          <div className="seasons mostly-customized-scrollbar  overflow-auto pt-8  ">
            <div>
              <p className=" text-start text-3xl text-slate-200">Seasons</p>
            </div>
            <div className="flex">
              {seasons.map((season, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(season.id)}
                  className="relative m-4 h-24 w-24 rounded-lg border border-slate-600 bg-cover    bg-center p-4 text-white shadow lg:w-40"
                  style={{
                    backgroundImage: `url('${season.poster}')`,
                  }}
                >
                  {/* Semi-transparent overlay */}
                  <div className="absolute inset-0 rounded-lg bg-black/65"></div>

                  <div className="relative z-10">
                    <h3 className="line-clamp-2 text-sm font-bold lg:text-lg">
                      {season.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
