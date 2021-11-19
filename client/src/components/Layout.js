import '../css/layout.css';

export default function Layout(props) {
    return (
        <body>
            <div class="bg"></div>
            <div class="bg bg2"></div>
            <div class="bg bg3"></div>
            <div class="blur"></div>
            <div class="card">
                {props.children}
            </div>
        </body>
    )
}