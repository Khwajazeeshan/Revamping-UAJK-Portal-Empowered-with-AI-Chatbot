import { useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';

export default function SecurityOffice(props) {
    const { nodes, materials } = useGLTF('/AJKKK2.glb');
    const [showCard, setShowCard] = useState(false);

    return (
        <>
            <group
                name="security_office"
                position={[9.356672, 0.230207, -9.295883]}
                scale={[0.307939, 0.307939, 0.614074]}
                onClick={() => setShowCard(!showCard)} // toggle card on click
            >
                <mesh
                    name="Cube015"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015.geometry}
                    material={materials['Material.015']}
                />
                <mesh
                    name="Cube015_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_1.geometry}
                    material={materials['Stylised wood 2.009']}
                />

                {showCard && (
                    <Html
                        position={[0, 1.5, 0]} // show above building
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
                                Security Office
                            </h3>
                            <p style={{ margin: '8px 0', fontSize: '1em' }}>
                                Ensuring campus safety and protection.
                            </p>
                        </div>
                    </Html>
                )}
            </group>
        </>
    );
}

useGLTF.preload('/AJKKK2.glb');
