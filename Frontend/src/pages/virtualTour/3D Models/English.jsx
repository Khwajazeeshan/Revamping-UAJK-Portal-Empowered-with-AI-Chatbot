import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext'

export default function EnglishExternalModel(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const defaultCamRef = useRef()
    const { set, camera, gl } = useThree()
    const { activeDepartment, setActiveDepartment } = useCameraContext()

    const isActive = activeDepartment === 'english'
    const [showCard, setShowCard] = useState(false)
    const [fov, setFov] = useState(75)

    const engOutsidePos = [4, 8, -25]

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setActiveDepartment('default')
                set({ camera: defaultCamRef.current })
                setFov(75)
            }
        }
        const handleWheel = (e) => {
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
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('wheel', handleWheel, { passive: false })
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('wheel', handleWheel)
        }
    }, [camera, set, setActiveDepartment])

    const handleSingleClick = () => setShowCard(!showCard)
    const handleCloseCard = () => setShowCard(false)

    return (
        <group {...props} dispose={null} onClick={handleSingleClick}>
            {/* 🏫 English Department Model */}
            <group
                name="english"
                position={[12.014261, 0.808712, -5.532899]}
                rotation={[0, 0, -Math.PI]}
                scale={[3.462545, 3.001251, 3.419086]}
            >
                <mesh geometry={nodes.Plane004.geometry} material={materials['Material.024']} />
                <mesh geometry={nodes.Plane004_1.geometry} material={materials['Stylised wood 2']} />
                <mesh geometry={nodes.Plane004_2.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Plane004_3.geometry} material={materials.gril} />
                <mesh geometry={nodes.Plane004_4.geometry} material={materials['Material.010']} />
            </group>

            {/* 🎥 Camera */}
            <PerspectiveCamera ref={defaultCamRef} makeDefault fov={fov} position={engOutsidePos} />

            {/* 🌍 Controls */}
            <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom />

            {/* 🪧 Info Card */}
            {showCard && (
                <Html
                    position={[12, 2.5, -6]}
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
                        <h3 style={{ margin: '10px 0 5px 0' }}>English Department</h3>
                        <p style={{ margin: '5px 0' }}>Explore literature and language studies.</p>
                        <button
                            onClick={() => (window.location.href = '/english')}
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
                            Visit English
                        </button>
                    </div>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
