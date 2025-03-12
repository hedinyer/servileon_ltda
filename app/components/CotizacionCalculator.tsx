"use client"

import { useState, useEffect } from "react"
import { Calculator, DollarSign, Users, Home, Flower, Shield, Clock, Send, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CotizacionCalculatorProps {
  className?: string;
  onRequestQuote?: (data: QuoteFormData) => void;
}

interface QuoteFormData {
  servicio: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  cotizacion: {
    precioBase: number;
    aiu: number;
    iva: number;
    valorTotal: number;
  }
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
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  // Formatear valores monetarios
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Validar formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simular envío a servidor
    setTimeout(() => {
      // Obtener el servicio seleccionado
      const servicio = SERVICIOS_PORTERIA.find(s => s.id === servicioSeleccionado)
      
      // Datos completos para enviar
      const quoteData: QuoteFormData = {
        servicio: servicio?.nombre || "",
        ...formData,
        cotizacion
      }
      
      // Llamar al callback si existe
      if (onRequestQuote) {
        onRequestQuote(quoteData)
      }
      
      // Guardar en localStorage para demo
      const quotes = JSON.parse(localStorage.getItem('servileon_quotes') || '[]')
      quotes.push({
        ...quoteData,
        fecha: new Date().toISOString()
      })
      localStorage.setItem('servileon_quotes', JSON.stringify(quotes))
      
      // Mostrar mensaje de éxito
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Resetear formulario después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          empresa: "",
          mensaje: ""
        })
      }, 5000)
    }, 1500)
  }

  // Servicio seleccionado
  const servicioActual = SERVICIOS_PORTERIA.find(s => s.id === servicioSeleccionado)

  return (
    <div className={`bg-white rounded-xl shadow-xl overflow-hidden ${className}`}>
      {/* Cabecera */}
      <div className="bg-servileon-black text-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold flex items-center">
            <Calculator className="mr-2 h-5 w-5 text-gold" />
            Calculadora de Cotización
          </h3>
          <DollarSign className="h-6 w-6 text-gold" />
        </div>
        <p className="mt-2 text-gray-300 text-sm">
          Seleccione un servicio para calcular su cotización aproximada
        </p>
      </div>
      
      {/* Contenido */}
      <div className="p-6">
        {/* Selector de servicios */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Servicio
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SERVICIOS_PORTERIA.map((servicio) => (
              <motion.button
                key={servicio.id}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all
                  ${servicioSeleccionado === servicio.id 
                    ? `${servicio.color} border-gold` 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'}
                `}
                onClick={() => setServicioSeleccionado(servicio.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium">{servicio.nombre}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Desde {formatCurrency(servicio.precioBase + servicio.aiu + (servicio.precioBase * IVA_PORCENTAJE))}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Resultados de la cotización */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Detalles de la Cotización</h4>
          
          <AnimatePresence mode="wait">
            {isCalculating ? (
              <motion.div 
                key="calculating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-4"
              >
                <div className="animate-pulse flex space-x-4">
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Precio Base:</div>
                  <div className="text-right font-medium">{formatCurrency(cotizacion.precioBase)}</div>
                  
                  <div className="text-gray-600">AIU:</div>
                  <div className="text-right font-medium">{formatCurrency(cotizacion.aiu)}</div>
                  
                  <div className="text-gray-600">IVA (10%):</div>
                  <div className="text-right font-medium">{formatCurrency(cotizacion.iva)}</div>
                  
                  <div className="text-gray-800 font-medium pt-2 border-t">Total Mensual:</div>
                  <div className="text-right text-gold font-bold pt-2 border-t">{formatCurrency(cotizacion.valorTotal)}</div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500">
                  * Esta cotización es aproximada y puede variar según requerimientos específicos.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Formulario de solicitud */}
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500 mb-4">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-medium text-green-800 mb-2">¡Solicitud Enviada!</h4>
              <p className="text-green-600">
                Hemos recibido su solicitud de cotización. Un asesor se pondrá en contacto con usted a la brevedad.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
            >
              <h4 className="font-medium text-gray-800 mb-3">Solicitar Cotización Personalizada</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Ingrese su nombre"
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="correo@ejemplo.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Ej: 311 326 0689"
                    />
                    {errors.telefono && (
                      <p className="mt-1 text-xs text-red-500">{errors.telefono}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa (Opcional)
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Nombre de su empresa"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje (Opcional)
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Detalles adicionales sobre su requerimiento"
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Solicitar Cotización
                    </>
                  )}
                </motion.button>
                
                <p className="text-xs text-gray-500 text-center">
                  Al enviar este formulario, acepta nuestra política de privacidad y términos de servicio.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 