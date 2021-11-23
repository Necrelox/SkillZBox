import '../css/layout.css';

export default function Layout(props) {
    return (
        <div className="body-container">
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className={"card"}>
                {props.children}
            </div>
        </div>
    )
}