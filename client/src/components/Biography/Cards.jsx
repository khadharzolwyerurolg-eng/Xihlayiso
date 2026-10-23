import { useEffect, useState } from "react"
import Xycover from "../imgs/XyCover.png"
import axios from "axios"
import { Link, useParams, useSearchParams } from "react-router-dom"
import Menu from "./Menu"
import { usePageLoading } from "../../context/LoadingContext"
import { BIOGRAPHY_API_URL } from "../../config/api"

const PAGE_SIZE = 6

function normalizeSearchText(value) {
    return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
}

function formatDate(value) {
    if (!value) return ""

    const date = new Date(value)
    return Number.isNaN(date.getTime())
        ? ""
        : new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(date)
}

export default function Cards() {
    const [biography, setBiography] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [shareMessage, setShareMessage] = useState("")
    const [page, setPage] = useState(1)
    const { id } = useParams()
    const { beginLoading, endLoading } = usePageLoading()
    const [searchParams] = useSearchParams()
    const query = normalizeSearchText(searchParams.get("q") || "").trim()
    const filteredBiography = query
        ? biography.filter((item) => {
            const searchableText = [
                item.name,
                item.title,
                item.summary,
                item.region,
                ...(Array.isArray(item.tags) ? item.tags : []),
                ...(Array.isArray(item.achievements) ? item.achievements : [])
            ].map(normalizeSearchText).join(" ")

            return query.split(/\s+/).every((term) => searchableText.includes(term))
        })
        : biography
    const totalPages = Math.ceil(filteredBiography.length / PAGE_SIZE)
    const visibleBiography = id
        ? biography
        : filteredBiography.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    useEffect(() => {
        let active = true
        setErrorMessage("")
        setPage(1)

        const fetchBioData = async () => {
            beginLoading()
            try {
                const url = id ? `${BIOGRAPHY_API_URL}/find/${id}` : `${BIOGRAPHY_API_URL}/all`
                const res = await axios.get(url)
                if (!active) return

                setBiography(id ? [res.data.biography] : res.data.biographies)
            } catch (error) {
                console.error(error)
                if (active) {
                    setBiography([])
                    setErrorMessage(error.response?.data?.message || "Unable to load biography.")
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

    useEffect(() => {
        setPage(1)
    }, [query])

    useEffect(() => {
        if (!shareMessage) return

        const timeoutId = window.setTimeout(() => setShareMessage(""), 5000)
        return () => window.clearTimeout(timeoutId)
    }, [shareMessage])

    const shareBiography = async (item) => {
        const url = window.location.href

        try {
            if (navigator.share) {
                await navigator.share({
                    title: item.name,
                    text: `Discover the biography of ${item.name}`,
                    url
                })
                setShareMessage("")
                return
            }

            await navigator.clipboard.writeText(url)
            setShareMessage("Link copied to clipboard.")
        } catch (error) {
            if (error.name === "AbortError") return

            console.error("Unable to share biography:", error)
            setShareMessage("Unable to share this biography.")
        }
    }

    return (
        <>
            <div className={`app-container-cards${id ? " biography-detail" : ""}`}>
                {errorMessage && <p role="alert">{errorMessage}</p>}
                {!id && !errorMessage && query && filteredBiography.length === 0 && (
                    <p role="status">No biographies found for: {searchParams.get("q")}</p>
                )}
                {visibleBiography?.map((biography) => {
                    if (id) {
                    return (
                            <article className="bio-info biography-detail-card" key={biography._id}>
                                

                                <div className="biography-detail-content">
                                    <div className="biography-detail-images">
                                        <div className="biography-detail-images-img">
                                            <img className="biography-watermark"  style={{width: '300px'}} src={Xycover} alt="" aria-hidden="true" />
                                            <img className="biographies-img" style={{filter: 'grayscale(100%)'}} src={biography.imageUrl} alt={biography.name} />
                                        </div>
                                        <div className="biography-detail-images-menu">
                                            <Menu />
                                        </div>
                                    </div>
                                    <header className="biography-detail-header">
                                        <h1>{biography.name}</h1>
                                        <p className="biography-detail-title">{biography.title}</p>
                                    </header>

                                    <section className="biography-detail-section">
                                        <p className="biography-detail-summary">{biography.summary}</p>
                                    </section>

                                    <section className="biography-detail-section">
                                        <h2>Achievements</h2>
                                        {biography.achievements?.length ? (
                                            <ul>
                                                {biography.achievements.map((achievement, index) => (
                                                    <li key={`${achievement}-${index}`}>{achievement}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No achievements listed.</p>
                                        )}
                                    </section>

                                    <section className="biography-detail-section">
                                        {biography.tags?.length ? (
                                            <ul className="biography-tags">
                                                {biography.tags.map((tag, index) => (
                                                    <li key={`${tag}-${index}`}>{tag}</li>
                                                ))}
                                                <button
                                                    className="biography-share"
                                                    type="button"
                                                    onClick={() => shareBiography(biography)}
                                                    aria-label={`Share biography of ${biography.name}`}
                                                >
                                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                                        <circle cx="18" cy="5" r="3" />
                                                        <circle cx="6" cy="12" r="3" />
                                                        <circle cx="18" cy="19" r="3" />
                                                        <path d="m8.7 10.7 6.6-4.4m-6.6 7 6.6 4.4" />
                                                    </svg>
                                                </button>
                                            </ul>
                                        ) : (
                                            <p>No tags listed.</p>
                                        )}
                                        {shareMessage && <p className="biography-share-status" role="status">{shareMessage}</p>}
                                    </section>

                                    {formatDate(biography.createdAt) && (
                                        <p className="biography-detail-date">
                                            Added {formatDate(biography.createdAt)}
                                        </p>
                                    )}
                                </div>
                            </article>
                        )
                    }

                    const cardContent = (
                        <>
                            <div className="image">
                                <img style={{filter: 'grayscale(100%)'}} className="image-content" src={biography?.imageUrl} alt={biography.name} />
                            </div>

                            <div className="bio-text-content">
                                <h2>{biography.name}</h2>
                                <div className="info-content">
                                    <p>{biography.title}</p>
                                    <span>{biography.summary}</span>
                                </div>
                            </div>
                        </>
                    )

                    return (
                        <Link
                            className="bio-info"
                            key={biography._id}
                            to={`/biography/${biography._id}`}
                        >
                            {cardContent}
                        </Link>
                    )
                })}
            </div>
            {!id && totalPages > 1 && (
                <nav className="pagination" aria-label="Pagination">
                    <button
                        type="button"
                        onClick={() => setPage((currentPage) => currentPage - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <button
                            type="button"
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            aria-current={pageNumber === page ? "page" : undefined}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => setPage((currentPage) => currentPage + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </nav>
            )}
        </>
    )
}