"use client"

import { useState, useEffect } from "react"
import { Calculator, DollarSign, Users, Home, Flower } from "lucide-react"

interface CotizacionCalculatorProps {
  className?: string;
  onRequestQuote: () => void;
}

export default function CotizacionCalculator({ 
  className = "", 
  onRequestQuote 
}: CotizacionCalculatorProps) {
  // Precios base (ya incluyen el margen del 10%)
  const PRECIO_VIGILANTE = 3300000 // 3,000,000 + 10% de margen
  const PRECIO_ASEADORA = 2860000 // 2,600,000 + 10% de margen
  const PRECIO_JARDINERO = 3550000 // Precio base para jardinero 8 horas
  const INCREMENTO_ESTRATO = 500000
  const IVA = 0.19

  // Estados
  const [numVigilantes, setNumVigilantes] = useState(1)
  const [numAseadoras, setNumAseadoras] = useState(1)
  const [numJardineros, setNumJardineros] = useState(0)
  const [estrato, setEstrato] = useState(1)
  const [cotizacion, setCotizacion] = useState({
    subtotal: 0,
    valorSinIva: 0,
    iva: 0,
    valorTotal: 0
  })
  const [isCalculating, setIsCalculating] = useState(false)

  // Calcular cotización cuando cambian los valores
  useEffect(() => {
    setIsCalculating(true)
    
    // Simulamos un pequeño retraso para mostrar la animación
    const timer = setTimeout(() => {
      // Costo base por personal (ya incluye el margen)
      const costoVigilantes = numVigilantes * PRECIO_VIGILANTE
      const costoAseadoras = numAseadoras * PRECIO_ASEADORA
      const costoJardineros = numJardineros * PRECIO_JARDINERO
      
      // Incremento por estrato
      const incrementoEstrato = (estrato - 1) * INCREMENTO_ESTRATO
      
      // Valor sin IVA (ya incluye el margen)
      const valorSinIva = costoVigilantes + costoAseadoras + costoJardineros + incrementoEstrato
      
      // IVA (19%)
      const iva = valorSinIva * IVA
      
      // Valor total
      const valorTotal = valorSinIva + iva
      
      setCotizacion({
        subtotal: valorSinIva,
        valorSinIva,
        iva,
        valorTotal
      })
      
      setIsCalculating(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [numVigilantes, numAseadoras, numJardineros, estrato])

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

  return (
    <div className={`bg-white rounded-md shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gold/90 to-gold p-6 text-white">
        <div className="flex items-center">
          <Calculator className="h-8 w-8 mr-3" />
          <h3 className="font-playfair text-2xl font-bold">
            Calculadora de Cotizaciones
          </h3>
        </div>
        <p className="mt-2 opacity-90 text-sm">
          Calcula el costo estimado de nuestros servicios según tus necesidades
        </p>
      </div>
      
      {/* Body */}
      <div className="p-4 md:p-6">
        {/* Controles de selección */}
        <div className="space-y-6">
          {/* Vigilantes */}
          <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-3">
              <Users className="h-5 w-5 text-gold mr-2 flex-shrink-0" />
              <label className="block text-sm font-medium text-gray-700">
                Vigilantes
              </label>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => setNumVigilantes(Math.max(0, numVigilantes - 1))}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md transition-colors duration-200 flex-shrink-0"
              >
                -
              </button>
              <input
                type="number"
                min="0"
                value={numVigilantes}
                onChange={(e) => setNumVigilantes(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-center py-2 border-t border-b border-gray-200 focus:outline-none focus:ring-1 focus:ring-gold text-black font-bold text-lg"
              />
              <button 
                onClick={() => setNumVigilantes(numVigilantes + 1)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md transition-colors duration-200 flex-shrink-0"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <DollarSign className="h-3 w-3 mr-1 flex-shrink-0" />
              Precio: {formatCurrency(PRECIO_VIGILANTE)}
            </p>
          </div>
          
          {/* Aseadoras */}
          <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-3">
              <Users className="h-5 w-5 text-gold mr-2 flex-shrink-0" />
              <label className="block text-sm font-medium text-gray-700">
                Aseadoras
              </label>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => setNumAseadoras(Math.max(0, numAseadoras - 1))}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md transition-colors duration-200 flex-shrink-0"
              >
                -
              </button>
              <input
                type="number"
                min="0"
                value={numAseadoras}
                onChange={(e) => setNumAseadoras(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-center py-2 border-t border-b border-gray-200 focus:outline-none focus:ring-1 focus:ring-gold text-black font-bold text-lg"
              />
              <button 
                onClick={() => setNumAseadoras(numAseadoras + 1)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md transition-colors duration-200 flex-shrink-0"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <DollarSign className="h-3 w-3 mr-1 flex-shrink-0" />
              Precio: {formatCurrency(PRECIO_ASEADORA)}
            </p>
          </div>
          
          {/* Jardineros */}
          <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-3">
              <Flower className="h-5 w-5 text-gold mr-2 flex-shrink-0" />
              <label className="block text-sm font-medium text-gray-700">
                Jardineros (8h)
              </label>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => setNumJardineros(Math.max(0, numJardineros - 1))}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md transition-colors duration-200 flex-shrink-0"
              >
                -
              </button>
              <input
                type="number"
                min="0"
                value={numJardineros}
                onChange={(e) => setNumJardineros(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-center py-2 border-t border-b border-gray-200 focus:outline-none focus:ring-1 focus:ring-gold text-black font-bold text-lg"
              />
              <button 
                onClick={() => setNumJardineros(numJardineros + 1)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md transition-colors duration-200 flex-shrink-0"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <DollarSign className="h-3 w-3 mr-1 flex-shrink-0" />
              Precio: {formatCurrency(PRECIO_JARDINERO)}
            </p>
          </div>
          
          {/* Estrato */}
          <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-3">
              <Home className="h-5 w-5 text-gold mr-2 flex-shrink-0" />
              <label className="block text-sm font-medium text-gray-700">
                Estrato
              </label>
            </div>
            <select
              value={estrato}
              onChange={(e) => setEstrato(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gold transition-shadow duration-200 text-black font-bold text-lg text-center appearance-none"
            >
              {[1, 2, 3, 4, 5, 6].map((e) => (
                <option key={e} value={e}>
                  Estrato {e}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <DollarSign className="h-3 w-3 mr-1 flex-shrink-0" />
              Incremento: {formatCurrency(INCREMENTO_ESTRATO)} por nivel
            </p>
          </div>
        </div>
        
        {/* Resultados */}
        <div className="bg-gray-50 p-5 rounded-md border border-gray-200 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                <Calculator className="h-4 w-4 text-gold mr-2 flex-shrink-0" />
                Detalles de la cotización:
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">Valor sin IVA:</span>
                  <span className={`font-bold text-servileon-black transition-opacity duration-300 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
                    {formatCurrency(cotizacion.valorSinIva)}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">IVA (19%):</span>
                  <span className={`font-medium transition-opacity duration-300 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
                    {formatCurrency(cotizacion.iva)}
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col justify-center items-center bg-gradient-to-br from-gold/5 to-gold/20 p-6 rounded-md border border-gold/30">
              <p className="text-sm font-medium text-gray-700 mb-2">Valor Total:</p>
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
        <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Servicios incluidos:</h4>
          <div className="space-y-2">
            {numVigilantes > 0 && (
              <div className="bg-white p-3 rounded border border-gray-100 text-sm">
                <p className="font-medium text-gray-800">Vigilancia</p>
                <p className="text-gray-600 text-xs">Servicio 24 horas todos los días del mes</p>
              </div>
            )}
            {numAseadoras > 0 && (
              <div className="bg-white p-3 rounded border border-gray-100 text-sm">
                <p className="font-medium text-gray-800">Aseo y Limpieza</p>
                <p className="text-gray-600 text-xs">Servicio de lunes a sábado</p>
              </div>
            )}
            {numJardineros > 0 && (
              <div className="bg-white p-3 rounded border border-gray-100 text-sm">
                <p className="font-medium text-gray-800">Jardinería (8h)</p>
                <p className="text-gray-600 text-xs">Servicio de jardinería patio (8) horas, lunes a sábado</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center">
          <button 
            onClick={handleRequestQuote}
            className="bg-servileon-black hover:bg-gray-800 text-white px-6 py-3 rounded-sm font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 w-full md:w-auto"
          >
            Solicitar Cotización Personalizada
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Esta es una cotización estimada. Contáctanos para un presupuesto detallado.
          </p>
        </div>
      </div>
    </div>
  )
} 