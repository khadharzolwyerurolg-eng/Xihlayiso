
import { Link } from "react-router-dom";
import "../style/Footer.css"
export default function Footer() {
    return (
        <div className="app-container">
            <footer className="site-footer">
                <div className="footer-inner">
                    
                    <div className="footer-links">
                        <Link to="/news">NEWS</Link>
                        <Link to="/biography">BIOGRAPHY</Link> 
                        <Link to="/gallery">GALLERY</Link> 
                        <Link to="/contact">CONTACT US</Link> 
                    </div>

                    <div className="footer-bottom">
                        <p className="copyright-text">
                            &copy; {new Date().getFullYear()} Xihlayiso. Todos os direitos reservados - Desenvolvido por Terdeu Abdullah.
                        </p>
                    </div>

                </div>
            </footer>
        </div>
    );
}
