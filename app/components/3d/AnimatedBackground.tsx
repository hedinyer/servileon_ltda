"use client"

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

interface ShieldProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

function Shield({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1 
}: ShieldProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(t / 4) / 8
    meshRef.current.rotation.y = Math.sin(t / 2) / 4 + t / 2
  })
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      rotation={rotation}
      scale={scale}
      castShadow
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color="#D4AF37" 
        metalness={0.8} 
        roughness={0.2}
        emissive="#D4AF37"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

interface FloatingParticlesProps {
  count?: number;
}

function FloatingParticles({ count = 50 }: FloatingParticlesProps) {
  const particles = useRef<THREE.InstancedMesh>(null!)
  const dummy = new THREE.Object3D()
  
  useEffect(() => {
    // Set initial positions
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 10
      
      dummy.position.set(x, y, z)
      dummy.updateMatrix()
      particles.current.setMatrixAt(i, dummy.matrix)
    }
    particles.current.instanceMatrix.needsUpdate = true
  }, [count])
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    for (let i = 0; i < count; i++) {
      particles.current.getMatrixAt(i, dummy.matrix)
      dummy.position.setFromMatrixPosition(dummy.matrix)
      
      // Add subtle movement
      dummy.position.y += Math.sin((time + i) / 2) * 0.005
      dummy.position.x += Math.cos((time + i) / 3) * 0.005
      
      dummy.updateMatrix()
      particles.current.setMatrixAt(i, dummy.matrix)
    }
    
    particles.current.instanceMatrix.needsUpdate = true
  })
  
  return (
    <instancedMesh 
      ref={particles} 
      args={[undefined, undefined, count]}
    >
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.6} />
    </instancedMesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Shield position={[0, 0, 0]} scale={2} />
      </Float>
      
      <FloatingParticles count={100} />
      
      <Environment preset="city" />
    </>
  )
}

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <Scene />
      </Canvas>
    </div>
  )
} 