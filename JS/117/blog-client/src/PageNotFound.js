import React from 'react'
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div>
            <h2>Page not found. 404. <Link to="/"></Link></h2>
        </div>
    )
}