import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment, ContactShadows, Html, BakeShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Colors for customization (Sunglasses-inspired palette)
const frameColors = [
  { name: 'Space Gray', value: '#353535' },
  { name: 'Titanium', value: '#D4D4D2' },
  { name: 'Midnight', value: '#1F1F1F' },
  { name: 'Silver', value: '#86868b' },
  { name: 'Graphite', value: '#2d2d2d' },
];

const lensColors = [
  { name: 'Clear', value: '#cccccc', opacity: 0.2 },
  { name: 'Light Blue', value: '#007AFF', opacity: 0.3 },
  { name: 'Dark Gray', value: '#333333', opacity: 0.5 },
  { name: 'Black', value: '#000000', opacity: 0.7 },
  { name: 'Mirrored', value: '#FFFFFF', opacity: 0.3, metalness: 1.0 },
];

// Sunglasses-style model (bean/aviator shape)
const SunglassesModel = ({ frameColor, lensColor, lensOpacity, lensMetal = 0 }) => {
  const groupRef = useRef(null);
  
  // Premium materials
  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(frameColor),
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    sheen: 0.4,
  });

  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(lensColor),
    metalness: lensMetal,
    roughness: 0.1,
    transmission: 0.95,
    transparent: true,
    opacity: lensOpacity,
  });
  
  useFrame(() => {
    if (groupRef.current) {
      // Add a subtle floating animation
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.02;
    }
  });

  return (
    <group ref={groupRef} scale={[1.2, 1.2, 1.2]} rotation={[0, 0, 0]}>
      {/* Main frame - bean/aviator shape like the emoji */}
      <mesh castShadow receiveShadow position={[0, 0, 0]} rotation={[0, 0, 0]}>
        {/* Use elliptical curve for bean shape */}
        <torusGeometry args={[0.16, 0.025, 32, 64, Math.PI * 1.35]} />
        <meshPhysicalMaterial
          color={frameColor}
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          sheen={0.4}
        />
      </mesh>
      
      {/* Bridge (nose piece) - thinner for aviator style */}
      <mesh castShadow receiveShadow position={[0, 0, 0.02]} material={frameMaterial}>
        <boxGeometry args={[0.03, 0.01, 0.04]} />
      </mesh>
      
      {/* Left Lens - aviator teardrop shape */}
      <mesh position={[-0.08, 0, 0.01]} rotation={[0, 0.1, 0]} material={lensMaterial}>
        <sphereGeometry args={[0.09, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <mesh scale={[1, 0.6, 1]} position={[0, -0.03, 0]}>
          <sphereGeometry args={[0.09, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        </mesh>
      </mesh>
      
      {/* Right Lens - aviator teardrop shape */}
      <mesh position={[0.08, 0, 0.01]} rotation={[0, -0.1, 0]} material={lensMaterial}>
        <sphereGeometry args={[0.09, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <mesh scale={[1, 0.6, 1]} position={[0, -0.03, 0]}>
          <sphereGeometry args={[0.09, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        </mesh>
      </mesh>
      
      {/* Left Temple (arm) - slimmer for sunglasses */}
      <mesh castShadow receiveShadow position={[-0.17, 0, -0.01]} rotation={[0, 0.3, 0]} material={frameMaterial}>
        <boxGeometry args={[0.18, 0.015, 0.015]} />
      </mesh>
      
      {/* Right Temple (arm) - slimmer for sunglasses */}
      <mesh castShadow receiveShadow position={[0.17, 0, -0.01]} rotation={[0, -0.3, 0]} material={frameMaterial}>
        <boxGeometry args={[0.18, 0.015, 0.015]} />
      </mesh>
      
      {/* Temple hinges */}
      <mesh castShadow receiveShadow position={[-0.16, 0, 0]} rotation={[0, 0, Math.PI/2]} material={new THREE.MeshStandardMaterial({ color: '#86868b', metalness: 0.9, roughness: 0.1 })}>
        <cylinderGeometry args={[0.006, 0.006, 0.01, 16]} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.16, 0, 0]} rotation={[0, 0, Math.PI/2]} material={new THREE.MeshStandardMaterial({ color: '#86868b', metalness: 0.9, roughness: 0.1 })}>
        <cylinderGeometry args={[0.006, 0.006, 0.01, 16]} />
      </mesh>
    </group>
  );
};

interface CustomizerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomizerDialog: React.FC<CustomizerDialogProps> = ({ open, onOpenChange }) => {
  const [selectedFrameColor, setSelectedFrameColor] = useState(frameColors[0].value);
  const [selectedLensColor, setSelectedLensColor] = useState(lensColors[0].value);
  const [selectedLensOpacity, setSelectedLensOpacity] = useState(lensColors[0].opacity);
  const [selectedLensMetal, setSelectedLensMetal] = useState(0);
  const [faceMappingEnabled, setFaceMappingEnabled] = useState(false);
  const [tintLevel, setTintLevel] = useState(50);

  const handleLensColorChange = (color: string, opacity: number, metalness = 0) => {
    setSelectedLensColor(color);
    setSelectedLensOpacity(opacity);
    setSelectedLensMetal(metalness);
  };

  const handleTintChange = (value: number[]) => {
    const tint = value[0];
    setTintLevel(tint);
    setSelectedLensOpacity(tint / 100);
  };

  const toggleFaceMapping = () => {
    setFaceMappingEnabled(!faceMappingEnabled);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-white border-gray-800 max-w-5xl w-[95vw] h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Customize Your LuminX</DialogTitle>
          <DialogDescription className="text-white/70">
            Design your perfect aviator-style LuminX sunglasses
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* 3D Preview */}
          <div className="h-[400px] md:h-full bg-gradient-to-b from-black/80 to-[#1d1d1f]/80 border border-white/10 rounded-lg relative">
            <Canvas shadows dpr={[1, 2]}>
              <color attach="background" args={['#050505']} />
              <PerspectiveCamera makeDefault position={[0, 0, 0.7]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={0.5} castShadow />
              <ContactShadows 
                opacity={0.8} 
                scale={10} 
                blur={1} 
                far={10} 
                resolution={256} 
                color="#000000" 
              />
              <SunglassesModel 
                frameColor={selectedFrameColor} 
                lensColor={selectedLensColor} 
                lensOpacity={selectedLensOpacity}
                lensMetal={selectedLensMetal} 
              />
              <Environment preset="studio" />
              <BakeShadows />
              <OrbitControls 
                enableZoom={true} 
                enablePan={false} 
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={1}
                minPolarAngle={Math.PI / 2 - 0.3}
                maxPolarAngle={Math.PI / 2 + 0.3}
              />
            </Canvas>
            
            {/* Face mapping overlay */}
            {faceMappingEnabled && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
                <div className="absolute inset-0 grid grid-cols-12 gap-2 p-8 opacity-30">
                  {[...Array(100)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse"></div>
                  ))}
                </div>
                <div className="absolute bottom-10 left-0 right-0 text-center">
                  <p className="text-white/90 text-sm">Align glasses with your face</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Customization Controls */}
          <div className="space-y-6">
            <Tabs defaultValue="frame" className="w-full">
              <TabsList className="w-full bg-black border border-white/10">
                <TabsTrigger value="frame" className="flex-1 data-[state=active]:bg-[#007AFF] data-[state=active]:text-white">Frame</TabsTrigger>
                <TabsTrigger value="lens" className="flex-1 data-[state=active]:bg-[#007AFF] data-[state=active]:text-white">Lenses</TabsTrigger>
                <TabsTrigger value="features" className="flex-1 data-[state=active]:bg-[#007AFF] data-[state=active]:text-white">Features</TabsTrigger>
              </TabsList>
              
              {/* Frame Colors */}
              <TabsContent value="frame" className="space-y-4 mt-4">
                <h4 className="font-medium text-white/80">Frame Finish</h4>
                <div className="grid grid-cols-5 gap-2">
                  {frameColors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-full aspect-square rounded-lg transition-all duration-200 border-2 ${selectedFrameColor === color.value ? 'border-[#007AFF] scale-110' : 'border-transparent'}`}
                      style={{ 
                        backgroundColor: color.value,
                        boxShadow: selectedFrameColor === color.value ? '0 0 10px rgba(0, 122, 255, 0.5)' : 'none' 
                      }}
                      onClick={() => setSelectedFrameColor(color.value)}
                      title={color.name}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-5 gap-2 text-center">
                  {frameColors.map((color) => (
                    <span key={color.name} className="text-xs text-white/60">
                      {color.name}
                    </span>
                  ))}
                </div>
              </TabsContent>
              
              {/* Lens Colors */}
              <TabsContent value="lens" className="space-y-4 mt-4">
                <h4 className="font-medium text-white/80">Lens Color</h4>
                <div className="grid grid-cols-5 gap-2">
                  {lensColors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-full aspect-square rounded-lg transition-all duration-200 border-2 ${selectedLensColor === color.value ? 'border-[#007AFF] scale-110' : 'border-transparent'}`}
                      style={{ 
                        backgroundColor: color.value, 
                        opacity: color.opacity * 2 + 0.2,
                        boxShadow: selectedLensColor === color.value ? '0 0 10px rgba(0, 122, 255, 0.5)' : 'none'
                      }}
                      onClick={() => handleLensColorChange(color.value, color.opacity, color.metalness || 0)}
                      title={color.name}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-5 gap-2 text-center">
                  {lensColors.map((color) => (
                    <span key={color.name} className="text-xs text-white/60">
                      {color.name}
                    </span>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-white/80 mb-3">Lens Tint Level</h4>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    value={[tintLevel]}
                    onValueChange={handleTintChange}
                    className="[&>.relative>.absolute]:bg-[#007AFF]"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-white/50">Clear</span>
                    <span className="text-xs text-white/50">Dark</span>
                  </div>
                </div>
              </TabsContent>
              
              {/* Features */}
              <TabsContent value="features" className="space-y-4 mt-4">
                <h4 className="font-medium text-white/80">Smart Features</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">👁️</span>
                      <label htmlFor="eyetracking" className="text-white/80">Eye Tracking</label>
                    </div>
                    <input type="checkbox" id="eyetracking" className="rounded text-[#007AFF] bg-black border-white/30" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🔊</span>
                      <label htmlFor="audio" className="text-white/80">Spatial Audio</label>
                    </div>
                    <input type="checkbox" id="audio" className="rounded text-[#007AFF] bg-black border-white/30" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📱</span>
                      <label htmlFor="navigation" className="text-white/80">AR Navigation</label>
                    </div>
                    <input type="checkbox" id="navigation" className="rounded text-[#007AFF] bg-black border-white/30" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📷</span>
                      <label htmlFor="camera" className="text-white/80">Built-in Camera</label>
                    </div>
                    <input type="checkbox" id="camera" className="rounded text-[#007AFF] bg-black border-white/30" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🔄</span>
                      <label htmlFor="voice" className="text-white/80">Voice Assistant</label>
                    </div>
                    <input type="checkbox" id="voice" className="rounded text-[#007AFF] bg-black border-white/30" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">👓</span>
                      <label htmlFor="facemapping" className="text-white/80">AR Face Mapping</label>
                    </div>
                    <input 
                      type="checkbox" 
                      id="facemapping" 
                      className="rounded text-[#007AFF] bg-black border-white/30" 
                      checked={faceMappingEnabled}
                      onChange={toggleFaceMapping}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="pt-4 border-t border-gray-800 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-white">Price</p>
                <p className="font-bold text-xl text-white">$499.99</p>
              </div>
              <Button className="w-full bg-[#007AFF] hover:bg-[#007AFF]/90 text-white py-6 rounded-full">
                Pre-order This Configuration
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizerDialog;
