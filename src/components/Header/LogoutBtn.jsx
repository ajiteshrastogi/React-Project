import { useDispatch } from 'react-redux';
import authservice from '../../appwrite/auth';
import { logout } from '../../app/authSlice';

function LogoutBtn() { 
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authservice.logout().then(() => {
            dispatch(logout())
        })
    }
    
    return (
        <button
            className='inline-block px-6 py-2 rounded-full font-semibold text-[var(--accent-pink)] border border-[var(--accent-pink)] bg-transparent hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:ring-offset-2 transition-all duration-300 font-sans'
            onClick={logoutHandler}
        >Logout</button>
    ) ;
}

export default LogoutBtn;