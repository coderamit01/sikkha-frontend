import { Skeleton } from "@/components/ui/skeleton";

const TutorDashboardSkeleton = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-55 w-full rounded-xl" />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
          <Skeleton className="h-5 w-32" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
        <Skeleton className="h-5 w-36" />
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-4 pb-2 border-b border-gray-100">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-3.5 w-20" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                <Skeleton className="h-3.5 w-20" />
              </div>
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-3.5 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorDashboardSkeleton;