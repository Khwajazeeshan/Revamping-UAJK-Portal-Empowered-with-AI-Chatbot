import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import MathInternalModel from '../depts/Models/MathInternalModel'
import '../depts/Styles/Department.css'
import '../virtualTour/VirtualTour.css' // loader CSS

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

const Maths = () => {
    const [showCanvasPage, setShowCanvasPage] = useState(false)
    const handleExplore = () => setShowCanvasPage(true)
    const handleReturn = () => setShowCanvasPage(false)
    useEffect(() => { if(showCanvasPage) window.scrollTo({top:0, behavior:'smooth'}) }, [showCanvasPage])

    const Content = [
        { title:"Department of Mathematics: A Legacy of Excellence", description:"Established in 1984, the Department of Mathematics at the University of Azad Jammu and Kashmir is a leading institution committed to advancing the field of mathematics."},
        { title:"A Comprehensive Curriculum", description:"We offer undergraduate, graduate, and postgraduate programs focusing on pure and applied mathematics — including algebra, topology, analysis, differential equations, and modeling."},
        { title:"Research and Innovation", description:"Faculty are engaged in active research, publishing in top journals, and guiding students in innovative projects."},
        { title:"A Supportive Learning Environment", description:"Seminars, workshops, and mentorship foster growth. The library and labs are well-equipped for research and study."},
        { title:"Career Opportunities", description:"Graduates excel in academia, industry, and government with strong analytical and problem-solving skills."}
    ]

    return (
        <>
            {!showCanvasPage ? (
                <div className="main">
                    <div className="section1">
                        <div className="left">
                            <h1 className="heading" style={{ fontSize: "50px" }}>Department of Mathematics</h1>
                            <button className="btn" onClick={handleExplore}>Explore Virtual Tour</button>
                        </div>
                        <div className="right">
                            <img src="/depts/math.jpg" alt="Mathematics Department" className="img" />
                        </div>
                    </div>
                    <div className="section2">
                        <div className="sub-content">
                            {Content.map((item, index)=>(
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
                        <Canvas camera={{fov:75}} gl={{toneMappingExposure:1.2}} shadows>
                            <color attach="background" args={['#b5d1f5']} />
                            <Suspense fallback={<ModelLoader />}>
                                <MathInternalModel active />
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

export default Maths
