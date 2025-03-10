"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Users, Eye, Bell, Lock, ChevronRight, MessageSquare } from "lucide-react"
import MainLayout from "../components/MainLayout"
import FadeInOnScroll from "../components/FadeInOnScroll"

export default function ServiciosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("todos")
  const [showContactForm, setShowContactForm] = useState(false)

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "fisico", name: "Seguridad Física" },
    { id: "tecnologico", name: "Seguridad Tecnológica" },
    { id: "consultoria", name: "Consultoría" },
  ]

  const services = [
    {
      id: 1,
      title: "Vigilancia Armada",
      description: "Personal altamente capacitado y certificado para la protección de sus instalaciones y activos.",
      icon: <Shield className="h-12 w-12 text-gold" />,
      category: "fisico",
      image: "/placeholder.jpg",
      features: [
        "Personal con licencia de porte de armas",
        "Entrenamiento continuo en protocolos de seguridad",
        "Uniformes distintivos y equipamiento completo",
        "Rotación estratégica de personal"
      ]
    },
    {
      id: 2,
      title: "Protección Ejecutiva",
      description: "Escoltas profesionales para la seguridad de ejecutivos y personalidades VIP.",
      icon: <Users className="h-12 w-12 text-gold" />,
      category: "fisico",
      image: "/placeholder.jpg",
      features: [
        "Escoltas con experiencia militar o policial",
        "Vehículos blindados disponibles",
        "Planificación de rutas seguras",
        "Protección 24/7"
      ]
    },
    {
      id: 3,
      title: "Monitoreo 24/7 con IA",
      description: "Sistemas de vigilancia inteligente con análisis predictivo y respuesta inmediata.",
      icon: <Eye className="h-12 w-12 text-gold" />,
      category: "tecnologico",
      image: "/placeholder.jpg",
      features: [
        "Cámaras de alta definición con visión nocturna",
        "Algoritmos de detección de comportamientos sospechosos",
        "Centro de monitoreo con personal especializado",
        "Alertas en tiempo real"
      ]
    },
    {
      id: 4,
      title: "Seguridad para Eventos",
      description: "Protección integral para eventos corporativos, conciertos y celebraciones privadas.",
      icon: <Users className="h-12 w-12 text-gold" />,
      category: "fisico",
      image: "/placeholder.jpg",
      features: [
        "Control de accesos con tecnología avanzada",
        "Personal uniformado y de civil",
        "Coordinación con autoridades locales",
        "Evaluación previa de riesgos"
      ]
    },
    {
      id: 5,
      title: "Sistemas de Alarma Inteligentes",
      description: "Alarmas conectadas a nuestro centro de monitoreo con verificación de incidentes.",
      icon: <Bell className="h-12 w-12 text-gold" />,
      category: "tecnologico",
      image: "/placeholder.jpg",
      features: [
        "Sensores de movimiento de última generación",
        "Integración con sistemas domóticos",
        "Respuesta inmediata ante activaciones",
        "Mantenimiento preventivo incluido"
      ]
    },
    {
      id: 6,
      title: "Ciberseguridad Empresarial",
      description: "Protección integral de sus activos digitales y prevención de ataques informáticos.",
      icon: <Lock className="h-12 w-12 text-gold" />,
      category: "tecnologico",
      image: "/placeholder.jpg",
      features: [
        "Auditorías de seguridad informática",
        "Protección contra ransomware y malware",
        "Capacitación a empleados",
        "Monitoreo continuo de amenazas"
      ]
    },
    {
      id: 7,
      title: "Auditorías de Riesgo",
      description: "Evaluación exhaustiva de vulnerabilidades en sus instalaciones y procesos.",
      icon: <Shield className="h-12 w-12 text-gold" />,
      category: "consultoria",
      image: "/placeholder.jpg",
      features: [
        "Identificación de puntos críticos",
        "Recomendaciones personalizadas",
        "Informes detallados con nivel de riesgo",
        "Seguimiento de implementación"
      ]
    },
    {
      id: 8,
      title: "Planes de Emergencia",
      description: "Desarrollo e implementación de protocolos de actuación ante situaciones de crisis.",
      icon: <Shield className="h-12 w-12 text-gold" />,
      category: "consultoria",
      image: "/placeholder.jpg",
      features: [
        "Protocolos personalizados según tipo de negocio",
        "Simulacros y capacitación al personal",
        "Coordinación con servicios de emergencia",
        "Actualización periódica de procedimientos"
      ]
    }
  ]

  const filteredServices = activeCategory === "todos" 
    ? services 
    : services.filter(service => service.category === activeCategory)

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-servileon-black">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/placeholder.jpg" 
            alt="Servicios de Seguridad" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Nuestros <span className="text-gold">Servicios</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Soluciones integrales de seguridad adaptadas a las necesidades específicas de cada cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-sm transition-colors duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gold text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <FadeInOnScroll key={service.id} delay={index * 0.1}>
                <div className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-sm overflow-hidden group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Link 
                        href={`/servicios/${service.id}`}
                        className="bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-sm text-sm font-medium inline-flex items-center"
                      >
                        Ver detalles
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        {service.icon}
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-servileon-black">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {service.features.slice(0, 2).map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-gold mr-2">✓</span>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-servileon-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Necesitas algo <span className="text-gold">específico</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Contáctanos para diseñar una solución de seguridad personalizada para tu negocio o residencia.
            </p>
            <button 
              onClick={() => setShowContactForm(true)}
              className="bg-gold hover:bg-gold-dark text-white px-8 py-4 rounded-sm font-medium text-lg uppercase tracking-wider transition-colors duration-300 inline-flex items-center"
            >
              Solicitar Información
              <MessageSquare className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Popup */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-8 relative animate-fade-in rounded-sm">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 text-gold mx-auto mb-2" />
              <h3 className="font-playfair text-2xl font-bold text-servileon-black">Solicitud de Información</h3>
              <p className="text-gray-600 mt-2">Cuéntanos sobre tus necesidades de seguridad</p>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="Tu nombre completo" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="Tu correo electrónico" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone"
                  placeholder="Tu número de teléfono" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold"
                  required
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Servicio de interés</label>
                <select 
                  id="service"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold"
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>{service.title}</option>
                  ))}
                  <option value="otro">Otro (especificar)</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea 
                  id="message"
                  rows={4}
                  placeholder="Describe tus necesidades específicas" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-servileon-black hover:bg-gray-800 text-white px-4 py-3 transition-colors duration-300 font-medium"
              >
                Enviar Solicitud
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Al enviar este formulario, aceptas nuestros Términos y Condiciones y Política de Privacidad.
            </p>
          </div>
        </div>
      )}
    </MainLayout>
  )
} 