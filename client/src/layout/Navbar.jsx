import "../style/Navbar.css"
import XyLogo from "../components/imgs/XyLogo.png"
import { NavLink } from "react-router-dom";
import DarkModeToggle from "../components/Button/DarkMode";
export default function Navbar() {
    return (
        <header className="site-header">
            {/* Bloco de cima: Contém apenas o Logotipo */}
            <div className="header-top">
                <div className="header-top-inner">
                    <img className="XyLogo" style={{margin: '-6rem'}}  src={XyLogo} alt="XyLogo"/>
                </div> 
            </div>

            {/* Bloco de baixo: Barra preta com a Navegação e Ícone de Busca */}
            <nav className="header-nav">
                <div className="header-nav-inner">
                    <div className="nav-links">
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>HOME</NavLink>
                        <NavLink to="/biography" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>BIOGRAPHY</NavLink>
                        <NavLink to="/gallery" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>GALLERY</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>CONTACT</NavLink>
                    </div>
                    <DarkModeToggle/>
                </div>
            </nav>
        </header>
    )
}