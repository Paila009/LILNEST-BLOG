'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Html, Float } from '@react-three/drei';

function FetalModel({ week }) {
  const meshRef = useRef();
  // Scale based on gestational week (4-42)
  const baseScale = 0.3 + ((week - 4) / 38) * 1.7;
  const color = week < 20 ? '#f9c8db' : week < 32 ? '#f4a0bf' : '#ec6d98';

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main body - organic sphere */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere args={[baseScale, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={color}
            roughness={0.2}
            metalness={0.1}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.85}
          />
        </Sphere>

        {/* Head */}
        <Sphere args={[baseScale * 0.5, 32, 32]} position={[0, baseScale * 0.7, 0]}>
          <MeshDistortMaterial
            color={color}
            roughness={0.2}
            metalness={0.1}
            distort={0.2}
            speed={1.5}
            transparent
            opacity={0.85}
          />
        </Sphere>

        {/* Heart Hotspot */}
        {week >= 8 && (
          <group position={[-baseScale * 0.3, baseScale * 0.2, baseScale * 0.5]}>
            <Sphere args={[0.08, 16, 16]}>
              <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
            </Sphere>
            <Html distanceFactor={8}>
              <div style={{
                background: 'rgba(255,255,255,0.95)', padding: '4px 10px',
                borderRadius: 8, fontSize: '0.7rem', fontWeight: 600,
                color: '#ef4444', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}>
                ❤️ Heart
              </div>
            </Html>
          </group>
        )}

        {/* Brain Hotspot */}
        {week >= 12 && (
          <group position={[0, baseScale * 1.0, baseScale * 0.3]}>
            <Sphere args={[0.06, 16, 16]}>
              <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
            </Sphere>
            <Html distanceFactor={8}>
              <div style={{
                background: 'rgba(255,255,255,0.95)', padding: '4px 10px',
                borderRadius: 8, fontSize: '0.7rem', fontWeight: 600,
                color: '#8b5cf6', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}>
                🧠 Brain
              </div>
            </Html>
          </group>
        )}

        {/* Limbs */}
        {week >= 16 && (
          <>
            <Sphere args={[baseScale * 0.15, 16, 16]} position={[baseScale * 0.6, -baseScale * 0.2, 0]}>
              <MeshDistortMaterial color={color} roughness={0.3} distort={0.15} speed={1} transparent opacity={0.8} />
            </Sphere>
            <Sphere args={[baseScale * 0.15, 16, 16]} position={[-baseScale * 0.6, -baseScale * 0.2, 0]}>
              <MeshDistortMaterial color={color} roughness={0.3} distort={0.15} speed={1} transparent opacity={0.8} />
            </Sphere>
          </>
        )}
      </Float>

      {/* Amniotic glow */}
      <Sphere args={[baseScale * 2, 32, 32]}>
        <meshStandardMaterial color="#fce4ed" transparent opacity={0.08} side={2} />
      </Sphere>
    </group>
  );
}

export default function FetalViewer({ week = 20 }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 500 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fce4ed" />
        <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#c4b5fd" />
        <pointLight position={[0, 3, 3]} intensity={0.5} color="#f4a0bf" />

        <FetalModel week={week} />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
