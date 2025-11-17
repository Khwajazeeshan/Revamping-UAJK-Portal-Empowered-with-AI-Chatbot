import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import StatisticsInternalModel from '../depts/Models/StatisticInternalModel'
import '../depts/Styles/Department.css'
import '../virtualTour/VirtualTour.css'

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

const Statistics = () => {
    const [showCanvasPage, setShowCanvasPage] = useState(false)
    const handleExplore = () => setShowCanvasPage(true)
    const handleReturn = () => setShowCanvasPage(false)
    useEffect(()=>{ if(showCanvasPage) window.scrollTo({top:0, behavior:'smooth'}) }, [showCanvasPage])

    const Content = [
        { title:"Department of Statistics: Empowering Data-Driven Decisions", description:"Established in 2005, empowers effective decision-making through data-driven insights." },
        { description:"Faculty provide comprehensive education combining theory and practical applications." },
        { description:"Research projects and publications cultivate a research culture." },
        { title:"Mission", description:"Deliver quality statistics program enhancing literacy, research, and professional development." }
    ]

    return (
        <>
            {!showCanvasPage ? (
                <div className="main">
                    <div className="section1">
                        <div className="left">
                            <h1 className="heading" style={{ fontSize:"60px" }}>Department of Statistics</h1>
                            <button className="btn" onClick={handleExplore}>Explore Virtual Tour</button>
                        </div>
                        <div className="right">
                            <img src="/depts/statistics.jpg" alt="Statistics Department" className="img" />
                        </div>
                    </div>
                    <div className="section2">
                        {Content.map((item,index)=>(
                            <div key={index} className="content-block">
                                {item.title && <h3>{item.title}</h3>}
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="canvas-container">
                        <Canvas camera={{fov:75}} gl={{toneMappingExposure:1.2}} shadows>
                            <color attach="background" args={['#b5d1f5']} />
                            <Suspense fallback={<ModelLoader />}>
                                <StatisticsInternalModel active />
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

export default Statistics
