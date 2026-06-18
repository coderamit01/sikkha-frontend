
import { Skeleton } from "@/components/ui/skeleton"

const TableLoader = () =>  {
  return (
    <div className="flex w-full flex-col gap-2">
      {Array.from({ length: 15 }).map((_, index) => (
        <div className="flex gap-4" key={index}>
          <Skeleton className="h-5 flex-1" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
      ))}
    </div>
  )
}
export default TableLoader