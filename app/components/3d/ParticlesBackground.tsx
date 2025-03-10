"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleProps {
  count: number;
  color: string;
  size?: number;
  speed?: number;
}

function Particles({ count, color, size = 0.1, speed = 0.2 }: ParticleProps) {
  const mesh = useRef<THREE.Points>(null!)
  
  // Create particles
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])
  
  // Animation
  useFrame(() => {
    if (!mesh.current) return
    
    mesh.current.rotation.x += 0.0005 * speed
    mesh.current.rotation.y += 0.001 * speed
  })
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation
        transparent
        depthWrite={false}
      />
    </points>
  )
}

interface ParticlesBackgroundProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function ParticlesBackground({ 
  className = "",
  primaryColor = "#D4AF37",
  secondaryColor = "#FFFFFF"
}: ParticlesBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles count={500} color={primaryColor} size={0.1} speed={0.2} />
        <Particles count={200} color={secondaryColor} size={0.05} speed={0.1} />
      </Canvas>
    </div>
  )
} 