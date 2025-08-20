export default function ({ genre }) {
  const colors = [
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
    "teal",
  ];

  return (
    <div className="scrollbar-hide flex flex-wrap gap-3 px-2 py-2 text-start">
      {genre.map((genres, index) => {
        const color = colors[index % colors.length];
        const badgeColor =
          color === "red"
            ? "bg-red-100 text-red-500 border-red-200"
            : color === "green"
              ? "bg-green-100 text-green-500 border-green-200"
              : color === "blue"
                ? "bg-blue-100 text-blue-500 border-blue-200"
                : color === "indigo"
                  ? "bg-indigo-100 text-indigo-500 border-indigo-200"
                  : color === "purple"
                    ? "bg-purple-100 text-purple-500 border-purple-200"
                    : color === "pink"
                      ? "bg-pink-100 text-pink-500 border-pink-200"
                      : color === "teal"
                        ? "bg-teal-100 text-teal-500 border-teal-200"
                        : "bg-gray-100 text-gray-500 border-gray-200";
        return (
          <span
            key={index}
            className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold shadow-sm ${badgeColor}`}
          >
            {genres}
          </span>
        );
      })}
    </div>
  );
}
