"use client"

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, MessageSquare, Share2, Heart } from "lucide-react";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { useNotification } from "../hooks/useNotification";
import { useAnalytics } from "../hooks/useAnalytics";

interface Pricing {
  valorSinIva: string;
  iva: string;
  valorTotal: string;
}

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  category: string;
  image: string;
  features: string[];
  pricing?: Pricing;
  onRequestQuote: (serviceId: number) => void;
}

export default function ServiceCard({
  id,
  title,
  description,
  icon,
  category,
  image,
  features,
  pricing,
  onRequestQuote
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { showNotification } = useNotification();
  const { trackEvent } = useAnalytics();
  
  const categoryName = category === "aseo" ? "Aseo y Limpieza" : category === "recurso_humano" ? "Recurso Humano" : "Recurso Humano";

  // Handle favorite toggle
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsFavorite(!isFavorite);
    
    // Track event
    trackEvent('service_favorite', `service_${id}`, {
      service_id: id,
      service_name: title,
      action: !isFavorite ? 'add' : 'remove'
    });
    
    // Show notification
    showNotification(
      'success',
      !isFavorite ? 'Servicio guardado' : 'Servicio eliminado',
      !isFavorite 
        ? `Has añadido ${title} a tus favoritos` 
        : `Has eliminado ${title} de tus favoritos`,
      3000
    );
  };
  
  // Handle share
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: `Servicio de ${title} - Servileon LTDA`,
        text: description,
        url: window.location.origin + `/servicios/${id}`
      })
      .then(() => {
        trackEvent('service_share', `service_${id}`, {
          service_id: id,
          service_name: title,
          method: 'web_share_api'
        });
      })
      .catch(console.error);
    } else {
      // Fallback: copy link to clipboard
      const url = window.location.origin + `/servicios/${id}`;
      navigator.clipboard.writeText(url).then(() => {
        showNotification(
          'success',
          'Enlace copiado',
          'El enlace ha sido copiado al portapapeles',
          3000
        );
        
        trackEvent('service_share', `service_${id}`, {
          service_id: id,
          service_name: title,
          method: 'clipboard'
        });
      });
    }
  };
  
  // Handle quote request
  const handleRequestQuote = () => {
    onRequestQuote(id);
    
    // Track event
    trackEvent('quote_request', `service_${id}`, {
      service_id: id,
      service_name: title
    });
  };

  return (
    <motion.div 
      className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card Header with Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Category Badge */}
        <motion.div 
          className="absolute top-4 left-4"
          whileHover={{ scale: 1.05 }}
        >
          <span className="bg-gold/90 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            {categoryName}
          </span>
        </motion.div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {/* Favorite Button */}
          <motion.button
            className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteToggle}
            aria-label={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
          >
            <Heart className="h-4 w-4" fill={isFavorite ? "white" : "none"} />
          </motion.button>
          
          {/* Share Button */}
          <motion.button
            className="bg-white/90 text-gray-700 p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            aria-label="Compartir servicio"
          >
            <Share2 className="h-4 w-4" />
          </motion.button>
        </div>
        
        {/* Icon */}
        <motion.div 
          className="absolute top-16 right-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/90 text-gold p-2 rounded-full">
            {icon}
          </div>
        </motion.div>
        
        {/* Title */}
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="font-playfair text-xl font-bold text-white mb-1 drop-shadow-md">
            {title}
          </h3>
          <motion.div 
            className="flex items-center"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-1 w-10 bg-gold rounded-full"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        
        {/* Features */}
        <div className="mb-5 flex-grow">
          <p className="font-medium text-gray-800 mb-2">Características:</p>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <motion.li 
                key={i} 
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="bg-gold/10 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-gold" />
                </div>
                <span className="text-gray-600 text-sm">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        {/* Pricing */}
        {pricing && (
          <motion.div 
            className="mt-auto mb-5 p-4 bg-gold/5 rounded-lg border border-gold/20"
            whileHover={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-600">Valor sin IVA:</p>
              <p className="text-sm text-gray-800">${pricing.valorSinIva}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-600">IVA:</p>
              <p className="text-sm text-gray-800">${pricing.iva}</p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gold/20">
              <p className="text-base font-bold text-gray-800">Total:</p>
              <p className="text-lg font-bold text-gold">${pricing.valorTotal}</p>
            </div>
          </motion.div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <Link 
            href={`/servicios/${id}`}
            className="relative overflow-hidden bg-gold hover:bg-gold-dark text-white py-3 px-4 rounded-md text-center font-medium transition-colors duration-300 flex items-center justify-center group"
            onClick={() => {
              trackEvent('service_view', `service_${id}`, {
                service_id: id,
                service_name: title
              });
            }}
          >
            <span className="relative z-10">Ver detalles completos</span>
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
            
            {/* Animated background */}
            <motion.div 
              className="absolute inset-0 bg-gold-dark"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          
          <motion.button 
            onClick={handleRequestQuote}
            className="bg-white border-2 border-gold text-gold hover:bg-gold/5 py-2.5 px-4 rounded-md text-center font-medium transition-colors duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Solicitar cotización</span>
            <MessageSquare className="ml-1 h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
} 