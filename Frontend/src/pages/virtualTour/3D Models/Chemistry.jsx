import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext'

export default function ChemistryExternalModel(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const defaultCamRef = useRef()
    const { camera, gl } = useThree()
    const { activeDepartment, setActiveDepartment } = useCameraContext()

    const isActive = activeDepartment === 'chemistry'
    const [showCard, setShowCard] = useState(false)

    const chemOutsidePos = [4, 8, -25]

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setActiveDepartment('default')
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [setActiveDepartment])

    const handleSingleClick = () => setShowCard(!showCard)
    const handleCloseCard = () => setShowCard(false)

    return (
        <group {...props} dispose={null} onClick={handleSingleClick}>
            {/* 🏫 Chemistry Building */}
            <group
                name="Chemistry"
                position={[0.907585, 0.483164, -9.50069]}
                rotation={[0, 1.538403, 0]}
                scale={[0.032254, 0.020668, 0.032681]}
            >
                <mesh geometry={nodes.Cube018.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Cube018_1.geometry} material={materials['grill.014']} />
                <mesh geometry={nodes.Cube018_2.geometry} material={materials['Stylised wood 2.012']} />
                <mesh geometry={nodes.Cube018_3.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Cube018_4.geometry} material={materials['Stylised wood 2.013']} />
                <mesh geometry={nodes.Cube018_5.geometry} material={materials['grill.011']} />
                <mesh geometry={nodes.Cube018_6.geometry} material={materials['Material.023']} />
            </group>

            {/* 🎥 Camera */}
            <PerspectiveCamera ref={defaultCamRef} makeDefault fov={50} position={chemOutsidePos} />
            <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom />

            {/* 💬 Info Card */}
            {showCard && (
                <Html
                    position={[1, 1.5, -9.5]}
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
                        <h3 style={{ margin: '10px 0 5px 0' }}>Chemistry Department</h3>
                        <p style={{ margin: '5px 0' }}>Understanding matter and its interactions.</p>
                        <button
                            onClick={() => (window.location.href = '/chemistry')}
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
                            Visit Chemistry
                        </button>
                    </div>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
