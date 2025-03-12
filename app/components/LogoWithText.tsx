"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface LogoWithTextProps {
  textColor?: string;
  size?: number;
  className?: string;
  showTagline?: boolean;
  taglineColor?: string;
}

export default function LogoWithText({
  textColor = "text-servileon-black",
  size = 60,
  className = "",
  showTagline = true,
  taglineColor = "text-gray-500"
}: LogoWithTextProps) {
  return (
    <motion.div 
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image 
        src="/leon_logo.png" 
        alt="Servileon Logo" 
        width={size} 
        height={size}
        className="transition-all duration-300"
      />
      <div className="ml-3">
        <h3 className={`font-playfair font-bold text-xl ${textColor}`}>
          SERVILEON <span className="text-gold">LTDA</span>
        </h3>
        {showTagline && (
          <p className={`text-xs ${taglineColor} tracking-wider`}>PORTERÍA, VIGILANCIA Y CONTROL</p>
        )}
      </div>
    </motion.div>
  )
} 