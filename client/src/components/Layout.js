import '../css/layout.css';

export default function Layout(props) {
    return (
        <body>
            <div class="card">
                {props.children}
            </div>
        </body>
    )
}