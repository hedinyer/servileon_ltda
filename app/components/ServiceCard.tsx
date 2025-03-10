import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, MessageSquare } from "lucide-react";
import { ReactNode } from "react";

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
  const categoryName = category === "aseo" ? "Aseo y Limpieza" : "Portería";

  return (
    <div className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden group h-full flex flex-col">
      {/* Card Header with Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gold/90 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            {categoryName}
          </span>
        </div>
        
        {/* Icon */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 text-gold p-2 rounded-full">
            {icon}
          </div>
        </div>
        
        {/* Title */}
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="font-playfair text-xl font-bold text-white mb-1 drop-shadow-md">
            {title}
          </h3>
          <div className="flex items-center">
            <div className="h-1 w-10 bg-gold rounded-full"></div>
          </div>
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
              <li key={i} className="flex items-start">
                <div className="bg-gold/10 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-gold" />
                </div>
                <span className="text-gray-600 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Pricing */}
        {pricing && (
          <div className="mt-auto mb-5 p-4 bg-gold/5 rounded-lg border border-gold/20">
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
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <Link 
            href={`/servicios/${id}`}
            className="bg-gold hover:bg-gold-dark text-white py-3 px-4 rounded-md text-center font-medium transition-colors duration-300 flex items-center justify-center group"
          >
            <span>Ver detalles completos</span>
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <button 
            onClick={() => onRequestQuote(id)}
            className="bg-white border-2 border-gold text-gold hover:bg-gold/5 py-2.5 px-4 rounded-md text-center font-medium transition-colors duration-300 flex items-center justify-center"
          >
            <span>Solicitar cotización</span>
            <MessageSquare className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 