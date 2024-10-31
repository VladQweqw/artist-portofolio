import { useEffect, useState } from "react";
import { useNavigate } from "react-router"

export default function Navbar() {
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState<boolean>(false)

    useEffect(() => {

        if (JSON.parse(sessionStorage.getItem('isUser') || "false")) {
            setIsLogged(true)
        }
    }, [])


    return (
        <div className="navbar">
            <div className="navbar-section">
                <div
                    className="nav-item"
                    onClick={() => navigate("")}
                >FAQ</div>

                <div
                    className="nav-item"
                    onClick={() => navigate("/contact")}
                >Contact</div>
            </div>
            <div
                onClick={() => navigate('/')}
                className="logo">
                <h2>House of Art</h2>
            </div>
            <div className="navbar-section">
                {isLogged ?
                    <div
                        className="nav-item"
                        onClick={() => navigate(`/account`)}
                    >Account</div>
                    :
                    <div
                        className="nav-item"
                        onClick={() => navigate("/signup")}
                    >Sign up</div>
                }
                <div
                    className="nav-item"
                    onClick={() => navigate(`/signup`)}
                >Sign up</div>
            </div>
        </div>
    )
}