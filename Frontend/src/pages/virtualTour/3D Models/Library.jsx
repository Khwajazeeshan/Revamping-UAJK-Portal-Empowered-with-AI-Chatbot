import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, FirstPersonControls, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext' // adjust the path

export default function LibraryModel(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const defaultCamRef = useRef()
    const libCamRef = useRef()
    const { set, camera, gl } = useThree()

    const { activeDepartment, setActiveDepartment } = useCameraContext()
    const isActive = activeDepartment === 'library'
    const [showCard, setShowCard] = useState(false)
    const [lookSpeed, setLookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)

    // 📍 Camera positions
    const libInsidePos = [8, 1.5, 6.5]
    const libInsideRot = [0, Math.PI / 2, 0]
    const libOutsidePos = [4, 8, -25]

    // 🎹 Keyboard and mouse handlers
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setActiveDepartment('default')
                set({ camera: defaultCamRef.current })
                setFov(75)
            }
        }

        const handleMouseDown = (e) => {
            if (isActive && (e.button === 0 || e.button === 2)) {
                e.preventDefault()
                e.stopPropagation()
                setLookSpeed(0)
            }
        }

        const handleMouseUp = (e) => {
            if (isActive && (e.button === 0 || e.button === 2)) {
                e.preventDefault()
                e.stopPropagation()
                setLookSpeed(0.01)
            }
        }

        const handleContextMenu = (e) => {
            if (isActive) {
                e.preventDefault()
                e.stopPropagation()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('contextmenu', handleContextMenu)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('contextmenu', handleContextMenu)
        }
    }, [isActive, camera, set])

    // 🚪 Double click → go inside
    const handleDoubleClick = (e) => {
        if (isActive) {
            e.preventDefault()
            e.stopPropagation()
            return
        }

        if (libCamRef.current) {
            libCamRef.current.position.set(...libInsidePos)
            libCamRef.current.rotation.set(...libInsideRot)
            setActiveDepartment('library')
            set({ camera: libCamRef.current })
            setShowCard(false)
        }
    }

    // 👆 Single click → show info card (only outside)
    const handleSingleClick = (e) => {
        if (isActive) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        setShowCard(!showCard)
    }

    const handleCloseCard = () => setShowCard(false)

    return (
        <group {...props} dispose={null} onClick={handleSingleClick} onDoubleClick={handleDoubleClick}>
            {/* 🏛 Library Model */}
            <group
                name="Library"
                position={[7.212842, 1.139313, 6.847391]}
                rotation={[0, 1.570535, 0]}
                scale={[4.395797, 2.4196, 2.09682]}
            >
                <mesh geometry={nodes.Plane003.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Plane003_1.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Plane003_2.geometry} material={materials['Material.020']} />
                <mesh geometry={nodes.Plane003_3.geometry} material={materials['Stylised wood 2.002']} />
                <mesh geometry={nodes.Plane003_4.geometry} material={materials['grill.009']} />
                <mesh geometry={nodes.Plane003_5.geometry} material={materials['Material.021']} />
                <mesh geometry={nodes.Plane003_6.geometry} material={materials['Material.005']} />
            </group>

            {/* 🎥 Cameras */}
            <PerspectiveCamera
                ref={defaultCamRef}
                makeDefault={!isActive}
                fov={50}
                position={libOutsidePos}
            />

            <PerspectiveCamera
                ref={libCamRef}
                makeDefault={isActive}
                fov={fov}
                position={libInsidePos}
                rotation={libInsideRot}
            />

            {!isActive && (activeDepartment === null || activeDepartment === 'default') && (
                <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom={false} />
            )}

            {isActive && (
                <FirstPersonControls args={[camera, gl.domElement]} movementSpeed={0} lookSpeed={lookSpeed} />
            )}

            {/* 📘 Info Card */}
            {showCard && (
                <Html
                    position={[7.5, 3, 7]}
                    style={{
                        color: 'white',
                        background: 'rgba(0, 0, 0, 0.8)',
                        padding: '15px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                        textAlign: 'center',
                        minWidth: '200px',
                        maxWidth: '300px',
                        position: 'absolute',
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
                        <h3 style={{ margin: '10px 0 5px 0' }}>Library</h3>
                        <p style={{ margin: '5px 0' }}>A treasure trove of knowledge and wisdom.</p>
                    </div>
                </Html>
            )}
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
