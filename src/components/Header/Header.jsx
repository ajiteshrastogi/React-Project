import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='w-full py-4 bg-[rgba(30,32,50,0.92)] backdrop-blur-xl shadow-lg border-b-2 border-b-[var(--accent-blue)] relative z-20'>
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue)] to-transparent blur-sm opacity-70 pointer-events-none" />
      <div className='w-full max-w-screen-xl mx-auto px-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link to='/'>
            <Logo width='90px' />
          </Link>
          <span
            className="ml-4 text-4xl font-extrabold uppercase tracking-widest bg-gradient-to-r from-[var(--accent-yellow)] via-[var(--accent-blue)] to-[var(--accent-pink)] bg-clip-text text-transparent animate-neon-glow"
            style={{
              textShadow: `0 0 2px var(--accent-yellow), 0 0 4px var(--accent-blue)`,
              fontFamily: 'Orbitron, Poppins, Arial, sans-serif',
              letterSpacing: '0.18em',
              filter: 'drop-shadow(0 0 1px var(--accent-blue))',
              transition: 'text-shadow 0.3s',
            }}
          >
            BLOGNEST
          </span>
          <style>{`
            @keyframes neon-glow {
              0%, 100% { filter: drop-shadow(0 0 1px var(--accent-blue)) drop-shadow(0 0 2px var(--accent-yellow)); }
              50% { filter: drop-shadow(0 0 3px var(--accent-pink)) drop-shadow(0 0 4px var(--accent-blue)); }
            }
            .animate-neon-glow {
              animation: neon-glow 2s infinite alternate;
            }
          `}</style>
        </div>
        <ul className='flex gap-2'>
          {navItems.map((item) => 
          item.active ? (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.slug)}
                className='relative px-5 py-2 rounded-full font-semibold text-[var(--accent-blue)] bg-transparent transition-all duration-200 font-sans overflow-hidden group hover:bg-[rgba(0,255,247,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:ring-offset-2'
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-0.5 w-0 group-hover:w-3/4 bg-[var(--accent-pink)] transition-all duration-300 rounded-full" />
              </button>
            </li>
          ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header