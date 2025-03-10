"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Users, Eye, Bell, Lock, ChevronRight, MessageSquare, Flower } from "lucide-react"
import MainLayout from "../components/MainLayout"
import FadeInOnScroll from "../components/FadeInOnScroll"
import { useSearchParams } from "next/navigation"
import CotizacionCalculator from "../components/CotizacionCalculator"

// Definir interfaces para los tipos
interface Pricing {
  valorSinIva: string;
  iva: string;
  valorTotal: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  image: string;
  features: string[];
  pricing?: Pricing;
}

// Componente principal envuelto en Suspense
function ServiciosContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || "todos")
  const [showContactForm, setShowContactForm] = useState(false)
  
  // Actualizar la categoría activa cuando cambia el parámetro de URL
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "aseo", name: "Aseo y Limpieza" },
    { id: "porteria", name: "Portería" },
    { id: "jardineria", name: "Jardinería" },
  ]

  const services: Service[] = [
    {
      id: 1,
      title: "Aseo y Limpieza Ocho (8) Horas",
      description: "Servicio de aseo y limpieza profesional para mantener sus instalaciones impecables.",
      icon: <Shield className="h-12 w-12 text-gold" />,
      category: "aseo",
      image: "/placeholder.jpg",
      features: [
        "Servicio de lunes a sábado",
        "Personal con equipo de protección personal",
        "Productos de limpieza de alta calidad",
        "Guantes y equipo de protección personal (EPP)"
      ],
      pricing: {
        valorSinIva: "3,550,000.00",
        iva: "67,450.00",
        valorTotal: "3,617,450.00"
      }
    },
    {
      id: 2,
      title: "Portería Modalidad 2x2x2",
      description: "Servicio de portería 24 horas con personal capacitado y equipado para garantizar la seguridad.",
      icon: <Users className="h-12 w-12 text-gold" />,
      category: "porteria",
      image: "/placeholder.jpg",
      features: [
        "Servicio 24 horas todos los días del mes",
        "Comunicación con central 24 horas",
        "Tonfa, con su respectiva porta tonfa",
        "Demás elementos necesarios para la prestación del servicio"
      ],
      pricing: {
        valorSinIva: "9,669,200.00",
        iva: "183,714.00",
        valorTotal: "9,852,914.00"
      }
    },
    {
      id: 3,
      title: "Portería Modalidad 3x3",
      description: "Servicio de portería 24 horas con modalidad 3x3 para mayor eficiencia y seguridad.",
      icon: <Users className="h-12 w-12 text-gold" />,
      category: "porteria",
      image: "/placeholder.jpg",
      features: [
        "Servicio 24 horas todos los días del mes",
        "Comunicación con central 24 horas",
        "Tonfa, con su respectiva porta tonfa",
        "Demás elementos necesarios para la prestación del servicio"
      ],
      pricing: {
        valorSinIva: "7,950,000.00",
        iva: "151,050.00",
        valorTotal: "8,101,050.00"
      }
    },
    {
      id: 4,
      title: "Jardinería Ocho (8) Horas",
      description: "Servicio profesional de jardinería para mantener sus espacios verdes en óptimas condiciones.",
      icon: <Flower className="h-12 w-12 text-gold" />,
      category: "jardineria",
      image: "/placeholder.jpg",
      features: [
        "Servicio de jardinería patio (8) horas",
        "Lunes a sábado todos los días del mes",
        "Guantes y equipo de protección personal (EPP)",
        "Herramientas y equipos especializados"
      ],
      pricing: {
        valorSinIva: "3,550,000.00",
        iva: "67,450.00",
        valorTotal: "3,617,450.00"
      }
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
              Soluciones integrales de aseo, limpieza y portería adaptadas a las necesidades específicas de cada cliente.
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
          <div className="overflow-x-auto pb-4">
            <div className="flex flex-nowrap gap-6 min-w-max">
              {filteredServices.map((service, index) => (
                <FadeInOnScroll key={service.id} delay={index * 0.1}>
                  <div className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-sm overflow-hidden group w-80">
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
                      
                      {/* Mostrar información de precios si está disponible */}
                      {service.pricing && (
                        <div className="mt-4 p-3 bg-gold/5 rounded-md border border-gold/20">
                          <p className="text-sm font-medium text-servileon-black mb-1">Precio:</p>
                          <p className="text-lg font-bold text-gold">${service.pricing.valorTotal}</p>
                          <p className="text-xs text-gray-500">IVA incluido</p>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
          
          {/* Controles de navegación */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-servileon-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Necesitas algo <span className="text-gold">específico</span>?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
                Utiliza nuestra calculadora para obtener una cotización estimada o contáctanos para diseñar una solución de aseo, limpieza o portería personalizada para tu negocio o residencia.
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-3/4">
                <CotizacionCalculator 
                  className="transform transition-all duration-500 hover:shadow-2xl" 
                  onRequestQuote={() => setShowContactForm(true)}
                />
              </div>
              
              <div className="w-full lg:w-1/4 bg-white/10 p-6 rounded-md">
                <h3 className="font-playfair text-2xl font-bold text-white mb-6">
                  ¿Necesitas ayuda?
                </h3>
                <p className="text-gray-300 mb-6">
                  Nuestro equipo está listo para ayudarte a encontrar la solución perfecta para tus necesidades específicas.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-gray-300">
                    <span className="text-gold mr-2">✓</span>
                    <span>Asesoría personalizada</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <span className="text-gold mr-2">✓</span>
                    <span>Soluciones a medida</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <span className="text-gold mr-2">✓</span>
                    <span>Presupuestos detallados</span>
                  </li>
                </ul>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="bg-gold hover:bg-gold-dark text-white px-8 py-4 rounded-sm font-medium text-lg uppercase tracking-wider transition-colors duration-300 inline-flex items-center w-full justify-center"
                >
                  Solicitar Información
                  <MessageSquare className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
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
              <h3 className="font-playfair text-2xl font-bold text-servileon-black">Solicitud de Cotización</h3>
              <p className="text-gray-600 mt-2">Cuéntanos sobre tus necesidades específicas</p>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="Tu nombre completo" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="Tu correo electrónico" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone"
                  placeholder="Tu número de teléfono" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-sm"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="vigilantes" className="block text-sm font-medium text-gray-700 mb-1">Vigilantes</label>
                  <input 
                    type="number" 
                    id="vigilantes"
                    min="0"
                    placeholder="Cantidad" 
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-sm"
                  />
                </div>
                <div>
                  <label htmlFor="aseadoras" className="block text-sm font-medium text-gray-700 mb-1">Aseadoras</label>
                  <input 
                    type="number" 
                    id="aseadoras"
                    min="0"
                    placeholder="Cantidad" 
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-sm"
                  />
                </div>
                <div>
                  <label htmlFor="jardineros" className="block text-sm font-medium text-gray-700 mb-1">Jardineros (8h)</label>
                  <input 
                    type="number" 
                    id="jardineros"
                    min="0"
                    placeholder="Cantidad" 
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="estrato" className="block text-sm font-medium text-gray-700 mb-1">Estrato</label>
                <select 
                  id="estrato"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-sm"
                >
                  <option value="">Selecciona el estrato</option>
                  {[1, 2, 3, 4, 5, 6].map(e => (
                    <option key={e} value={e}>Estrato {e}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje o requerimientos adicionales</label>
                <textarea 
                  id="message"
                  rows={4}
                  placeholder="Describe tus necesidades específicas" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-sm"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold-dark text-white px-4 py-3 transition-colors duration-300 font-medium rounded-sm"
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

// Componente de exportación que envuelve el contenido en Suspense
export default function ServiciosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ServiciosContent />
    </Suspense>
  )
} 