import React, { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, FirstPersonControls, Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function GeologyInternalModel({ active }) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const camRef = useRef()
    const { gl, set } = useThree()
    const [lookSpeed] = useState(0.01)
    const [fov, setFov] = useState(75)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const geoInsidePos = [-16, 0.6, 3.2]
    const geoInsideRot = [0, 1.55, 0]

    useEffect(() => {
        if (active && camRef.current) {
            camRef.current.position.set(...geoInsidePos)
            camRef.current.rotation.set(...geoInsideRot)
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
                name="Geology"
                position={[-16.236271, 0.619603, 3.193445]}
                rotation={[0, 1.552367, 0]}
                scale={[-4.080351, -3.565117, -4.924909]}
            >
                <mesh geometry={nodes.Cube016.geometry} material={materials['grill.012']} />
                <mesh geometry={nodes.Cube016_1.geometry} material={materials['building colorr']} />
                <mesh geometry={nodes.Cube016_2.geometry} material={materials['glass org']} />
                <mesh geometry={nodes.Cube016_3.geometry} material={materials['Stylised wood 2.014']} />
                <mesh geometry={nodes.Cube016_4.geometry} material={materials['Stylised wood 2.015']} />
                <mesh geometry={nodes.Cube016_5.geometry} material={materials['grill.013']} />
                <mesh geometry={nodes.Cube016_6.geometry} material={materials['Material.023']} />
            </group>

            <PerspectiveCamera ref={camRef} makeDefault fov={fov} position={geoInsidePos} rotation={geoInsideRot} />
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

            <Html position={[-16, 2.5, 3]}>
                <div className="geo-label">
                    <h3>Geology Department</h3>
                </div>
            </Html>
        </group>
    )
}

useGLTF.preload('/AJKKK2.glb')
export default GeologyInternalModel
