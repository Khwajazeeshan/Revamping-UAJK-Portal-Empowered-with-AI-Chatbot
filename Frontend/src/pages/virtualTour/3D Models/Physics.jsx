import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext'

export default function PhysicsExternalModel(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const defaultCamRef = useRef()
    const { set, camera, gl } = useThree()
    const { activeDepartment, setActiveDepartment } = useCameraContext()
    const isActive = activeDepartment === 'physics'

    const [showCard, setShowCard] = useState(false)
    const [fov, setFov] = useState(75)

    const physicsInsidePos = [1.2, 0.8, -1.5]
    const physicsOutsidePos = [4, 8, -27]

    useEffect(() => {
        if (isActive) {
            const lock = () => camera.position.set(...physicsInsidePos)
            const interval = setInterval(lock, 10)
            return () => clearInterval(interval)
        }
    }, [isActive])

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
            <group
                name="Physics"
                position={[0.507761, 0.637053, -1.781895]}
                rotation={[Math.PI, -1.544229, 0]}
                scale={[-0.035274, -0.027628, -0.033773]}
            >
                <mesh geometry={nodes.Cube017?.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Cube017_1?.geometry} material={materials['grill.014']} />
                <mesh geometry={nodes.Cube017_2?.geometry} material={materials['Stylised wood 2.012']} />
                <mesh geometry={nodes.Cube017_3?.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Cube017_4?.geometry} material={materials['Stylised wood 2.013']} />
                <mesh geometry={nodes.Cube017_5?.geometry} material={materials['grill.011']} />
                <mesh geometry={nodes.Cube017_6?.geometry} material={materials['Material.023']} />
            </group>

            <PerspectiveCamera ref={defaultCamRef} makeDefault fov={50} position={physicsOutsidePos} />

            <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom />

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
                        <h3 style={{ margin: '10px 0 5px 0' }}>Physics Department</h3>
                        <p style={{ margin: '5px 0' }}>Exploring the fundamental principles of nature.</p>
                        <button
                            onClick={() => (window.location.href = '/physics')}
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
                            Visit Physics
                        </button>
                    </div>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
