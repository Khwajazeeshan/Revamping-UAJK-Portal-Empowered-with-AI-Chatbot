import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, PerspectiveCamera, FirstPersonControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function LabModel(props) {
  const { nodes, materials } = useGLTF('/lab.glb')
  const camRef = useRef()
  const { gl, set } = useThree()
  const [lookSpeed] = useState(0.01)
  const [fov, setFov] = useState(75)
  const [isMouseDown, setIsMouseDown] = useState(false)

  // 🎯 Camera position & rotation
  const camPos = [1, 8, 3]
  const camRot = [0, 0, 0]

  // 🎥 Set camera
  useEffect(() => {
    if (camRef.current) {
      camRef.current.position.set(...camPos)
      camRef.current.rotation.set(...camRot)
      camRef.current.fov = fov
      camRef.current.updateProjectionMatrix()
      set({ camera: camRef.current })
    }
  }, [fov, set])

  // 🖱 Zoom with scroll
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      setFov((prev) => Math.min(Math.max(prev + e.deltaY * 0.05, 40), 85))
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  // 🖱 Mouse click rotation control
  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true)
    const handleMouseUp = () => setIsMouseDown(false)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <group dispose={null}>
      {/* 🧪 Lab Model */}
      <group {...props}>
        <mesh geometry={nodes.Cube001.geometry} material={materials['pine wood.001']} position={[-10.2, 3.24, -34.03]} scale={[1.68, 1.83, 1]} />
        <group position={[0.41, 0, 33.35]} scale={[1.56, 1.74, 1.74]}>
          <mesh geometry={nodes.Cylinder001.geometry} material={materials['Material.021']} />
          <mesh geometry={nodes.Cylinder001_1.geometry} material={materials.space} />
          <mesh geometry={nodes.Cylinder001_2.geometry} material={materials['key caps']} />
          <mesh geometry={nodes.Cylinder001_3.geometry} material={materials['merah metalic']} />
          <mesh geometry={nodes.Cylinder001_4.geometry} material={materials['abu2 metalic']} />
          <mesh geometry={nodes.Cylinder001_5.geometry} material={materials['Material.022']} />
          <mesh geometry={nodes.Cylinder001_6.geometry} material={materials['Material.023']} />
          <mesh geometry={nodes.Cylinder001_7.geometry} material={materials['Material.026']} />
          <mesh geometry={nodes.Cylinder001_8.geometry} material={materials['pine wood']} />
          <mesh geometry={nodes.Cylinder001_9.geometry} material={materials['Material.033']} />
          <mesh geometry={nodes.Cylinder001_10.geometry} material={materials.keyboard} />
        </group>

        <group position={[0, 9.26, 0]} rotation={[Math.PI, Math.PI / 2, 0]} scale={[-38.49, -8.71, -28.51]}>
          <mesh geometry={nodes.Cube003_1.geometry} material={materials['Material.001']} />
          <mesh geometry={nodes.Cube003_2.geometry} material={materials['Material.023']} />
          <mesh geometry={nodes.Cube003_3.geometry} material={materials['Material.003']} />
          <mesh geometry={nodes.Cube003_4.geometry} material={materials['pine wood.001']} />
          <mesh geometry={nodes.Cube003_5.geometry} material={materials['Material.004']} />
          <mesh geometry={nodes.Cube003_6.geometry} material={materials['Material.002']} />
        </group>

        <mesh geometry={nodes.Cube002.geometry} material={materials['Material.008']} position={[-5.41, 3.18, -32.05]} scale={[2.84, 0.29, 1.56]} />
      </group>

      {/* 🎥 Camera */}
      <PerspectiveCamera ref={camRef} makeDefault fov={fov} position={camPos} rotation={camRot} />
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
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -3]} intensity={0.7} />
    </group>
  )
}

useGLTF.preload('/lab.glb')
