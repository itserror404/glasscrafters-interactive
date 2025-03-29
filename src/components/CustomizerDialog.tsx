
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment, ContactShadows, Html, BakeShadows } from '@react-three/drei';
import * as THREE from 'three';

// Colors for customization (Apple Vision Pro inspired palette)
const frameColors = [
  { name: 'Space Gray', value: '#1d1d1f' },
  { name: 'Silver', value: '#86868b' },
  { name: 'Graphite', value: '#2d2d2d' },
  { name: 'Matte Black', value: '#000000' },
  { name: 'Polished Silver', value: '#e3e3e3' },
];

const lensColors = [
  { name: 'Clear', value: '#cccccc', opacity: 0.2 },
  { name: 'Light Blue', value: '#2997ff', opacity: 0.3 },
  { name: 'Dark Gray', value: '#333333', opacity: 0.5 },
  { name: 'Black', value: '#000000', opacity: 0.7 },
  { name: 'Mirrored', value: '#FFFFFF', opacity: 0.3, metalness: 1.0 },
];

// Apple Vision Pro inspired model
const VisionProModel = ({ frameColor, lensColor, lensOpacity, lensMetal = 0 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Apple-like premium materials
  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(frameColor),
    metalness: frameColor === '#86868b' ? 0.8 : 0.4,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(lensColor),
    metalness: lensMetal,
    roughness: 0.1,
    transmission: 0.9,
    transparent: true,
    opacity: lensOpacity,
  });

  const bandMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#444"),
    roughness: 0.5,
    metalness: 0.1,
  });
  
  useFrame(() => {
    if (groupRef.current) {
      // Add a subtle floating animation
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.02;
    }
  });

  return (
    <group ref={groupRef} scale={[1.2, 1.2, 1.2]}>
      {/* Main headset body - curved like Vision Pro */}
      <mesh castShadow receiveShadow material={frameMaterial} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.07, 32, 1, true]} />
      </mesh>
      
      {/* Front face cover */}
      <mesh castShadow receiveShadow position={[0, 0, 0.035]} material={frameMaterial}>
        <cylinderGeometry args={[0.12, 0.12, 0.005, 32]} />
      </mesh>
      
      {/* Back cushion (simulated) */}
      <mesh castShadow receiveShadow position={[0, 0, -0.035]} material={bandMaterial}>
        <cylinderGeometry args={[0.12, 0.12, 0.005, 32]} />
      </mesh>
      
      {/* Left Eye Lens */}
      <mesh position={[-0.04, 0, 0.035]} rotation={[0, 0, 0]} material={lensMaterial}>
        <circleGeometry args={[0.035, 32]} />
      </mesh>
      
      {/* Right Eye Lens */}
      <mesh position={[0.04, 0, 0.035]} rotation={[0, 0, 0]} material={lensMaterial}>
        <circleGeometry args={[0.035, 32]} />
      </mesh>
      
      {/* Head strap - top */}
      <mesh castShadow receiveShadow position={[0, 0.07, 0]} rotation={[Math.PI/2, 0, 0]} material={bandMaterial}>
        <torusGeometry args={[0.1, 0.01, 16, 32, Math.PI]} />
      </mesh>
      
      {/* External cameras (Vision Pro-like) */}
      <mesh castShadow receiveShadow position={[-0.09, 0.02, 0.035]} material={frameMaterial}>
        <sphereGeometry args={[0.008, 16, 16]} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.09, 0.02, 0.035]} material={frameMaterial}>
        <sphereGeometry args={[0.008, 16, 16]} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.09, -0.02, 0.035]} material={frameMaterial}>
        <sphereGeometry args={[0.008, 16, 16]} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.09, -0.02, 0.035]} material={frameMaterial}>
        <sphereGeometry args={[0.008, 16, 16]} />
      </mesh>
      
      {/* Digital Crown (Apple's signature control) */}
      <mesh castShadow receiveShadow position={[0.12, 0.03, 0]} rotation={[0, 0, Math.PI/2]} material={new THREE.MeshStandardMaterial({ color: '#86868b', metalness: 0.9, roughness: 0.1 })}>
        <cylinderGeometry args={[0.008, 0.008, 0.01, 16]} />
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

  const handleLensColorChange = (color: string, opacity: number, metalness = 0) => {
    setSelectedLensColor(color);
    setSelectedLensOpacity(opacity);
    setSelectedLensMetal(metalness);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-white border-gray-800 max-w-4xl w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Customize Your LuminX</DialogTitle>
          <DialogDescription className="text-white/70">
            Design your perfect Apple Vision Pro-inspired LuminX
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3D Preview */}
          <div className="h-[300px] md:h-[400px] bg-black/50 border border-white/10 rounded-lg">
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
              <VisionProModel 
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
          </div>
          
          {/* Customization Controls */}
          <div className="space-y-6">
            <Tabs defaultValue="frame">
              <TabsList className="w-full bg-black border border-white/10">
                <TabsTrigger value="frame" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black">Frame</TabsTrigger>
                <TabsTrigger value="lens" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-black">Display</TabsTrigger>
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
                <h4 className="font-medium text-white/80">Display Tint</h4>
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
                    <input type="checkbox" id="facemapping" className="rounded text-white bg-black border-white/30" defaultChecked />
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
