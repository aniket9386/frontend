import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const host = "http://localhost:5000"
const host = "http://mynote-book-app-backened.herokuapp.com"
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useNavigate();

    if (localStorage.getItem('token')) {
        history("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Logged In Sucessfully", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h3 className='my-3'>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" placeholder="Enter Email" id="email" name="email" value={credentials.email} onChange={onChange} required />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" placeholder="Enter Password" id="password" name="password" value={credentials.password} onChange={onChange} required />
                    <label htmlFor="password">Password</label>
                </div>

                <button type="submit" className="btn btn-primary px-5" >Login</button>
            </form>
        </>
    )
}

export default Login