export default function Home(props) {
    function changeState() {
        props.setIsLogIn(oldValue => {
            return !oldValue;
        });
    }

    return (
        <button onClick={changeState}>Click</button>
    )
}