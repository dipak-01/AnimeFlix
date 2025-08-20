// Card skeleton loader for card grids/lists
export function CardSkeletonLoader({ count = 8 }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 py-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex h-64 w-44 animate-pulse flex-col rounded-xl bg-gray-800 shadow-lg"
        >
          <div className="h-36 w-full rounded-t-xl bg-gray-700" />
          <div className="flex flex-1 flex-col justify-center p-4">
            <div className="mb-3 h-4 w-3/4 rounded bg-gray-600" />
            <div className="h-3 w-1/2 rounded bg-gray-600" />
          </div>
        </div>
      ))}
    </div>
  );
}
export function HomePageSkeleton() {
  return (
    <>
      <div className="relative h-full w-full text-slate-50">
        <div className="z-1 absolute inset-y-0 right-0 h-full w-full animate-pulse bg-gray-900 "></div>
        <div className="relative my-auto flex h-full w-2/3 flex-col justify-center gap-8 pb-20 pl-2 pt-32">
          <div className="lg:text3xl h-12 w-1/4 animate-pulse rounded-lg bg-gray-300 text-2xl text-hookers-green-700">
            <p className="font-medium"> </p>
          </div>
          <div className="my-1 line-clamp-2 h-12 w-2/4 animate-pulse rounded-md bg-gray-300 text-3xl lg:text-5xl"></div>

          <div className="h-6 w-3/4 animate-pulse rounded-md bg-gray-300 px-1 py-0 text-slate-900"></div>

          <div>
            <div className="mb-1 h-4 w-3/4 animate-pulse rounded-md bg-gray-300"></div>
            <div className="mb-1 h-4 w-3/4 animate-pulse rounded-md bg-gray-300"></div>
            <div className="mb-1 h-4 w-3/4 animate-pulse rounded-md bg-gray-300"></div>
          </div>
          <div className="flex space-x-4 text-sm lg:text-lg">
            <div className="flex h-12 w-1/4 animate-pulse items-center rounded-lg bg-gray-300 px-4 py-2 font-bold text-slate-900"></div>
            <div className="flex w-1/6 animate-pulse items-center rounded-lg bg-gray-300 px-4 py-2 font-bold text-slate-900"></div>
          </div>
        </div>
      </div>
      <div>
        <div className="my-4 h-10 w-1/5 animate-pulse rounded-md bg-gray-300"></div>
      </div>
      <div className="my-4 grid grid-cols-2 gap-4 rounded-lg lg:grid-cols-5 ">
        <div className="h-20 animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-20 animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-20 animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-20 animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-20 animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-20 animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-20 animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-20 animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-20 animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-20 animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-20 animate-pulse rounded-md "></div>
      </div>
    </>
  );
}

export default function AnimeInfoSkeletonLoader() {
  return (
    <div className="min-h-screen animate-pulse bg-gray-900 p-8 pt-24 text-gray-300">
      <div className="lg:max-w-8xl mx-auto flex w-full flex-col gap-8 lg:flex-row lg:px-20">
        {/* Left side - Image skeleton */}
        <div className="w-full lg:w-1/4">
          <div className="h-[400px] w-full rounded-lg bg-gray-700"></div>
        </div>

        {/* Center - Details skeleton */}
        <div className="w-full lg:w-1/2">
          <div className="mb-4 h-10 w-3/4 rounded bg-gray-700"></div>

          <div className="mb-4 flex items-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-6 w-12 rounded bg-gray-700"></div>
            ))}
          </div>

          <div className="mb-6 flex gap-4">
            <div className="h-10 w-32 rounded bg-gray-700"></div>
            <div className="h-10 w-40 rounded bg-gray-700"></div>
          </div>

          <div className="mb-2 h-6 w-1/4 rounded bg-gray-700"></div>
          <div className="mb-2 h-4 rounded bg-gray-700"></div>
          <div className="mb-2 h-4 rounded bg-gray-700"></div>
          <div className="mb-6 h-4 rounded bg-gray-700"></div>

          <div className="mb-6 h-20 rounded bg-gray-700"></div>
        </div>

        {/* Right side - Anime Info skeleton */}
        <div className="w-full lg:w-1/4">
          <div className="rounded-lg bg-gray-800 p-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1].map((i) => (
              <div key={i} className="mb-2 h-4 rounded bg-gray-700"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export function AnimeStreamSkeletonLoader() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col gap-8 bg-black px-4 py-10 lg:flex-row lg:px-20">
      {/* Left Side: Episode List Skeleton */}
      <div className="flex w-full flex-col-reverse gap-4 lg:w-4/5 lg:flex-row">
        <div className="w-full space-y-3 lg:w-1/5 lg:pr-4">
          {[...Array(14)].map((_, index) => (
            <div
              key={index}
              className="h-8 animate-pulse rounded-md bg-gray-700"
            ></div>
          ))}
        </div>
        {/* Center: Video Player Skeleton */}
        <div className="flex h-72 w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-900 p-4 shadow lg:h-[420px] lg:w-4/5">
          <div className="h-56 w-full animate-pulse rounded-lg bg-gray-700 lg:h-80"></div>
          <div className="h-6 w-1/2 animate-pulse rounded bg-gray-600"></div>
        </div>
      </div>
      {/* Right Side: Details Skeleton */}
      <div className="w-full space-y-4 pl-0 pt-8 lg:w-1/5 lg:pl-4 lg:pt-0">
        <div className="mx-auto h-44 w-3/4 animate-pulse rounded-lg bg-gray-700"></div>
        <div className="mx-auto h-8 w-5/6 animate-pulse rounded bg-gray-600"></div>
        <div className="mx-auto h-6 w-2/3 animate-pulse rounded bg-gray-600"></div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-600"></div>
        <div className="mx-auto h-4 w-1/2 animate-pulse rounded bg-gray-600"></div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-600"></div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-600"></div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-600"></div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-600"></div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-600"></div>
        <div className="mx-auto h-6 w-1/3 animate-pulse rounded bg-gray-500"></div>
      </div>
    </div>
  );
}
