//import './AddPost.css';
import React from 'react'
import useForm from './useForm';
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [formData, setFormData] = useForm({});
    const navigate = useNavigate();

   async function onSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`${response.statusCode} ${response.statusText}`);
            }

            navigate('/');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                Username:
                <input name="userName" value={formData.userName} onChange={setFormData} />
            </label>
            <label>Password:
                <input name="password" value={formData.password} onChange={setFormData}></input>
            </label>
            <button>Login</button>
        </form>
    )
}