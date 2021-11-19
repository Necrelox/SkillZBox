import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './routes/Login';

export default function App() {
    const [isLogIn, setIsLogIn] = useState(false);

    return (
        <Layout isLogIn={isLogIn ? "" : " log-screen"}>
            <Routes>
                <Route path='/' element={<Login setIsLogIn={setIsLogIn} />} />
            </Routes>
        </Layout>
    );
}