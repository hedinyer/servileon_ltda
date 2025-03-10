"use client"

import { useState, useEffect } from "react"
import { Calculator, DollarSign, Users, Home, Flower, Shield, Clock } from "lucide-react"

interface CotizacionCalculatorProps {
  className?: string;
  onRequestQuote: () => void;
}

export default function CotizacionCalculator({ 
  className = "", 
  onRequestQuote 
}: CotizacionCalculatorProps) {
  // Precios base y AIU para servicios de portería
  const SERVICIOS_PORTERIA = [
    { 
      id: "24h", 
      nombre: "Servicio 24 horas", 
      precioBase: 7800000, 
      aiu: 151050,
      color: "bg-blue-50 border-blue-200"
    },
    { 
      id: "24h-premium", 
      nombre: "Servicio 24 horas Premium", 
      precioBase: 8500000, 
      aiu: 161500,
      color: "bg-indigo-50 border-indigo-200"
    },
    { 
      id: "12h", 
      nombre: "Servicio 12 horas", 
      precioBase: 4500000, 
      aiu: 85500,
      color: "bg-green-50 border-green-200"
    },
    { 
      id: "8h", 
      nombre: "Servicio 8 horas", 
      precioBase: 3350000, 
      aiu: 63650,
      color: "bg-orange-50 border-orange-200"
    },
    { 
      id: "2x2x2", 
      nombre: "Servicio 2x2x2", 
      precioBase: 9669200, 
      aiu: 183714,
      color: "bg-gray-50 border-gray-200"
    }
  ]
  
  // Porcentaje de IVA (10% sobre el precio base)
  const IVA_PORCENTAJE = 0.10

  // Estados
  const [servicioSeleccionado, setServicioSeleccionado] = useState("24h")
  const [cotizacion, setCotizacion] = useState({
    precioBase: 0,
    aiu: 0,
    iva: 0,
    valorTotal: 0
  })
  const [isCalculating, setIsCalculating] = useState(false)

  // Calcular cotización cuando cambia el servicio seleccionado
  useEffect(() => {
    setIsCalculating(true)
    
    // Simulamos un pequeño retraso para mostrar la animación
    const timer = setTimeout(() => {
      // Obtener el servicio seleccionado
      const servicio = SERVICIOS_PORTERIA.find(s => s.id === servicioSeleccionado)
      
      if (servicio) {
        // Precio base
        const precioBase = servicio.precioBase
        
        // AIU
        const aiu = servicio.aiu
        
        // IVA (10% sobre el precio base)
        const iva = precioBase * IVA_PORCENTAJE
        
        // Valor total
        const valorTotal = precioBase + aiu + iva
        
        setCotizacion({
          precioBase,
          aiu,
          iva,
          valorTotal
        })
      }
      
      setIsCalculating(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [servicioSeleccionado])

  // Formatear número como moneda colombiana
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  // Manejar clic en el botón de solicitar cotización
  const handleRequestQuote = () => {
    // Llamar a la función proporcionada por el componente padre
    onRequestQuote();
  };

  // Obtener el servicio seleccionado
  const servicioActual = SERVICIOS_PORTERIA.find(s => s.id === servicioSeleccionado) || SERVICIOS_PORTERIA[0]

  return (
    <div className={`bg-white rounded-lg shadow-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-servileon-black p-6 text-white">
        <div className="flex items-center">
          <Calculator className="h-8 w-8 mr-3 text-gold" />
          <h3 className="font-playfair text-2xl font-bold">
            Calculadora de Cotizaciones
          </h3>
        </div>
        <p className="mt-2 opacity-90 text-sm">
          Calcula el costo estimado de nuestros servicios según tus necesidades
        </p>
      </div>
      
      {/* Body */}
      <div className="p-6">
        {/* Selección de servicio */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md mb-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-gold mr-2 flex-shrink-0" />
            <label className="block text-sm font-medium text-servileon-black">
              Tipo de Servicio
            </label>
          </div>
          <select
            value={servicioSeleccionado}
            onChange={(e) => setServicioSeleccionado(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gold transition-shadow duration-200 text-servileon-black font-medium text-lg"
          >
            {SERVICIOS_PORTERIA.map((servicio) => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.nombre}
              </option>
            ))}
          </select>
        </div>
        
        {/* Detalles del servicio seleccionado */}
        <div className={`p-5 rounded-lg border mb-6 ${servicioActual.color}`}>
          <h4 className="font-medium text-servileon-black mb-3 flex items-center">
            {servicioSeleccionado === "24h" || servicioSeleccionado === "24h-premium" ? 
              <Clock className="h-4 w-4 mr-2 text-gold" /> : 
              servicioSeleccionado === "2x2x2" ? 
              <Users className="h-4 w-4 mr-2 text-gold" /> : 
              <Clock className="h-4 w-4 mr-2 text-gold" />
            }
            {servicioActual.nombre}
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Precio Base:</span>
              <span className="font-medium text-servileon-black">{formatCurrency(servicioActual.precioBase)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">AIU:</span>
              <span className="font-medium text-servileon-black">{formatCurrency(servicioActual.aiu)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">IVA (10% sobre precio base):</span>
              <span className="font-medium text-servileon-black">{formatCurrency(servicioActual.precioBase * IVA_PORCENTAJE)}</span>
            </div>
          </div>
        </div>
        
        {/* Resultados */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-servileon-black mb-4 flex items-center">
                <Calculator className="h-4 w-4 text-gold mr-2 flex-shrink-0" />
                Detalles de la cotización:
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center">
                  <span className="text-servileon-black font-medium">Precio Base:</span>
                  <span className={`font-bold text-servileon-black transition-opacity duration-300 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
                    {formatCurrency(cotizacion.precioBase)}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-700">AIU:</span>
                  <span className={`font-medium text-servileon-black transition-opacity duration-300 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
                    {formatCurrency(cotizacion.aiu)}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-700">IVA (10%):</span>
                  <span className={`font-medium text-servileon-black transition-opacity duration-300 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
                    {formatCurrency(cotizacion.iva)}
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-servileon-black mb-2">Valor Total:</p>
              <div className={`transition-all duration-300 ${isCalculating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                <p className="text-3xl font-bold text-gold">
                  {formatCurrency(cotizacion.valorTotal)}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
            </div>
          </div>
        </div>
        
        {/* Servicios incluidos */}
        <div className="mt-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-servileon-black mb-3 flex items-center">
            <Shield className="h-4 w-4 text-gold mr-2" />
            Servicios incluidos:
          </h4>
          <div className="bg-white p-4 rounded-lg border border-gray-100 text-sm">
            <p className="font-medium text-servileon-black">Portería - {servicioActual.nombre}</p>
            <p className="text-gray-700 text-sm mt-1">Servicio profesional de portería</p>
          </div>
        </div>
        
        {/* Nota legal */}
        <div className="mt-4 text-xs text-gray-600 italic">
          *Precios sujetos a cambios. AIU e IVA aplican según normativa vigente.
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center">
          <button 
            onClick={handleRequestQuote}
            className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 w-full md:w-auto"
          >
            Solicitar Cotización Personalizada
          </button>
          <p className="text-xs text-gray-600 mt-3">
            Esta es una cotización estimada. Contáctanos para un presupuesto detallado.
          </p>
        </div>
      </div>
    </div>
  )
} 