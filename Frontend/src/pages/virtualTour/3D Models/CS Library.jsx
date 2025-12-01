
import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, PerspectiveCamera, FirstPersonControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'


export default function LibraryModel(props) {

  const { nodes, materials } = useGLTF('/Library.glb')
  const camRef = useRef()
  const { gl, set } = useThree()
  const [lookSpeed] = useState(0.01)
  const [fov, setFov] = useState(75)
  const [isMouseDown, setIsMouseDown] = useState(false)

  // 🎯 Camera position & rotation
  const camPos = [10, 2, 16]
  const camRot = [0, 190, 0]

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
    <group {...props} dispose={null}>

      {/* 🏫 Library Model */}
      <group name="LibraryModel">
        {/* paste your <group name="Scene"> content here from old library model */}
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
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      <directionalLight position={[-5, 3, -3]} intensity={0.7} />

      <group name="Scene">
        <group
          name="Cube"
          position={[-39.5103302, -5.1908331, -4.4688287]}
          scale={[84.7812119, 25.1118145, 64.1280975]}>
          <mesh
            name="Cube_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={materials['Material.006']}
          />
          <mesh
            name="Cube_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube_2.geometry}
            material={materials['oak wood']}
          />
          <mesh
            name="Cube_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube_3.geometry}
            material={materials['Material.002']}
          />
          <mesh
            name="Cube_4"
            castShadow
            receiveShadow
            geometry={nodes.Cube_4.geometry}
            material={materials.Material}
          />
        </group>
        <directionalLight
          name="Sun"
          intensity={4}
          decay={2}
          position={[22.7613735, 8.33778, -29.7937202]}
          rotation={[-2.9403528, -0.099731, -0.0836854]}
          scale={[11.5851917, 11.5851908, 11.5851917]}>
          <group position={[0, 0, -1]} />
        </directionalLight>
        <group
          name="library"
          position={[-115.5842896, -16.714365, 3.3294744]}
          rotation={[0, 1.2563608, 0]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube008"
            castShadow
            receiveShadow
            geometry={nodes.Cube008.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube008_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube008_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube008_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube008_2.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Cube008_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube008_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library001"
          position={[-115.5842896, -16.714365, -20.1891651]}
          rotation={[0, 1.2563608, 0]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube011"
            castShadow
            receiveShadow
            geometry={nodes.Cube011.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube011_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube011_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube011_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube011_2.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Cube011_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube011_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library002"
          position={[-115.5842896, -16.714365, -43.4442558]}
          rotation={[0, 1.2563608, 0]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube012"
            castShadow
            receiveShadow
            geometry={nodes.Cube012.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube012_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube012_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube012_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube012_2.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Cube012_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube012_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library004"
          position={[-115.5842896, -16.714365, 50.3266907]}
          rotation={[0, 1.2563608, 0]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube014"
            castShadow
            receiveShadow
            geometry={nodes.Cube014.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube014_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube014_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube014_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube014_2.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Cube014_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube014_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library005"
          position={[-115.5842896, -16.714365, 27.0716095]}
          rotation={[0, 1.2563608, 0]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube015"
            castShadow
            receiveShadow
            geometry={nodes.Cube015.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube015_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube015_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_2.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Cube015_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library003"
          position={[-94.0197067, -16.714365, 53.0061417]}
          rotation={[-Math.PI, 0.3736052, -Math.PI]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube016"
            castShadow
            receiveShadow
            geometry={nodes.Cube016.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube016_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube016_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube016_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube016_2.geometry}
            material={materials['Material.005']}
          />
          <mesh
            name="Cube016_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube016_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library006"
          position={[-70.3623657, -16.714365, 53.0061417]}
          rotation={[-Math.PI, 0.3736052, -Math.PI]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube017"
            castShadow
            receiveShadow
            geometry={nodes.Cube017.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube017_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube017_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube017_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube017_2.geometry}
            material={materials['Material.005']}
          />
          <mesh
            name="Cube017_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube017_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library007"
          position={[-48.0766335, -16.714365, 53.0061417]}
          rotation={[-Math.PI, 0.3736052, -Math.PI]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube018"
            castShadow
            receiveShadow
            geometry={nodes.Cube018.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube018_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube018_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube018_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube018_2.geometry}
            material={materials['Material.005']}
          />
          <mesh
            name="Cube018_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube018_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library008"
          position={[12.6750135, -16.714365, 53.0061417]}
          rotation={[-Math.PI, 0.3736052, -Math.PI]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube019"
            castShadow
            receiveShadow
            geometry={nodes.Cube019.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube019_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube019_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube019_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube019_2.geometry}
            material={materials['Material.005']}
          />
          <mesh
            name="Cube019_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube019_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library012"
          position={[-35.4935341, -16.714365, -8.5002766]}
          rotation={[0, -0.3423003, 0]}
          scale={[0.2888334, 1.6787907, 1.5620048]}>
          <mesh
            name="Cube023"
            castShadow
            receiveShadow
            geometry={nodes.Cube023.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube023_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube023_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube023_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube023_2.geometry}
            material={materials['Material.005']}
          />
        </group>
        <group
          name="library009"
          position={[-12.675416, -16.714365, -8.5002766]}
          rotation={[0, -0.3423003, 0]}
          scale={[0.2888334, 1.6787907, 1.5620048]}>
          <mesh
            name="Cube024"
            castShadow
            receiveShadow
            geometry={nodes.Cube024.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube024_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube024_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube024_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube024_2.geometry}
            material={materials['Material.005']}
          />
        </group>
        <group
          name="library011"
          position={[114.23423, -16.714365, -12.7302771]}
          rotation={[Math.PI, -1.2563613, Math.PI]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube026"
            castShadow
            receiveShadow
            geometry={nodes.Cube026.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube026_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube026_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube026_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube026_2.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Cube026_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube026_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library013"
          position={[114.23423, -16.714365, 10.7883625]}
          rotation={[Math.PI, -1.2563613, Math.PI]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube027"
            castShadow
            receiveShadow
            geometry={nodes.Cube027.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube027_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube027_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube027_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube027_2.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Cube027_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube027_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library014"
          position={[114.23423, -16.714365, 34.0434456]}
          rotation={[Math.PI, -1.2563613, Math.PI]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube028"
            castShadow
            receiveShadow
            geometry={nodes.Cube028.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube028_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube028_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube028_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube028_2.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Cube028_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube028_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library015"
          position={[114.23423, -16.714365, -59.7274933]}
          rotation={[Math.PI, -1.2563613, Math.PI]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube029"
            castShadow
            receiveShadow
            geometry={nodes.Cube029.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube029_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube029_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube029_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube029_2.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Cube029_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube029_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library016"
          position={[114.23423, -16.714365, -36.4724121]}
          rotation={[Math.PI, -1.2563613, Math.PI]}
          scale={[0.2888334, 1.6787907, 1.5620047]}>
          <mesh
            name="Cube030"
            castShadow
            receiveShadow
            geometry={nodes.Cube030.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube030_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube030_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube030_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube030_2.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Cube030_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube030_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group
          name="library017"
          position={[47.6336517, -16.714365, -42.3133087]}
          rotation={[0, -0.3423003, 0]}
          scale={[0.2888334, 1.6787907, 1.5620048]}>
          <mesh
            name="Cube031"
            castShadow
            receiveShadow
            geometry={nodes.Cube031.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube031_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube031_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube031_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube031_2.geometry}
            material={materials['Material.005']}
          />
        </group>
        <group
          name="library018"
          position={[82.078743, -16.714365, -42.3133087]}
          rotation={[0, -0.3423003, 0]}
          scale={[0.2888334, 1.6787907, 1.5620048]}>
          <mesh
            name="Cube032"
            castShadow
            receiveShadow
            geometry={nodes.Cube032.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube032_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube032_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube032_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube032_2.geometry}
            material={materials['Material.005']}
          />
        </group>
        <group
          name="library019"
          position={[70.6718292, -16.714365, -11.9012003]}
          rotation={[Math.PI, -1.3027738, Math.PI]}
          scale={[0.2888334, 1.6787907, 1.5620049]}>
          <mesh
            name="Cube033"
            castShadow
            receiveShadow
            geometry={nodes.Cube033.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube033_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube033_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube033_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube033_2.geometry}
            material={materials['Material.005']}
          />
        </group>
        <group
          name="library020"
          position={[70.6718292, -16.714365, -36.8387566]}
          rotation={[Math.PI, -1.3027738, Math.PI]}
          scale={[0.2888334, 1.6787907, 1.5620049]}>
          <mesh
            name="Cube034"
            castShadow
            receiveShadow
            geometry={nodes.Cube034.geometry}
            material={materials['Material.003']}
          />
          <mesh
            name="Cube034_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube034_1.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube034_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube034_2.geometry}
            material={materials['Material.005']}
          />
        </group>
        <mesh
          name="Circle"
          castShadow
          receiveShadow
          geometry={nodes.Circle.geometry}
          material={materials['Material.007']}
          position={[36.7418976, 19.6098576, -40.8789597]}
          scale={5.7554407}
        />
        <mesh
          name="Circle001"
          castShadow
          receiveShadow
          geometry={nodes.Circle001.geometry}
          material={materials['Material.007']}
          position={[86.5285034, 19.6098576, -40.8789597]}
          scale={5.7554407}
        />
        <mesh
          name="Circle002"
          castShadow
          receiveShadow
          geometry={nodes.Circle002.geometry}
          material={materials['Material.007']}
          position={[-25.2262154, 19.6098576, -40.8789597]}
          scale={5.7554407}
        />
        <mesh
          name="Circle003"
          castShadow
          receiveShadow
          geometry={nodes.Circle003.geometry}
          material={materials['Material.007']}
          position={[-83.5673828, 19.6098576, -40.8789597]}
          scale={5.7554407}
        />
        <mesh
          name="Circle004"
          castShadow
          receiveShadow
          geometry={nodes.Circle004.geometry}
          material={materials['Material.007']}
          position={[36.7418976, 19.6098576, 38.5488091]}
          scale={5.7554407}
        />
        <mesh
          name="Circle005"
          castShadow
          receiveShadow
          geometry={nodes.Circle005.geometry}
          material={materials['Material.007']}
          position={[86.5285034, 19.6098576, 38.5488091]}
          scale={5.7554407}
        />
        <mesh
          name="Circle006"
          castShadow
          receiveShadow
          geometry={nodes.Circle006.geometry}
          material={materials['Material.007']}
          position={[-25.2262154, 19.6098576, 38.5488091]}
          scale={5.7554407}
        />
        <mesh
          name="Circle007"
          castShadow
          receiveShadow
          geometry={nodes.Circle007.geometry}
          material={materials['Material.007']}
          position={[-83.5673828, 19.6098576, 38.5488091]}
          scale={5.7554407}
        />
        <group
          name="wasd"
          position={[84.3112106, -16.3774796, 48.397316]}
          scale={[0.1983891, 0.0576295, 0.1983891]}>
          <mesh
            name="Cube081"
            castShadow
            receiveShadow
            geometry={nodes.Cube081.geometry}
            material={materials.space}
          />
          <mesh
            name="Cube081_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube081_1.geometry}
            material={materials['key caps']}
          />
          <mesh
            name="Cube081_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube081_2.geometry}
            material={materials['Material.021']}
          />
          <mesh
            name="Cube081_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube081_3.geometry}
            material={materials['abu2 metalic']}
          />
          <mesh
            name="Cube081_4"
            castShadow
            receiveShadow
            geometry={nodes.Cube081_4.geometry}
            material={materials['mouse pad']}
          />
          <mesh
            name="Cube081_5"
            castShadow
            receiveShadow
            geometry={nodes.Cube081_5.geometry}
            material={materials['Material.022']}
          />
          <mesh
            name="Cube081_6"
            castShadow
            receiveShadow
            geometry={nodes.Cube081_6.geometry}
            material={materials['Material.023']}
          />
          <mesh
            name="Cube081_7"
            castShadow
            receiveShadow
            geometry={nodes.Cube081_7.geometry}
            material={materials['Material.026']}
          />
          <mesh
            name="Cube081_8"
            castShadow
            receiveShadow
            geometry={nodes.Cube081_8.geometry}
            material={materials['Material.005']}
          />
          <mesh
            name="Cube081_9"
            castShadow
            receiveShadow
            geometry={nodes.Cube081_9.geometry}
            material={materials['Material.033']}
          />
          <mesh
            name="Cube081_10"
            castShadow
            receiveShadow
            geometry={nodes.Cube081_10.geometry}
            material={materials.keyboard}
          />
        </group>
        <group
          name="Mesh635_Group23_Haworth_Immerse_table___Poppy_chair1_Model002"
          position={[-81.4237366, -24.163166, -38.1437759]}
          rotation={[Math.PI / 2, 1e-7, 1.5685723]}
          scale={[10.8066683, 10.8066683, 6.9085517]}>
          <mesh
            name="Mesh635_Group23_Haworth_Immerse_table___Poppy_chair1_Model003"
            castShadow
            receiveShadow
            geometry={nodes.Mesh635_Group23_Haworth_Immerse_table___Poppy_chair1_Model003.geometry}
            material={materials['Rubber - Black.002']}
          />
          <mesh
            name="Mesh635_Group23_Haworth_Immerse_table___Poppy_chair1_Model003_1"
            castShadow
            receiveShadow
            geometry={
              nodes.Mesh635_Group23_Haworth_Immerse_table___Poppy_chair1_Model003_1.geometry
            }
            material={materials['Material.008']}
          />
        </group>
        <PerspectiveCamera
          name="Camera"
          makeDefault={true}
          far={1000}
          near={0.1}
          fov={49.4263531}
          position={[59.1593475, 16.9376144, 4.9869905]}
          rotation={[-1.6027281, 1.2901739, 1.6040424]}
          scale={[11.5851917, 11.5851898, 11.5851898]}
        />
        <directionalLight
          name="Sun001"
          intensity={4}
          decay={2}
          position={[6.5818701, 7.7694149, 0.8512878]}
          rotation={[-3.0056819, -0.3974771, -1.512841]}>
          <group position={[0, 0, -1]} />
        </directionalLight>
      </group>
    </group>
  )
}

useGLTF.preload('/Library.glb')
