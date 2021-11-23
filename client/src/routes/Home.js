import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    let navigate = useNavigate();

    function handleClick() {
        navigate('/login');
    }

    return (
        <Fragment>

        </Fragment>
    )
}