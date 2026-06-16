import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "../ui/skeleton";


export const CategoriesLoader = () => {
  const count = Array.from({ length: 8 })
  return (
    <div className="max-w-310 mx-auto px-4 py-15 lg:py-18">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {
          count.map((c, i) => (
            <Card className="w-full max-w-xs" key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-2/4" />
                <Skeleton className="h-1 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="aspect-video w-full" />
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  );
}