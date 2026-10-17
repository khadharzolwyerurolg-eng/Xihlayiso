import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import "../style/Gallery.css"

const API_URL = "https://xihlayiso.onrender.com/api/biography/all"
const ITEMS_PER_PAGE = 15;
const GRID_LAYOUTS = [
    "w-2 h-2",
    "w-2 h-1",
    "w-2 h-2",
    "w-1 h-2",
    "w-1 h-1",
    "w-1 h-1",
    "w-1 h-2",
    "w-1 h-1",
]

function createRandomLayouts(count) {
    const layouts = Array.from(
        { length: count },
        (_, index) => GRID_LAYOUTS[index % GRID_LAYOUTS.length]
    )

    for (let index = layouts.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const currentLayout = layouts[index]
        layouts[index] = layouts[randomIndex]
        layouts[randomIndex] = currentLayout
    }

    return layouts
}

export default function Gallery() {
    const [biography, setBiography] = useState([])
    const [gridLayouts, setGridLayouts] = useState([])
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
    const loadMoreRef = useRef(null)
    const article = useLocation().search

    useEffect(() => {
        const fetchBioData = async () => {
            try {
                const res = await axios.get(`${API_URL}${article}`)
                const biographies = res.data.biographies || []
                setBiography(biographies)
                setGridLayouts(createRandomLayouts(biographies.length))
                setVisibleCount(ITEMS_PER_PAGE)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBioData()
    }, [article])

    // OTIMIZADO: Removida a dependência de visibleCount para evitar recriações infinitas do Observer
    useEffect(() => {
        const loadMoreElement = loadMoreRef.current
        if (!loadMoreElement) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                // Usamos a função de atualização (prev) para pegar o estado mais recente com segurança
                setVisibleCount((prevCount) => {
                    if (prevCount >= biography.length) {
                        observer.unobserve(loadMoreElement) // Para de observar se chegou ao fim
                        return prevCount
                    }
                    return Math.min(prevCount + ITEMS_PER_PAGE, biography.length)
                })
            }
        }, { rootMargin: "0px 0px 400px 0px" })

        observer.observe(loadMoreElement)
        return () => observer.disconnect()
    }, [biography.length]) // Agora depende apenas do tamanho total da lista carregada

    const visibleBiographies = biography.slice(0, visibleCount);

    return (
        <div className="app-container">
            <Navbar />
            <div className="app-container-context">

                <div className="app-container">
                    {visibleBiographies.map((bio, index) => {
                        const spanClass = gridLayouts[index] || "w-1 h-1"

                        return (
                            <div className={`gallery-container ${spanClass}`} key={bio._id}>
                                <div className="gallery-item">
                                    <div className="image">
                                        <img src={bio?.imageUrl} alt={bio?.name} />
                                    </div>
                                    <div className="descname">
                                        <h3>{bio?.name}</h3>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mantemos a div de controle sempre ativa na árvore enquanto houver itens a carregar */}
                {visibleCount < biography.length && (
                    <div className="gallery-load-more" ref={loadMoreRef} aria-hidden="true" style={{ height: '10px' }} />
                )}

            </div>
            <Footer />
        </div>
    )
}
