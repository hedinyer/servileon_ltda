"use client"

import { useState } from 'react'
import SecurityShield from './components/3d/SecurityShield'
import GoldenShield from './components/3d/GoldenShield'
import { motion } from 'framer-motion'
import MainLayout from './components/MainLayout'
import PageTransition from './components/PageTransition'

export default function ShieldDemo() {
  const [selectedShield, setSelectedShield] = useState<'3d' | '2d'>('3d')
  
  return (
    <PageTransition>
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8 font-playfair">
            Demostración de Escudos
          </h1>
          
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedShield === '3d' 
                    ? 'bg-gold text-servileon-black' 
                    : 'bg-transparent text-gray-700'
                }`}
                onClick={() => setSelectedShield('3d')}
              >
                Escudo 3D
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedShield === '2d' 
                    ? 'bg-gold text-servileon-black' 
                    : 'bg-transparent text-gray-700'
                }`}
                onClick={() => setSelectedShield('2d')}
              >
                Escudo 2D
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md aspect-square bg-servileon-black rounded-lg overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: selectedShield === '3d' ? 1 : 0,
                  zIndex: selectedShield === '3d' ? 10 : 0
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <SecurityShield size={350} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: selectedShield === '2d' ? 1 : 0,
                  zIndex: selectedShield === '2d' ? 10 : 0
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <GoldenShield size={350} />
              </motion.div>
            </div>
            
            <div className="mt-8 text-center max-w-lg">
              <h2 className="text-2xl font-bold mb-4 font-playfair">
                {selectedShield === '3d' ? 'Escudo 3D con Three.js' : 'Escudo 2D con Canvas'}
              </h2>
              <p className="text-gray-700">
                {selectedShield === '3d' 
                  ? 'Este escudo está creado con Three.js, lo que permite una experiencia 3D interactiva con efectos de iluminación y rotación automática.'
                  : 'Este escudo está creado con Canvas 2D, lo que permite un mayor control sobre los detalles visuales y efectos de brillo, además de ser más ligero para dispositivos móviles.'
                }
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    </PageTransition>
  )
} 