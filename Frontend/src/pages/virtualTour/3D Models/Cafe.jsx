import { useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';

export default function Cafe(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb');
    const [showCard, setShowCard] = useState(false);

    return (
        <>
            <group
                name="cafe"
                position={[-3.187166, 1.142144, 11.159814]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.19728, 0.373628, 0.326021]}
                onClick={() => setShowCard(!showCard)} // toggle on click
            >
                <mesh
                    name="Cube012"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube012.geometry}
                    material={materials['building colorr']}
                />
                <mesh
                    name="Cube012_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube012_1.geometry}
                    material={materials['glass org']}
                />
                <mesh
                    name="Cube012_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube012_2.geometry}
                    material={materials['Stylised wood 2.002']}
                />
                <mesh
                    name="Cube012_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube012_3.geometry}
                    material={materials['Material.015']}
                />
                <mesh
                    name="Cube012_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube012_4.geometry}
                    material={materials['building color.007']}
                />
                <mesh
                    name="Cube012_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube012_5.geometry}
                    material={materials['Material.005']}
                />

                {showCard && (
                    <Html
                        position={[0, 2, 0]} // above the building
                        style={{
                            color: 'white',
                            background: 'rgba(0, 0, 0, 0.85)',
                            padding: '15px',
                            borderRadius: '12px',
                            textAlign: 'center',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
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
                                    color: '#ff4757',
                                    fontSize: '22px',
                                    cursor: 'pointer',
                                }}
                            >
                                &times;
                            </button>
                            <h3 style={{ margin: '10px 0', fontSize: '1.4em', fontWeight: 'bold' }}>
                                Café
                            </h3>
                            <p style={{ margin: '8px 0', fontSize: '1em' }}>
                                A place to relax and enjoy your favorite drinks.
                            </p>
                        </div>
                    </Html>
                )}
            </group>
        </>
    );
}

useGLTF.preload('/AJKKK2.glb');
