import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, FirstPersonControls, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext'

export default function ZoologyExternalModel(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const defaultCamRef = useRef()
    const zooCamRef = useRef()
    const { set, camera, gl } = useThree()
    const { activeDepartment, setActiveDepartment } = useCameraContext()

    const isActive = activeDepartment === 'zoology'
    const [showCard, setShowCard] = useState(false)
    const [lookSpeed, setLookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)

    // 🎯 Camera positions
    const zooInsidePos = [-5.9, 1.1, 1.3]
    const zooInsideRot = [0, 0, 0]
    const zooOutsidePos = [7, 10, -25]

    // 🔒 Lock camera when active
    useEffect(() => {
        if (isActive) {
            const lock = () => camera.position.set(...zooInsidePos)
            const interval = setInterval(lock, 10)
            return () => clearInterval(interval)
        }
    }, [isActive])

    // 🎛 Keyboard + Mouse Controls
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

    // 🖱 Single click → show info card
    const handleSingleClick = (e) => {
        // e.preventDefault()
        // e.stopPropagation()
        setShowCard(!showCard)
    }

    const handleCloseCard = () => setShowCard(false)

    return (
        <group {...props} dispose={null} onClick={handleSingleClick}>
            {/* 🏛 Zoology Model */}
            <group
                name="zoology"
                position={[-4.592263, 0.796494, 0.951567]}
                rotation={[Math.PI, -1.547047, Math.PI]}
                scale={[0.032932, 0.032644, 0.03563]}
            >
                <mesh geometry={nodes.Cube143.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Cube143_1.geometry} material={materials['grill.019']} />
                <mesh geometry={nodes.Cube143_2.geometry} material={materials['Stylised wood 2.019']} />
                <mesh geometry={nodes.Cube143_3.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Cube143_4.geometry} material={materials['Stylised wood 2.020']} />
                <mesh geometry={nodes.Cube143_5.geometry} material={materials['grill.020']} />
                <mesh geometry={nodes.Cube143_6.geometry} material={materials['Material.042']} />
            </group>

            {/* Cameras */}
            <PerspectiveCamera ref={defaultCamRef} makeDefault fov={50} position={zooOutsidePos} />

            {/* Map Controls */}
            <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom />

            {/* Info Card */}
            {showCard && (
                <Html
                    position={[0, 1.5, 0]}
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
                        <h3 style={{ margin: '10px 0 5px 0' }}>Zoology Department</h3>
                        <p style={{ margin: '5px 0' }}>Explore the world of animal biology and behavior.</p>
                        <button
                            onClick={() => (window.location.href = '/zoology')}
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
                            Visit Zoology
                        </button>
                    </div>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
