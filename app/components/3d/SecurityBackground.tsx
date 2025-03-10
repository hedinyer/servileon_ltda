"use client"

import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointMaterial, Points } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'

// Componente de partículas
function ParticleField({ count = 5000, color = '#D4AF37' }) {
  const points = useRef()
  
  // Generar posiciones aleatorias para las partículas
  const positions = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10
    scales[i] = Math.random() * 0.5 + 0.1
  }
  
  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * 0.05
      points.current.rotation.y += delta * 0.03
    }
  })
  
  return (
    <Points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={count}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={color}
      />
    </Points>
  )
}

// Componente de cámara que sigue al mouse
function CameraController() {
  const { camera } = useThree()
  const mousePosition = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    const updateMousePosition = (e) => {
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
  
  useFrame(() => {
    // Movimiento suave de la cámara siguiendo al mouse
    camera.position.x += (mousePosition.current.x * 0.5 - camera.position.x) * 0.05
    camera.position.y += (mousePosition.current.y * 0.5 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

export default function SecurityBackground({ className = '' }) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <CameraController />
          <ParticleField />
          <ParticleField count={2000} color="#FFDF00" />
          <ambientLight intensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
} 