import { useGLTF, Html } from '@react-three/drei'
import { useState } from 'react'

export default function CanteenModel(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb')
    const [showCard, setShowCard] = useState(false)

    const handleCloseCard = () => setShowCard(false)

    return (
        <group {...props} onClick={() => setShowCard(!showCard)}>
            <group
                name="canten"
                position={[15.871162, 0.580007, -3.787426]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[3.624826, 6.389884, 1.972059]}>
                <mesh
                    name="Plane"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane.geometry}
                    material={materials['building color']}
                />
                <mesh
                    name="Plane_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_1.geometry}
                    material={materials['glass org']}
                />
                <mesh
                    name="Plane_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_2.geometry}
                    material={materials['Stylised wood 2.005']}
                />
                <mesh
                    name="Plane_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_3.geometry}
                    material={materials['Material.005']}
                />
            </group>

            {showCard && (
                <Html
                    position={[20, 0.5, 0]}
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
                    }}>
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
                            }}>
                            &times;
                        </button>
                        <h3 style={{ margin: '10px 0 5px 0' }}>Canteen</h3>
                        <p style={{ margin: '5px 0' }}>A place to relax and enjoy refreshments.</p>
                    </div>
                </Html>
            )}
        </group>
    )
}
