
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Colors for customization
const frameColors = [
  { name: 'Electric Blue', value: '#0EA5E9' },
  { name: 'Neon Purple', value: '#9B87F5' },
  { name: 'Matte Black', value: '#171717' },
  { name: 'Glossy White', value: '#FFFFFF' },
  { name: 'Rose Gold', value: '#FFC0CB' },
];

const lensColors = [
  { name: 'Clear', value: '#CCCCCC', opacity: 0.2 },
  { name: 'Blue Tint', value: '#0EA5E9', opacity: 0.3 },
  { name: 'Purple Tint', value: '#9B87F5', opacity: 0.3 },
  { name: 'Amber Tint', value: '#FFA500', opacity: 0.3 },
  { name: 'Night Mode', value: '#FF5500', opacity: 0.5 },
];

// Simple glasses model
const CustomizableGlasses = ({ frameColor, lensColor, lensOpacity }) => {
  return (
    <group>
      {/* Frame */}
      <mesh castShadow>
        {/* Frame bar */}
        <boxGeometry args={[0.8, 0.08, 0.08]} />
        <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.8} />
        
        {/* Left lens mount */}
        <mesh position={[-0.3, 0, 0.1]}>
          <torusGeometry args={[0.15, 0.03, 16, 100, Math.PI * 2]} />
          <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Right lens mount */}
        <mesh position={[0.3, 0, 0.1]}>
          <torusGeometry args={[0.15, 0.03, 16, 100, Math.PI * 2]} />
          <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Left lens */}
        <mesh position={[-0.3, 0, 0.08]}>
          <circleGeometry args={[0.14, 32]} />
          <meshStandardMaterial color={lensColor} transparent opacity={lensOpacity} roughness={0.1} />
        </mesh>
        
        {/* Right lens */}
        <mesh position={[0.3, 0, 0.08]}>
          <circleGeometry args={[0.14, 32]} />
          <meshStandardMaterial color={lensColor} transparent opacity={lensOpacity} roughness={0.1} />
        </mesh>
        
        {/* Left temple */}
        <mesh position={[-0.46, 0, -0.05]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.04, 0.04]} />
          <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Right temple */}
        <mesh position={[0.46, 0, -0.05]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.04, 0.04]} />
          <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.8} />
        </mesh>
      </mesh>
      
      {/* AR display elements (as floating UI in front of lenses) */}
      <mesh position={[0, 0.18, 0.3]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.4, 0.1]} />
        <meshStandardMaterial 
          color={lensColor} 
          emissive={lensColor} 
          emissiveIntensity={1} 
          transparent 
          opacity={0.7} 
        />
      </mesh>
    </group>
  );
};

const CustomizerDialog = ({ open, onOpenChange }) => {
  const [selectedFrameColor, setSelectedFrameColor] = useState(frameColors[0].value);
  const [selectedLensColor, setSelectedLensColor] = useState(lensColors[0].value);
  const [selectedLensOpacity, setSelectedLensOpacity] = useState(lensColors[0].opacity);

  const handleLensColorChange = (color, opacity) => {
    setSelectedLensColor(color);
    setSelectedLensOpacity(opacity);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-glasscraft-dark text-white border-gray-800 max-w-4xl w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">Customize Your Glasses</DialogTitle>
          <DialogDescription className="text-white/70">
            Choose your perfect style combinations
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3D Preview */}
          <div className="h-[300px] md:h-[400px] bg-black/50 rounded-lg">
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
              <CustomizableGlasses 
                frameColor={selectedFrameColor} 
                lensColor={selectedLensColor} 
                lensOpacity={selectedLensOpacity} 
              />
              <Environment preset="city" />
              <OrbitControls 
                enableZoom={true} 
                enablePan={false} 
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={2}
              />
            </Canvas>
          </div>
          
          {/* Customization Controls */}
          <div className="space-y-6">
            <Tabs defaultValue="frame">
              <TabsList className="w-full bg-black/30">
                <TabsTrigger value="frame" className="flex-1">Frame</TabsTrigger>
                <TabsTrigger value="lens" className="flex-1">Lenses</TabsTrigger>
                <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
              </TabsList>
              
              {/* Frame Colors */}
              <TabsContent value="frame" className="space-y-4 mt-4">
                <h4 className="font-medium text-white/80">Frame Color</h4>
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
                <h4 className="font-medium text-white/80">Lens Tint</h4>
                <div className="grid grid-cols-5 gap-2">
                  {lensColors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-full aspect-square rounded-full border-2 ${selectedLensColor === color.value ? 'border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: color.value, opacity: color.opacity * 2 + 0.2 }}
                      onClick={() => handleLensColorChange(color.value, color.opacity)}
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
                    <input type="checkbox" id="voice" className="rounded text-glasscraft-blue" defaultChecked />
                    <label htmlFor="voice" className="text-white/80">Voice Assistant</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="navigation" className="rounded text-glasscraft-blue" defaultChecked />
                    <label htmlFor="navigation" className="text-white/80">AR Navigation</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="camera" className="rounded text-glasscraft-blue" defaultChecked />
                    <label htmlFor="camera" className="text-white/80">Built-in Camera</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="audio" className="rounded text-glasscraft-blue" defaultChecked />
                    <label htmlFor="audio" className="text-white/80">Spatial Audio</label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="pt-4 border-t border-gray-700 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-white">Price</p>
                <p className="font-bold text-xl text-white">$499.99</p>
              </div>
              <Button className="w-full bg-glasscraft-blue hover:bg-glasscraft-blue/80 text-white">
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
