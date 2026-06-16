import { BookingStatus, IBooking } from "@/types/booking.types"


const TopTutors = ({ bookings }: { bookings: IBooking[] }) => {
  const topTutors = bookings.reduce((acc: any, book: IBooking) => {
    const tutorId = book.tutorId;
    if (!acc[tutorId]) {
      acc[tutorId] = {
        id: book.tutorId,
        name: book.tutor.name,
        sessions: 0,
        revenue: 0
      }
    }

    acc[tutorId].sessions += 1;

    if (book.status === BookingStatus.COMPLETED) {
      acc[tutorId].revenue += Number(book.totalPrice);
    }
    return acc;

  }, {});

  const sortedTutors = Object.values(topTutors).sort((a: any, b: any) => (b.session - a.session)).slice(0, 5);


  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">

      <div className="space-y-4">
        {sortedTutors.map((tutor: any, idx: number) => (
          <div key={tutor.id} className="flex items-center gap-4">

            <span className="text-sm font-bold text-gray-400 w-4">
              {idx + 1}
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{tutor.name}</p>
              <p className="text-xs text-gray-500">{tutor.sessions} sessions</p>
            </div>

            <span className="text-sm font-semibold text-gray-900">
              ৳{tutor.revenue.toFixed(2)}
            </span>

          </div>
        ))}

        {topTutors.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            No data available
          </p>
        )}
      </div>
    </div>
  )
}

export default TopTutors