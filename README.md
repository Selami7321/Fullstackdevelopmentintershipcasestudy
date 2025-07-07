# Luxury Engagement Rings - Premium Collection

A beautiful, production-ready e-commerce website showcasing luxury engagement rings with real-time gold pricing, dynamic product filtering, and interactive product details modal.

## 🌟 Features

- **Real-time Gold Pricing**: Dynamic pricing based on current gold market rates
- **Interactive Product Carousel**: Smooth, responsive carousel with touch/swipe support
- **Product Detail Modal**: Full-featured product view with color selection and purchase options
- **Advanced Filtering**: Filter products by price range and popularity score
- **Color Variants**: View rings in Yellow Gold, Rose Gold, and White Gold
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Premium UI/UX**: Apple-level design aesthetics with smooth animations
- **Star Rating System**: Products rated based on popularity scores
- **Interactive Features**: Wishlist, quantity selection, and hover effects
- **RESTful API**: Clean backend API for product and pricing data

## 🎯 Case Study Highlights

This project demonstrates:
- **Modern React Architecture**: Component-based design with TypeScript
- **State Management**: Efficient state handling with React hooks
- **API Integration**: RESTful API consumption with error handling
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **User Experience**: Smooth animations, loading states, and interactive elements
- **Production Ready**: Environment configuration and deployment setup

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **CORS** enabled for cross-origin requests
- **Node-cron** for scheduled gold price updates
- **JSON** file-based product storage

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd luxury-engagement-rings
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

This will start both the backend API server (port 3001) and the frontend development server (port 5173).

## 🌐 Usage

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001 (shows available endpoints)

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products with optional filtering
- Query parameters:
  - `minPrice` - Minimum price filter
  - `maxPrice` - Maximum price filter
  - `minPopularity` - Minimum popularity score (0-1)
  - `maxPopularity` - Maximum popularity score (0-1)

### Gold Price
- `GET /api/gold-price` - Get current gold price per gram

## 🏗️ Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── ProductCard.tsx
│   │   ├── ProductCarousel.tsx
│   │   ├── ProductModal.tsx
│   │   ├── FilterPanel.tsx
│   │   └── LoadingSpinner.tsx
│   ├── services/           # API services
│   │   └── api.ts
│   ├── types/              # TypeScript types
│   │   └── Product.ts
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── products.json           # Product data
├── server.cjs              # Express backend server
├── netlify.toml            # Netlify deployment config
├── .env.example            # Environment variables example
└── package.json            # Dependencies and scripts
```

## 🎨 Design Features

- **Premium Color Palette**: Gold, navy, and neutral tones
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Touch Gestures**: Swipe support for mobile carousel navigation
- **Loading States**: Beautiful loading spinners and error handling

## 🔧 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality
- `npm run server` - Start only the backend server

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable `VITE_API_URL` to your backend URL

### Backend (Heroku/Railway)
1. The backend is ready for deployment with `server.cjs`
2. Update the `VITE_API_URL` environment variable for production

### Environment Variables

Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

For production deployment, set:
- `VITE_API_URL`: Your backend API URL
## 📱 Mobile Responsive

The application is fully responsive with breakpoints:
- Mobile: < 768px (1 product per view)
- Tablet: 768px - 1024px (2 products per view)
- Desktop: > 1024px (3 products per view)

## 🎯 Key Components

### ProductCard
- Interactive color selection
- Star rating display
- Hover overlay with quick actions
- Wishlist functionality
- Hover animations
- Popularity badges

### ProductCarousel
- Touch/swipe navigation
- Responsive grid
- Smooth transitions
- Navigation dots

### ProductModal
- Full product details view
- Color selection interface
- Quantity selector
- Add to cart functionality
- Feature highlights
- Responsive design

### FilterPanel
- Price range filtering
- Popularity score filtering
- Real-time gold price display
- Active filter indicators

## 🔮 Future Enhancements

- User authentication
- Shopping cart persistence
- Payment integration
- Product reviews and ratings
- Wishlist persistence
- Advanced search
- Product comparison
- Email notifications
- Admin dashboard

## 🌐 Live Demo

- **Frontend**: [Your Netlify URL]
- **Backend API**: [Your Backend URL]

## 📊 Performance Features

- Lazy loading images
- Code splitting
- Optimized bundle size
- Smooth animations (60fps)
- Fast API responses
- Responsive images
## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Made with ❤️ for luxury jewelry enthusiasts