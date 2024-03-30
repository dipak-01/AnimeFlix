export default function ({ data }) {
  return (
    <>
      {data.map((data, index) => (
        <div key={index} className="">
          <img src={data.poster} alt="" />
          <p>{data.name}</p>
          <p>{data.otherInfo[0]}</p>
        </div>
      ))}
    </>
  );
}
