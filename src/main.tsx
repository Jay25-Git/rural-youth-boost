import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { seedDatabase } from './lib/seedData'

// Initialize mock data
seedDatabase();

createRoot(document.getElementById("root")!).render(<App />);
