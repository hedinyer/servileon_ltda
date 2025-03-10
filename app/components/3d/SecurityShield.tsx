"use client"

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

// Componente del escudo 3D
function Shield(props: any) {
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
      group.current.rotation.y += delta * 0.1
    }
  })
  
  // Crear textura de patrón de rejilla
  const gridTexture = useRef<THREE.Texture | null>(null)
  
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Fondo
      ctx.fillStyle = '#D4AF37'
      ctx.fillRect(0, 0, 256, 256)
      
      // Patrón de rejilla
      ctx.strokeStyle = '#8B7500'
      ctx.lineWidth = 1
      
      // Líneas horizontales
      for (let i = 0; i <= 256; i += 16) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(256, i)
        ctx.stroke()
      }
      
      // Líneas verticales
      for (let i = 0; i <= 256; i += 16) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 256)
        ctx.stroke()
      }
      
      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      gridTexture.current = texture
    }
  }, [])
  
  return (
    <group ref={group} {...props} dispose={null}>
      {/* Escudo base (forma de escudo heráldico) */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <shapeGeometry args={[createShieldShape()]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          map={gridTexture.current || undefined}
        />
      </mesh>
      
      {/* Borde brillante */}
      <mesh position={[0, 0, -0.05]}>
        <shapeGeometry args={[createShieldShape(1.05)]} />
        <meshStandardMaterial 
          color="#FFDF00"
          metalness={1}
          roughness={0}
          emissive="#FFDF00"
          emissiveIntensity={glowIntensity}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Efecto de brillo exterior */}
      <mesh position={[0, 0, -0.1]}>
        <shapeGeometry args={[createShieldShape(1.1)]} />
        <meshStandardMaterial 
          color="#FFDF00"
          transparent
          opacity={0.2}
          emissive="#FFDF00"
          emissiveIntensity={glowIntensity * 0.5}
        />
      </mesh>
    </group>
  )
}

// Función para crear la forma de escudo heráldico
function createShieldShape(scale = 1) {
  const shape = new THREE.Shape()
  
  // Parte superior del escudo
  shape.moveTo(-1 * scale, 1.5 * scale)
  shape.lineTo(1 * scale, 1.5 * scale)
  
  // Lado derecho
  shape.bezierCurveTo(
    1.5 * scale, 1.5 * scale,
    1.5 * scale, 0 * scale,
    0 * scale, -1.5 * scale
  )
  
  // Lado izquierdo
  shape.bezierCurveTo(
    -1.5 * scale, 0 * scale,
    -1.5 * scale, 1.5 * scale,
    -1 * scale, 1.5 * scale
  )
  
  return shape
}

export default function SecurityShield({ className = '', size = 300 }) {
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
          
          <Shield position={[0, 0, 0]} />
          
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