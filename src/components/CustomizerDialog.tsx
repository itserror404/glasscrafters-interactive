
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment, ContactShadows, Html, BakeShadows } from '@react-three/drei';
import * as THREE from 'three';

// Colors for customization (Apple Vision Pro inspired palette)
const frameColors = [
  { name: 'Space Gray', value: '#1d1d1f' },
  { name: 'Titanium', value: '#D4D4D2' },
  { name: 'Midnight', value: '#1F1F1F' },
  { name: 'Silver', value: '#86868b' },
  { name: 'Graphite', value: '#2d2d2d' },
];

const lensColors = [
  { name: 'Clear', value: '#cccccc', opacity: 0.2 },
  { name: 'Light Blue', value: '#2997ff', opacity: 0.3 },
  { name: 'Dark Gray', value: '#333333', opacity: 0.5 },
  { name: 'Black', value: '#000000', opacity: 0.7 },
  { name: 'Mirrored', value: '#FFFFFF', opacity: 0.3, metalness: 1.0 },
];

// Apple Vision Pro inspired model
const VisionProGlassesModel = ({ frameColor, lensColor, lensOpacity, lensMetal = 0 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Apple-like premium materials
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
      {/* Main frame - curved like Vision Pro */}
      <mesh castShadow receiveShadow material={frameMaterial}>
        <torusGeometry args={[0.14, 0.03, 16, 32, Math.PI * 1.15]} />
        <meshPhysicalMaterial
          color={frameColor}
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
        />
      </mesh>
      
      {/* Bridge (nose piece) */}
      <mesh castShadow receiveShadow position={[0, 0, 0.04]} material={frameMaterial}>
        <boxGeometry args={[0.03, 0.02, 0.06]} />
      </mesh>
      
      {/* Left Lens (rounded rectangle shape) */}
      <mesh position={[-0.07, 0, 0.02]} rotation={[0, 0.1, 0]} material={lensMaterial}>
        <cylinderGeometry args={[0.06, 0.06, 0.01, 32, 1, false, 0, Math.PI * 2]} />
      </mesh>
      
      {/* Right Lens (rounded rectangle shape) */}
      <mesh position={[0.07, 0, 0.02]} rotation={[0, -0.1, 0]} material={lensMaterial}>
        <cylinderGeometry args={[0.06, 0.06, 0.01, 32, 1, false, 0, Math.PI * 2]} />
      </mesh>
      
      {/* Left Temple (arm) */}
      <mesh castShadow receiveShadow position={[-0.14, 0, -0.01]} rotation={[0, 0, 0]} material={frameMaterial}>
        <boxGeometry args={[0.02, 0.015, 0.2]} />
      </mesh>
      
      {/* Right Temple (arm) */}
      <mesh castShadow receiveShadow position={[0.14, 0, -0.01]} rotation={[0, 0, 0]} material={frameMaterial}>
        <boxGeometry args={[0.02, 0.015, 0.2]} />
      </mesh>
      
      {/* Crown control (Apple's signature detail) */}
      <mesh castShadow receiveShadow position={[0.14, 0.04, 0]} rotation={[0, 0, Math.PI/2]} material={new THREE.MeshStandardMaterial({ color: '#86868b', metalness: 0.9, roughness: 0.1 })}>
        <cylinderGeometry args={[0.01, 0.01, 0.012, 16]} />
      </mesh>
      
      {/* Face sensors / cameras (Vision Pro-like) */}
      <mesh castShadow receiveShadow position={[-0.05, 0.04, 0.03]} material={frameMaterial}>
        <sphereGeometry args={[0.005, 16, 16]} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.05, 0.04, 0.03]} material={frameMaterial}>
        <sphereGeometry args={[0.005, 16, 16]} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.09, 0.01, 0.03]} material={frameMaterial}>
        <sphereGeometry args={[0.005, 16, 16]} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.09, 0.01, 0.03]} material={frameMaterial}>
        <sphereGeometry args={[0.005, 16, 16]} />
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
      <DialogContent className="bg-black text-white border-gray-800 max-w-4xl w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Customize Your LuminX</DialogTitle>
          <DialogDescription className="text-white/70">
            Design your perfect Apple Vision Pro-inspired LuminX glasses
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3D Preview */}
          <div className="h-[300px] md:h-[400px] bg-black/50 border border-white/10 rounded-lg relative">
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
              <VisionProGlassesModel 
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
                <div className="grid grid-cols-10 gap-4 w-full h-full opacity-30">
                  {[...Array(100)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
                  ))}
                </div>
                <p className="text-white/90 absolute bottom-10">Align glasses with your face</p>
              </div>
            )}
          </div>
          
          {/* Customization Controls */}
          <div className="space-y-6">
            <Tabs defaultValue="frame">
              <TabsList className="w-full bg-black border border-white/10">
                <TabsTrigger value="frame" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black">Frame</TabsTrigger>
                <TabsTrigger value="lens" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black">Lenses</TabsTrigger>
                <TabsTrigger value="features" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black">Features</TabsTrigger>
              </TabsList>
              
              {/* Frame Colors */}
              <TabsContent value="frame" className="space-y-4 mt-4">
                <h4 className="font-medium text-white/80">Frame Finish</h4>
                <div className="grid grid-cols-5 gap-2">
                  {frameColors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-full aspect-square rounded-full border-2 ${selectedFrameColor === color.value ? 'border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedFrameColor(color.value)}
                      title={color.name}
                    />
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
                      className={`w-full aspect-square rounded-full border-2 ${selectedLensColor === color.value ? 'border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: color.value, opacity: color.opacity * 2 + 0.2 }}
                      onClick={() => handleLensColorChange(color.value, color.opacity, color.metalness || 0)}
                      title={color.name}
                    />
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
                    className="[&>.cursor-pointer]:bg-[#2997ff]"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-white/50">Light</span>
                    <span className="text-xs text-white/50">Dark</span>
                  </div>
                </div>
              </TabsContent>
              
              {/* Features */}
              <TabsContent value="features" className="space-y-4 mt-4">
                <h4 className="font-medium text-white/80">Smart Features</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="voice" className="rounded text-white bg-black border-white/30" defaultChecked />
                    <label htmlFor="voice" className="text-white/80">Voice Assistant</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="navigation" className="rounded text-white bg-black border-white/30" defaultChecked />
                    <label htmlFor="navigation" className="text-white/80">AR Navigation</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="camera" className="rounded text-white bg-black border-white/30" defaultChecked />
                    <label htmlFor="camera" className="text-white/80">Built-in Camera</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="audio" className="rounded text-white bg-black border-white/30" defaultChecked />
                    <label htmlFor="audio" className="text-white/80">Spatial Audio</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="eyetracking" className="rounded text-white bg-black border-white/30" defaultChecked />
                    <label htmlFor="eyetracking" className="text-white/80">Eye Tracking</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="facemapping" 
                      className="rounded text-white bg-black border-white/30" 
                      checked={faceMappingEnabled}
                      onChange={toggleFaceMapping}
                    />
                    <label htmlFor="facemapping" className="text-white/80">AR Face Mapping</label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="pt-4 border-t border-gray-800 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-white">Price</p>
                <p className="font-bold text-xl text-white">$499.99</p>
              </div>
              <Button className="w-full bg-white hover:bg-white/90 text-black">
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
