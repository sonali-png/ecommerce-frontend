import "../css/loader.css"
export default function Loader() {
    return (
        <div className="container">
            <div className="loader">
                <div class="cube-wrapper">
                    <div class="cube"></div>
                    <div class="cube"></div>
                    <div class="cube"></div>
                    <div class="cube"></div>
                </div>
            </div>
        </div>
    );
}