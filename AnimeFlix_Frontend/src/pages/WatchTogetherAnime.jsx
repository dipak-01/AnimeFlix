import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
export default function () {
  const { id } = useParams();
  const location = useLocation();
  const { data } = location.state || {};
   return (
    <>{data.time === 0 && data.date === "" ? <div>hi</div> : <div>hii</div>}</>
  );
}
