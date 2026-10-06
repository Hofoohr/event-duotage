import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import Classement from './pages/Classement'
import Regles from './pages/Regles'
import Paris from './pages/Paris'
import config from './data/config.json'

const links = [
  { to: '/', label: 'Classement' },
  { to: '/regles', label: 'Règles' },
  { to: '/paris', label: 'Paris' },
]

function Logo() {
  return (
    <NavLink
      to="/"
      aria-label="Génération Miracle — accueil"
      className="absolute top-4 left-4 sm:top-6 sm:left-8 z-10 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12" />
    </NavLink>
  )
}

function Navigation() {
  return (
    <nav
      aria-label="Navigation principale"
      className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 flex flex-wrap justify-end gap-2"
    >
      {links.map(l => (
        <NavLink
          key={l.to}
          to={l.to}
          end
          className={({ isActive }) =>
            `px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
              isActive
                ? 'bg-brand-600 text-white'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
            }`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-950">
        <Logo />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Classement />} />
            <Route path="/regles" element={<Regles />} />
            <Route path="/paris" element={<Paris />} />
          </Routes>
        </main>
        <footer className="text-center py-8 px-4 text-xs text-gray-500 border-t border-gray-800 mt-20">
          <p>Site communautaire gratuit pour l'{config.eventName}</p>
          <p className="mt-2">Serveur {config.server} • Non affilié à Ankama</p>
        </footer>
      </div>
    </HashRouter>
  )
}
