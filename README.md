# Sikkha - Online Tutoring Platform Frontend

A modern, fully-featured online tutoring platform connecting students with tutors. Built with Next.js and deployed on Render, Sikkha enables seamless booking, payment processing, and educational management.

## 🌐 Live URL

**Frontend:** https://sikkha-frontend.onrender.com/

## ✨ Features

### Authentication & User Management
- Secure user authentication with Better Auth
- Role-based access control (Student, Tutor, Admin)
- User profile management
- Account settings and preferences
- Sign up and login for different user types

### Tutor Features
- Comprehensive tutor profile management
- Availability scheduling system
- Subject and category management
- Review and rating system
- Booking management and tracking
- Dashboard with statistics

### Student Features
- Browse and search tutors by subject and category
- View tutor profiles and availability
- Book tutoring sessions
- Secure payment processing via Stripe
- Review and rate tutors
- Booking history and management
- Personal dashboard

### Admin Features
- User management
- Booking statistics and monitoring
- Platform analytics
- Content moderation
- Category and subject management
- Revenue tracking

### Payment System
- Secure integration with Stripe
- Multiple payment methods
- Payment success handling
- Transaction history

### UI/UX
- Responsive design for mobile, tablet, and desktop
- Dark mode support with theme toggle
- Modern component library (shadcn/ui)
- Smooth loading states and animations
- Toast notifications for user feedback

## 🛠️ Technologies Used

### Core Framework
- **Next.js** (v16.2.5) - React framework for production
- **React** (v19.2.3) - UI library
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library

### State Management & Data Fetching
- **Zustand** (v5.0.13) - Lightweight state management
- **TanStack React Query** (v5.100.9) - Server state management
- **TanStack React Form** (v1.28.0) - Headless form state

### Payment & Authentication
- **Stripe** (v22.2.2) - Payment processing
- **@stripe/react-stripe-js** - Stripe React components
- **Better Auth** (v1.4.18) - Authentication library

### HTTP & Utilities
- **Zod** (v4.3.6) - TypeScript schema validation
- **next-themes** - Theme management
- **Sonner** - Toast notifications
- **react-spinners** - Loading spinners

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS transformation

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- A Stripe account for payment processing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/coderamit01/sikkha-frontend.git
   cd sikkha-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_API_URL=<your-backend-api-url>
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
   NEXT_PUBLIC_AUTH_URL=<your-auth-url>
   # Add other required environment variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

5. **Build for production**
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (authLayout)/      # Authentication pages layout
│   ├── (commonLayout)/    # Public pages layout
│   ├── (dashboardLayout)/ # Dashboard layout (admin, tutor, student)
│   └── payment/           # Payment-related pages
├── actions/               # Server actions for API calls
├── components/            # Reusable React components
│   ├── admin/            # Admin dashboard components
│   ├── authentication/   # Auth-related components
│   ├── common/           # Common UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   ├── tutor/            # Tutor-specific components
│   ├── student/          # Student-specific components
│   └── ui/               # Base UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and helpers
├── providers/             # Context providers
├── routes/                # Route configurations
├── services/              # API service functions
├── store/                 # Zustand store management
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── validation/            # Input validation schemas
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Security

- TypeScript for type safety
- Input validation with Zod schemas
- Secure authentication with Better Auth
- Encrypted payment processing with Stripe
- Environment variables for sensitive data
- Role-based access control

## 🌐 Deployment

The application is deployed on Render with the following process:

1. Push changes to the main branch
2. Render automatically builds and deploys the application
3. Environment variables are configured in Render dashboard
4. Live at: https://sikkha-frontend.onrender.com/

## 📦 Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| Next.js | 16.2.5 | React framework |
| React Query | 5.100.9 | Data fetching & caching |
| Stripe | 22.2.2 | Payment processing |
| Zustand | 5.0.13 | State management |
| Tailwind CSS | 4 | Styling |
| shadcn/ui | - | UI components |
| Zod | 4.3.6 | Schema validation |
| TypeScript | - | Type safety |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is private and proprietary.

## 📧 Contact

For inquiries or support, please contact the development team.

---

**Built with ❤️ for education**