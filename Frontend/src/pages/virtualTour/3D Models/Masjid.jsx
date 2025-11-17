import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, FirstPersonControls, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext' // adjust the import path

export default function MasjidModel(props) {
  const { nodes, materials } = useGLTF('/AJKKK2.glb')
  const defaultCamRef = useRef()
  const masjidCamRef = useRef()
  const { set, camera, gl } = useThree()

  const { activeDepartment, setActiveDepartment } = useCameraContext()
  const isActive = activeDepartment === 'masjid'
  const [showCard, setShowCard] = useState(false)
  const [lookSpeed, setLookSpeed] = useState(0.01)
  const [fov, setFov] = useState(75)

  // 🎯 Camera positions
  const masjidInsidePos = [-2.6, 0.8, 8.1]
  const masjidInsideRot = [0, 0, 0]
  const masjidOutsidePos = [4, 8, -25]

  // 🎹 Event Handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDepartment('default')
        set({ camera: defaultCamRef.current })
        setFov(75)
      }
    }

    const handleMouseDown = (e) => {
      if (isActive && (e.button === 0 || e.button === 2)) {
        e.preventDefault()
        e.stopPropagation()
        setLookSpeed(0)
      }
    }

    const handleMouseUp = (e) => {
      if (isActive && (e.button === 0 || e.button === 2)) {
        e.preventDefault()
        e.stopPropagation()
        setLookSpeed(0.01)
      }
    }

    const handleContextMenu = (e) => {
      if (isActive) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('contextmenu', handleContextMenu)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [isActive, camera, set])

  // 🚪 Double click → go inside
  const handleDoubleClick = (e) => {
    if (isActive) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    if (masjidCamRef.current) {
      masjidCamRef.current.position.set(...masjidInsidePos)
      masjidCamRef.current.rotation.set(...masjidInsideRot)
      setActiveDepartment('masjid')
      set({ camera: masjidCamRef.current })
      setShowCard(false)
    }
  }

  // 👆 Single click → show info card
  const handleSingleClick = (e) => {
    if (isActive) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    setShowCard(!showCard)
  }

  const handleCloseCard = () => setShowCard(false)

  return (
    <group {...props} onClick={handleSingleClick} onDoubleClick={handleDoubleClick} dispose={null}>
      {/* 🕌 Masjid Model */}
      <group
        name="Masjid"
        position={[-2.306312, 1.192701, 8.81916]}
        rotation={[0, 0.252473, 0]}
        scale={[-0.521572, -0.530158, -0.50796]}
      >
        <mesh geometry={nodes.Sphere.geometry} material={materials['building colorr']} />
        <mesh geometry={nodes.Sphere_1.geometry} material={materials['glass org']} />
        <mesh geometry={nodes.Sphere_2.geometry} material={materials['Stylised wood 2']} />
        <mesh geometry={nodes.Sphere_3.geometry} material={materials['grill.004']} />
        <mesh geometry={nodes.Sphere_4.geometry} material={materials['building color.001']} />
        <mesh geometry={nodes.Sphere_5.geometry} material={materials['Material.005']} />
      </group>

      {/* 🎥 Cameras */}
      <PerspectiveCamera
        ref={defaultCamRef}
        makeDefault={!isActive}
        fov={50}
        position={masjidOutsidePos}
      />

      <PerspectiveCamera
        ref={masjidCamRef}
        makeDefault={isActive}
        fov={fov}
        position={masjidInsidePos}
        rotation={masjidInsideRot}
      />

      {!isActive && (activeDepartment === null || activeDepartment === 'default') && (
        <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom={false} />
      )}

      {isActive && (
        <FirstPersonControls args={[camera, gl.domElement]} movementSpeed={0} lookSpeed={lookSpeed} />
      )}

      {/* 📘 Info Card */}
      {showCard && (
        <Html
          position={[-2.3, 3, 8.8]}
          style={{
            color: 'white',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
            minWidth: '200px',
            maxWidth: '300px',
            position: 'absolute',
          }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <button
              onClick={handleCloseCard}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
            <h3 style={{ margin: '10px 0 5px 0' }}>Masjid</h3>
            <p style={{ margin: '5px 0' }}>A place of worship and community.</p>
          </div>
        </Html>
      )}
    </group>
  )
}

useGLTF.preload('/AJKKK2.glb')
