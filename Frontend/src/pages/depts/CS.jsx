import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import Lab from '../virtualTour/3D Models/Lab'
import Library from '../virtualTour/3D Models/CS Library'
import Classroom from '../virtualTour/3D Models/Class'
import CSInternalModel from '../depts/Models/CSInternalModel'
import '../depts/Styles/Department.css'


// 🔹 Loader Component
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

const CS = () => {
    const [activeScene, setActiveScene] = useState('main')
    const [showCanvasPage, setShowCanvasPage] = useState(false)

    const Content = [
        { title: 'Introduction', description: 'The Department of Computer Science & Information Technology (CS&IT) focuses on providing high-quality education and research opportunities to develop future innovators and technologists.' },
        { title: 'Our Mission', description: 'We aim to equip students with strong technical and problem-solving skills through modern tools, teaching, and real-world projects.' },
        { title: 'Research Environment/Groups', description: 'Our department encourages collaborative research across fields like AI, Data Science, and Software Engineering.' },
    ]

    const handleClassroom = () => setActiveScene('classroom')
    const handleLibrary = () => setActiveScene('library')
    const handleLab = () => setActiveScene('lab')
    const handleBack = () => setActiveScene('main')
    const handleExplore = () => setShowCanvasPage(true)
    const handleReturn = () => setShowCanvasPage(false)

    useEffect(() => {
        if (showCanvasPage) window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [showCanvasPage])

    return (
        <>

            {!showCanvasPage ? (
                <div className="main">
                    {/* ===== Top Section ===== */}
                    <div className="section1">
                        <div className="left">
                            <h1 className="heading">Department of CS&IT</h1>
                            <button className="btn" onClick={handleExplore}>Department Virtual Tour</button>
                        </div>
                        <div className="right">
                            <img src="/depts/cs.png" alt="CS Department" className="img" />
                        </div>
                    </div>

                    {/* ===== Bottom Section ===== */}
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
                // ===== 3D Model Page =====
                <div>
                    <div className="canvas-container">
                        <Canvas camera={{ fov: 75 }} gl={{ toneMappingExposure: 1.2 }} shadows>
                            <color attach="background" args={['#b5d1f5']} />
                            <Suspense fallback={<ModelLoader />}>
                                <CSInternalModel active={activeScene === 'main'} />
                                {activeScene === 'classroom' && <Classroom />}
                                {activeScene === 'library' && <Library />}
                                {activeScene === 'lab' && <Lab />}
                            </Suspense>
                        </Canvas>
                    </div>

                    <div className="button-container">
                        {activeScene === 'main' ? (
                            <>
                                <button className="btn" onClick={handleClassroom}>Visit Classroom</button>
                                <button className="btn" onClick={handleLibrary}>Visit Library</button>
                                <button className="btn" onClick={handleLab}>Visit Lab</button>
                                <button className="btn back" onClick={handleReturn}>🏠 Back to Main Page</button>
                            </>
                        ) : (
                            <button className="btn back" onClick={handleBack}>🔙 Back to Department</button>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default CS
