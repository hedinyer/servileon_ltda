"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, User, Mail, Phone, MessageSquare, Building, MapPin } from 'lucide-react'
import { useNotification } from '../hooks/useNotification'
import { useAnalytics } from '../hooks/useAnalytics'

interface ContactFormProps {
  className?: string
}

interface FormData {
  nombre: string
  email: string
  telefono: string
  empresa: string
  mensaje: string
  asunto: string
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: '',
    asunto: 'Información general'
  })
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Hooks
  const { showNotification } = useNotification()
  const { trackFormSubmission } = useAnalytics()
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    // Required fields
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido'
    }
    
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Track form submission
      trackFormSubmission('contact_form', {
        subject: formData.asunto
      })
      
      // Show success notification
      showNotification(
        'success',
        '¡Mensaje enviado!',
        'Nos pondremos en contacto contigo a la brevedad.',
        5000
      )
      
      // Reset form
      setIsSubmitted(true)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          empresa: '',
          mensaje: '',
          asunto: 'Información general'
        })
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      // Show error notification
      showNotification(
        'error',
        'Error al enviar',
        'Ha ocurrido un error al enviar tu mensaje. Por favor, intenta nuevamente.',
        5000
      )
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className={`bg-white rounded-lg shadow-xl overflow-hidden ${className}`}>
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <MessageSquare className="h-6 w-6 text-gold mr-2" />
          Contáctanos
        </h2>
        
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium text-green-800 mb-2">¡Mensaje Enviado!</h3>
              <p className="text-green-600 mb-4">
                Gracias por contactarnos. Un miembro de nuestro equipo se pondrá en contacto contigo a la brevedad.
              </p>
              <div className="flex justify-center">
                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enviar otro mensaje
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Nombre y Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                        errors.nombre ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
                      placeholder="Tu nombre"
                    />
                  </div>
                  {errors.nombre && (
                    <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
              
              {/* Teléfono y Empresa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                        errors.telefono ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
                      placeholder="Ej: 311 326 0689"
                    />
                  </div>
                  {errors.telefono && (
                    <p className="mt-1 text-xs text-red-500">{errors.telefono}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa (Opcional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>
              </div>
              
              {/* Asunto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto *
                </label>
                <select
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  <option value="Información general">Información general</option>
                  <option value="Cotización de servicios">Cotización de servicios</option>
                  <option value="Soporte técnico">Soporte técnico</option>
                  <option value="Oportunidades laborales">Oportunidades laborales</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              
              {/* Mensaje */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje *
                </label>
                <div className="relative">
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.mensaje ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
                    placeholder="¿Cómo podemos ayudarte?"
                  ></textarea>
                </div>
                {errors.mensaje && (
                  <p className="mt-1 text-xs text-red-500">{errors.mensaje}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando mensaje...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Enviar mensaje
                  </>
                )}
              </motion.button>
              
              <p className="text-xs text-gray-500 text-center">
                Al enviar este formulario, aceptas nuestra política de privacidad y términos de servicio.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
      
      {/* Contact Information */}
      <div className="bg-servileon-black text-white p-6 md:p-8">
        <h3 className="text-xl font-bold mb-6">Información de contacto</h3>
        
        <div className="space-y-4">
          <motion.div 
            className="flex items-start"
            whileHover={{ x: 5 }}
          >
            <MapPin className="h-5 w-5 mr-3 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Dirección:</p>
              <p className="text-gray-300 text-sm">
                Bucaramanga: Carrera 2 #20-50<br />
                Paseo del puente 2- Piedecuesta, Santander<br />
                Bogotá: KR 98 #68 - 51
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start"
            whileHover={{ x: 5 }}
          >
            <Phone className="h-5 w-5 mr-3 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Teléfono:</p>
              <a 
                href="tel:+573113260689" 
                className="text-gray-300 text-sm hover:text-gold transition-colors"
              >
                +57 311 326 0689
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start"
            whileHover={{ x: 5 }}
          >
            <Mail className="h-5 w-5 mr-3 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Email:</p>
              <a 
                href="mailto:neider.leon@servileon.com" 
                className="text-gray-300 text-sm hover:text-gold transition-colors"
              >
                neider.leon@servileon.com
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-8">
          <p className="font-medium mb-2">Horario de atención:</p>
          <p className="text-gray-300 text-sm">
            Lunes a Viernes: 8:00 AM - 5:00 PM<br />
            Sábados: 9:00 AM - 1:00 PM
          </p>
        </div>
        
        <div className="mt-8">
          <p className="font-medium mb-4">Síguenos en redes sociales:</p>
          <div className="flex space-x-4">
            {[
              { icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, href: "#", name: "Facebook" },
              { icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>, href: "#", name: "Instagram" },
              { icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>, href: "#", name: "Twitter" },
              { icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, href: "#", name: "LinkedIn" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                className="bg-white/10 hover:bg-gold/20 text-white p-2 rounded-full transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Síguenos en ${social.name}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 