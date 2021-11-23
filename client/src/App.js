import { Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/Layout';
import Home from './routes/Home';
import Login from './routes/Login';

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Layout>
    );
}