import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../Context/Alertcontext';

const Signup = () => {
    const context = useContext(AlertContext);
    const { showAlert } = context;
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const onChange = (e) => {

        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('tokens', json.authtoken);
            showAlert("Account created successfully", "success");
            navigate('/');
        }
        else {
            showAlert("User already exists", "danger");
        }
    }
    return (
        <div>
            <h2>Login to continue on cloudBook</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label" name="name">Name</label>
                    <input type="text" className="form-control" id="name" value={credentials.name} aria-describedby="emailHelp" name="name" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" name="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" name="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={credentials.password} id="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" name="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" name="cpassword" className="form-control" value={credentials.cpassword} id="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
