import { useState } from "react";

export default function App() {

    const [name, setName] = useState('');

    async function getPhp(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:80");
        const data = await response.json();
        console.log(data);
    }

    function handleChange(event) {
        const value = event.target.value;
        setName(value);
    }

    return (
        <div className="form">
            <form method="POST" onSubmit={getPhp}>
                <input type="text" name="name" placeholder="name" onChange={handleChange}/>
                <input type="submit" value="click" name="submit"/>
            </form>
            <p>{name}</p>
        </div>
    );
}