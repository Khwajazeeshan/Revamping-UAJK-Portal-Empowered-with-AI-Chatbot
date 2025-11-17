import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, FirstPersonControls, Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function MathInternalModel({ active }) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const camRef = useRef()
    const { gl, set } = useThree()
    const [lookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const mathInsidePos = [-9.4, 0.8, 9.9]
    const mathInsideRot = [0, Math.PI, 0]

    useEffect(() => {
        if (active && camRef.current) {
            camRef.current.position.set(...mathInsidePos)
            camRef.current.rotation.set(...mathInsideRot)
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
                name="Math"
                position={[-8.88004, 0.507555, 9.354913]}
                rotation={[0, -0.007846, Math.PI]}
                scale={[-4.670204, -4.757926, -5.404001]}
            >
                <mesh geometry={nodes.Cube020?.geometry} material={materials['grill.016']} />
                <mesh geometry={nodes.Cube020_1?.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Cube020_2?.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Cube020_3?.geometry} material={materials['Stylised wood 2.017']} />
                <mesh geometry={nodes.Cube020_4?.geometry} material={materials['grill.017']} />
                <mesh geometry={nodes.Cube020_5?.geometry} material={materials['Material.034']} />
            </group>

            <PerspectiveCamera ref={camRef} makeDefault fov={fov} position={mathInsidePos} rotation={mathInsideRot} />
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

            <Html position={[-9.3, 2.5, 9.9]}>
                <div className="math-label">
                    <h3>Mathematics Department</h3>
                </div>
            </Html>
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
export default MathInternalModel
