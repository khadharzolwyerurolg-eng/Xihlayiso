import { useSearchParams } from "react-router-dom"

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("q") || ""

    const updateQuery = (value) => {
        setSearchParams((currentParams) => {
            const nextParams = new URLSearchParams(currentParams)
            if (value.trim()) {
                nextParams.set("q", value)
            } else {
                nextParams.delete("q")
            }
            return nextParams
        }, { replace: true })
    }

    return (
        <form className="biography-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <div className="biography-search-controls">
                <input
                    id="biography-search-input"
                    type="search"
                    value={query}
                    onChange={(event) => updateQuery(event.target.value)}
                    placeholder="Name, title, or keyword"
                />
            </div>
        </form>
    )
}