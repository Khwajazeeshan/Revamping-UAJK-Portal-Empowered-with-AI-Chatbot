import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, FirstPersonControls, Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function BotanyInternalModel({ active }) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const camRef = useRef()
    const { gl, set } = useThree()
    const [lookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const botanyInsidePos = [-10.5, 0.6, -7]
    const botanyInsideRot = [0, 0, 0]

    useEffect(() => {
        if (active && camRef.current) {
            camRef.current.position.set(...botanyInsidePos)
            camRef.current.rotation.set(...botanyInsideRot)
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
            {/* 🌿 Botany Building */}
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

            <PerspectiveCamera ref={camRef} makeDefault fov={fov} position={botanyInsidePos} rotation={botanyInsideRot} />
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

            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.2} />
            <directionalLight position={[-5, 3, -3]} intensity={0.9} />

            <Html position={[-11.5, 2.5, -7]}>
                <div className="botany-label">
                    <h3>Botany Department</h3>
                </div>
            </Html>
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
