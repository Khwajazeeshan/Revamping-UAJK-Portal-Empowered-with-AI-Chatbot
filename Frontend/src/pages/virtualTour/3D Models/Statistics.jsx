import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext'

export default function StatisticsExternalModel(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const defaultCamRef = useRef()
    const { set, camera, gl } = useThree()
    const { activeDepartment, setActiveDepartment } = useCameraContext()

    const isActive = activeDepartment === 'stats'
    const [showCard, setShowCard] = useState(false)
    const [fov, setFov] = useState(75)

    const statsOutsidePos = [4, 8, -24]

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

    const handleSingleClick = (e) => {
        setShowCard(!showCard)
    }

    const handleCloseCard = () => setShowCard(false)

    return (
        <group {...props} dispose={null} onClick={handleSingleClick}>
            <group
                name="statistics"
                position={[-15.232319, 0.659891, 8.975866]}
                rotation={[Math.PI, -0.000537, Math.PI]}
                scale={[6.665955, 5.598811, 4.804957]}
            >
                <mesh geometry={nodes.Cube019.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Cube019_1.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Cube019_2.geometry} material={materials['Stylised wood 2.016']} />
                <mesh geometry={nodes.Cube019_3.geometry} material={materials['grill.015']} />
                <mesh geometry={nodes.Cube019_4.geometry} material={materials['Material.023']} />
            </group>

            <PerspectiveCamera ref={defaultCamRef} makeDefault fov={50} position={statsOutsidePos} />
            <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom />

            {showCard && (
                <Html
                    position={[-10, 3.95, 6]}
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
                        <h3 style={{ margin: '10px 0 5px 0' }}>Statistics Department</h3>
                        <p style={{ margin: '5px 0' }}>Analyzing data to provide insights and decision support.</p>
                        <button
                            onClick={() => window.open('http://localhost:5173/statistics', '_blank')}
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
                            Visit Department
                        </button>
                    </div>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
