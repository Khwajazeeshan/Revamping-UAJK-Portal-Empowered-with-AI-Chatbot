import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import ChemistryInternalModel from '../depts/Models/ChemistryInternalModel'
import '../depts/Styles/Department.css'
import '../virtualTour/VirtualTour.css' // loader CSS reuse

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

const Chemistry = () => {
    const [showCanvasPage, setShowCanvasPage] = useState(false)

    const Content = [
        {
            title: "A Legacy of Excellence",
            description:
                "The Department of Chemistry at the University of Azad Jammu and Kashmir was established in 1984. Since then, it has been committed to providing quality education and conducting cutting-edge research in various fields of chemistry.",
        },
        {
            title: "A Strong Foundation",
            description:
                "Our faculty members are highly qualified and experienced, with a strong focus on research. We offer undergraduate and graduate programs that equip students with the knowledge and skills needed to succeed in academia and industry.",
        },
        {
            title: "Research and Innovation",
            description:
                "We encourage students to engage in research activities and publish their findings in reputable journals. Our research areas include natural products, metal extractions, coordination chemistry, surface chemistry, environmental chemistry, bio-analytical chemistry, analytical chemistry, organic synthesis, sonochemistry, and studies of biological activities.",
        },
        {
            title: "A Bright Future",
            description:
                "Our graduates are well-prepared for careers in academia, industry, and government sectors. We strive to provide a supportive learning environment that fosters critical thinking, problem-solving, and innovation.",
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
                            <h1 className="heading" style={{ fontSize: "55px" }}>Department of Chemistry</h1>
                            <button className="btn" onClick={handleExplore}>Explore Virtual Tour</button>
                        </div>
                        <div className="right">
                            <img src="/depts/chemistry.jpg" alt="Chemistry Department" className="img" />
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
                                <ChemistryInternalModel active />
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

export default Chemistry
