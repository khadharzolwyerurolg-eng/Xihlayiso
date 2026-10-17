import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Font() {
    // Array estático com os logótipos e nomes reais das fontes de Moçambique
    const fontBiographies = [
        {
            _id: "f1",
            namesite: "RM",
            imageLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZfgn8eX3D6RApuCe64Vf0K-m5sF0OCGDEmFa6fdHeqA&s=10"
        },
        {
            _id: "f2",
            namesite: "FFLC",
            imageLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsVLXNdq7wVZeHERhqfzzQlSMu69flhe1Cmb4HCFt0oalDe3lqNtpJEEUz&s=10"
        },
        {
            _id: "f3",
            namesite: "CCFM",
            imageLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM3JO4wD1X7sccmyq2CmOC3cof0iBhpQJMP9V0fNVdSw&s=10"
        },
        {
            _id: "f4",
            namesite: "UEM",
            imageLogo: "data:image/png;base64,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"
        },
        {
            _id: "f5",
            namesite: "Buala",
            imageLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT633vBcI6K0WcMAG-vTglL_n3cKduBBBEz-Q5bzODuoA&s=10"
        }
    ];

    return (
        <div className="app-container">
            <div className="app-container-context">
                <div className="gallery-wrapper" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', margin: '2rem' }}>
                    {fontBiographies.map((bio) => {
                        return (
                            <div className="gallery-container" key={bio._id}>
                                <div className="gallery-item" style={{  padding: '20px', textAlign: 'center', width: '200px' }}>
                                    <div className="image" style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img 
                                            src={bio?.imageLogo} 
                                            alt={bio?.namesite} 
                                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                                        />
                                    </div>
                                    <div className="descname" style={{ marginTop: '10px' }}>
                                        <h3 style={{ fontSize: '1rem', color: '#333' }}>{bio?.namesite}</h3>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
