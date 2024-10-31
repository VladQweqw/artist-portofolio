import { useNavigate } from "react-router"

export default function Footer() {
   const navigate = useNavigate();

   return(
    <div className="footer">
        <div className="contacts footer-section">
         <div className="email contact-form">
            Email:<br />
            <a href="mailto:hello@mario.com">hello@mario.com</a>
         </div>
         <div className="email contact-form">
            Tel:<br />
            <a href="tel:+40723232323">+4032 324 124</a>
         </div>

         
        </div>
        <div className="footer-section">
         <p id="trademark">© 2024 by Mario</p>
        </div>
        <div className="footer-section">
            <h2
            onClick={() => navigate('/contact')}
            >Contact</h2>
        </div>
        
    </div>
   )
}