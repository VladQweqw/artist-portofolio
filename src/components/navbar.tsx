import { useNavigate } from "react-router"

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <div className="navbar-section">
                <div 
                className="nav-item"
                onClick={() => navigate("/about")}
                >About me</div>

                <div 
                className="nav-item"
                onClick={() => navigate("/contact")}
                >Contact</div>
            </div>
            <div 
            onClick={() => navigate('/')}
            className="logo">
                <h2>Mario</h2>
            </div>
            <div className="navbar-section">
                <div 
                className="nav-item"
                onClick={() => navigate("/")}
                >Home</div>

                <div 
                className="nav-item"
                onClick={() => navigate("/gallery")}
                >My art</div>
            </div>
        </div>
    )
}