
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Html,
  BakeShadows,
  useTexture,
  MeshReflectorMaterial,
  useAspect
} from '@react-three/drei';
import * as THREE from 'three';
// Sound effects
import { Howl } from 'howler';

// Load sound effects
const sounds = {
  materialize: new Howl({ src: ['/sounds/materialize.mp3'], volume: 0.5 }),
  hover: new Howl({ src: ['/sounds/hover-thock.mp3'], volume: 0.2 }),
  tick: new Howl({ src: ['/sounds/tick.mp3'], volume: 0.15 })
};

// Custom spring physics for inertial rotation
const useSpring = (initialValue = 0, dampingFactor = 0.05, precision = 0.001) => {
  const [value, setValue] = useState(initialValue);
  const [target, setTarget] = useState(initialValue);
  const velocity = useRef(0);
  
  useEffect(() => {
    // Play materialize sound on initial load
    sounds.materialize.play();
  }, []);

  useFrame(() => {
    // Spring physics calculation
    const delta = target - value;
    
    // If we're close enough to the target, stop the animation
    if (Math.abs(delta) < precision && Math.abs(velocity.current) < precision) return;
    
    // Calculate spring force
    const spring = delta * 0.1;
    // Apply damping to velocity
    velocity.current = velocity.current * (1 - dampingFactor) + spring;
    // Update value
    setValue(value + velocity.current);
  });

  return [value, setTarget] as const;
};

// Enhanced material creation with Apple-style PBR properties
const createGlassesMaterials = (isHovered = false) => {
  // Frame material with subsurface scattering for plastic-like appearance
  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#1d1d1f'),
    metalness: 0.2,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.5,
    ior: 1.5, // Higher IOR for premium plastic look
    transmission: 0.0,
    thickness: 1.0,
    envMapIntensity: 1.0,
    specularIntensity: 1.0,
    specularColor: new THREE.Color('#ffffff'),
    // Subsurface scattering for premium plastic look
    attenuationDistance: 0.5,
    attenuationColor: new THREE.Color('#111111'),
  });

  // Metal parts material with anisotropic reflections
  const metalMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#86868b'),
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    reflectivity: 1.0,
    envMapIntensity: 1.5,
    anisotropy: 0.5, // Anisotropic reflections
    anisotropyRotation: Math.PI / 4,
  });

  // Lens material with high-quality glass simulation
  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#444444'),
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.98, // High transmission for glass
    thickness: 0.5,
    envMapIntensity: 1.0,
    ior: 1.5, // Glass IOR
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });

  // AR display material that lights up on hover
  const displayMaterial = new THREE.MeshBasicMaterial({
    color: isHovered ? new THREE.Color('#2997ff') : new THREE.Color('#333333'),
    transparent: true,
    opacity: isHovered ? 0.7 : 0.0,
  });

  return { frameMaterial, metalMaterial, lensMaterial, displayMaterial };
};

// Apple-style realistic glasses model
const RealisticGlasses = ({ scrollProgress = 0, isHovered = false }) => {
  // Add proper type annotation for the refs
  const groupRef = useRef<THREE.Group>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  
  // Use custom spring physics for inertial rotation
  const [rotationY, setRotationY] = useSpring(0);
  
  // Materials with PBR properties
  const { frameMaterial, metalMaterial, lensMaterial, displayMaterial } = createGlassesMaterials(isHovered);
  
  // Normal map for micro-scratches - Updated path to use the correct folder
  const normalMap = useTexture('/images/micro_scratches_normal.jpg');
  
  // Apply normal map to frame material
  useEffect(() => {
    if (normalMap) {
      frameMaterial.normalMap = normalMap;
      frameMaterial.normalScale.set(0.05, 0.05); // 0.5% intensity as requested
    }
  }, [normalMap]);
  
  // Update rotation based on scroll with inertial effect
  useEffect(() => {
    // Calculate target rotation (2 full rotations based on scroll)
    const targetRotation = Math.PI * 2 * scrollProgress;
    
    // Set the target for the spring physics
    setRotationY(targetRotation);
    
    // Play tick sound on significant scroll changes
    if (Math.abs(targetRotation - rotationY) > 0.1) {
      sounds.tick.play();
    }
  }, [scrollProgress, rotationY]);
  
  // Play hover sound effect
  useEffect(() => {
    if (isHovered) {
      sounds.hover.play();
    }
  }, [isHovered]);
  
  // Animation loop
  useFrame(() => {
    if (groupRef.current) {
      // Apply the spring-driven rotation
      groupRef.current.rotation.y = rotationY;
      
      // Add subtle floating animation (Apple-style subtle movement)
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.025;
      
      // Scale change on hover - subtle and elegant like Apple products
      if (isHovered) {
        groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 1.03, 0.05);
        groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 1.03, 0.05);
        groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 1.03, 0.05);
      } else {
        groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.05);
        groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 1, 0.05);
        groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 1, 0.05);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Frame Base with enhanced geometry for more realistic appearance */}
      <mesh castShadow receiveShadow material={frameMaterial}>
        <boxGeometry args={[0.16, 0.04, 0.04]} />
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.16, 0.04, 0.01]} />
        </mesh>
      </mesh>
      
      {/* Frame Bridge with improved geometry */}
      <mesh castShadow receiveShadow position={[0, 0, 0]} material={frameMaterial}>
        <boxGeometry args={[0.03, 0.02, 0.005]} />
      </mesh>

      {/* Left Eye Frame - enhanced with torus knot for more elegant curves */}
      <mesh castShadow receiveShadow position={[-0.08, 0, 0.02]} material={frameMaterial}>
        <torusGeometry args={[0.07, 0.01, 32, 100]} />
      </mesh>
      
      {/* Right Eye Frame */}
      <mesh castShadow receiveShadow position={[0.08, 0, 0.02]} material={frameMaterial}>
        <torusGeometry args={[0.07, 0.01, 32, 100]} />
      </mesh>
      
      {/* Left Lens with improved glass material */}
      <mesh position={[-0.08, 0, 0.015]} material={lensMaterial}>
        <circleGeometry args={[0.065, 64]} />
      </mesh>
      
      {/* Right Lens */}
      <mesh position={[0.08, 0, 0.015]} material={lensMaterial}>
        <circleGeometry args={[0.065, 64]} />
      </mesh>
      
      {/* Left Temple with metal hinges */}
      <group position={[-0.14, 0, -0.01]} rotation={[0, 0.3, 0]}>
        <mesh castShadow receiveShadow material={frameMaterial}>
          <boxGeometry args={[0.15, 0.006, 0.004]} />
        </mesh>
        {/* Metal hinge */}
        <mesh castShadow receiveShadow position={[0, 0, 0.002]} material={metalMaterial}>
          <cylinderGeometry args={[0.004, 0.004, 0.01, 16]} />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      </group>
      
      {/* Right Temple */}
      <group position={[0.14, 0, -0.01]} rotation={[0, -0.3, 0]}>
        <mesh castShadow receiveShadow material={frameMaterial}>
          <boxGeometry args={[0.15, 0.006, 0.004]} />
        </mesh>
        {/* Metal hinge */}
        <mesh castShadow receiveShadow position={[0, 0, 0.002]} material={metalMaterial}>
          <cylinderGeometry args={[0.004, 0.004, 0.01, 16]} />
          <mesh rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      </group>
      
      {/* AR Display Screen - subtle blue glow when hovered */}
      <mesh position={[0, 0.05, 0.1]} rotation={[0, 0, 0]} visible={true} material={displayMaterial}>
        <planeGeometry args={[0.2, 0.05]} />
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
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            color: 'white',
            opacity: 0.8,
            textAlign: 'center',
          }}
        >
          <div>DISPLAY ACTIVE</div>
        </Html>
      </mesh>
      
      {/* Apple-style spec popup that appears on hover */}
      {isHovered && (
        <Html
          position={[0.2, -0.1, 0]}
          transform
          distanceFactor={8}
          style={{
            width: '200px',
            padding: '10px',
            backgroundColor: 'rgba(29,29,31,0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            color: 'white',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '8px',
            opacity: 0,
            animation: 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        >
          <div style={{ marginBottom: '6px', color: '#86868b' }}>SPECS</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Weight</span>
            <span style={{ color: '#2997ff' }}>12g</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Display</span>
            <span style={{ color: '#2997ff' }}>120Hz</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Battery</span>
            <span style={{ color: '#2997ff' }}>36h</span>
          </div>
        </Html>
      )}
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
        <color attach="background" args={['#1d1d1f']} />
        <PerspectiveCamera makeDefault position={[0, 0, 0.7]} />
        
        {/* Apple-style subtle lighting setup */}
        <ambientLight intensity={0.3} />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.8} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        <spotLight 
          position={[-5, 5, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.4}
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Enhanced shadows with larger area for Apple-style presentation */}
        <ContactShadows 
          rotation-x={Math.PI / 2}
          position={[0, -0.15, 0]}
          opacity={0.6} 
          width={10} 
          height={10} 
          blur={1} 
          far={0.2} 
          resolution={256} 
          color="#000000" 
        />
        
        {/* The enhanced glasses model */}
        <RealisticGlasses scrollProgress={scrollProgress} isHovered={isHovered} />
        
        {/* High-quality HDRI environment for realistic reflections */}
        <Environment preset="studio" background={false} />
        <BakeShadows />
        
        {/* Apple-style controls - minimal and elegant */}
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
      
      {/* Scroll indicator in Apple style */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-70 text-sm font-light tracking-wide">
        <div className="text-center" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          Scroll to explore
        </div>
        <div className="flex justify-center mt-2">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="animate-bounce"
          >
            <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GlassesModelScene;
