import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './routes/Home';
import Login from './routes/Login';

export default function App() {
    const [isLoginPage, setIsLoginPage] = useState(false);

    return (
        <Layout isLogIn={isLoginPage ? " log-screen" : ""} >
            <Routes>
                <Route path='/' element={<Home setIsLoginPage={setIsLoginPage} />} />
                <Route path='/login' element={<Login setIsLoginPage={setIsLoginPage} />} />
            </Routes>
        </Layout>
    );
}