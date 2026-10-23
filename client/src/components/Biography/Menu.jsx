import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { usePageLoading } from "../../context/LoadingContext"
import { BIOGRAPHY_API_URL } from "../../config/api"

const MAX_RELATED_BIOGRAPHIES = 5

function normalize(value) {
    return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
}

function getRelatedScore(biography, currentBiography) {
    const currentTags = new Set((currentBiography.tags || []).map(normalize))
    const sharedTags = (biography.tags || []).filter((tag) => currentTags.has(normalize(tag))).length
    const sameRegion = normalize(biography.region) === normalize(currentBiography.region)
    const currentTitleWords = new Set(normalize(currentBiography.title).split(/\s+/).filter(Boolean))
    const sharedTitleWords = normalize(biography.title)
        .split(/\s+/)
        .filter((word) => word && currentTitleWords.has(word)).length

    return sharedTags * 3 + (sameRegion ? 2 : 0) + sharedTitleWords
}

export default function Menu() {
    const [biography, setBiography] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = useParams()
    const { beginLoading, endLoading } = usePageLoading()

    useEffect(() => {
        let active = true

        if (!id) {
            setBiography([])
            setErrorMessage("")
            return () => {
                active = false
            }
        }

        const fetchBioData = async () => {
            beginLoading()
            try {
                setErrorMessage("")
                const [listResponse, currentResponse] = await Promise.all([
                    axios.get(`${BIOGRAPHY_API_URL}/all`),
                    axios.get(`${BIOGRAPHY_API_URL}/find/${id}`)
                ])
                if (!active) return

                const biographies = Array.isArray(listResponse.data.biographies)
                    ? listResponse.data.biographies
                    : []
                const currentBiography = currentResponse.data.biography
                const relatedBiographies = biographies
                    .filter((item) => item._id !== currentBiography._id)
                    .map((item) => ({
                        biography: item,
                        score: getRelatedScore(item, currentBiography)
                    }))
                    .filter((item) => item.score > 0)
                    .sort((a, b) => b.score - a.score)
                    .slice(0, MAX_RELATED_BIOGRAPHIES)
                    .map((item) => item.biography)

                setBiography(relatedBiographies)
            } catch (error) {
                console.error(error)
                if (active) {
                    setBiography([])
                    setErrorMessage(
                        error.response?.data?.message || "Unable to load related biographies."
                    )
                }
            } finally {
                endLoading()
            }
        }

        fetchBioData()
        return () => {
            active = false
        }
    }, [beginLoading, endLoading, id])

    if (!id) return null

    return (
        <div className="app-container-menu">
            <h2>Related biographies</h2>

            {errorMessage ? (
                <p role="alert">{errorMessage}</p>
            ) : biography.length === 0 ? (
                <p>No related biographies found</p>
            ) : (
                biography.map((item) => (
                    <div className="bio-info-menu" key={item._id}>
                        <div className="bio-info-menu-image">
                            <img style={{filter: 'grayscale(100%)'}} src={item.imageUrl} alt="" />
                        </div>
                        <div className="bio-info-menu-desc">
                            <h4>{item.name}</h4>
                            <Link to={`/biography/${item._id}`} className="readmore">Read More</Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}