import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    let history = useNavigate();
    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname)
    }, [location])

    const handleLogout = () => {
        localStorage.removeItem('token');
        history("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        iNoteBook
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                        {!localStorage.getItem('token') ? <div className='d-flex gap-2 mx-2'>
                            <Link className='btn btn-light' to="/login">Login</Link>
                            <Link className='btn btn-light' to="/signup">Signup</Link>
                        </div> :
                            <button className='btn btn-light ms-2' onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar