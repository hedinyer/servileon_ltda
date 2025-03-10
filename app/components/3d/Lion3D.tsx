"use client"

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { PerspectiveCamera, Environment, ContactShadows, OrbitControls, useTexture } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

// Componente del león 3D
function Lion(props: any) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0.5)
  
  // Efecto de brillo pulsante
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => 0.5 + Math.sin(Date.now() * 0.001) * 0.3)
    }, 16)
    
    return () => clearInterval(interval)
  }, [])
  
  // Rotación automática
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2
    }
  })
  
  // Cargar textura del logo del león
  const texture = useTexture('/leon_logo.png')
  
  // Crear material con la textura del león
  const lionMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.7,
    roughness: 0.2,
    emissive: new THREE.Color('#D4AF37'),
    emissiveIntensity: glowIntensity * 0.3,
    transparent: true,
    alphaTest: 0.5
  })
  
  return (
    <group ref={group} {...props} dispose={null}>
      {/* Base circular dorada */}
      <mesh 
        position={[0, 0, -0.1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={glowIntensity * 0.2}
        />
      </mesh>
      
      {/* Plano frontal con la textura del león */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.5, 2.5]} />
        <primitive object={lionMaterial} attach="material" />
      </mesh>
      
      {/* Efecto de brillo alrededor */}
      <mesh position={[0, 0, -0.15]} rotation={[0, 0, 0]}>
        <ringGeometry args={[1.5, 1.8, 32]} />
        <meshStandardMaterial 
          color="#FFDF00"
          metalness={1}
          roughness={0}
          emissive="#FFDF00"
          emissiveIntensity={glowIntensity}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Efecto 3D para el león (extrusión) */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={0.8}
          roughness={0.2}
          alphaMap={texture}
          transparent
          alphaTest={0.5}
          emissive="#D4AF37"
          emissiveIntensity={glowIntensity * 0.5}
        />
      </mesh>
    </group>
  )
}

// Componente principal
export default function Lion3D({ className = '', size = 300 }) {
  return (
    <div className={`${className}`} style={{ width: size, height: size }}>
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1} 
            castShadow 
            color="#FFDF00" 
          />
          <pointLight position={[-10, -10, -10]} color="#D4AF37" intensity={0.5} />
          
          <Lion position={[0, 0, 0]} />
          
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={5} 
            blur={2.5} 
            far={4} 
          />
          <Environment preset="city" />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 2.5} 
            maxPolarAngle={Math.PI / 2.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  )
} 