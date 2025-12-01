import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, FirstPersonControls, Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function ChemistryInternalModel({ active }) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const camRef = useRef()
    const { gl, set } = useThree()
    const [lookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const chemInsidePos = [2.3, 0.7, -9.5]
    const chemInsideRot = [0, 0, 0]

    useEffect(() => {
        if (active && camRef.current) {
            camRef.current.position.set(...chemInsidePos)
            camRef.current.rotation.set(...chemInsideRot)
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
            {/* 🧱 Chemistry Building */}
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
            <PerspectiveCamera ref={camRef} makeDefault fov={fov} position={chemInsidePos} rotation={chemInsideRot} />

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
            <directionalLight position={[5, 5, 5]} intensity={0.3} />
            <directionalLight position={[-5, 3, -3]} intensity={0.9} />

            {/* 🏷 Label */}
            <Html position={[1, 2, -9.5]}>
                <div className="chemistry-label">
                    <h3>Chemistry Department</h3>
                </div>
            </Html>
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
export default ChemistryInternalModel
