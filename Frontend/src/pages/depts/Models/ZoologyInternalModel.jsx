import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, FirstPersonControls, Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function ZoologyInternalModel({ active }) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const camRef = useRef()
    const { gl, set } = useThree()
    const [lookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const zooInsidePos = [-5.9, 1.1, 1.3]
    const zooInsideRot = [0, 0, 0]

    useEffect(() => {
        if (active && camRef.current) {
            camRef.current.position.set(...zooInsidePos)
            camRef.current.rotation.set(...zooInsideRot)
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
                name="Zoology"
                position={[-4.592263, 0.796494, 0.951567]}
                rotation={[Math.PI, -1.547047, Math.PI]}
                scale={[0.032932, 0.032644, 0.03563]}
            >
                <mesh geometry={nodes.Cube143.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Cube143_1.geometry} material={materials['grill.019']} />
                <mesh geometry={nodes.Cube143_2.geometry} material={materials['Stylised wood 2.019']} />
                <mesh geometry={nodes.Cube143_3.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Cube143_4.geometry} material={materials['Stylised wood 2.020']} />
                <mesh geometry={nodes.Cube143_5.geometry} material={materials['grill.020']} />
                <mesh geometry={nodes.Cube143_6.geometry} material={materials['Material.042']} />
            </group>

            <PerspectiveCamera ref={camRef} makeDefault fov={fov} position={zooInsidePos} rotation={zooInsideRot} />
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

            <Html position={[-4.5, 2.5, 1]}>
                <div className="zoology-label">
                    <h3>Zoology Department</h3>
                </div>
            </Html>
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')

export default ZoologyInternalModel
