"use client"

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Center } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Componente de texto 3D simplificado que no requiere cargar fuentes
function AnimatedText3D({ text, color = '#D4AF37', position = [0, 0, 0] }) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Animación de rotación suave
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })
  
  // Crear letras individuales para el efecto 3D
  const letters = text.split('').map((letter, index) => ({
    letter,
    position: [(index - text.length / 2) * 0.6, 0, 0]
  }))
  
  return (
    <group ref={groupRef} position={position as any}>
      {letters.map((item, index) => (
        <mesh key={index} position={item.position as any}>
          <boxGeometry args={[0.5, 0.8, 0.1]} />
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Text3DEffect({ text, className = '', height = 200, color = '#D4AF37' }) {
  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Versión 3D en Canvas */}
      <div className="absolute inset-0 opacity-0 sm:opacity-100">
        <Canvas>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <AnimatedText3D text={text} color={color} />
            
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Versión alternativa para móviles o fallback */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center sm:opacity-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold"
          style={{ color }}
          animate={{ 
            y: [0, -5, 0],
            filter: ['drop-shadow(0 0 0px rgba(212, 175, 55, 0.5))', 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.8))', 'drop-shadow(0 0 0px rgba(212, 175, 55, 0.5))']
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          {text}
        </motion.h2>
      </motion.div>
    </div>
  )
} 