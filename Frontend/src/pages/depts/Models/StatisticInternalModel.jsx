import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, FirstPersonControls, Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function StatisticsInternalModel({ active }) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const camRef = useRef()
    const { gl, set } = useThree()
    const [lookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const statsInsidePos = [-14.8, 0.8, 9.5]
    const statsInsideRot = [0, 0, 0]

    useEffect(() => {
        if (active && camRef.current) {
            camRef.current.position.set(...statsInsidePos)
            camRef.current.rotation.set(...statsInsideRot)
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
            <group
                name="statistics"
                position={[-15.232319, 0.659891, 8.975866]}
                rotation={[Math.PI, -0.000537, Math.PI]}
                scale={[6.665955, 5.598811, 4.804957]}
            >
                <mesh geometry={nodes.Cube019.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Cube019_1.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Cube019_2.geometry} material={materials['Stylised wood 2.016']} />
                <mesh geometry={nodes.Cube019_3.geometry} material={materials['grill.015']} />
                <mesh geometry={nodes.Cube019_4.geometry} material={materials['Material.023']} />
            </group>

            <PerspectiveCamera ref={camRef} makeDefault fov={fov} position={statsInsidePos} rotation={statsInsideRot} />
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
            <directionalLight position={[5, 5, 5]} intensity={0.3} />
            <directionalLight position={[-5, 3, -3]} intensity={0.9} />

            <Html position={[-15, 3.5, 9.2]}>
                <div className="stats-label">
                    <h3>Statistics Department</h3>
                </div>
            </Html>
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
export default StatisticsInternalModel
