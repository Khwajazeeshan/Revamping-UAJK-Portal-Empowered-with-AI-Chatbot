import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { MapControls, Sky, Html, useProgress } from '@react-three/drei'
import Ajkkk2 from './Ajkkk2'
import { CameraProvider, useCameraContext } from './CameraContext'
import './VirtualTour.css'
import Chatbot from '../../pages/chatbot/chatbot'

// 🧠 Controls wrapper — listens to context
function ConditionalControls() {
  const { activeDepartment } = useCameraContext()
  if (activeDepartment) return null

  return (
    <MapControls
      enableDamping={true}
      dampingFactor={0.05}
      rotateSpeed={0.5}
      panSpeed={0.8}
      zoomSpeed={1.2}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      minDistance={15}
      maxDistance={45}
      maxPolarAngle={Math.PI / 2.2}
      minPolarAngle={0.8}
      screenSpacePanning={true}
      mouseButtons={{
        LEFT: 0,   // Rotate
        MIDDLE: 1, // Zoom
        RIGHT: 2   // Pan
      }}
    />
  )
}

// 🔹 Model loader with progress %
function ModelLoader() {
  const { progress } = useProgress()
  return (
    <Html center >
      <div className="model-loader">
        <div className="loader-circle1"></div>
        <p>Loading...</p>
        <p>{progress.toFixed(0)}%</p>
      </div>
    </Html>
  )
}

function VirtualTour() {
  const [chatOpen, setChatOpen] = useState(false)
  const handleToggleChat = () => setChatOpen((prev) => !prev)

  return (
    <div className="main-canvas" >
      <CameraProvider>
        <Canvas camera={{ position: [0, 10, 30], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <Suspense fallback={<ModelLoader />}>
            <Physics>
              <Ajkkk2 />
            </Physics>
          </Suspense>
          {/* <Sky distance={999999} /> */}
          <Sky
            distance={999999}
            rayleigh={0.2}
          />
          <ConditionalControls />
        </Canvas>
      </CameraProvider>
      <Chatbot open={chatOpen} onToggle={handleToggleChat} />
    </div>
  )
}

export default VirtualTour
