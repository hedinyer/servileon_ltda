"use client"

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Environment, ContactShadows, OrbitControls, useTexture, Text3D, Center } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

// Componente del león 3D extruido
function ExtrudedLion(props: any) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0.5)
  const { scene } = useThree()
  
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
  
  // Crear geometría extruida a partir del logo
  useEffect(() => {
    if (!texture) return
    
    // Crear un canvas para procesar la imagen
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Configurar el tamaño del canvas
    canvas.width = 256
    canvas.height = 256
    
    // Crear una imagen a partir de la textura
    const img = new Image()
    img.src = texture.image.src
    
    img.onload = () => {
      // Dibujar la imagen en el canvas
      ctx.drawImage(img, 0, 0, 256, 256)
      
      // Obtener los datos de la imagen
      const imageData = ctx.getImageData(0, 0, 256, 256)
      const data = imageData.data
      
      // Crear una forma a partir de los datos de la imagen
      const shape = new THREE.Shape()
      
      // Encontrar el contorno del león (simplificado)
      // Esto es una aproximación - en un caso real se usaría un algoritmo de detección de bordes
      
      // Crear una extrusión básica
      const extrudeSettings = {
        steps: 2,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 3
      }
      
      // Crear un círculo como base
      shape.absarc(0, 0, 1, 0, Math.PI * 2, false)
      
      // Crear la geometría extruida
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      
      // Crear material dorado
      const material = new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        metalness: 0.9,
        roughness: 0.1,
        map: texture,
        emissive: new THREE.Color('#D4AF37'),
        emissiveIntensity: 0.2
      })
      
      // Crear la malla
      const mesh = new THREE.Mesh(geometry, material)
      
      // Añadir la malla al grupo
      if (group.current) {
        // Limpiar meshes anteriores
        while (group.current.children.length > 0) {
          group.current.remove(group.current.children[0])
        }
        
        // Añadir el nuevo mesh
        group.current.add(mesh)
      }
    }
  }, [texture])
  
  return (
    <group ref={group} {...props} dispose={null}>
      {/* Base circular dorada */}
      <mesh 
        position={[0, 0, -0.3]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[1.8, 1.8, 0.1, 32]} />
        <meshStandardMaterial 
          color="#B8860B"
          metalness={0.9}
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={glowIntensity * 0.2}
        />
      </mesh>
      
      {/* Texto "SERVILEON" */}
      <group position={[0, -1.5, 0]}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={0.3}
            height={0.1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            SERVILEON
            <meshStandardMaterial 
              color="#D4AF37"
              metalness={0.8}
              roughness={0.2}
              emissive="#D4AF37"
              emissiveIntensity={glowIntensity * 0.3}
            />
          </Text3D>
        </Center>
      </group>
      
      {/* Efecto de brillo alrededor */}
      <mesh position={[0, 0, -0.35]} rotation={[0, 0, 0]}>
        <ringGeometry args={[1.8, 2.1, 32]} />
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
      
      {/* Plano frontal con la textura del león */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.5, 2.5]} />
        <meshStandardMaterial 
          map={texture}
          metalness={0.7}
          roughness={0.2}
          emissive={new THREE.Color('#D4AF37')}
          emissiveIntensity={glowIntensity * 0.3}
          transparent={true}
          alphaTest={0.5}
        />
      </mesh>
    </group>
  )
}

// Componente principal
export default function LionExtruded({ className = '', size = 300 }) {
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
          
          <ExtrudedLion position={[0, 0, 0]} />
          
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