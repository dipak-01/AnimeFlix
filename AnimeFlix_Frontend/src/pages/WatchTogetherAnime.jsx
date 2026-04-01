import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
export default function WatchTogetherAnime() {
  const { id } = useParams();
  const location = useLocation();
  const { data } = location.state || {};

  if (!data) return <div className="text-white py-20 text-center text-3xl">No data found.</div>;

  return (
    <>{data?.time === 0 && data?.date === "" ? <div>hi</div> : <div>hii</div>}</>
  );
}
