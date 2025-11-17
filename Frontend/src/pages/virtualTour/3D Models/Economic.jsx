import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext'

export default function EconomicsExternalModel(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const defaultCamRef = useRef()
    const ecoCamRef = useRef()
    const { set, camera, gl } = useThree()
    const { activeDepartment, setActiveDepartment } = useCameraContext()

    const isActive = activeDepartment === 'economic'
    const [showCard, setShowCard] = useState(false)
    const [fov, setFov] = useState(75)

    const ecoInsidePos = [12.0, 1.1, 1.5]
    const ecoOutsidePos = [4, 8, -25]

    // 🎛 Handle ESC & zoom
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setActiveDepartment('default')
                set({ camera: defaultCamRef.current })
                setFov(75)
            }
        }
        const handleWheel = (e) => {
            if (isActive) {
                e.preventDefault()
                e.stopPropagation()
                setFov((prev) => {
                    let newFov = prev + e.deltaY * 0.05
                    newFov = Math.min(Math.max(newFov, 40), 85)
                    camera.fov = newFov
                    camera.updateProjectionMatrix()
                    return newFov
                })
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('wheel', handleWheel, { passive: false })
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('wheel', handleWheel)
        }
    }, [isActive, camera, set])

    const handleSingleClick = () => setShowCard(!showCard)
    const handleCloseCard = () => setShowCard(false)

    return (
        <group {...props} dispose={null} onClick={handleSingleClick}>
            {/* 🏛 Economic Department Building */}
            <group
                name="economic"
                position={[11.294031, 0.309469, 1.250826]}
                rotation={[0, -0.031355, 0]}
                scale={[-3.645336, -2.827916, -3.740151]}
            >
                <mesh geometry={nodes.Plane001.geometry} material={materials['Material.016']} />
                <mesh geometry={nodes.Plane001_1.geometry} material={materials['Stylised wood 2.001']} />
                <mesh geometry={nodes.Plane001_2.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Plane001_3.geometry} material={materials['grill.005']} />
                <mesh geometry={nodes.Plane001_4.geometry} material={materials['Material.005']} />
            </group>

            {/* 🎥 Camera + MapControls */}
            <PerspectiveCamera ref={defaultCamRef} makeDefault fov={50} position={ecoOutsidePos} />
            <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom />

            {/* 🪧 Info Card */}
            {showCard && (
                <Html
                    position={[12, 3, 0]}
                    style={{
                        color: 'white',
                        background: 'rgba(0, 0, 0, 0.85)',
                        padding: '20px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                        minWidth: '220px',
                    }}
                >
                    <div style={{ pointerEvents: 'auto' }}>
                        <button
                            onClick={handleCloseCard}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '20px',
                                cursor: 'pointer',
                            }}
                        >
                            &times;
                        </button>
                        <h3 style={{ margin: '10px 0 5px 0' }}>Economics Department</h3>
                        <p style={{ margin: '5px 0' }}>Explore the world of economics and business.</p>
                        <button
                            onClick={() => (window.location.href = '/economics')}
                            style={{
                                marginTop: '10px',
                                padding: '10px 20px',
                                background: 'linear-gradient(90deg, #56ccf2, #2f80ed)',
                                border: 'none',
                                borderRadius: '5px',
                                color: 'white',
                                fontSize: '14px',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            Visit Economics
                        </button>
                    </div>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
