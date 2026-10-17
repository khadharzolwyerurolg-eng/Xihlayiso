import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import "../style/Contact.css"

export default function Contact() {
    return (
        <div className="app-container">
            <Navbar />
            
            <div className="app-container-context">

                {/* Seção da Newsletter com a imagem de fundo aplicada pelo CSS */}
                <section className="explorer-newsletter">
                    <div className="newsletter-overlay">
                        <div className="newsletter-inner">
                            <h2 className="newsletter-title">Subscreva a Nossa Newsletter</h2>
                            
                            <p className="newsletter-description">
                                Receba em primeira mão as últimas novidades, lançamentos exclusivos e catálogos 
                                personalizados. Junte-se à nossa comunidade.
                            </p>

                            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="input-group">
                                    <input 
                                        type="email" 
                                        id="newsletter-email"
                                        required 
                                        placeholder=" "
                                    />
                                    <label htmlFor="newsletter-email">EMAIL</label>
                                </div>

                                <button type="submit" className="btn-confirm">
                                    CONFIRMAR
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    )
}
