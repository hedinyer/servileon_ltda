"use client"

import { useState, useRef, ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface ServiceCard3DProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  delay?: number;
}

export default function ServiceCard3D({ 
  icon, 
  title, 
  description, 
  link,
  delay = 0
}: ServiceCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Track mouse position for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  }
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return
    
    setIsHovered(false)
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
  }
  
  return (
    <div 
      ref={cardRef}
      className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col group overflow-hidden"
      style={{ 
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease, box-shadow 0.5s ease',
        animationDelay: `${delay}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold/80 to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div 
        className="mb-6 p-5 bg-gradient-to-br from-gold/15 to-gold/5 rounded-2xl w-fit shadow-sm group-hover:shadow-md transition-all duration-300"
        style={{ 
          transform: isHovered ? 'translateZ(30px) scale(1.05)' : 'translateZ(0) scale(1)',
          transition: 'transform 0.3s ease'
        }}
      >
        <div className="text-gold">
          {icon}
        </div>
      </div>
      
      <h3 
        className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-black transition-colors duration-300 leading-tight"
        style={{ 
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease'
        }}
      >
        {title}
      </h3>
      
      <p 
        className="text-gray-600 mb-6 flex-grow text-justify leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
        style={{ 
          transform: isHovered ? 'translateZ(15px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease'
        }}
      >
        {description}
      </p>
      
      <Link 
        href={link} 
        className="text-gold font-semibold flex items-center gap-2 mt-auto group-hover:text-gold-dark transition-all duration-300 hover:gap-3"
        style={{ 
          transform: isHovered ? 'translateZ(25px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease'
        }}
      >
        <span className="relative">
          Ver detalles
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
        </span>
        <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
      </Link>
    </div>
  )
} 