# 🎬 OMDb Movie Search App

A modern, responsive movie search application built with React, TypeScript, and Vite. Search for movies, TV series, and episodes using the OMDb API with a beautiful, intuitive interface.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🔍 **Advanced Search** - Search movies, TV series, and episodes by title
- 🎯 **Smart Filtering** - Filter by type (movie, series, episode) and year
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎨 **Modern UI** - Clean, intuitive interface with Tailwind CSS
- 📊 **Detailed Information** - Comprehensive movie details including ratings from IMDb, Rotten Tomatoes, and Metacritic
- 🔄 **Real-time Search** - Debounced search with loading states
- 📄 **Pagination** - Navigate through search results efficiently
- 🎭 **Movie Slider** - Quick preview of movie details in a slide-out panel
- 🛡️ **Type Safety** - Full TypeScript implementation for better development experience

## 🚀 Tech Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.14
- **UI Components**: Ant Design 5.27.4
- **HTTP Client**: Axios 1.12.2
- **Routing**: React Router DOM 7.9.3
- **API**: OMDb API

## 📋 Prerequisites

- Node.js (version 20.19+ or 22.12+)
- npm or yarn
- OMDb API key ([Get one here](http://www.omdbapi.com/apikey.aspx))

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/OmarIsmail0/nexus-assessment.git
   cd nexus-assessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** Create a `.env` file in the root directory:

   ```env
   VITE_OMDB_API_KEY=your_omdb_api_key_here
   VITE_OMDB_API_URL=http://www.omdbapi.com/
   VITE_OMDB_IMG_URL=http://img.omdbapi.com/
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser** Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
src/
├── api/                    # API layer
│   ├── agent.ts           # Axios configuration
│   ├── index.ts           # API exports
│   └── omdb/              # OMDb API functions
│       ├── index.ts
│       └── omdb.ts
├── components/            # Reusable components
│   ├── MovieCard.tsx      # Movie card component
│   └── MovieDetailsSlider.tsx # Movie details slider
├── config/                # Configuration files
│   └── appConfig.ts       # App configuration
├── pages/                 # Page components
│   ├── SearchPage.tsx     # Main search page
│   └── MovieDetailPage.tsx # Movie detail page
├── types/                 # TypeScript type definitions
│   └── index.ts           # API and app types
├── assets/                # Static assets
├── App.tsx                # Main app component
├── main.tsx               # App entry point
└── vite-env.d.ts          # Vite environment types
```

## 🎯 Key Features Explained

### Type-Safe API Integration

- Comprehensive TypeScript interfaces for OMDb API responses
- Type-safe API calls with proper error handling
- IntelliSense support for all API interactions

### Responsive Grid Layout

- Adaptive grid that adjusts based on screen size
- Mobile-first design approach
- Optimized for all device types

### Advanced Search & Filtering

- Real-time search with debouncing
- Filter by content type and release year
- Pagination for large result sets

### Movie Details

- Comprehensive movie information display
- Ratings from multiple sources (IMDb, Rotten Tomatoes, Metacritic)
- Responsive image handling with fallbacks

## 🔧 Configuration

### TypeScript Configuration

The project uses strict TypeScript configuration with:

- Strict type checking enabled
- No unused variables/parameters allowed
- Consistent casing enforcement
- ES2020 target with modern module resolution

### Tailwind CSS

Custom configuration with:

- Responsive design utilities
- Custom color schemes
- Optimized for performance

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build process includes:

1. TypeScript compilation and type checking
2. Vite bundling and optimization
3. Asset optimization and compression

### Deploy to Vercel/Netlify

1. Connect your GitHub repository
2. Set environment variables in the deployment platform
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Usage

This application uses the OMDb API. Please ensure you:

- Have a valid API key
- Respect the API rate limits
- Use the API responsibly

## 🐛 Troubleshooting

### Common Issues

1. **TypeScript errors**: Run `npm run type-check` to identify type issues
2. **Build failures**: Ensure all environment variables are set correctly
3. **API errors**: Verify your OMDb API key is valid and active

### Getting Help

- Check the [Issues](https://github.com/OmarIsmail0/nexus-assessment/issues) page
- Review the TypeScript configuration in `tsconfig.json`
- Ensure all dependencies are installed correctly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OMDb API](http://www.omdbapi.com/) for providing the movie database
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) teams
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Ant Design](https://ant.design/) for the UI components

---

**Built with ❤️ using React, TypeScript, and Vite**
