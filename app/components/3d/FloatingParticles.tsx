"use client"

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'

// Componente de partículas que siguen al cursor
function ParticleSwarm({ count = 100, size = 0.05, color = '#D4AF37', mousePosition }) {
  const mesh = useRef<THREE.Points>(null)
  const [positions, setPositions] = useState<Float32Array | null>(null)
  const [velocities, setVelocities] = useState<Array<THREE.Vector3> | null>(null)
  
  // Inicializar posiciones y velocidades
  useEffect(() => {
    const newPositions = new Float32Array(count * 3)
    const newVelocities = []
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Posiciones iniciales aleatorias
      newPositions[i3] = (Math.random() - 0.5) * 10
      newPositions[i3 + 1] = (Math.random() - 0.5) * 10
      newPositions[i3 + 2] = (Math.random() - 0.5) * 10
      
      // Velocidades iniciales aleatorias
      newVelocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ))
    }
    
    setPositions(newPositions)
    setVelocities(newVelocities)
  }, [count])
  
  // Actualizar posiciones en cada frame
  useFrame(() => {
    if (!positions || !velocities || !mesh.current) return
    
    const positionArray = mesh.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Aplicar velocidad
      positionArray[i3] += velocities[i].x
      positionArray[i3 + 1] += velocities[i].y
      positionArray[i3 + 2] += velocities[i].z
      
      // Atracción hacia el cursor
      if (mousePosition.current) {
        const targetX = mousePosition.current.x * 5
        const targetY = mousePosition.current.y * 5
        
        // Calcular dirección hacia el cursor
        const dirX = targetX - positionArray[i3]
        const dirY = targetY - positionArray[i3 + 1]
        
        // Aplicar fuerza de atracción
        velocities[i].x += dirX * 0.0005
        velocities[i].y += dirY * 0.0005
        
        // Aplicar fricción para evitar movimiento perpetuo
        velocities[i].multiplyScalar(0.99)
      }
      
      // Límites del espacio
      if (Math.abs(positionArray[i3]) > 10) velocities[i].x *= -0.9
      if (Math.abs(positionArray[i3 + 1]) > 10) velocities[i].y *= -0.9
      if (Math.abs(positionArray[i3 + 2]) > 10) velocities[i].z *= -0.9
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true
  })
  
  if (!positions) return null
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={color}
      />
    </points>
  )
}

// Componente principal
export default function FloatingParticles({ className = '', particleCount = 100, color = '#D4AF37' }) {
  const mousePosition = useRef({ x: 0, y: 0 })
  
  // Seguimiento del cursor
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
    }
    
    window.addEventListener('mousemove', updateMousePosition)
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])
  
  return (
    <div className={`${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <ParticleSwarm count={particleCount} color={color} mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  )
} 