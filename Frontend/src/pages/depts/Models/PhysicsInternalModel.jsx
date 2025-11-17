import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, FirstPersonControls, Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function PhysicsInternalModel({ active }) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const camRef = useRef()
    const { gl, set } = useThree()
    const [lookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const physicsInsidePos = [1.2, 0.8, -1.5]
    const physicsInsideRot = [0, 0, 0]

    useEffect(() => {
        if (active && camRef.current) {
            camRef.current.position.set(...physicsInsidePos)
            camRef.current.rotation.set(...physicsInsideRot)
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

            <PerspectiveCamera ref={camRef} makeDefault fov={fov} position={physicsInsidePos} rotation={physicsInsideRot} />
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

            <Html position={[1.2, 2.2, -1.5]}>
                <div className="physics-label">
                    <h3>Physics Department</h3>
                </div>
            </Html>
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')

export default PhysicsInternalModel
