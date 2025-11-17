import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext'

export default function MathExternalModel(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const defaultCamRef = useRef()
    const { set, camera, gl } = useThree()
    const { activeDepartment, setActiveDepartment } = useCameraContext()

    const isActive = activeDepartment === 'math'
    const [showCard, setShowCard] = useState(false)
    const [fov, setFov] = useState(75)

    const mathInsidePos = [-9.4, 0.8, 9.9]
    const mathOutsidePos = [4, 8, -25]

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
            {/* 🏫 Math Department Model */}
            <group
                name="Math"
                position={[-8.88004, 0.507555, 9.354913]}
                rotation={[0, -0.007846, Math.PI]}
                scale={[-4.670204, -4.757926, -5.404001]}
            >
                <mesh geometry={nodes.Cube020?.geometry} material={materials['grill.016']} />
                <mesh geometry={nodes.Cube020_1?.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Cube020_2?.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Cube020_3?.geometry} material={materials['Stylised wood 2.017']} />
                <mesh geometry={nodes.Cube020_4?.geometry} material={materials['grill.017']} />
                <mesh geometry={nodes.Cube020_5?.geometry} material={materials['Material.034']} />
            </group>

            {/* 🎥 Camera */}
            <PerspectiveCamera ref={defaultCamRef} makeDefault fov={50} position={mathOutsidePos} />

            {/* 🗺 Map Controls */}
            <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom />

            {/* ℹ️ Info Card */}
            {showCard && (
                <Html
                    position={[-8.8, 2.5, 9.3]}
                    style={{
                        color: 'white',
                        background: 'rgba(0, 0, 0, 0.8)',
                        padding: '15px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                        textAlign: 'center',
                        minWidth: '200px',
                        maxWidth: '300px',
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
                        <h3 style={{ margin: '10px 0 5px 0' }}>Mathematics Department</h3>
                        <p style={{ margin: '5px 0' }}>A place to explore the beauty of numbers and logic.</p>
                        <button
                            onClick={() => (window.location.href = '/maths')}
                            style={{
                                marginTop: '10px',
                                padding: '10px 20px',
                                background: 'linear-gradient(90deg, #56ccf2, #2f80ed)',
                                border: 'none',
                                borderRadius: '5px',
                                color: 'white',
                                fontSize: '14px',
                                cursor: 'pointer',
                            }}
                        >
                            Visit Mathematics
                        </button>
                    </div>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
