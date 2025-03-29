
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Html,
  BakeShadows
} from '@react-three/drei';
import * as THREE from 'three';
// Removed the problematic import: import { TextureLoader } from 'three/src/loaders/TextureLoader';

// Realistic glasses model
const RealisticGlasses = ({ scrollProgress = 0, isHovered = false }) => {
  // Add proper type annotation for the refs
  const groupRef = useRef<THREE.Group>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef(new THREE.Euler());
  
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 1.0,
  });

  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x888888,
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.9,
    transparent: true,
    opacity: 0.2,
  });
  
  // Update rotation based on scroll
  useEffect(() => {
    targetRotation.current.y = Math.PI * 2 * scrollProgress;
  }, [scrollProgress]);
  
  // Animation loop
  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation based on target
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y,
        0.05
      );
      
      // Add subtle floating animation
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
      
      // Scale change on hover
      if (isHovered) {
        groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 1.05, 0.1);
        groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 1.05, 0.1);
        groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 1.05, 0.1);
      } else {
        groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1);
        groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 1, 0.1);
        groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 1, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Frame Base */}
      <mesh castShadow receiveShadow material={glassMaterial}>
        <boxGeometry args={[0.16, 0.04, 0.04]} />
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.16, 0.04, 0.01]} />
        </mesh>
      </mesh>
      
      {/* Frame Bridge */}
      <mesh castShadow receiveShadow position={[0, 0, 0]} material={glassMaterial}>
        <boxGeometry args={[0.03, 0.02, 0.005]} />
      </mesh>

      {/* Left Eye Frame */}
      <mesh castShadow receiveShadow position={[-0.08, 0, 0.02]} material={glassMaterial}>
        <torusGeometry args={[0.07, 0.01, 16, 100]} />
      </mesh>
      
      {/* Right Eye Frame */}
      <mesh castShadow receiveShadow position={[0.08, 0, 0.02]} material={glassMaterial}>
        <torusGeometry args={[0.07, 0.01, 16, 100]} />
      </mesh>
      
      {/* Left Lens */}
      <mesh position={[-0.08, 0, 0.015]} material={lensMaterial}>
        <circleGeometry args={[0.065, 32]} />
      </mesh>
      
      {/* Right Lens */}
      <mesh position={[0.08, 0, 0.015]} material={lensMaterial}>
        <circleGeometry args={[0.065, 32]} />
      </mesh>
      
      {/* Left Temple */}
      <mesh castShadow receiveShadow position={[-0.14, 0, -0.01]} rotation={[0, 0.3, 0]} material={glassMaterial}>
        <boxGeometry args={[0.15, 0.006, 0.004]} />
      </mesh>
      
      {/* Right Temple */}
      <mesh castShadow receiveShadow position={[0.14, 0, -0.01]} rotation={[0, -0.3, 0]} material={glassMaterial}>
        <boxGeometry args={[0.15, 0.006, 0.004]} />
      </mesh>
      
      {/* AR Display Screen (very subtle) */}
      <mesh position={[0, 0.05, 0.1]} rotation={[0, 0, 0]} visible={isHovered}>
        <planeGeometry args={[0.2, 0.05]} />
        <meshBasicMaterial color={0xFFFFFF} transparent opacity={0.05} />
        <Html
          position={[0, 0, 0.001]}
          transform
          distanceFactor={10}
          sprite
          occlude
          style={{
            display: isHovered ? 'block' : 'none',
            width: '200px',
            height: '50px',
            fontSize: '8px',
            color: 'white',
            opacity: 0.8,
            textAlign: 'center',
          }}
        >
          <div>AR DISPLAY</div>
        </Html>
      </mesh>
    </group>
  );
};

const GlassesModelScene = ({ scrollProgress = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#000000']} />
        <PerspectiveCamera makeDefault position={[0, 0, 0.7]} />
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        <spotLight 
          position={[-5, 5, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.5}
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <ContactShadows 
          opacity={0.8} 
          scale={10} 
          blur={1} 
          far={10} 
          resolution={256} 
          color="#000000" 
        />
        <RealisticGlasses scrollProgress={scrollProgress} isHovered={isHovered} />
        <Environment preset="studio" />
        <BakeShadows />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={isHovered}
          autoRotate={!isHovered}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2 - 0.2}
          maxPolarAngle={Math.PI / 2 + 0.2}
        />
      </Canvas>
    </div>
  );
};

export default GlassesModelScene;
