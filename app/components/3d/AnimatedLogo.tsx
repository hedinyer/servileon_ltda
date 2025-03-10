"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface LionHeadProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onClick?: () => void;
}

function LionHead({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1, 
  onClick = () => {} 
}: LionHeadProps) {
  const meshRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = Math.sin(t / 4) * 0.3 + Math.PI / 4
  })
  
  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Simplified lion head geometry */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#F4E4BC" : "#D4AF37"} 
          metalness={0.7} 
          roughness={0.2}
          emissive={hovered ? "#F4E4BC" : "#D4AF37"}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.3, 0.2, 0.85]} scale={0.12}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.3, 0.2, 0.85]} scale={0.12}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Mane */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 1.2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return (
          <mesh key={i} position={[x, y, -0.2]} rotation={[0, 0, angle]} scale={[0.2, 0.6, 0.1]}>
            <boxGeometry />
            <meshStandardMaterial 
              color="#B8860B" 
              metalness={0.5} 
              roughness={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

interface SceneProps {
  onLogoClick: () => void;
}

function Scene({ onLogoClick }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      
      <LionHead position={[0, 0, 0]} scale={1.5} onClick={onLogoClick} />
      
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.4} 
        scale={5} 
        blur={2.5} 
      />
      
      <Environment preset="city" />
    </>
  )
}

interface AnimatedLogoProps {
  className?: string;
  onLogoClick?: () => void;
  autoRotate?: boolean;
  enableZoom?: boolean;
}

export default function AnimatedLogo({ 
  className = "", 
  onLogoClick = () => {}, 
  autoRotate = true,
  enableZoom = false
}: AnimatedLogoProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <OrbitControls 
          enablePan={false} 
          enableZoom={enableZoom} 
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <Scene onLogoClick={onLogoClick} />
      </Canvas>
    </div>
  )
} 