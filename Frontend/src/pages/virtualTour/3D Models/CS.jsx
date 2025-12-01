import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html, PerspectiveCamera, FirstPersonControls, MapControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCameraContext } from '../CameraContext' // adjust path

export default function Model(props) {
  const { nodes, materials } = useGLTF('/AJKKK2.glb')
  const defaultCamRef = useRef()
  const csCamRef = useRef()
  const { set, camera, gl } = useThree()

  const { activeDepartment, setActiveDepartment } = useCameraContext();
  const isActive = activeDepartment === 'cs';
  const [showCard, setShowCard] = useState(false)
  const [lookSpeed, setLookSpeed] = useState(0.01)
  const [fov, setFov] = useState(75)

  const csInsidePos = [-4.5, 1.25, -10.7]
  const csInsideRot = [0, 0, 0]
  const csOutsidePos = [4, 8, -25]

  // 🔒 Keep camera fixed inside CS
  useEffect(() => {
    if (isActive) {
      const lockPosition = () => {
        camera.position.set(...csInsidePos)
      }
      const interval = setInterval(lockPosition, 10)
      return () => clearInterval(interval)
    }
  }, [isActive])

  // 🎛 Controls and key/mouse handlers
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

    const handleWheel = (e) => {
      if (isActive) {
        e.preventDefault()
        e.stopPropagation()
        setFov((prev) => {
          let newFov = prev + e.deltaY * 0.05
          newFov = Math.min(Math.max(newFov, 40), 85)
          camera.fov = newFov
          camera.updateProjectionMatrix()
          return newFov
        })
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
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('contextmenu', handleContextMenu)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [isActive, camera, set])

  // 🖱 Single click → show card
  const handleSingleClick = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowCard(!showCard);
  }

  const handleCloseCard = () => setShowCard(false)

  return (
    <group
      {...props}
      dispose={null}
      onPointerDown={(e) => isActive && e.stopPropagation()}
      onClick={handleSingleClick}
    >
      {/* Department Model */}
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

      <PerspectiveCamera
        ref={defaultCamRef}
        makeDefault={!isActive}
        fov={50}
        position={csOutsidePos}
      />

      <PerspectiveCamera
        ref={csCamRef}
        makeDefault={isActive}
        fov={fov}
        position={csInsidePos}
        rotation={csInsideRot}
      />

      {!isActive && (activeDepartment === null || activeDepartment === 'default') && (
        <MapControls args={[camera, gl.domElement]} enableRotate enablePan enableZoom={true} />
      )}

      {isActive && (
        <FirstPersonControls
          args={[camera, gl.domElement]}
          movementSpeed={0}
          lookSpeed={lookSpeed}
          activeLook={true}
          enabled={true}
          constrainVertical={true}
        />
      )}

      {/* Info Card */}
      {showCard && (
        <Html
          position={[-4.8, 2.5, -10.5]}
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
            <h3 style={{ margin: '10px 0 5px 0' }}>Computer Science</h3>
            <p style={{ margin: '5px 0' }}>Empowering the future with innovation.</p>
            <button
              onClick={() => window.location.href = '/cs'}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                background: 'linear-gradient(90deg, #56ccf2, #2f80ed)',
                border: 'none',
                borderRadius: '5px',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              Visit Computer Science
            </button>
          </div>
        </Html>
      )}
    </group>
  )
}

useGLTF.preload('/AJKKK2.glb')