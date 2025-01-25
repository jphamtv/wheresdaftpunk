# Where's Daft Punk? - An Image Tagging Game

A "Where's Waldo?"-style game where players search for famous artists hidden in a crowded music festival scene. Test your speed and observation skills by finding all the artists as quickly as possible!

## Live Demo
[Where's Daft Punk?](https://where-is-daft-punk.onrender.com/) - Optimized for desktop only

## Features
- Interactive image search with targeting system
- Real-time validation of found artists
- Server-side time tracking for accurate scores
- Global leaderboard of best times
- Audio feedback for enhanced gaming experience

## Tech Stack
### Frontend
- React with TypeScript
- CSS Modules for styling

### Backend
- Node.js/Express
- TypeScript
- PostgreSQL for data persistence

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/jphamtv/odin-photo-tagging.git
cd odin-photo-tagging
```

2. Install backend dependencies
```bash
cd api
npm install
```

3. Install frontend dependencies
```bash
cd ../client
npm install
```

4. Set up environment variables
```bash
# In /api/.env
DATABASE_URL=your_postgres_connection_string
PORT=3000

# In /client/.env
VITE_API_URL=http://localhost:3000
```

5. Start the development servers
```bash
# Start backend (from /api directory)
npm run dev

# Start frontend (from /client directory)
npm run dev
```

The game should now be running at `http://localhost:5173`

## How to Play
1. Click anywhere on the festival scene to open the targeting box
2. Select an artist from the dropdown menu
3. If you found the right location, a marker will appear
4. Find all artists as quickly as possible
5. Submit your score. You'll make it to the leaderboard if you're in the top 5!

## Acknowledgments
- Project inspiration from The Odin Project curriculum
- Festival scene artwork by [Adam Carnegie](https://www.adamcarnegie.com/)
