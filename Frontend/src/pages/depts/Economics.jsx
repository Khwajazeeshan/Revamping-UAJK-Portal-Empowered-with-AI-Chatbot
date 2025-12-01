import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import EconomicsInternalModel from '../depts/Models/EconomicInternalModel'
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

const Economics = () => {
    const [showCanvasPage, setShowCanvasPage] = useState(false)

    const Content = [
        {
            title: "A Pioneering Institution",
            description:
                "The Department of Economics at the University of Azad Jammu and Kashmir is a pioneering institution with a rich history dating back to 1978. It has been at the forefront of economic education and research in the region, contributing significantly to the development of the field.",
        },
        {
            title: "Academic Programs",
            description:
                "The department offers a comprehensive range of programs, including a rigorous three-year PhD program for advanced research, a two-year M.Phil. program focusing on specialized areas, and a four-year BS program providing a strong foundation in economic theory and applications.",
        },
        {
            title: "A Strong Faculty and Research Culture",
            description:
                "The department boasts a highly qualified faculty with expertise in various fields of economics, including microeconomics, macroeconomics, econometrics, international economics, and development economics. Faculty members are actively engaged in research, publishing papers in reputable journals and participating in conferences.",
        },
        {
            title: "State-of-the-Art Facilities",
            description:
                "The department is equipped with modern facilities, including a well-stocked library, computer labs, and seminar rooms. These resources provide students with ample opportunities for research, study, and collaboration.",
        },
        {
            title: "Graduate Opportunities",
            description:
                "The Department of Economics is committed to producing well-rounded graduates who are equipped to address the complex economic challenges of the 21st century. Our graduates are sought after by leading organizations, both nationally and internationally.",
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
                            <h1 className="heading" style={{ fontSize: "55px" }}>Department of Economics</h1>
                            <button className="btn" onClick={handleExplore}>Explore Virtual Tour</button>
                        </div>
                        <div className="right">
                            <img src="/depts/economics.jpg" alt="Economics Department" className="img" />
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
                                <EconomicsInternalModel active />
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

export default Economics
