import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, PerspectiveCamera, FirstPersonControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function ClassroomModel() {
  const { nodes, materials } = useGLTF('/class.glb')
  const camRef = useRef()
  const { gl, set } = useThree()
  const [lookSpeed] = useState(0.01)
  const [fov, setFov] = useState(75)
  const [isMouseDown, setIsMouseDown] = useState(false)

  // 🎯 Camera position & rotation
  const camPos = [0, 5, 8]
  const camRot = [0, Math.PI, 0]

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

  // 🖱 Mouse click rotation lock/unlock
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
      {/* 🏫 Model */}
      <group name="ClassroomModel">
        <group
          name="Cube002"
          position={[-13.401, 0.763, 13.483]}
          scale={[0.551, 0.065, 0.070]}>
          <mesh geometry={nodes.Cube004.geometry} material={materials['Material.003']} />
          <mesh geometry={nodes.Cube004_1.geometry} material={materials['Material.001']} />
        </group>

        <group
          name="Cube"
          position={[2.123, 0.654, -1.756]}
          scale={[25.34, 11.75, 22.75]}>
          <mesh geometry={nodes.Cube009.geometry} material={materials['Material.004']} />
          <mesh geometry={nodes.Cube009_1.geometry} material={materials['Material.005']} />
          <mesh geometry={nodes.Cube009_2.geometry} material={materials['Material.008']} />
          <mesh geometry={nodes.Cube009_3.geometry} material={materials['Material.003']} />
          <mesh geometry={nodes.Cube009_4.geometry} material={materials['Material.009']} />
          <mesh geometry={nodes.Cube009_5.geometry} material={materials['Material.013']} />
          <mesh geometry={nodes.Cube009_6.geometry} material={materials['LIGHT BODY']} />
        </group>

        <mesh
          geometry={nodes.Cube001.geometry}
          material={materials['Material.003']}
          position={[-9.05, 1.37, 16.67]}
          scale={[1.2, 1.49, 1.2]}
        />
        <mesh
          geometry={nodes.Cube003.geometry}
          material={materials['Material.003']}
          position={[-3.09, 2.01, 15.78]}
          scale={[2.13, 0.22, 1.17]}
        />
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
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <directionalLight position={[-5, 3, -3]} intensity={1} />
    </group>
  )
}

useGLTF.preload('/class.glb')
