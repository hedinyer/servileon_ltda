"use client"

import { motion } from 'framer-motion'
import LogoWithText from "./components/LogoWithText"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <LogoWithText
            size={80}
            textColor="text-servileon-black"
            taglineColor="text-gray-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-servileon-black mb-4 font-playfair">
            Lo sentimos
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-6 font-medium">
            Estamos en mantenimiento
          </p>
          <p className="text-gray-500 text-sm">
            Estamos trabajando para mejorar nuestro sitio web.
            <br />
            Estaremos de vuelta pronto.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

