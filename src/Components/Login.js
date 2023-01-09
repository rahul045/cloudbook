import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../Context/Alertcontext';
const Login = () => {
    const context = useContext(AlertContext);
    const { showAlert } = context;
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const onChange = (e) => {

        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('tokens', json.authtoken);
            showAlert("Login Successfull", "success");
            navigate('/');
        }
        else {
            showAlert("Invalid credentials", "danger");
        }
    }
    return (
        <div>
            <h2>Login to continue on cloudBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" name="email">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" name="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
