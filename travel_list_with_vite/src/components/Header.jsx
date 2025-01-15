import { Link } from 'react-router-dom'

function Header () {
    return (
        <nav>
            <Link to="/">Home</Link> | 
            <Link to="/about">About</Link> | 
            <Link to="/settings">Settings</Link> |
            <Link to="/movielist">Movie List</Link>
        </nav>
    )
}

export default Header