import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import BotanyInternalModel from '../depts/Models/BotnayInternalModel'
import '../depts/Styles/Department.css'
import '../virtualTour/VirtualTour.css' // for loader styles

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

const Botany = () => {
    const [showCanvasPage, setShowCanvasPage] = useState(false)

    const Content = [
        {
            title: "Our Mission",
            description:
                "The Department of Botany at the University of Azad Jammu and Kashmir is dedicated to unraveling the mysteries of plant life. We offer programs from undergraduate to postgraduate levels to equip students with the knowledge and skills needed to address global challenges in agriculture, environment, and biotechnology.",
        },
        {
            title: "Cutting-Edge Research",
            description:
                "Our faculty members are engaged in research on molecular biology, genetics, ecology, and ethnobotany. We collaborate with global institutions to advance scientific knowledge and contribute to sustainable development.",
        },
        {
            title: "State-of-the-Art Facilities",
            description:
                "Our well-equipped laboratories and herbarium provide students with hands-on experience in research and experimentation, fostering innovation and critical thinking.",
        },
        {
            title: "A Bright Future",
            description:
                "Our graduates pursue careers in academia, research institutions, government agencies, and the private sector — contributing to a greener and sustainable world.",
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
                            <h1 className="heading" style={{ fontSize: "60px" }}>Department of Botany</h1>
                            <button className="btn" onClick={handleExplore}>Explore Virtual Tour</button>
                        </div>
                        <div className="right">
                            <img src="/depts/botany.jpg" alt="Botany Department" className="img" />
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
                                <BotanyInternalModel active />
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

export default Botany
