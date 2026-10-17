import Cards from "../components/Biography/Cards"
import Footer from "../layout/Footer"
import Navbar from "../layout/Navbar"
import '../style/Biography.css'

import { useParams } from "react-router-dom"

export default function Biography() {
    const { id } = useParams()

    return (
        <div className="app-container">
            <Navbar />
            <div className="main-context-block">
                <Cards />
            </div>
            <Footer />
        </div>
    )
}