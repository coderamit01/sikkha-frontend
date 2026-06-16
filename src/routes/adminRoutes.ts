import { Route } from "@/types/rotute.type";


export const adminRoutes: Route[] = [
  {
    title: 'Dashboard',
    url: '/admin'
  },
  {
    title: 'Users',
    url: '/admin/users'
  },
  {
    title: 'Bookings',
    url: '/admin/bookings'
  },
  {
    title: 'Categories',
    url: '/admin/categories'
  },
  {
    title: 'Profile',
    url: '/admin/profile'
  },
]