import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext'

export default function BotanyExternalModel(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const defaultCamRef = useRef()
    const botanyCamRef = useRef()
    const { set, camera, gl } = useThree()
    const { activeDepartment, setActiveDepartment } = useCameraContext()

    const isActive = activeDepartment === 'botany'
    const [showCard, setShowCard] = useState(false)
    const [fov, setFov] = useState(75)

    const botanyInsidePos = [-10.5, 0.6, -7]
    const botanyInsideRot = [0, 0, 0]
    const botanyOutsidePos = [5, 8, -27]

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
            {/* 🌿 Botany Model */}
            <group
                name="Botany"
                position={[-11.69297, 0.427617, -6.994459]}
                rotation={[1.567768, 0.034775, 0.086896]}
                scale={[0.136784, 0.134374, 0.102255]}
            >
                <mesh geometry={nodes.Text002?.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Text002_1?.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Text002_2?.geometry} material={materials['Stylised wood 2.012']} />
                <mesh geometry={nodes.Text002_3?.geometry} material={materials['Stylised wood 2.013']} />
                <mesh geometry={nodes.Text002_4?.geometry} material={materials['grill.011']} />
                <mesh geometry={nodes.Text002_5?.geometry} material={materials['Material.023']} />
            </group>

            {/* Cameras */}
            <PerspectiveCamera ref={defaultCamRef} makeDefault fov={50} position={botanyOutsidePos} />

            {/* Map Controls */}
            <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom />

            {/* Info Card */}
            {showCard && (
                <Html
                    position={[-11.5, 2.5, -7]}
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
                        <h3 style={{ margin: '10px 0 5px 0' }}>Botany Department</h3>
                        <p style={{ margin: '5px 0' }}>Explore the world of plants and environmental sciences.</p>
                        <button
                            onClick={() => (window.location.href = '/botany')}
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
                            Visit Botany
                        </button>
                    </div>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
