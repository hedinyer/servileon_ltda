"use client"

import { useState } from 'react'
import Lion3D from './components/3d/Lion3D'
import LionExtruded from './components/3d/LionExtruded'
import { motion } from 'framer-motion'
import MainLayout from './components/MainLayout'
import PageTransition from './components/PageTransition'

export default function LionDemo() {
  const [selectedLion, setSelectedLion] = useState<'simple' | 'extruded'>('simple')
  
  return (
    <PageTransition>
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8 font-playfair">
            Demostración de León 3D
          </h1>
          
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedLion === 'simple' 
                    ? 'bg-gold text-servileon-black' 
                    : 'bg-transparent text-gray-700'
                }`}
                onClick={() => setSelectedLion('simple')}
              >
                León Simple
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedLion === 'extruded' 
                    ? 'bg-gold text-servileon-black' 
                    : 'bg-transparent text-gray-700'
                }`}
                onClick={() => setSelectedLion('extruded')}
              >
                León Extruido
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md aspect-square bg-servileon-black rounded-lg overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: selectedLion === 'simple' ? 1 : 0,
                  zIndex: selectedLion === 'simple' ? 10 : 0
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Lion3D size={350} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: selectedLion === 'extruded' ? 1 : 0,
                  zIndex: selectedLion === 'extruded' ? 10 : 0
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <LionExtruded size={350} />
              </motion.div>
            </div>
            
            <div className="mt-8 text-center max-w-lg">
              <h2 className="text-2xl font-bold mb-4 font-playfair">
                {selectedLion === 'simple' ? 'León 3D Simple' : 'León 3D Extruido'}
              </h2>
              <p className="text-gray-700">
                {selectedLion === 'simple' 
                  ? 'Esta versión del león utiliza una textura plana con efectos de iluminación para crear una sensación de profundidad. Es más ligera y funciona bien en dispositivos móviles.'
                  : 'Esta versión del león utiliza técnicas de extrusión para crear un verdadero efecto 3D con volumen. Incluye el texto "SERVILEON" y efectos de iluminación avanzados.'
                }
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    </PageTransition>
  )
} 