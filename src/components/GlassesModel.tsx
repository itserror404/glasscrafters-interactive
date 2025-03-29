
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Mock glasses model since we don't have a real 3D model file
const GlassesModelComponent = ({ scrollProgress = 0, isHovered = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use the scroll progress to control rotation
  useFrame(() => {
    if (meshRef.current) {
      // Smooth rotation based on scroll position
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        Math.PI * 2 * scrollProgress,
        0.1
      );
      
      // Add some floating animation
      meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      
      // Change scale if hovered
      if (isHovered) {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.1, 0.1);
      } else {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
      }
    }
  });

  // Create a simple glasses model using basic shapes
  return (
    <group>
      {/* Frame */}
      <mesh ref={meshRef} castShadow>
        {/* Frame bar */}
        <boxGeometry args={[0.8, 0.08, 0.08]} />
        <meshStandardMaterial color="#0EA5E9" roughness={0.3} metalness={0.8} />
        
        {/* Left lens mount */}
        <mesh position={[-0.3, 0, 0.1]}>
          <torusGeometry args={[0.15, 0.03, 16, 100, Math.PI * 2]} />
          <meshStandardMaterial color="#0EA5E9" roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Right lens mount */}
        <mesh position={[0.3, 0, 0.1]}>
          <torusGeometry args={[0.15, 0.03, 16, 100, Math.PI * 2]} />
          <meshStandardMaterial color="#0EA5E9" roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Left lens */}
        <mesh position={[-0.3, 0, 0.08]}>
          <circleGeometry args={[0.14, 32]} />
          <meshStandardMaterial color="#9B87F5" transparent opacity={0.5} roughness={0.1} />
        </mesh>
        
        {/* Right lens */}
        <mesh position={[0.3, 0, 0.08]}>
          <circleGeometry args={[0.14, 32]} />
          <meshStandardMaterial color="#9B87F5" transparent opacity={0.5} roughness={0.1} />
        </mesh>
        
        {/* Left temple */}
        <mesh position={[-0.46, 0, -0.05]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.04, 0.04]} />
          <meshStandardMaterial color="#0EA5E9" roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Right temple */}
        <mesh position={[0.46, 0, -0.05]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.04, 0.04]} />
          <meshStandardMaterial color="#0EA5E9" roughness={0.3} metalness={0.8} />
        </mesh>
      </mesh>
      
      {/* AR display elements (as floating UI in front of lenses) */}
      <mesh position={[0, 0.18, 0.3]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshStandardMaterial 
          color="#9B87F5" 
          emissive="#9B87F5" 
          emissiveIntensity={isHovered ? 2 : 1} 
          transparent 
          opacity={0.7} 
        />
      </mesh>
      
      {/* Small UI elements */}
      <mesh position={[0.2, 0.1, 0.25]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.03, 32]} />
        <meshStandardMaterial 
          color="#0EA5E9" 
          emissive="#0EA5E9"
          emissiveIntensity={isHovered ? 2 : 1}
        />
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
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 2]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <ContactShadows 
          opacity={0.5} 
          scale={10} 
          blur={1} 
          far={10} 
          resolution={256} 
          color="#000000" 
        />
        <GlassesModelComponent scrollProgress={scrollProgress} isHovered={isHovered} />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={isHovered}
          autoRotate={!isHovered}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default GlassesModelScene;
