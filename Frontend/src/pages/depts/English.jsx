import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import EnglishInternalModel from '../depts/Models/EnglishInternalModel'
import '../depts/Styles/Department.css'
import '../virtualTour/VirtualTour.css' // for loader CSS

// 🔹 Loader component
function ModelLoader() {
    const { progress } = useProgress()
    return (
        <Html center>
            <div className="model-loader">
                <div className="loader-circle1"></div>
                <p>Loading...</p>
                <p>{progress.toFixed(0)}%</p>
            </div>
        </Html>
    )
}

const English = () => {
    const [showCanvasPage, setShowCanvasPage] = useState(false)

    const Content = [
        {
            title: "Introduction",
            description:
                "The Department offers both Linguistics and Literature, emphasizing English language skills and producing competent professionals and teachers well-versed in English Literature."
        },
        {
            title: "Career Prospects",
            description:
                "English serves as a global lingua franca, creating vast career opportunities. The Department’s curriculum is designed to meet modern linguistic and literary demands."
        },
        {
            title: "Research and Higher Studies",
            description:
                "Our M.Phil. and Ph.D programs combine theory, application, and research in linguistics, integrating modern research trends and methodologies."
        },
        {
            title: "Graduate Success",
            description:
                "Our graduates excel in teaching, academia, civil services, and research, contributing to meeting the national demand for skilled English professionals."
        },
    ]

    const handleExplore = () => setShowCanvasPage(true)
    const handleReturn = () => setShowCanvasPage(false)

    useEffect(() => {
        if (showCanvasPage) window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [showCanvasPage])

    return (
        <>
            {!showCanvasPage ? (
                <div className="main">
                    <div className="section1">
                        <div className="left">
                            <h1 className="heading" style={{ fontSize: "55px" }}>Department of English</h1>
                            <button className="btn" onClick={handleExplore}>Explore Virtual Tour</button>
                        </div>
                        <div className="right">
                            <img src="/depts/english.jpg" alt="English Department" className="img" />
                        </div>
                    </div>

                    <div className="section2">
                        <div className="sub-content">
                            {Content.map((item, index) => (
                                <div key={index} className="content-block">
                                    {item.title && <h3>{item.title}</h3>}
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="canvas-container">
                        <Canvas camera={{ fov: 75 }} gl={{ toneMappingExposure: 1.2 }} shadows>
                            <color attach="background" args={['#b5d1f5']} />
                            <Suspense fallback={<ModelLoader />}>
                                <EnglishInternalModel active />
                            </Suspense>
                        </Canvas>
                    </div>

                    <div className="button-container">
                        <button className="btn back" onClick={handleReturn}>🏠 Back to Main Page</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default English
