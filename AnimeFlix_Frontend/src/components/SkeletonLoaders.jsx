// Card skeleton loader for card grids/lists
export function CardSkeletonLoader({ count = 8 }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 py-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex h-64 w-44 animate-pulse flex-col rounded-xl bg-slate-800 shadow-lg"
        >
          <div className="h-44 w-full rounded-t-xl bg-slate-700" />
          <div className="flex flex-1 flex-col justify-center gap-2 p-4">
            <div className="h-4 w-5/6 rounded bg-slate-600" />
            <div className="h-3 w-1/2 rounded bg-slate-600" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <div className="relative h-auto w-full min-h-screen">
      {/* Banner Skeleton */}
      <div className="w-full h-64 lg:h-96 bg-slate-800 animate-pulse rounded-2xl mb-8"></div>
      
      <div className="flex flex-col gap-10">
        {/* Trending Skeleton (5 Grid Cols) */}
        <div>
          <div className="h-8 w-40 bg-slate-700 rounded mb-4 animate-pulse"></div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={`trend-${i}`} className="h-24 bg-slate-800 rounded-lg animate-pulse flex items-center p-4 gap-4">
                <div className="w-16 h-16 bg-slate-700 rounded-md"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-700 rounded w-full"></div>
                  <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 10 Skeleton (3 Columns) */}
        <div>
           <div className="h-8 w-32 bg-slate-700 rounded mb-4 animate-pulse"></div>
           <div className="flex flex-col lg:flex-row gap-4">
             {[...Array(3)].map((_, col) => (
               <div key={`t10c-${col}`} className="flex-1 space-y-4">
                  {[...Array(5)].map((_, idx) => (
                     <div key={`r-${idx}`} className="h-16 bg-slate-800 rounded-lg animate-pulse flex items-center p-2 gap-4">
                       <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                       <div className="h-4 bg-slate-700 rounded flex-1"></div>
                     </div>
                  ))}
               </div>
             ))}
           </div>
        </div>

        {/* Rows of Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
           {[...Array(12)].map((_, i) => (
             <div key={`card-${i}`} className="w-full h-60 bg-slate-800 rounded-lg animate-pulse flex flex-col">
               <div className="flex-1 bg-slate-700 rounded-t-lg"></div>
               <div className="h-16 p-2 space-y-2">
                 <div className="h-4 bg-slate-600 rounded w-5/6"></div>
                 <div className="h-3 bg-slate-600 rounded w-1/2"></div>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

export default function AnimeInfoSkeletonLoader() {
  return (
    <div className="min-h-screen bg-transparent p-4 lg:pt-10 text-slate-300">
      <div className="mx-auto flex w-full max-w-[1420px] flex-col gap-8 lg:flex-row lg:px-6">
        {/* Left side - Image skeleton */}
        <div className="w-full lg:w-1/4 flex justify-center lg:justify-start">
          <div className="h-[350px] w-64 rounded-lg bg-slate-800 animate-pulse shadow-xl"></div>
        </div>

        {/* Center - Details skeleton */}
        <div className="w-full lg:w-2/4">
          <div className="mb-4 h-12 w-3/4 rounded-md bg-slate-800 animate-pulse"></div>

          <div className="mb-6 flex items-center gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 w-16 rounded bg-slate-800 animate-pulse"></div>
            ))}
          </div>

          <div className="mb-8 flex gap-4">
            <div className="h-12 w-32 rounded-lg bg-slate-800 animate-pulse"></div>
            <div className="h-12 w-12 rounded-full bg-slate-800 animate-pulse"></div>
          </div>

          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-slate-800 animate-pulse"></div>
            <div className="h-4 w-full rounded bg-slate-800 animate-pulse"></div>
            <div className="h-4 w-5/6 rounded bg-slate-800 animate-pulse"></div>
            <div className="h-4 w-4/6 rounded bg-slate-800 animate-pulse"></div>
          </div>
        </div>

        {/* Right side - Anime Info box skeleton */}
        <div className="w-full lg:w-1/4">
          <div className="rounded-lg bg-slate-800/80 p-6 shadow-md animate-pulse space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-5 rounded bg-slate-700 w-full flex gap-2">
                 <div className="w-1/3 bg-slate-600 rounded"></div>
                 <div className="w-2/3 bg-slate-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnimeStreamSkeletonLoader() {
  return (
    <div className="flex min-h-[80vh] w-full max-w-[1420px] mx-auto flex-col gap-6 px-4 py-8 lg:flex-row lg:px-6">
      
      {/* Left + Center Area wrapper */}
      <div className="flex w-full flex-col-reverse gap-4 lg:w-4/5 lg:flex-row">
        
        {/* Left Side: Episode List Skeleton */}
        <div className="w-full flex-shrink-0 lg:w-1/4 space-y-2">
          <div className="h-10 w-full bg-slate-800 animate-pulse rounded-md border border-slate-700"></div>
          <div className="bg-slate-800/50 rounded-md p-2 space-y-2">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="h-10 w-full animate-pulse rounded-sm bg-slate-700"
              ></div>
            ))}
          </div>
        </div>

        {/* Center: Video Player Skeleton */}
        <div className="flex w-full flex-col gap-2 lg:w-3/4">
          <div className="w-full aspect-video animate-pulse rounded-xl bg-slate-800 shadow-xl"></div>
          {/* Controls Bar */}
          <div className="flex justify-end gap-2 h-8">
             <div className="w-20 bg-slate-800 rounded animate-pulse"></div>
             <div className="w-20 bg-slate-800 rounded animate-pulse"></div>
             <div className="w-12 bg-slate-800 rounded animate-pulse"></div>
          </div>
          {/* Server status bars */}
          <div className="flex gap-2 h-16 w-full">
            <div className="w-1/3 bg-slate-800 rounded animate-pulse"></div>
            <div className="w-2/3 bg-slate-800 rounded animate-pulse space-y-2 p-2">
              <div className="h-4 bg-slate-700 rounded w-1/2"></div>
              <div className="h-4 bg-slate-700 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Small Poster & Details Skeleton */}
      <div className="w-full lg:w-1/5 space-y-4">
        <div className="h-40 w-28 animate-pulse rounded-md bg-slate-800 shadow-md"></div>
        <div className="h-8 w-full animate-pulse rounded border border-slate-700 bg-slate-800"></div>
        
        <div className="flex gap-2">
          <div className="h-6 w-1/4 bg-slate-800 rounded animate-pulse"></div>
          <div className="h-6 w-1/4 bg-slate-800 rounded animate-pulse"></div>
          <div className="h-6 w-1/4 bg-slate-800 rounded animate-pulse"></div>
        </div>

        <div className="space-y-2 pt-4">
           <div className="h-3 w-1/4 bg-slate-800 rounded animate-pulse"></div>
           <div className="h-3 w-full bg-slate-800 rounded animate-pulse"></div>
           <div className="h-3 w-full bg-slate-800 rounded animate-pulse"></div>
           <div className="h-3 w-3/4 bg-slate-800 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
