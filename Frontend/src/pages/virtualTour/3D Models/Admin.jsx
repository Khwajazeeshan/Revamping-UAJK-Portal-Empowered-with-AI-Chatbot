import { useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';

export default function AdminBuilding(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb');
    const [showCard, setShowCard] = useState(false);

    return (
        <>
            <group
                name="admin"
                position={[14.236412, 0.979546, 7.071078]}
                rotation={[Math.PI, -0.031228, Math.PI]}
                scale={[0.097941, 0.128756, 0.136299]}
                onClick={() => setShowCard(!showCard)} // toggle on click
            >
                <mesh
                    name="Cube010"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube010.geometry}
                    material={materials['building color.006']}
                />
                <mesh
                    name="Cube010_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube010_1.geometry}
                    material={materials['glass org']}
                />
                <mesh
                    name="Cube010_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube010_2.geometry}
                    material={materials['Stylised wood 2.004']}
                />
                <mesh
                    name="Cube010_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube010_3.geometry}
                    material={materials['Material.005']}
                />

                {showCard && (
                    <Html
                        position={[0, 2, 0]} // position above building
                        style={{
                            color: 'white',
                            background: 'rgba(0, 0, 0, 0.85)',
                            padding: '15px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
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
                            <h3 style={{ margin: '10px 0 5px 0' }}>Administration Building</h3>
                            <p style={{ margin: '5px 0' }}>
                                The hub for university administration and support.
                            </p>
                        </div>
                    </Html>
                )}
            </group>
        </>
    );
}

useGLTF.preload('/AJKKK2.glb');
