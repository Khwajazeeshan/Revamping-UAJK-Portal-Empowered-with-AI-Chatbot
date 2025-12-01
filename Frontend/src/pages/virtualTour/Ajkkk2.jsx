import { useGLTF, PerspectiveCamera, } from '@react-three/drei'
import { Html } from '@react-three/drei';
import { useState } from 'react';
import Masjid from './3D Models/Masjid';
import Economic from './3D Models/Economic';
import English from './3D Models/English';
import Library from './3D Models/Library';
import Canteen from './3D Models/Canteen';
import Botnay from './3D Models/Botnay';
import Geology from './3D Models/Geology';
import CS from './3D Models/CS';
import Cafe from './3D Models/Cafe';
import Auditorium from './3D Models/Auditorium';
import Admin from './3D Models/Admin';
import SecurityOffice from './3D Models/SecurityOffice';
import Chemistry from './3D Models/Chemistry';
import Physics from './3D Models/Physics';
import Statistics from './3D Models/Statistics';
import MathModel from './3D Models/Math';
import Zoology from './3D Models/Zoology';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/AJKKK2.glb')
  const [showCard, setShowCard] = useState(false);
  const toggleCard = () => setShowCard(!showCard);


  return (
    <group {...props} dispose={null} >
      <group name="Scene">

        {/* Entrance Gate shade.... */}
        <mesh
          name="Cylinder"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          position={[8.531768, -0.048977, -12.126743]}
          scale={0.006111}
        />
        <CS />
        <Zoology />
        <Masjid />
        <Economic />
        <English />
        <Library />
        <Canteen />
        <Cafe />
        <Auditorium />
        <Admin />
        <SecurityOffice />
        <Botnay />
        <Geology />
        <Chemistry />
        <Physics />
        <Statistics />
        <MathModel />

        {/* shed1 */}
        <group
          name="shed1"
          position={[-9.630677, 0.088164, 4.160864]}
          rotation={[0, 1.570535, 0]}
          scale={0.136282}>
          <mesh
            name="Cube009"
            castShadow
            receiveShadow
            geometry={nodes.Cube009.geometry}
            material={materials['building color.006']}
          />
          <mesh
            name="Cube009_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube009_1.geometry}
            material={materials['Stylised wood 2.010']}
          />
          <mesh
            name="Cube009_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube009_2.geometry}
            material={materials['grill.007']}
          />
        </group>
        {/* shed2 */}
        <group
          name="shed_2"
          position={[-9.39376, 0.037092, -0.962163]}
          rotation={[0, -1.570535, 0]}
          scale={0.117245}>
          <mesh
            name="Cube007"
            castShadow
            receiveShadow
            geometry={nodes.Cube007.geometry}
            material={materials['building color.006']}
          />
          <mesh
            name="Cube007_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube007_1.geometry}
            material={materials['Stylised wood 2.010']}
          />
          <mesh
            name="Cube007_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube007_2.geometry}
            material={materials['grill.007']}
          />
        </group>
        {/* shed3 */}
        <group
          name="shed_3"
          position={[-11.76287, 0.057176, -0.727522]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.114383}>
          <mesh
            name="Cube008"
            castShadow
            receiveShadow
            geometry={nodes.Cube008.geometry}
            material={materials['building color.006']}
          />
          <mesh
            name="Cube008_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube008_1.geometry}
            material={materials['Stylised wood 2.010']}
          />
          <mesh
            name="Cube008_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube008_2.geometry}
            material={materials['grill.007']}
          />
        </group>
        {/* shed4 */}
        <group
          name="shed_4"
          position={[-15.319941, 0.204213, -4.448302]}
          rotation={[0, -1.570535, 0]}
          scale={0.144317}>
          <mesh
            name="Cube013"
            castShadow
            receiveShadow
            geometry={nodes.Cube013.geometry}
            material={materials['building color.006']}
          />
          <mesh
            name="Cube013_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube013_1.geometry}
            material={materials['Stylised wood 2.010']}
          />
          <mesh
            name="Cube013_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube013_2.geometry}
            material={materials['grill.007']}
          />
        </group>
        {/* shed5 */}
        <group
          name="shed_5"
          position={[-3.494534, 0.173843, -5.065881]}
          rotation={[0, 1.570535, 0]}
          scale={0.156836}>
          <mesh
            name="Cube005"
            castShadow
            receiveShadow
            geometry={nodes.Cube005.geometry}
            material={materials['building color.006']}
          />
          <mesh
            name="Cube005_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube005_1.geometry}
            material={materials['Stylised wood 2.010']}
          />
          <mesh
            name="Cube005_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube005_2.geometry}
            material={materials['grill.007']}
          />
        </group>
        {/* shed6 */}
        <group
          name="shed_6"
          position={[-7.027137, 0.136869, -5.2304]}
          rotation={[0, 1.570535, 0]}
          scale={0.155903}>
          <mesh
            name="Cube006"
            castShadow
            receiveShadow
            geometry={nodes.Cube006.geometry}
            material={materials['building color.006']}
          />
          <mesh
            name="Cube006_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube006_1.geometry}
            material={materials['Stylised wood 2.010']}
          />
          <mesh
            name="Cube006_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube006_2.geometry}
            material={materials['grill.007']}
          />
        </group>
        {/* shed7 */}
        <group
          name="shed_7"
          position={[15.960829, 0.344841, 1.593983]}
          rotation={[0, 1.570535, 0]}
          scale={[0.128792, 0.247212, 0.197286]}>
          <mesh
            name="Cube014"
            castShadow
            receiveShadow
            geometry={nodes.Cube014.geometry}
            material={materials['building color']}
          />
          <mesh
            name="Cube014_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube014_1.geometry}
            material={materials['Stylised wood 2.010']}
          />
          <mesh
            name="Cube014_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube014_2.geometry}
            material={materials['grill.007']}
          />
        </group>

        <group name="Node_0008" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Assembly-1001" scale={0.0254} />
        </group>

        <group
          name="Node_0002"
          position={[-0.714288, 3.36198, -1.08138]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.954468}>
          <group name="Assembly-2002" scale={0.0254} />
        </group>

        <group name="Node_0001" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Assembly-1" scale={0.0254} />
        </group>

        <group name="Assembly-4001" scale={0.0254} />
        <group
          name="Cube003"
          position={[14.709761, 0.210949, -5.537918]}
          rotation={[0, -0.007906, 0]}
          scale={[0.128792, 0.247212, 0.108189]}>
          <mesh
            name="Cube003_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube003_1.geometry}
            material={materials['building color']}
          />
          <mesh
            name="Cube003_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube003_2.geometry}
            material={materials['Stylised wood 2.010']}
          />
          <mesh
            name="Cube003_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube003_3.geometry}
            material={materials['grill.007']}
          />
        </group>

        <directionalLight
          name="Sun"
          intensity={4}
          decay={2}
          position={[-3.727625, 13.908195, -0.273914]}
          rotation={[-1.383119, -0.733465, 0.07227]}>
          <group position={[0, 0, -1]} />
        </directionalLight>
        <group
          name="Node_0005"
          position={[0, 0, 17.737028]}
          rotation={[-Math.PI / 2, 0, 0.321063]}
          scale={1.17627}>
          <group name="Assembly-2003" scale={0.0254} />
        </group>

        <PerspectiveCamera
          name="Camera"
          makeDefault={true}
          far={1000}
          near={0.1}
          fov={38.895194}
          position={[15.617913, 18.346313, -61.309872]}
          rotation={[-2.870484, 0.195742, 3.087586]}
        />

        <group
          name="Node_0003"
          position={[7.596206, 0.058865, 18.464479]}
          rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Assembly-2001" scale={0.0254} />
        </group>
        <group
          name="Node_0004"
          position={[-5.894769, 0, 8.0355]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.550312}>
          <group name="Assembly-2004" scale={0.0254}>
            <group name="3DGeom-2001">
              <mesh
                name="Mesh_1001"
                castShadow
                receiveShadow
                geometry={nodes.Mesh_1001.geometry}
                material={materials['Material.007']}
              />
              <mesh
                name="Mesh_1001_1"
                castShadow
                receiveShadow
                geometry={nodes.Mesh_1001_1.geometry}
                material={materials['Material.014']}
              />
              <mesh
                name="Mesh_1001_2"
                castShadow
                receiveShadow
                geometry={nodes.Mesh_1001_2.geometry}
                material={materials['Stylised wood 2.009']}
              />
            </group>
            <group name="Node_3001" position={[-15, -25.000015, 0]} rotation={[0, 0, 0.270632]}>
              <group name="3DGeom-10001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-11001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-12001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-13001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-14001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-15001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-16001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-17001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-18001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-19001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-20001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-3001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-4001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-5001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-6001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-7001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-8001" position={[-0.000023, 0.000015, 0]} />
              <group name="3DGeom-9001" position={[-0.000023, 0.000015, 0]} />
            </group>
          </group>
        </group>
        <group
          name="Node_0006"
          position={[-5.732288, 0, 7.720836]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.530047}>
          <group name="Assembly-2005" scale={0.0254} />
        </group>
        <group
          name="Node_0007"
          position={[-5.732288, -4.165883, 7.720836]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.530047}>
          <group name="Assembly-2006" scale={0.0254}>
            <group name="3DGeom-2002" position={[63.320366, 146.270691, 4.004508]}>
              <mesh
                name="Mesh_1003"
                castShadow
                receiveShadow
                geometry={nodes.Mesh_1003.geometry}
                material={materials['Teddy_BookCover.001']}
              />
              <mesh
                name="Mesh_1003_1"
                castShadow
                receiveShadow
                geometry={nodes.Mesh_1003_1.geometry}
                material={materials.road}
              />
            </group>
          </group>
        </group>
        <group
          name="chemistry_cam"
          position={[2.406974, 0.607247, -9.505315]}
          rotation={[-3.011716, -0.700181, -3.057627]}
          scale={0.029862}
        />
        <group name="Node_0" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Assembly-2" scale={0.0254}>
            <mesh
              name="3DGeom-1"
              castShadow
              receiveShadow
              geometry={nodes['3DGeom-1'].geometry}
              material={materials.road}
              position={[-10.792001, 0.274477, -2.97103]}
              rotation={[0, 0, -Math.PI]}
              scale={[-1.527973, -1.527973, -0.119517]}
            />
            <group name="Node_3" position={[-15.000001, -25.000002, 0]} rotation={[0, 0, 0.270632]}>
              <group name="3DGeom-10" />
              <group name="3DGeom-11" />
              <group name="3DGeom-12" />
              <group name="3DGeom-13" />
              <group name="3DGeom-14" />
              <group name="3DGeom-15" />
              <group name="3DGeom-16" />
              <group name="3DGeom-17" />
              <group name="3DGeom-18" />
              <group name="3DGeom-19" />
              <group name="3DGeom-20" />
              <group name="3DGeom-21" />
              <group name="3DGeom-4" />
              <group name="3DGeom-5" />
              <group name="3DGeom-6" />
              <group name="3DGeom-7" />
              <group name="3DGeom-8" />
              <group name="3DGeom-9" />
            </group>
          </group>
        </group>

      </group>
    </group>
  )
}

useGLTF.preload('/AJKKK2.glb')
