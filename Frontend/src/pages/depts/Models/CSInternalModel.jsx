import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, FirstPersonControls, Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'


function CSInternalModel({ active }) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const camRef = useRef()
    const { gl, set } = useThree()
    const [lookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const csInsidePos = [-4.5, 1.25, -10.7]
    const csInsideRot = [0, 0, 0]

    useEffect(() => {
        if (active && camRef.current) {
            camRef.current.position.set(...csInsidePos)
            camRef.current.rotation.set(...csInsideRot)
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
                name="CS"
                position={[-4.821816, 1.038035, -10.774179]}
                rotation={[Math.PI, -1.527434, Math.PI]}
                scale={[2.988169, 1.864087, 2.399738]}
            >
                <mesh geometry={nodes.Plane009?.geometry} material={materials['Red Brick']} />
                <mesh geometry={nodes.Plane009_1?.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Plane009_2?.geometry} material={materials['Cobblestone road.001']} />
                <mesh geometry={nodes.Plane009_3?.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Plane009_4?.geometry} material={materials['Stylised wood 2.021']} />
                <mesh geometry={nodes.Plane009_5?.geometry} material={materials['Material.043']} />
                <mesh geometry={nodes.Plane009_6?.geometry} material={materials['grill.021']} />
                <mesh geometry={nodes.Plane009_7?.geometry} material={materials['Material.044']} />
            </group>

            <PerspectiveCamera ref={camRef} makeDefault fov={fov} position={csInsidePos} rotation={csInsideRot} />
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

            <Html position={[-4.8, 2.5, -10.5]}>
                <div className="cs-label">
                    <h3>Computer Science Dept</h3>
                </div>
            </Html>
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')

export default CSInternalModel
