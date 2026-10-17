import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import Cards from "../components/Biography/Cards"
import Search from "../components/Biography/Search"
import Font from "../components/Biography/Font"
import "../style/Home.css"
export default function Home() {
    return(
        <div className="app-container home-page">
            <Navbar />
            <div className="main-context-block">
                <div className="main-context-block-cards">
                    <Cards />
                </div>
                <div className="main-context-block-search">
                    <Search />
                    <Font />
                </div>
            </div>
            <Footer />
        </div>
    )
}