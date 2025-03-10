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
      className="bg-white border border-gray-100 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group"
      style={{ 
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease',
        animationDelay: `${delay}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="mb-6 p-4 bg-gold/10 rounded-full w-fit"
        style={{ 
          transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease'
        }}
      >
        {icon}
      </div>
      
      <h3 
        className="text-2xl font-bold mb-4"
        style={{ 
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease'
        }}
      >
        {title}
      </h3>
      
      <p 
        className="text-gray-600 mb-6 flex-grow"
        style={{ 
          transform: isHovered ? 'translateZ(15px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease'
        }}
      >
        {description}
      </p>
      
      <Link 
        href={link} 
        className="text-gold font-semibold flex items-center gap-2 mt-auto group-hover:text-gold-dark transition-colors"
        style={{ 
          transform: isHovered ? 'translateZ(25px)' : 'translateZ(0)',
          transition: 'transform 0.3s ease'
        }}
      >
        Más información
        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
} 