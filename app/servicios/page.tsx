"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
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
  pricing?: {
    precioBase: string;
    aiu: string;
    iva: string;
    valorTotal: string;
  };
  color?: string;
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
    { id: "porteria", name: "Portería" },
    { id: "aseo", name: "Aseo y Limpieza" },
    { id: "jardineria", name: "Jardinería" },
    { id: "camaras", name: "Cámaras de Seguridad" }
  ]

  const services: Service[] = [
    // SERVICIOS DE PORTERÍA
    {
      id: 1,
      title: "Servicio de Portería 24 Horas",
      description: "Servicio de portería 24 horas con personal capacitado y equipado para garantizar la seguridad.",
      icon: <LucideIcons.Shield className="h-12 w-12 text-gold" />,
      category: "porteria",
      image: "/portada.jpeg",
      features: [
        "Servicio 24 horas todos los días del mes",
        "Comunicación con central 24 horas",
        "Tonfa, con su respectiva porta tonfa",
        "Demás elementos necesarios para la prestación del servicio"
      ],
      pricing: {
        precioBase: "7,800,000.00",
        aiu: "151,050.00",
        iva: "780,000.00",
        valorTotal: "8,731,050.00"
      },
      color: "bg-blue-50 border-blue-200"
    },
    {
      id: 2,
      title: "Servicio de Portería 24 Horas Premium",
      description: "Servicio de portería 24 horas premium con personal altamente capacitado y equipamiento avanzado.",
      icon: <LucideIcons.Shield className="h-12 w-12 text-gold" />,
      category: "porteria",
      image: "/portada.jpeg",
      features: [
        "Servicio 24 horas todos los días del mes",
        "Personal con capacitación avanzada",
        "Equipamiento de seguridad premium",
        "Comunicación con central 24 horas"
      ],
      pricing: {
        precioBase: "8,500,000.00",
        aiu: "161,500.00",
        iva: "850,000.00",
        valorTotal: "9,511,500.00"
      },
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      id: 3,
      title: "Servicio de Portería 12 Horas",
      description: "Servicio de portería 12 horas con personal capacitado para garantizar la seguridad durante el día o la noche.",
      icon: <LucideIcons.Clock className="h-12 w-12 text-gold" />,
      category: "porteria",
      image: "/portada.jpeg",
      features: [
        "Servicio 12 horas todos los días del mes",
        "Comunicación con central 24 horas",
        "Tonfa, con su respectiva porta tonfa",
        "Demás elementos necesarios para la prestación del servicio"
      ],
      pricing: {
        precioBase: "4,500,000.00",
        aiu: "85,500.00",
        iva: "450,000.00",
        valorTotal: "5,035,500.00"
      },
      color: "bg-green-50 border-green-200"
    },
    {
      id: 4,
      title: "Servicio de Portería 8 Horas",
      description: "Servicio de portería 8 horas ideal para horarios específicos de mayor afluencia o actividad.",
      icon: <LucideIcons.Clock className="h-12 w-12 text-gold" />,
      category: "porteria",
      image: "/portada.jpeg",
      features: [
        "Servicio 8 horas todos los días del mes",
        "Comunicación con central 24 horas",
        "Tonfa, con su respectiva porta tonfa",
        "Demás elementos necesarios para la prestación del servicio"
      ],
      pricing: {
        precioBase: "3,350,000.00",
        aiu: "63,650.00",
        iva: "335,000.00",
        valorTotal: "3,748,650.00"
      },
      color: "bg-orange-50 border-orange-200"
    },
    {
      id: 5,
      title: "Portería Modalidad 2x2x2",
      description: "Servicio de portería 24 horas con modalidad 2x2x2 para mayor eficiencia y seguridad.",
      icon: <LucideIcons.Users className="h-12 w-12 text-gold" />,
      category: "porteria",
      image: "/portada.jpeg",
      features: [
        "Servicio 24 horas todos los días del mes",
        "Comunicación con central 24 horas",
        "Tonfa, con su respectiva porta tonfa",
        "Demás elementos necesarios para la prestación del servicio"
      ],
      pricing: {
        precioBase: "9,669,200.00",
        aiu: "183,714.00",
        iva: "966,920.00",
        valorTotal: "10,819,834.00"
      },
      color: "bg-gray-50 border-gray-200"
    },
    // SECCIÓN DE ASEO (PRÓXIMAMENTE)
    {
      id: 6,
      title: "Aseo y Limpieza - Próximamente",
      description: "Servicios profesionales de aseo y limpieza para mantener sus instalaciones impecables.",
      icon: <LucideIcons.Shield className="h-12 w-12 text-gold" />,
      category: "aseo",
      image: "/portada.jpeg",
      features: [
        "Servicio de lunes a sábado",
        "Personal con equipo de protección personal",
        "Productos de limpieza de alta calidad",
        "Guantes y equipo de protección personal (EPP)"
      ],
      color: "bg-yellow-50 border-yellow-200"
    },
    // SECCIÓN DE JARDINERÍA (PRÓXIMAMENTE)
    {
      id: 7,
      title: "Jardinería - Próximamente",
      description: "Servicio profesional de jardinería para mantener sus espacios verdes en óptimas condiciones.",
      icon: <LucideIcons.Flower className="h-12 w-12 text-gold" />,
      category: "jardineria",
      image: "/portada.jpeg",
      features: [
        "Servicio de jardinería profesional",
        "Personal capacitado y con experiencia",
        "Guantes y equipo de protección personal (EPP)",
        "Herramientas y equipos especializados"
      ],
      color: "bg-emerald-50 border-emerald-200"
    },
    // SECCIÓN DE CÁMARAS DE SEGURIDAD
    {
      id: 8,
      title: "Instalación y Monitoreo de Cámaras de Seguridad",
      description: "Servicio profesional de instalación, configuración y monitoreo de sistemas de videovigilancia para su hogar o negocio.",
      icon: <LucideIcons.Camera className="h-12 w-12 text-gold" />,
      category: "camaras",
      image: "/portada.jpeg",
      features: [
        "Cámaras de alta definición",
        "Monitoreo 24/7",
        "Almacenamiento en la nube",
        "Acceso remoto desde dispositivos móviles"
      ],
      pricing: {
        precioBase: "5,200,000.00",
        aiu: "98,800.00",
        iva: "520,000.00",
        valorTotal: "5,818,800.00"
      },
      color: "bg-purple-50 border-purple-200"
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
            src="/portada.jpeg" 
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
            <p className="text-gray-300 text-lg mb-8 text-justify">
              Soluciones integrales de portería, aseo, jardinería y sistemas de videovigilancia adaptadas a las necesidades específicas de cada cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-playfair text-2xl font-bold text-servileon-black mb-6">Nuestras Categorías de Servicios</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-8 py-3 rounded-md shadow-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-white text-servileon-black border-b-2 border-gold shadow-md transform -translate-y-1'
                    : 'bg-white text-gray-700 hover:shadow-md hover:transform hover:-translate-y-1'
                } flex items-center justify-center min-w-[140px]`}
              >
                {category.id === "todos" && <LucideIcons.Eye className="h-4 w-4 mr-2" />}
                {category.id === "porteria" && <LucideIcons.Shield className="h-4 w-4 mr-2" />}
                {category.id === "aseo" && <LucideIcons.Users className="h-4 w-4 mr-2" />}
                {category.id === "jardineria" && <LucideIcons.Flower className="h-4 w-4 mr-2" />}
                {category.id === "camaras" && <LucideIcons.Camera className="h-4 w-4 mr-2" />}
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-playfair text-3xl font-bold text-servileon-black mb-10">
            {activeCategory === "todos" ? "Todos Nuestros Servicios" : 
             activeCategory === "porteria" ? "Servicios de Portería" :
             activeCategory === "aseo" ? "Servicios de Aseo y Limpieza" : 
             activeCategory === "jardineria" ? "Servicios de Jardinería" :
             "Servicios de Cámaras de Seguridad"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <FadeInOnScroll key={service.id} delay={index * 0.1}>
                <div className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden group h-full transform hover:-translate-y-1">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {service.pricing && (
                      <div className="absolute bottom-4 left-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <Link 
                          href={`/servicios/${service.id}`}
                          className="bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-md text-sm font-medium inline-flex items-center"
                        >
                          Ver detalles
                          <LucideIcons.ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                        service.category === "porteria" ? "bg-blue-100 text-blue-800" :
                        service.category === "aseo" ? "bg-yellow-100 text-yellow-800" :
                        "bg-emerald-100 text-emerald-800"
                      }`}>
                        {service.category === "porteria" ? "Portería" :
                         service.category === "aseo" ? "Aseo" : "Jardinería"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 p-2 rounded-full bg-gray-50">
                        {service.icon}
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-servileon-black">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4 text-justify">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {service.features.slice(0, 2).map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-gold mr-2">✓</span>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Mostrar información de precios si está disponible */}
                    {service.pricing && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-700">Precio Base:</span>
                            <span className="font-medium text-servileon-black">${service.pricing.precioBase}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-700">AIU:</span>
                            <span className="font-medium text-servileon-black">${service.pricing.aiu}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-700">IVA (10%):</span>
                            <span className="font-medium text-servileon-black">${service.pricing.iva}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-300">
                            <span className="text-sm font-medium text-servileon-black">Total:</span>
                            <span className="font-bold text-gold">${service.pricing.valorTotal}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 italic">*Precios sujetos a cambios. AIU e IVA aplican según normativa vigente.</p>
                      </div>
                    )}
                    
                    {!service.pricing && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                        <p className="text-sm font-medium text-servileon-black">Próximamente</p>
                        <p className="text-xs text-gray-600 mt-1">Estamos trabajando en estos servicios</p>
                      </div>
                    )}
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
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 mb-4">
                <LucideIcons.Calculator className="h-10 w-10 text-gold" />
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Necesitas algo <span className="text-gold">específico</span>?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto text-justify">
                Utiliza nuestra calculadora para obtener una cotización estimada o contáctanos para diseñar una solución de portería personalizada para tu negocio o residencia.
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-3/4">
                <CotizacionCalculator 
                  className="transform transition-all duration-500 hover:shadow-2xl" 
                  onRequestQuote={() => setShowContactForm(true)}
                />
              </div>
              
              <div className="w-full lg:w-1/4 bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
                <h3 className="font-playfair text-2xl font-bold text-white mb-6">
                  ¿Necesitas ayuda?
                </h3>
                <p className="text-gray-300 mb-6">
                  Nuestro equipo está listo para ayudarte a encontrar la solución perfecta para tus necesidades específicas.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-gray-300">
                    <span className="text-gold mr-2 flex-shrink-0">✓</span>
                    <span>Asesoría personalizada</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <span className="text-gold mr-2 flex-shrink-0">✓</span>
                    <span>Soluciones a medida</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <span className="text-gold mr-2 flex-shrink-0">✓</span>
                    <span>Presupuestos detallados</span>
                  </li>
                </ul>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="bg-gold hover:bg-gold-dark text-white px-8 py-4 rounded-md font-medium text-lg uppercase tracking-wider transition-all duration-300 inline-flex items-center w-full justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Solicitar Información
                  <LucideIcons.MessageSquare className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Popup */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-8 relative animate-fade-in rounded-lg shadow-2xl">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-6">
              <div className="bg-servileon-black inline-flex items-center justify-center p-3 rounded-full mb-3">
                <LucideIcons.Shield className="h-10 w-10 text-gold" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-servileon-black">Solicitud de Cotización</h3>
              <p className="text-gray-700 mt-2">Cuéntanos sobre tus necesidades específicas</p>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-servileon-black mb-1">Nombre</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="Tu nombre completo" 
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gold rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-servileon-black mb-1">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="Tu correo electrónico" 
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gold rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-servileon-black mb-1">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone"
                  placeholder="Tu número de teléfono" 
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gold rounded-md shadow-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="servicio" className="block text-sm font-medium text-servileon-black mb-1">Tipo de Servicio</label>
                <select 
                  id="servicio"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gold rounded-md shadow-sm"
                >
                  <option value="">Selecciona el tipo de servicio</option>
                  <option value="24h">Servicio 24 horas</option>
                  <option value="24h-premium">Servicio 24 horas Premium</option>
                  <option value="12h">Servicio 12 horas</option>
                  <option value="8h">Servicio 8 horas</option>
                  <option value="2x2x2">Servicio 2x2x2</option>
                  <option value="otro">Otro (especificar)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-servileon-black mb-1">Mensaje o requerimientos adicionales</label>
                <textarea 
                  id="message"
                  rows={4}
                  placeholder="Describe tus necesidades específicas" 
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gold rounded-md shadow-sm"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold-dark text-white px-4 py-3 transition-all duration-300 font-medium rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Enviar Solicitud
              </button>
            </form>
            <p className="text-xs text-gray-600 mt-4 text-center">
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