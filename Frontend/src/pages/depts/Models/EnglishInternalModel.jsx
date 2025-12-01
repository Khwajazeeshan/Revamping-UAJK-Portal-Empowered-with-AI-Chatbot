import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, FirstPersonControls, Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function EnglishInternalModel({ active }) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const camRef = useRef()
    const { gl, set } = useThree()
    const [lookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const engInsidePos = [12.12, 1, -6.3]
    const engInsideRot = [0, Math.PI, 0]

    useEffect(() => {
        if (active && camRef.current) {
            camRef.current.position.set(...engInsidePos)
            camRef.current.rotation.set(...engInsideRot)
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
                name="english"
                position={[12.014261, 0.808712, -5.532899]}
                rotation={[0, 0, -Math.PI]}
                scale={[3.462545, 3.001251, 3.419086]}
            >
                <mesh geometry={nodes.Plane004.geometry} material={materials['Material.024']} />
                <mesh geometry={nodes.Plane004_1.geometry} material={materials['Stylised wood 2']} />
                <mesh geometry={nodes.Plane004_2.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Plane004_3.geometry} material={materials.gril} />
                <mesh geometry={nodes.Plane004_4.geometry} material={materials['Material.010']} />
            </group>

            <PerspectiveCamera ref={camRef} makeDefault fov={fov} position={engInsidePos} rotation={engInsideRot} />
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
            <directionalLight position={[-5, 3, -3]} intensity={0.8} />

            <Html position={[12, 2.5, -6]}>
                <div className="english-label">
                    <h3>English Department</h3>
                </div>
            </Html>
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
export default EnglishInternalModel
