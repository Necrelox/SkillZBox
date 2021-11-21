import { useNavigate } from 'react-router-dom';

export default function Home(props) {
    let navigate = useNavigate();

    function handleClick() {
        props.setIsLoginPage(true);
        navigate('/login');
    }

    return (
        <button onClick={handleClick}>Login</button>
    )
}