import { useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';

export default function Auditorium(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb');
    const [showCard, setShowCard] = useState(false);

    return (
        <>
            <group
                name="auditorium"
                position={[2.014725, 0.637248, 9.302063]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={[1.132228, 0.077837, 0.078979]}
                onClick={() => setShowCard(!showCard)} // toggle card
            >
                <mesh
                    name="Cube011"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011.geometry}
                    material={materials['building colorr']}
                />
                <mesh
                    name="Cube011_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011_1.geometry}
                    material={materials['Stylised wood 2.011']}
                />
                <mesh
                    name="Cube011_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011_2.geometry}
                    material={materials['glass org']}
                />
                <mesh
                    name="Cube011_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011_3.geometry}
                    material={materials['Material.011']}
                />
                <mesh
                    name="Cube011_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011_4.geometry}
                    material={materials['Material.012']}
                />
                <mesh
                    name="Cube011_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011_5.geometry}
                    material={materials['Material.013']}
                />
                <mesh
                    name="Cube011_6"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube011_6.geometry}
                    material={materials['Material.005']}
                />

                {showCard && (
                    <Html
                        position={[0, 2, 0]} // above building
                        style={{
                            color: 'white',
                            background: 'rgba(0, 0, 0, 0.85)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                            padding: '15px',
                            textAlign: 'center',
                            minWidth: '220px',
                            maxWidth: '300px',
                            position: 'absolute',
                        }}
                    >
                        <div style={{ pointerEvents: 'auto' }}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowCard(false);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                }}
                            >
                                &times;
                            </button>
                            <h3 style={{ margin: '10px 0 5px 0' }}>Auditorium</h3>
                            <p style={{ margin: '5px 0' }}>A venue for lectures and events.</p>
                        </div>
                    </Html>
                )}
            </group>
        </>
    );
}

useGLTF.preload('/AJKKK2.glb');
