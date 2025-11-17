import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import GeologyModel from '../depts/Models/GeologyInternalModel'
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

const Geology = () => {
    const [showCanvasPage, setShowCanvasPage] = useState(false)

    const Content = [
        {
            title: "Introduction",
            description: "The Department of Geology at the University of Azad Jammu and Kashmir explores Earth's materials, structures, and processes shaping our planet."
        },
        {
            title: "Research Focus",
            description: "Our faculty and students conduct research in mineralogy, geophysics, environmental geology, and geological mapping."
        },
        {
            title: "Career Opportunities",
            description: "Graduates pursue careers in petroleum, mining, environmental consultancy, and academic research worldwide."
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
                            <h1 className="heading" style={{ fontSize: "60px" }}>Department of Geology</h1>
                            <button className="btn" onClick={handleExplore}>Explore Virtual Tour</button>
                        </div>
                        <div className="right">
                            <img src="/depts/geology.jpg" alt="Geology Department" className="img" />
                        </div>
                    </div>

                    <div className="section2">
                        <div className="sub-content">
                            {Content.map((item, index) => (
                                <div key={index} className="content-block">
                                    <h3>{item.title}</h3>
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
                                <GeologyModel active />
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

export default Geology
