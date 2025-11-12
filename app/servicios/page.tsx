"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import MainLayout from "../components/MainLayout"
import FadeInOnScroll from "../components/FadeInOnScroll"
import { useSearchParams } from "next/navigation"

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
    { id: "recurso_humano", name: "Recurso Humano" },
    { id: "aseo", name: "Aseo y Limpieza" },
    { id: "jardineria", name: "Jardinería" },
    { id: "camaras", name: "Cámaras de Seguridad" },
    { id: "mantenimiento", name: "Mantenimiento" }
  ]

  const services: Service[] = [
    // SERVICIOS DE RECURSO HUMANO
    {
      id: 1,
      title: "Servicio de Recurso Humano 24 Horas 3x3",
      description: "Servicio de recurso humano 24 horas con personal capacitado y equipado para garantizar la seguridad.",
      icon: <LucideIcons.Shield className="h-12 w-12 text-gold" />,
      category: "recurso_humano",
      image: "/portero6.jpeg",
      features: [
        "Servicio 24 horas todos los días del mes",
        "Comunicación con central 24 horas",
        "Tonfa, con su respectiva porta tonfa",
        "Demás elementos necesarios para la prestación del servicio"
      ],
      pricing: {
        precioBase: "7,000,000.00",
        aiu : "700,000.00",
        iva: "133,000.00",
        valorTotal: "7,833,000.00"
      },
      color: "bg-blue-50 border-blue-200"
    },
    {
      id: 2,
      title: "Servicio de Recurso Humano 24 Horas 2x2x2",
      description: "Servicio de recurso humano 24 horas 2x2x2 con personal altamente capacitado y equipamiento avanzado.",
      icon: <LucideIcons.Shield className="h-12 w-12 text-gold" />,
      category: "recurso_humano",
      image: "/vigilantes.jpg",
      features: [
        "Servicio 24 horas todos los días del mes",
        "Personal con capacitación avanzada",
        "Equipamiento de seguridad premium",
        "Comunicación con central 24 horas"
      ],
      pricing: {
        precioBase: "8,800,000.00",
        aiu: "880,000.00",
        iva: "167,200.00",
        valorTotal: "9,847,200.00"
      },
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      id: 3,
      title: "Servicio de Recurso Humano y control 12 Horas",
      description: "Servicio de recurso humano y control 12 horas con personal capacitado para garantizar la seguridad durante el día.",
      icon: <LucideIcons.Clock className="h-12 w-12 text-gold" />,
      category: "recurso_humano",
      image: "/portero7.jpeg",
      features: [
        "Servicio 12 horas todos los días del mes",
        "Comunicación con central 24 horas",
        "Tonfa, con su respectiva porta tonfa",
        "Demás elementos necesarios para la prestación del servicio"
      ],
      pricing: {
        precioBase: "4,500,000.00",
        aiu: "450,000.00",
        iva: "85,500.00",
        valorTotal: "5,035,500.00"
      },
      color: "bg-green-50 border-green-200"
    },
    {
      id: 4,
      title: "Servicio de Recurso Humano 8 Horas",
      description: "Servicio de recurso humano 8 horas ideal para horarios específicos de mayor afluencia o actividad.",
      icon: <LucideIcons.Clock className="h-12 w-12 text-gold" />,
      category: "recurso_humano",
      image: "/portero8.jpeg",
      features: [
        "Servicio 8 horas todos los días del mes",
        "Comunicación con central 24 horas",
        "Tonfa, con su respectiva porta tonfa",
        "Demás elementos necesarios para la prestación del servicio"
      ],
      pricing: {
        precioBase: "3,350,000.00",
        aiu: "335,000.00",
        iva: "63,650.00",
        valorTotal: "3,748,650.00"
      },
      color: "bg-orange-50 border-orange-200"
    },
    
    // SECCIÓN DE ASEO (PRÓXIMAMENTE)
    {
      id: 5,
      title: "Aseo y Limpieza",
      description: "Servicio profesionales de aseo y limpieza ocho (8) horas permanentes de lunes a sábado, con sus implementos de protección reglamentarios.",
      icon: <LucideIcons.Shield className="h-12 w-12 text-gold" />,
      category: "aseo",
      image: "/aseadora2.jpg",
      features: [
        "Servicio de lunes a sábado",
        "Personal con equipo de protección personal",
        "Productos de limpieza de alta calidad",
        "Guantes y equipo de protección personal (EPP)"
      ],
      pricing: {
        precioBase: "3,350,000.00",
        aiu: "335,000.00",
        iva: "63,650.00",
        valorTotal: "3,748,650.00"
      },
      color: "bg-yellow-50 border-yellow-200"
    },
    // SECCIÓN DE JARDINERÍA (PRÓXIMAMENTE)
    {
      id: 6,
      title: "Jardinería",
      description: "Servicio profesional de jardinería (8) horas para mantener sus espacios verdes en óptimas condiciones.",
      icon: <LucideIcons.Flower className="h-12 w-12 text-gold" />,
      category: "jardineria",
      image: "/jardinero1.jpg",
      features: [
        "Servicio de lunes a sabado",
        "Personal capacitado y con experiencia",
        "Guantes y equipo de protección personal (EPP)",
        "Herramientas y equipos especializados"
      ],
      pricing: {
        precioBase: "3,450,000.00",
        aiu: "345,000.00",
        iva: "65,550.00",
        valorTotal: "3,860,550.00"
      },
      color: "bg-emerald-50 border-emerald-200"
    },
    // SECCIÓN DE CÁMARAS DE SEGURIDAD
    {
      id: 7,
      title: "Servicio de Instalación y Monitoreo de Cámaras de Seguridad",
      description: "Servicio profesional de instalación, configuración y monitoreo de sistemas de monitoreo para su hogar o negocio.",
      icon: <LucideIcons.Camera className="h-12 w-12 text-gold" />,
      category: "camaras",
      image: "/cameras.jpg",
      features: [
        "Cámaras de alta definición",
        "Monitoreo 24/7",
        "Almacenamiento en la nube",
        "Acceso remoto desde dispositivos móviles"
      ],
      
      color: "bg-purple-50 border-purple-200"
    },
    // SECCIÓN DE MANTENIMIENTO DE PLANTA FÍSICA
    {
      id: 8,
      title: "Mantenimiento de Planta Física U/o todero",
      description: "Servicio integral de mantenimiento de planta física con personal especializado y herramientas profesionales para garantizar el óptimo funcionamiento de sus instalaciones.",
      icon: <LucideIcons.Wrench className="h-12 w-12 text-gold" />,
      category: "mantenimiento",
      image: "/todero.jpg",
      features: [
        "Mantenimiento preventivo y correctivo",
        "Personal especializado y certificado",
        "Herramientas y equipos profesionales",
        "Atención rápida y eficiente"
      ],
      color: "bg-slate-50 border-slate-200"
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
              Soluciones integrales de recurso humano, aseo, jardinería y sistemas de monitoreo adaptadas a las necesidades específicas de cada cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-playfair text-2xl font-bold text-servileon-black mb-6">Nuestras Categorías de Servicios</h2>
          <div className="flex flex-nowrap justify-center gap-3 overflow-x-auto overflow-y-visible pt-2 pb-2 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 border-2 flex items-center justify-center whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-gold text-white border-gold transform -translate-y-1 scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gold hover:transform hover:-translate-y-1 hover:bg-gray-50'
                }`}
              >
                {category.id === "todos" && <LucideIcons.Eye className="h-5 w-5 mr-2" />}
                {category.id === "recurso_humano" && <LucideIcons.Shield className="h-5 w-5 mr-2" />}
                {category.id === "aseo" && <LucideIcons.Users className="h-5 w-5 mr-2" />}
                {category.id === "jardineria" && <LucideIcons.Flower className="h-5 w-5 mr-2" />}
                {category.id === "camaras" && <LucideIcons.Camera className="h-5 w-5 mr-2" />}
                {category.id === "mantenimiento" && <LucideIcons.Wrench className="h-5 w-5 mr-2" />}
                <span className="font-semibold text-sm">{category.name}</span>
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
             activeCategory === "recurso_humano" ? "Servicios de Recurso Humano" :
             activeCategory === "aseo" ? "Servicios de Aseo y Limpieza" : 
             activeCategory === "jardineria" ? "Servicios de Jardinería" :
             activeCategory === "camaras" ? "Servicios de Cámaras de Seguridad" :
             "Servicios de Mantenimiento"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <FadeInOnScroll key={service.id} delay={index * 0.1}>
                <div className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden group h-full flex flex-col transform hover:-translate-y-1">
                  <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ objectPosition: 'center 20%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                        service.category === "recurso_humano" ? "bg-blue-100 text-blue-800" :
                        service.category === "aseo" ? "bg-yellow-100 text-yellow-800" :
                        service.category === "camaras" ? "bg-purple-100 text-purple-800" :
                        service.category === "mantenimiento" ? "bg-slate-100 text-slate-800" :
                        "bg-emerald-100 text-emerald-800"
                      }`}>
                        {service.category === "recurso_humano" ? "Recurso Humano" :
                         service.category === "aseo" ? "Aseo" : 
                         service.category === "camaras" ? "Cámaras" :
                         service.category === "mantenimiento" ? "Mantenimiento" : "Jardinería"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 p-2 rounded-full bg-gray-50 flex-shrink-0">
                        {service.icon}
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-servileon-black">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-4 text-justify flex-grow">
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
                    
                    {/* Botón de WhatsApp para cotización */}
                    <div className="mt-auto">
                      <a
                        href={`https://wa.me/573113260689?text=Hola,%20me%20interesa%20cotizar%20el%20servicio:%20${encodeURIComponent(service.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Image 
                          src="/whatsapp.png" 
                          alt="WhatsApp" 
                          width={20} 
                          height={20}
                          className="w-5 h-5"
                        />
                        Cotiza aquí
                      </a>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
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