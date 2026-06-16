import { IBooking } from "@/types/booking.types"
import { Subject } from "@/types/subject.types";

const PopularCategories = ({ bookings }: { bookings: IBooking[] }) => {

  const categoryCount = bookings.reduce((acc: any, book: IBooking) => {
    const subjects: Subject[] = book.tutor?.subjects
      ? Array.isArray(book.tutor.subjects)
        ? book.tutor.subjects
        : [book.tutor.subjects]
      : []

    subjects.forEach((subject: any) => {
      const name = subject?.category?.name ?? "Unknown"
      acc[name] = (acc[name] ?? 0) + 1
    })
    return acc

  }, {})

  const categories = Object.entries(categoryCount).map(([name, count]) => ({ name, count: count as number })).sort((a, b) => b.count - a.count).slice(0, 5);
  const maxCount = categories[0]?.count ?? 1

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-gray-700">{cat.name}</span>
              <span className="text-sm font-medium text-gray-900">
                {cat.count} bookings
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-500"
                style={{ width: `${(cat.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            No data available
          </p>
        )}
      </div>
    </div>
  )
}

export default PopularCategories