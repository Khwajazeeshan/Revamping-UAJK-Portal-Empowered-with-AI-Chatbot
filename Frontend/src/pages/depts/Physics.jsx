import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import PhysicsInternalModel from '../depts/Models/PhysicsInternalModel'
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

const Physics = () => {
    const [showCanvasPage, setShowCanvasPage] = useState(false)
    const handleExplore = () => setShowCanvasPage(true)
    const handleReturn = () => setShowCanvasPage(false)
    useEffect(()=>{ if(showCanvasPage) window.scrollTo({top:0, behavior:'smooth'}) }, [showCanvasPage])

    const Content = [
        { title:"A Legacy of Excellence", description:"The Department of Physics at the University of Azad Jammu and Kashmir is dedicated to exploring the fundamental laws of the universe." },
        { title:"A World of Opportunities", description:"We offer M.Sc., M.Phil., and Ph.D., providing students with hands-on learning and research." },
        { title:"Research and Innovation", description:"Collaboration with renowned institutions for nuclear, solid-state, and computational physics research." }
    ]

    return (
        <>
            {!showCanvasPage ? (
                <div className="main">
                    <div className="section1">
                        <div className="left">
                            <h1 className="heading" style={{ fontSize:"60px" }}>Department of Physics</h1>
                            <button className="btn" onClick={handleExplore}>Explore Virtual Tour</button>
                        </div>
                        <div className="right">
                            <img src="/depts/physics.jpg" alt="Physics Department" className="img" />
                        </div>
                    </div>
                    <div className="section2">
                        {Content.map((item,index)=>(
                            <div key={index} className="content-block">
                                <h3>{item.title}</h3>
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
                                <PhysicsInternalModel active />
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

export default Physics
