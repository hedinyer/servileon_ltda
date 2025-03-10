"use client"

import Image from "next/image"
import Link from "next/link"
import { Shield, ChevronRight, Play, Pause, Star, Users, Award, Clock, Lock, Eye, Bell, Cpu, X, ArrowRight, Check, Menu, Phone } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import PageTransition from "./components/PageTransition"
import MainLayout from "./components/MainLayout"
import FadeInOnScroll from './components/FadeInOnScroll'
import dynamic from 'next/dynamic'

// Importar componentes 3D con carga dinámica para evitar errores de SSR
const AnimatedBackground = dynamic(() => import('./components/3d/AnimatedBackground'), { ssr: false })
const AnimatedLogo = dynamic(() => import('./components/3d/AnimatedLogo'), { ssr: false })
const ServiceCard3D = dynamic(() => import('./components/3d/ServiceCard3D'), { ssr: false })
const ParticlesBackground = dynamic(() => import('./components/3d/ParticlesBackground'), { ssr: false })

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const services = [
    {
      icon: <Shield className="h-12 w-12 text-gold" />,
      title: "Vigilancia Armada",
      description: "Personal altamente capacitado y certificado para la protección de sus instalaciones y activos.",
      link: "/servicios/vigilancia-armada"
    },
    {
      icon: <Users className="h-12 w-12 text-gold" />,
      title: "Protección Ejecutiva",
      description: "Escoltas profesionales para la seguridad de ejecutivos y personalidades VIP.",
      link: "/servicios/proteccion-ejecutiva"
    },
    {
      icon: <Eye className="h-12 w-12 text-gold" />,
      title: "Monitoreo 24/7",
      description: "Sistemas de vigilancia con inteligencia artificial y monitoreo constante.",
      link: "/servicios/monitoreo"
    },
    {
      icon: <Lock className="h-12 w-12 text-gold" />,
      title: "Seguridad Electrónica",
      description: "Instalación y mantenimiento de sistemas de alarmas, CCTV y control de acceso.",
      link: "/servicios/seguridad-electronica"
    }
  ]

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      position: "Director de Seguridad, Grupo Empresarial XYZ",
      image: "/testimonial1.jpg",
      content: "Servileon ha transformado nuestra seguridad corporativa. Su personal es altamente profesional y su tecnología de vanguardia nos brinda tranquilidad total."
    },
    {
      name: "María González",
      position: "Gerente General, Hotel Platinum",
      image: "/testimonial2.jpg",
      content: "Desde que contratamos a Servileon, nuestros huéspedes se sienten más seguros y hemos reducido los incidentes de seguridad en un 95%. Servicio excepcional."
    },
    {
      name: "Javier Méndez",
      position: "CEO, Corporación Industrial del Norte",
      image: "/testimonial3.jpg",
      content: "La capacidad de respuesta y profesionalismo de Servileon es incomparable. Han diseñado un sistema de seguridad integral que protege perfectamente nuestras instalaciones."
    }
  ]

  const stats = [
    { value: "15+", label: "Años de experiencia" },
    { value: "500+", label: "Clientes satisfechos" },
    { value: "1000+", label: "Guardias certificados" },
    { value: "24/7", label: "Monitoreo continuo" }
  ]

  return (
    <PageTransition>
    <MainLayout>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          {/* Background Video with 3D overlay */}
          <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
              className="object-cover w-full h-full brightness-[0.3]"
          >
            <source src="/security-video.mp4" type="video/mp4" />
          </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10"></div>
            
            {/* 3D Background Animation */}
            <div className="absolute inset-0 z-5 opacity-40 pointer-events-none">
              <AnimatedBackground />
            </div>
          </div>
          
          {/* Video Controls */}
          <button 
            onClick={toggleVideo}
            className="absolute bottom-8 right-8 z-20 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            {isVideoPlaying ? (
              <Pause className="h-6 w-6 text-white" />
            ) : (
              <Play className="h-6 w-6 text-white" />
            )}
          </button>
        
        {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-playfair mb-6">
                <span className="block">Seguridad de</span>
                <span className="bg-clip-text text-transparent bg-gold-gradient bg-gradient-size animate-gradient-slow">
                  Clase Mundial
                </span>
            </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl">
                Protegemos lo que más valora con soluciones de seguridad personalizadas, tecnología avanzada y personal altamente capacitado.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contacto" className="px-8 py-4 bg-gold hover:bg-gold-dark text-servileon-black font-semibold rounded-md transition-all duration-300 flex items-center gap-2 group">
                  Solicitar Consulta
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/servicios" className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-md transition-all duration-300">
                  Nuestros Servicios
                </Link>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-bounce">
            <span className="text-white/60 text-sm mb-2">Scroll</span>
            <ChevronRight className="h-6 w-6 text-white/60 rotate-90" />
        </div>
      </section>

        {/* Stats Section */}
        <section className="py-16 bg-servileon-black">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <h3 className="text-4xl md:text-5xl font-bold text-gold mb-2">{stat.value}</h3>
                    <p className="text-white/70">{stat.label}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

        {/* Services Section */}
        <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-playfair mb-4">Nuestros Servicios</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                  Ofrecemos soluciones integrales de seguridad adaptadas a las necesidades específicas de cada cliente.
              </p>
            </div>
          </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <ServiceCard3D
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    link={service.link}
                    delay={index * 0.1}
                  />
                </FadeInOnScroll>
              ))}
          </div>
        </div>
      </section>

        {/* About Section */}
        <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeInOnScroll>
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/20 rounded-lg z-0"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 rounded-lg z-0"></div>
                  <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl h-[400px]">
                    {/* 3D Logo Animation */}
                    <AnimatedLogo />
                  </div>
            </div>
          </FadeInOnScroll>
              
              <FadeInOnScroll delay={0.2}>
                <div>
                  <h2 className="text-4xl font-bold font-playfair mb-6">Quiénes Somos</h2>
                  <p className="text-gray-600 mb-6">
                    Con más de 15 años de experiencia, Servileon se ha consolidado como líder en el sector de seguridad privada, ofreciendo soluciones integrales que combinan personal altamente capacitado, tecnología de vanguardia y protocolos de seguridad rigurosos.
                  </p>
                  <p className="text-gray-600 mb-8">
                    Nuestra misión es proporcionar tranquilidad a nuestros clientes a través de servicios de seguridad confiables, eficientes y personalizados que se adaptan a sus necesidades específicas.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      "Personal certificado",
                      "Tecnología avanzada",
                      "Respuesta inmediata",
                      "Cobertura nacional"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="bg-gold/20 p-1 rounded-full">
                          <Check className="h-5 w-5 text-gold" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/about" className="px-8 py-4 bg-servileon-black hover:bg-gray-800 text-white font-semibold rounded-md transition-all duration-300 inline-flex items-center gap-2 group">
                    Conocer más
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-servileon-black">
          <div className="container mx-auto px-4">
            <FadeInOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-playfair text-white mb-4">Lo Que Dicen Nuestros Clientes</h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  La confianza de nuestros clientes es nuestro mayor activo. Conozca sus experiencias con nuestros servicios.
                </p>
              </div>
            </FadeInOnScroll>
            
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-lg">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                          <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                            <Image 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              width={96} 
                              height={96}
                              className="w-full h-full object-cover"
                            />
                </div>
                          <div>
                            <div className="flex mb-4">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 text-gold fill-gold" />
                              ))}
              </div>
                            <p className="text-white/90 text-lg italic mb-6">"{testimonial.content}"</p>
                            <h4 className="text-white font-bold text-xl">{testimonial.name}</h4>
                            <p className="text-white/70">{testimonial.position}</p>
                </div>
              </div>
                </div>
              </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? 'bg-gold w-8' : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Ver testimonio ${index + 1}`}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="py-24 bg-gold-gradient bg-gradient-size animate-gradient-slow relative overflow-hidden">
          {/* 3D Particles Background */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <ParticlesBackground primaryColor="#FFFFFF" secondaryColor="#B8860B" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-servileon-black mb-6">
                Proteja lo que más valora
              </h2>
              <p className="text-servileon-black/80 text-xl mb-8">
                Contáctenos hoy para una consulta gratuita y descubra cómo podemos ayudarle a mejorar su seguridad.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contacto" className="px-8 py-4 bg-servileon-black hover:bg-gray-800 text-white font-semibold rounded-md transition-all duration-300 flex items-center gap-2 group">
                  Solicitar Consulta
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+123456789" className="px-8 py-4 bg-white/20 hover:bg-white/30 text-servileon-black font-semibold rounded-md transition-all duration-300 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Llamar Ahora
                </a>
              </div>
            </div>
        </div>
      </section>

        {/* Popup */}
      {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsPopupOpen(false)}></div>
            <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-8 animate-fade-in">
            <button 
              onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="text-center mb-6">
                <div className="bg-gold/20 p-3 rounded-full w-fit mx-auto mb-4">
                  <Bell className="h-8 w-8 text-gold" />
            </div>
                <h3 className="text-2xl font-bold mb-2">¿Necesita mejorar su seguridad?</h3>
                <p className="text-gray-600">
                  Regístrese para recibir una evaluación gratuita de seguridad para su hogar o negocio.
                </p>
            </div>
            <form className="space-y-4">
                <div>
              <input 
                type="text" 
                    placeholder="Nombre completo" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
                </div>
                <div>
              <input 
                type="email" 
                placeholder="Correo electrónico" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
                </div>
                <div>
              <input 
                type="tel" 
                placeholder="Teléfono" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
                </div>
              <button 
                type="submit" 
                  className="w-full py-3 bg-gold hover:bg-gold-dark text-servileon-black font-semibold rounded-md transition-all duration-300"
              >
                  Solicitar Evaluación Gratuita
              </button>
            </form>
            </div>
        </div>
      )}
    </MainLayout>
    </PageTransition>
  )
}

