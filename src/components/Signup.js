import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const host = "http://localhost:5000"
const host = "https://mynote-book-app-backened.herokuapp.com"
const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    let history = useNavigate();

    if (localStorage.getItem('token')) {
        history("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Account Created Sucessfully", "success");
        } else {
            props.showAlert("User Exists", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h3 className='my-3'>Signup</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="Enter Name" id="name" name="name" value={credentials.name} onChange={onChange} required minLength="3" />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" placeholder="Enter Email" id="email" name="email" value={credentials.email} onChange={onChange} required />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" placeholder="Enter Password" id="password" name="password" value={credentials.password} onChange={onChange} required minLength="5" />
                    <label htmlFor="password">Password</label>
                </div>

                <button type="submit" className="btn btn-primary px-5" >Signup</button>
            </form>
        </>
    )
}

export default Signup