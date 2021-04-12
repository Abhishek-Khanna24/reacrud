import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>CRUD FOR maxo and acme </h1>
            <p><Link to="users">&gt;&gt; Manage orders</Link></p>
        </div>
    );
}

export { Home };