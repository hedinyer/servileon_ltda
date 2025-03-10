"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Users, Eye, Bell, Lock, ChevronRight, MessageSquare, ArrowLeft, Check, Phone, Mail, X } from "lucide-react"
import MainLayout from "../../components/MainLayout"
import FadeInOnScroll from "../../components/FadeInOnScroll"
import { useParams, useRouter } from "next/navigation"

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
  longDescription?: string;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulación de datos de servicios (en una aplicación real, esto vendría de una API)
  const services: Service[] = [
    {
      id: 1,
      title: "Aseo y Limpieza Ocho (8) Horas",
      description: "Servicio de aseo y limpieza profesional para mantener sus instalaciones impecables.",
      longDescription: "Nuestro servicio de aseo y limpieza profesional está diseñado para mantener sus instalaciones en condiciones óptimas. Contamos con personal altamente capacitado y utilizamos productos de limpieza de alta calidad para garantizar resultados excepcionales. El servicio se presta de lunes a sábado durante 8 horas diarias, adaptándose a las necesidades específicas de cada cliente.",
      icon: <Shield className="h-12 w-12 text-gold" />,
      category: "aseo",
      image: "/placeholder.jpg",
      features: [
        "Servicio de lunes a sábado",
        "Personal con equipo de protección personal",
        "Productos de limpieza de alta calidad",
        "Guantes y equipo de protección personal (EPP)",
        "Supervisión constante del servicio",
        "Reemplazo inmediato en caso de ausencia",
        "Capacitación continua del personal",
        "Adaptación a las necesidades del cliente"
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
      longDescription: "Nuestro servicio de portería en modalidad 2x2x2 ofrece cobertura las 24 horas del día, todos los días del mes. El personal está altamente capacitado y equipado con todos los elementos necesarios para garantizar la seguridad de sus instalaciones. Mantenemos comunicación constante con nuestra central para responder rápidamente ante cualquier eventualidad.",
      icon: <Users className="h-12 w-12 text-gold" />,
      category: "porteria",
      image: "/placeholder.jpg",
      features: [
        "Servicio 24 horas todos los días del mes",
        "Comunicación con central 24 horas",
        "Tonfa, con su respectiva porta tonfa",
        "Demás elementos necesarios para la prestación del servicio",
        "Personal capacitado y certificado",
        "Supervisión periódica del servicio",
        "Reportes diarios de novedades",
        "Protocolos de seguridad personalizados"
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
      longDescription: "El servicio de portería en modalidad 3x3 proporciona cobertura las 24 horas del día con un esquema de rotación optimizado que mejora la eficiencia y reduce la fatiga del personal. Esto se traduce en un servicio más alerta y efectivo. Nuestro personal está equipado con todos los elementos necesarios y mantiene comunicación constante con la central para garantizar una respuesta rápida ante cualquier situación.",
      icon: <Users className="h-12 w-12 text-gold" />,
      category: "porteria",
      image: "/placeholder.jpg",
      features: [
        "Servicio 24 horas todos los días del mes",
        "Comunicación con central 24 horas",
        "Tonfa, con su respectiva porta tonfa",
        "Demás elementos necesarios para la prestación del servicio",
        "Rotación optimizada del personal",
        "Mayor eficiencia en el servicio",
        "Menor fatiga del personal",
        "Mejor tiempo de respuesta"
      ],
      pricing: {
        valorSinIva: "7,950,000.00",
        iva: "151,050.00",
        valorTotal: "8,101,050.00"
      }
    }
  ];

  useEffect(() => {
    if (params.id) {
      const serviceId = parseInt(params.id as string);
      const foundService = services.find(s => s.id === serviceId);
      
      if (foundService) {
        setService(foundService);
      } else {
        // Redirigir a la página de servicios si no se encuentra el servicio
        router.push('/servicios');
      }
    }
    
    setLoading(false);
  }, [params.id, router]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
        </div>
      </MainLayout>
    );
  }

  if (!service) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Servicio no encontrado</h2>
            <Link href="/servicios" className="text-gold hover:underline">
              Volver a servicios
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-servileon-black">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src={service.image} 
            alt={service.title} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/servicios" 
              className="inline-flex items-center text-white/80 hover:text-gold mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a todos los servicios
            </Link>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              {service.title}
            </h1>
            <div className="flex items-center mb-6">
              <div className="bg-gold/90 p-2 rounded-full mr-3">
                {service.icon}
              </div>
              <span className="text-gold font-medium">
                {service.category === "aseo" ? "Aseo y Limpieza" : "Portería"}
              </span>
            </div>
            <p className="text-gray-300 text-lg">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <FadeInOnScroll>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                  <div className="relative h-64 w-full">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Descripción del Servicio</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.longDescription || service.description}
                    </p>
                    
                    <h3 className="text-xl font-bold mb-4">Características del Servicio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-gold/10 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <Check className="h-4 w-4 text-gold" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <button 
                        onClick={() => setShowContactForm(true)}
                        className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 inline-flex items-center"
                      >
                        Solicitar este servicio
                        <MessageSquare className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
              
              {/* Additional Information */}
              <FadeInOnScroll delay={0.2}>
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">¿Por qué elegir nuestro servicio?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-gold/10 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Personal altamente capacitado</h4>
                        <p className="text-gray-600">Nuestro equipo recibe capacitación continua para ofrecer un servicio de excelencia.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gold/10 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Supervisión constante</h4>
                        <p className="text-gray-600">Realizamos supervisiones periódicas para garantizar la calidad del servicio.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gold/10 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Adaptabilidad</h4>
                        <p className="text-gray-600">Nos adaptamos a las necesidades específicas de cada cliente para ofrecer un servicio personalizado.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </FadeInOnScroll>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FadeInOnScroll delay={0.3}>
                {/* Pricing Card */}
                {service.pricing && (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 sticky top-24">
                    <div className="bg-gold text-white p-6">
                      <h3 className="text-xl font-bold mb-1">Precio del Servicio</h3>
                      <p className="text-white/80">Inversión mensual para su tranquilidad</p>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                        <p className="text-gray-600">Valor sin IVA:</p>
                        <p className="text-gray-800 font-medium">${service.pricing.valorSinIva}</p>
                      </div>
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                        <p className="text-gray-600">IVA (19%):</p>
                        <p className="text-gray-800 font-medium">${service.pricing.iva}</p>
                      </div>
                      <div className="flex justify-between items-center mb-6">
                        <p className="text-xl font-bold text-gray-800">Total Mensual:</p>
                        <p className="text-2xl font-bold text-gold">${service.pricing.valorTotal}</p>
                      </div>
                      
                      <button 
                        onClick={() => setShowContactForm(true)}
                        className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded-md font-medium transition-colors duration-300 mb-4"
                      >
                        Solicitar Cotización
                      </button>
                      
                      <Link 
                        href="/servicios"
                        className="w-full block text-center border-2 border-gold text-gold hover:bg-gold/5 py-2.5 rounded-md font-medium transition-colors duration-300"
                      >
                        Ver otros servicios
                      </Link>
                      
                      <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">¿Necesitas un servicio personalizado?</p>
                        <Link 
                          href="/contacto"
                          className="text-gold hover:underline text-sm font-medium"
                        >
                          Contáctanos para una cotización a medida
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold mb-4">¿Tienes preguntas?</h3>
                  <p className="text-gray-600 mb-4">Nuestro equipo está listo para ayudarte con cualquier consulta sobre este servicio.</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="bg-gold/10 p-2 rounded-full mr-3">
                      <Phone className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Llámanos</p>
                      <p className="font-medium">+57 (123) 456-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gold/10 p-2 rounded-full mr-3">
                      <Mail className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Escríbenos</p>
                      <p className="font-medium">info@servileon.com</p>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Servicios Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services
              .filter(s => s.id !== service.id)
              .slice(0, 3)
              .map((relatedService, index) => (
                <FadeInOnScroll key={relatedService.id} delay={index * 0.1}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden group h-full flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image 
                        src={relatedService.image} 
                        alt={relatedService.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <h3 className="font-playfair text-lg font-bold text-white mb-1">
                          {relatedService.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <p className="text-gray-600 mb-4 flex-grow">
                        {relatedService.description}
                      </p>
                      
                      <Link 
                        href={`/servicios/${relatedService.id}`}
                        className="bg-white border-2 border-gold text-gold hover:bg-gold/5 py-2 px-4 rounded-md text-center font-medium transition-colors duration-300 inline-flex items-center justify-center"
                      >
                        Ver detalles
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
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
          <div className="bg-white max-w-md w-full p-8 relative animate-fade-in rounded-md">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-6">
              <div className="bg-gold/10 p-3 rounded-full inline-block mb-3">
                {service.icon}
              </div>
              <h3 className="font-playfair text-2xl font-bold text-servileon-black">Solicitar {service.title}</h3>
              <p className="text-gray-600 mt-2">Complete el formulario y nos pondremos en contacto a la brevedad</p>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="Tu nombre completo" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="Tu correo electrónico" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone"
                  placeholder="Tu número de teléfono" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea 
                  id="message"
                  rows={4}
                  placeholder="Describe tus necesidades específicas" 
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gold rounded-md"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded-md font-medium transition-colors duration-300"
              >
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
} 