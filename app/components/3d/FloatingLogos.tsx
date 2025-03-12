"use client"

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import { useTexture, Billboard } from '@react-three/drei'
import * as THREE from 'three'

// Componente para un logo individual flotante
function FloatingLogo({ 
  position, 
  velocity, 
  size = 1, 
  opacity = 0.2 
}: { 
  position: [number, number, number], 
  velocity: { x: number, y: number }, 
  size?: number, 
  opacity?: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const logoTexture = useTexture('/leon_logo.png')
  
  // Configurar la textura para que sea transparente
  useEffect(() => {
    if (logoTexture) {
      // Usar cast para acceder a la propiedad
      (logoTexture as any).transparent = true
    }
  }, [logoTexture])
  
  // Actualizar posición en cada frame
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    // Mover el logo según su velocidad
    meshRef.current.position.x += velocity.x * delta * 15
    meshRef.current.position.y += velocity.y * delta * 15
    
    // Rotación suave
    meshRef.current.rotation.z += delta * 0.1
    
    // Rebote en los bordes
    if (Math.abs(meshRef.current.position.x) > 10) {
      velocity.x *= -1
    }
    if (Math.abs(meshRef.current.position.y) > 5) {
      velocity.y *= -1
    }
  })
  
  return (
    <Billboard
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      <mesh ref={meshRef} position={position}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial 
          map={logoTexture} 
          transparent={true} 
          opacity={opacity}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Billboard>
  )
}

// Componente principal
export default function FloatingLogos({ 
  className = '', 
  count = 10, 
  minSize = 1, 
  maxSize = 3,
  minOpacity = 0.05,
  maxOpacity = 0.2
}: {
  className?: string,
  count?: number,
  minSize?: number,
  maxSize?: number,
  minOpacity?: number,
  maxOpacity?: number
}) {
  const [logos, setLogos] = useState<Array<{
    id: number,
    position: [number, number, number],
    velocity: { x: number, y: number },
    size: number,
    opacity: number
  }>>([])
  
  // Inicializar logos
  useEffect(() => {
    const newLogos: Array<{
      id: number,
      position: [number, number, number],
      velocity: { x: number, y: number },
      size: number,
      opacity: number
    }> = []
    
    for (let i = 0; i < count; i++) {
      // Posición aleatoria
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 5
      
      // Velocidad aleatoria (lenta)
      const vx = (Math.random() - 0.5) * 0.2
      const vy = (Math.random() - 0.5) * 0.2
      
      // Tamaño aleatorio
      const size = minSize + Math.random() * (maxSize - minSize)
      
      // Opacidad aleatoria
      const opacity = minOpacity + Math.random() * (maxOpacity - minOpacity)
      
      newLogos.push({
        id: i,
        position: [x, y, z] as [number, number, number],
        velocity: { x: vx, y: vy },
        size,
        opacity
      })
    }
    
    setLogos(newLogos)
  }, [count, minSize, maxSize, minOpacity, maxOpacity])
  
  return (
    <div className={`${className} w-full h-full absolute inset-0 pointer-events-none`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          {logos.map((logo) => (
            <FloatingLogo
              key={logo.id}
              position={logo.position}
              velocity={logo.velocity}
              size={logo.size}
              opacity={logo.opacity}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
} 