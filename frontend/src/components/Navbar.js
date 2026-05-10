import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <h2>Diary App</h2>

            <div>
                <Link to="/">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}

export default Navbar;