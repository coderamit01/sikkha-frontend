import { StatsCard } from '@/components/student/StatsCard'
import { Card, CardContent } from '@/components/ui/card'
import { IBooking } from '@/types/booking.types'
import { CalendarCheck, MessageSquareX } from 'lucide-react'

const AdminBookingStats = ({ bookings }: { bookings: IBooking[] }) => {
  const stats = {
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
    completed: bookings.filter(b => b.status === 'COMPLETED').length,
    cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
  }
  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 h-full'>
      <Card className="card">
        <CardContent className="flex flex-col gap-4 px-3 lg:px-6">
          <div className="pb-3"><MessageSquareX className='h-10 w-10 p-2 rounded bg-green-50 text-green-700' /></div>
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold">{stats.completed}</h4>
            <p className="text-base">Completed Bookings</p>
          </div>
        </CardContent>
      </Card>
      <Card className="card">
        <CardContent className="flex flex-col gap-4 px-3 lg:px-6">
          <div className="pb-3"><CalendarCheck className='h-10 w-10 p-2 rounded bg-blue-50 text-blue-700' /></div>
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold">{stats.confirmed}</h4>
            <p className="text-base">Confirmed Bookings</p>
          </div>
        </CardContent>
      </Card>
      <Card className="card">
        <CardContent className="flex flex-col gap-4 px-3 lg:px-6">
          <div className="pb-3"><MessageSquareX className='h-10 w-10 p-2 rounded bg-red-50 text-red-700' /></div>
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold">{stats.cancelled}</h4>
            <p className="text-base">Cancelled Bookings</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default AdminBookingStats;