import { useLocation } from "react-router-dom";
import { Loader } from "../components/Loading";

import CardsType2 from "../components/CardsType2";
export default function CategoryPages() {
  const location = useLocation();
  const { data, pageName } = location.state || {};
  window.scrollTo(0, 0);

  return (
    <>
      {data ? (
        <>
          <main className="mx-auto my-4  h-auto min-h-screen w-full max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-0">
            <div className="my-4 text-start text-3xl text-lavender-web-500">
              {pageName}
            </div>
            <div className="    grid w-full grid-cols-2 gap-8 py-8 text-slate-50 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {data?.map((data, index) => (
                  <CardsType2
                    key={index}
                    name={data.name}
                    type={data.type}
                    poster={data.poster}
                    id={data.id}
                  />
                ))}
            </div>
          </main>
        </>
      ) : (
        <main className="mx-auto my-4  h-auto w-full max-w-[1420px] px-2 text-slate-50 sm:px-4 lg:px-6 xl:px-0">
          <Loader />
        </main>
      )}
    </>
  );
}
