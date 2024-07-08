import CardsType2 from "./CardsType2";
export default function ({ topUpcoming }) {
  return (
    <>
      <div className="grid w-full grid-cols-2 gap-8 py-8 text-slate-50 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {(topUpcoming || []).map((topUpcoming, index) => (
          <CardsType2
            id={topUpcoming.id}
            key={index}
            name={topUpcoming.name}
            poster={topUpcoming.poster}
            duration={topUpcoming.duration}
            type={topUpcoming.type}
          />
        ))}
      </div>
    </>
  );
}
