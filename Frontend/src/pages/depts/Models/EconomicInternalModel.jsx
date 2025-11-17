import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, FirstPersonControls, Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function EconomicsInternalModel({ active }) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const camRef = useRef()
    const { gl, set } = useThree()
    const [lookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const ecoInsidePos = [12.0, 1.1, 1.5]
    const ecoInsideRot = [0, 0, 0]

    useEffect(() => {
        if (active && camRef.current) {
            camRef.current.position.set(...ecoInsidePos)
            camRef.current.rotation.set(...ecoInsideRot)
            camRef.current.fov = fov
            camRef.current.updateProjectionMatrix()
            set({ camera: camRef.current })
        }
    }, [fov, set, active])

    useEffect(() => {
        if (!active) return
        const handleWheel = (e) => {
            e.preventDefault()
            setFov((prev) => Math.min(Math.max(prev + e.deltaY * 0.05, 40), 85))
        }
        window.addEventListener('wheel', handleWheel, { passive: false })
        return () => window.removeEventListener('wheel', handleWheel)
    }, [active])

    useEffect(() => {
        if (!active) return
        const handleMouseDown = () => setIsMouseDown(true)
        const handleMouseUp = () => setIsMouseDown(false)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [active])

    if (!active) return null

    return (
        <group dispose={null}>
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

            {/* 🎥 Camera & Controls */}
            <PerspectiveCamera ref={camRef} makeDefault fov={fov} position={ecoInsidePos} rotation={ecoInsideRot} />
            {camRef.current && (
                <FirstPersonControls
                    args={[camRef.current, gl.domElement]}
                    movementSpeed={0}
                    lookSpeed={isMouseDown ? 0 : lookSpeed}
                    activeLook
                    enabled
                    constrainVertical
                />
            )}

            {/* 💡 Lights */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.2} />
            <directionalLight position={[-5, 3, -3]} intensity={0.9} />

            {/* 🪧 Label */}
            <Html position={[11, 2.5, 1]}>
                <div className="econ-label">
                    <h3>Economics Department</h3>
                </div>
            </Html>
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
