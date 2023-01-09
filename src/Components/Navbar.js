import React, { useEffect, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AlertContext from '../Context/Alertcontext';
import Alert from './Alert'

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('tokens');
        navigate('/login');
    }
    let location = useLocation();
    useEffect(() => {

        // console.log(location.pathname);
    }, [location]);
    const context = useContext(AlertContext);
    const { alert } = context;
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg  bg-dark navbar-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">cloudBook </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname}==='/'? "active":""`} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname}==='/about'? "active":""`} to="/about">About</Link>
                                </li>

                            </ul>
                            {localStorage.getItem('tokens') ? <form className="d-flex" role="search">
                                <Link className="btn btn-primary mx-2" to="/login" onClick={handleLogout} role="button">Log Out</Link></form> : <form className="d-flex" role="search">
                                <Link className="btn btn-primary mx-2" to="/login" role="button">Log In</Link>
                                <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
                            </form>}
                        </div>
                    </div>
                </nav>
            </div>
            <Alert alert={alert} />
        </>
    )
}

export default Navbar

