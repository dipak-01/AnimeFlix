export default function DetailCard({ moreinfo }) {
  return (
     
      <div className="w-full p-4 lg:w-1/4 mx-auto">
        <div className="rounded-lg bg-gray-900 p-4 text-start text-slate-300 shadow-lg">
          <p>
            <span className="font-semibold italic">Japanese:</span>{" "}
            {moreinfo.japanese}
          </p>
          <p>
            <span className="font-semibold italic">Synonyms:</span>{" "}
            {moreinfo.synonyms}
          </p>
          <p>
            <span className="font-semibold italic">Aired:</span>{" "}
            {moreinfo.aired}
          </p>
          <p>
            <span className="font-semibold italic">Premiered:</span>{" "}
            {moreinfo.premiered}
          </p>
          <p>
            <span className="font-semibold italic">Duration:</span>{" "}
            {moreinfo.duration}
          </p>
          <p>
            <span className="font-semibold italic">Status:</span>{" "}
            {moreinfo.status}
          </p>
          <p>
            <span className="font-semibold italic">MAL Score:</span>{" "}
            {moreinfo.malscore}
          </p>
          <p>
            <span className="font-semibold italic">Genres:</span>{" "}
            {Array.isArray(moreinfo.genres) && moreinfo.genres.length === 1
              ? moreinfo.genres[0]
              : Array.isArray(moreinfo.genres)
                ? moreinfo.genres.join(", ")
                : moreinfo.genres}
          </p>
          <p>
            <span className="font-semibold italic">Studios:</span>{" "}
            {moreinfo.studios}
          </p>
        </div>
     </div>
  );
}
