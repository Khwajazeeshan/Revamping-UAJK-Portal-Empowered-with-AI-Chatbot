import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext'

export default function GeologyExternalModel(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const defaultCamRef = useRef()
    const { set, camera, gl } = useThree()
    const { activeDepartment, setActiveDepartment } = useCameraContext()

    const isActive = activeDepartment === 'geology'
    const [showCard, setShowCard] = useState(false)
    const [fov, setFov] = useState(75)

    const geoOutsidePos = [4, 8, -25]

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

    const handleClick = () => setShowCard(!showCard)
    const handleCloseCard = () => setShowCard(false)

    return (
        <group {...props} dispose={null} onClick={handleClick}>
            {/* 🏛 Geology Model */}
            <group
                name="Geology"
                position={[-16.236271, 0.619603, 3.193445]}
                rotation={[0, 1.552367, 0]}
                scale={[-4.080351, -3.565117, -4.924909]}
            >
                <mesh geometry={nodes.Cube016.geometry} material={materials['grill.012']} />
                <mesh geometry={nodes.Cube016_1.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Cube016_2.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Cube016_3.geometry} material={materials['Stylised wood 2.014']} />
                <mesh geometry={nodes.Cube016_4.geometry} material={materials['Stylised wood 2.015']} />
                <mesh geometry={nodes.Cube016_5.geometry} material={materials['grill.013']} />
                <mesh geometry={nodes.Cube016_6.geometry} material={materials['Material.023']} />
            </group>

            <PerspectiveCamera ref={defaultCamRef} makeDefault fov={50} position={geoOutsidePos} />
            <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom />

            {/* Info Card */}
            {showCard && (
                <Html
                    position={[-16, 3, 3]}
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
                        <h3 style={{ margin: '10px 0 5px 0' }}>Geology Department</h3>
                        <p style={{ margin: '5px 0' }}>Explore the Earth’s structure, rocks, and natural materials.</p>
                        <button
                            onClick={() => (window.location.href = '/geology')}
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
                            Visit Geology
                        </button>
                    </div>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
