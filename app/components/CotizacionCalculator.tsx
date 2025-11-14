"use client"

import { useState, useEffect } from "react"
import { Calculator, DollarSign, Users, Home, Flower, Shield, Clock, Calendar, Send, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CotizacionCalculatorProps {
  className?: string;
  onRequestQuote?: (data: QuoteFormData) => void;
}

interface QuoteFormData {
  servicio: string;
  categoria: string;
  duracion: string;
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
    duracionMeses: number;
  }
}

type ServiciosCategorias = "recurso_humano" | "aseo" | "jardineria";

interface Servicio {
  id: string;
  nombre: string;
  precioBase: number;
  aiu: number;
  iva: number;
  color: string;
}

export default function CotizacionCalculator({ 
  className = "", 
  onRequestQuote 
}: CotizacionCalculatorProps) {
  // Categorías de servicios
  const CATEGORIAS = [
    { id: "recurso_humano" as ServiciosCategorias, nombre: "Recurso Humano", icon: <Shield className="h-4 w-4" /> },
    { id: "aseo" as ServiciosCategorias, nombre: "Aseo y Limpieza", icon: <Users className="h-4 w-4" /> },
    { id: "jardineria" as ServiciosCategorias, nombre: "Jardinería", icon: <Flower className="h-4 w-4" /> }
  ]
  
  // Servicios por categoría con precios actualizados
  const SERVICIOS: Record<ServiciosCategorias, Servicio[]> = {
    recurso_humano: [
      { 
        id: "24h-3x3", 
        nombre: "Servicio 24 Horas 3x3", 
        precioBase: 7000000, 
        aiu: 700000,
        iva: 133000,
        color: "bg-blue-50 border-blue-200"
      },
      { 
        id: "24h-2x2x2", 
        nombre: "Servicio 24 Horas 2x2x2", 
        precioBase: 8800000, 
        aiu: 880000,
        iva: 167200,
        color: "bg-indigo-50 border-indigo-200"
      },
      { 
        id: "12h", 
        nombre: "Servicio 12 Horas", 
        precioBase: 4500000, 
        aiu: 450000,
        iva: 85500,
        color: "bg-green-50 border-green-200"
      },
      { 
        id: "8h", 
        nombre: "Servicio 8 Horas", 
        precioBase: 3350000, 
        aiu: 335000,
        iva: 63650,
        color: "bg-orange-50 border-orange-200"
      }
    ],
    aseo: [
      { 
        id: "aseo-8h", 
        nombre: "Servicio 8 Horas", 
        precioBase: 3350000, 
        aiu: 335000,
        iva: 63650,
        color: "bg-yellow-50 border-yellow-200"
      }
    ],
    jardineria: [
      { 
        id: "jardineria-8h", 
        nombre: "Servicio 8 Horas", 
        precioBase: 3450000, 
        aiu: 345000,
        iva: 65550,
        color: "bg-emerald-50 border-emerald-200"
      }
    ]
  }

  // Opciones de duración
  const DURACIONES = [
    { id: "1mes", nombre: "1 mes", meses: 1 },
    { id: "3mes", nombre: "3 meses", meses: 3 },
    { id: "6mes", nombre: "6 meses", meses: 6 },
    { id: "12mes", nombre: "12 meses", meses: 12 }
  ]

  // Estados
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<ServiciosCategorias>("recurso_humano")
  const [servicioSeleccionado, setServicioSeleccionado] = useState("24h-3x3")
  const [duracionSeleccionada, setDuracionSeleccionada] = useState("1mes")
  const [cotizacion, setCotizacion] = useState({
    precioBase: 0,
    aiu: 0,
    iva: 0,
    valorTotal: 0,
    duracionMeses: 1
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

  // Cuando cambia la categoría, actualizar el servicio seleccionado al primero de esa categoría
  useEffect(() => {
    if (SERVICIOS[categoriaSeleccionada] && SERVICIOS[categoriaSeleccionada].length > 0) {
      setServicioSeleccionado(SERVICIOS[categoriaSeleccionada][0].id)
    }
  }, [categoriaSeleccionada])

  // Calcular cotización cuando cambian los parámetros seleccionados
  useEffect(() => {
    setIsCalculating(true)
    
    // Simulamos un pequeño retraso para mostrar la animación
    const timer = setTimeout(() => {
      // Obtener el servicio seleccionado
      const servicio = SERVICIOS[categoriaSeleccionada]?.find(s => s.id === servicioSeleccionado)
      const duracion = DURACIONES.find(d => d.id === duracionSeleccionada)
      
      if (servicio && duracion) {
        // Precio base
        const precioBaseMensual = servicio.precioBase
        
        // AIU
        const aiuMensual = servicio.aiu
        
        // IVA
        const ivaMensual = servicio.iva
        
        // Calcular el valor total por la duración del contrato
        const precioBase = precioBaseMensual * duracion.meses
        const aiu = aiuMensual * duracion.meses
        const iva = ivaMensual * duracion.meses
        
        // Valor total
        const valorTotal = precioBase + aiu + iva
        
        setCotizacion({
          precioBase,
          aiu,
          iva,
          valorTotal,
          duracionMeses: duracion.meses
        })
      }
      
      setIsCalculating(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [categoriaSeleccionada, servicioSeleccionado, duracionSeleccionada])

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
      const servicio = SERVICIOS[categoriaSeleccionada]?.find(s => s.id === servicioSeleccionado)
      const duracion = DURACIONES.find(d => d.id === duracionSeleccionada)
      
      // Datos completos para enviar
      const quoteData: QuoteFormData = {
        servicio: servicio?.nombre || "",
        categoria: CATEGORIAS.find(c => c.id === categoriaSeleccionada)?.nombre || "",
        duracion: duracion?.nombre || "",
        ...formData,
        cotizacion: {
          precioBase: cotizacion.precioBase,
          aiu: cotizacion.aiu,
          iva: cotizacion.iva,
          valorTotal: cotizacion.valorTotal,
          duracionMeses: cotizacion.duracionMeses
        }
      }
      
      // Llamar al callback si existe
      if (onRequestQuote) {
        onRequestQuote(quoteData)
      }
      
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
          Configure las opciones para obtener una cotización personalizada
        </p>
      </div>
      
      {/* Contenido */}
      <div className="p-6">
        {/* Selector de categoría */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-servileon-black mb-2">
            Categoría de servicio
          </label>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIAS.map((categoria) => (
              <motion.button
                key={categoria.id}
                className={`
                  p-3 rounded-lg border text-left transition-all flex flex-col items-center justify-center text-center
                  ${categoriaSeleccionada === categoria.id 
                    ? 'bg-white border-gold shadow-md' 
                    : 'bg-white border-gray-200 hover:border-gray-300'}
                `}
                onClick={() => setCategoriaSeleccionada(categoria.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-2 rounded-full mb-1 ${
                  categoriaSeleccionada === categoria.id ? 'bg-gold/10 text-gold' : 'bg-gray-100 text-gray-500'
                }`}>
                  {categoria.icon}
                </div>
                <div className="font-medium text-servileon-black text-sm">{categoria.nombre}</div>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Selector de servicios */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-servileon-black mb-2">
            Tipo de Servicio
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICIOS[categoriaSeleccionada]?.map((servicio) => (
              <motion.button
                key={servicio.id}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all
                  ${servicioSeleccionado === servicio.id 
                    ? `${servicio.color} border-gold shadow-md` 
                    : 'bg-white border-gray-200 hover:border-gray-300'}
                `}
                onClick={() => setServicioSeleccionado(servicio.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium text-servileon-black">{servicio.nombre}</div>
                <div className="text-sm text-gray-700 mt-1">
                  {formatCurrency(servicio.precioBase + servicio.aiu + servicio.iva)} mensual
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Opciones adicionales */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-servileon-black mb-2">
            <Calendar className="h-4 w-4 inline-block mr-1" /> 
            Duración del contrato
          </label>
          <select
            value={duracionSeleccionada}
            onChange={(e) => setDuracionSeleccionada(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-servileon-black"
          >
            {DURACIONES.map((duracion) => (
              <option key={duracion.id} value={duracion.id}>
                {duracion.nombre}
              </option>
            ))}
          </select>
        </div>
        
        {/* Resultados de la cotización */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-servileon-black mb-3">Detalles de la Cotización</h4>
          
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
                  <div className="text-gray-700">Duración del contrato:</div>
                  <div className="text-right font-medium text-servileon-black">{cotizacion.duracionMeses} {cotizacion.duracionMeses === 1 ? 'mes' : 'meses'}</div>
                  
                  <div className="text-gray-700">Precio Base:</div>
                  <div className="text-right font-medium text-servileon-black">{formatCurrency(cotizacion.precioBase)}</div>
                  
                  <div className="text-gray-700">AIU (10%):</div>
                  <div className="text-right font-medium text-servileon-black">{formatCurrency(cotizacion.aiu)}</div>
                  
                  <div className="text-gray-700">IVA (19% sobre AIU):</div>
                  <div className="text-right font-medium text-servileon-black">{formatCurrency(cotizacion.iva)}</div>
                  
                  <div className="text-servileon-black font-medium pt-2 border-t">Total Contrato:</div>
                  <div className="text-right text-gold font-bold pt-2 border-t">{formatCurrency(cotizacion.valorTotal)}</div>
                </div>
                
                <div className="mt-3 text-xs text-gray-700">
                  * Esta cotización es por el valor total del contrato para {cotizacion.duracionMeses} {cotizacion.duracionMeses === 1 ? 'mes' : 'meses'}.
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
              <h4 className="text-lg font-medium text-servileon-black mb-2">¡Solicitud Enviada!</h4>
              <p className="text-gray-700">
                Hemos recibido su solicitud de cotización. Un asesor se pondrá en contacto con usted a la brevedad.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
            >
              <h4 className="font-medium text-servileon-black mb-3">Solicitar Cotización Personalizada</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-servileon-black mb-1">
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
                    <label className="block text-sm font-medium text-servileon-black mb-1">
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
                    <label className="block text-sm font-medium text-servileon-black mb-1">
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
                  <label className="block text-sm font-medium text-servileon-black mb-1">
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
                  <label className="block text-sm font-medium text-servileon-black mb-1">
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
                
                <p className="text-xs text-gray-700 text-center">
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