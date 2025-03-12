"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
// Importar solo los iconos que se usan en la parte inicial de la página
import { Shield, ArrowRight, Phone } from "lucide-react"
// Importar el resto de iconos de forma dinámica
const Users = dynamic(() => import("lucide-react").then(mod => mod.Users), { ssr: false })
const Star = dynamic(() => import("lucide-react").then(mod => mod.Star), { ssr: false })
const Award = dynamic(() => import("lucide-react").then(mod => mod.Award), { ssr: false })
const Clock = dynamic(() => import("lucide-react").then(mod => mod.Clock), { ssr: false })
const Lock = dynamic(() => import("lucide-react").then(mod => mod.Lock), { ssr: false })
const Eye = dynamic(() => import("lucide-react").then(mod => mod.Eye), { ssr: false })
const Bell = dynamic(() => import("lucide-react").then(mod => mod.Bell), { ssr: false })
const Cpu = dynamic(() => import("lucide-react").then(mod => mod.Cpu), { ssr: false })
const X = dynamic(() => import("lucide-react").then(mod => mod.X), { ssr: false })
const Check = dynamic(() => import("lucide-react").then(mod => mod.Check), { ssr: false })
const Menu = dynamic(() => import("lucide-react").then(mod => mod.Menu), { ssr: false })
const MessageSquare = dynamic(() => import("lucide-react").then(mod => mod.MessageSquare), { ssr: false })
const ChevronRight = dynamic(() => import("lucide-react").then(mod => mod.ChevronRight), { ssr: false })
const Sparkles = dynamic(() => import("lucide-react").then(mod => mod.Sparkles), { ssr: false })

import { useState, useRef, useEffect, lazy, Suspense } from "react"
import PageTransition from "./components/PageTransition"
import MainLayout from "./components/MainLayout"
import FadeInOnScroll from './components/FadeInOnScroll'
// Cargar componentes 3D de forma dinámica
const SecurityBackground = dynamic(() => import('./components/3d/SecurityBackground'), { ssr: false })
const FloatingParticles = dynamic(() => import('./components/3d/FloatingParticles'), { ssr: false })
const ServiceCard3D = dynamic(() => import('./components/3d/ServiceCard3D'), { ssr: false })
// Importar componentes regulares
import InteractiveScroll from './components/InteractiveScroll'
import InteractiveCard from './components/InteractiveCard'
import AnimatedButton from './components/AnimatedButton'
import AnimatedCounter from './components/AnimatedCounter'
import ParallaxSection from './components/ParallaxSection'
import { motion } from 'framer-motion'

// Configuración para reducir la carga de animaciones
const motionConfig = {
  transition: { 
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1]
  },
  viewport: { 
    once: true, 
    margin: "0px 0px -100px 0px" 
  }
}

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Cargar datos de forma diferida
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false)
  const [isStatsVisible, setIsStatsVisible] = useState(false)
  
  useEffect(() => {
    // Función para verificar si un elemento está en el viewport
    const checkVisibility = () => {
      const testimonialsSection = document.getElementById('testimonials-section')
      const statsSection = document.getElementById('stats-section')
      
      if (testimonialsSection) {
        const rect = testimonialsSection.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsTestimonialsVisible(true)
        }
      }
      
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsStatsVisible(true)
        }
      }
    }
    
    // Verificar visibilidad inicial
    checkVisibility()
    
    // Agregar event listener para scroll
    window.addEventListener('scroll', checkVisibility)
    
    // Limpiar event listener
    return () => window.removeEventListener('scroll', checkVisibility)
  }, [])
  
  const services = [
    {
      id: 1,
      icon: <Shield className="h-12 w-12 text-gold" />,
      title: "Aseo y Limpieza",
      description: "Personal capacitado y productos de alta calidad para mantener sus instalaciones impecables.",
      link: "/servicios/1",
      image: "/portada.jpeg",
      features: ["Servicio personalizado", "Personal capacitado", "Productos premium"]
    },
    {
      id: 2,
      icon: <Users className="h-12 w-12 text-gold" />,
      title: "Portería 2x2x2",
      description: "Servicio de portería 24 horas con personal capacitado y equipado para garantizar la vigilancia y control.",
      link: "/servicios/2",
      image: "/portada.jpeg",
      features: ["Cobertura 24/7", "Personal certificado", "Equipamiento completo"]
    },
    {
      id: 3,
      icon: <Users className="h-12 w-12 text-gold" />,
      title: "Portería 3x3",
      description: "Servicio de portería 24 horas con modalidad 3x3 para mayor eficiencia y control.",
      link: "/servicios/3",
      image: "/portada.jpeg",
      features: ["Rotación optimizada", "Mayor eficiencia", "Vigilancia reforzada"]
    },
    {
      id: 4,
      icon: <Eye className="h-12 w-12 text-gold" />,
      title: "Servicios Personalizados",
      description: "Soluciones adaptadas a las necesidades específicas de cada cliente.",
      link: "/servicios",
      image: "/portada.jpeg",
      features: ["Consultoría gratuita", "Planes a medida", "Atención prioritaria"]
    }
  ]

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      position: "Director de Portería, Grupo Empresarial XYZ",
      image: "/portada.jpeg",
      content: "Servileon ha transformado nuestra portería y vigilancia corporativa. Su personal es altamente profesional y su tecnología de vanguardia nos brinda tranquilidad total."
    },
    {
      name: "María González",
      position: "Gerente General, Hotel Platinum",
      image: "/portada.jpeg",
      content: "Desde que contratamos a Servileon, nuestros huéspedes se sienten más seguros y hemos reducido los incidentes de control en un 95%. Servicio excepcional."
    },
    {
      name: "Javier Méndez",
      position: "CEO, Corporación Industrial del Norte",
      image: "/portada.jpeg",
      content: "La capacidad de respuesta y profesionalismo de Servileon es incomparable. Han diseñado un sistema de portería y vigilancia integral que protege perfectamente nuestras instalaciones."
    }
  ]

  const stats = [
    { value: "8+", label: "Años de experiencia" },
    { value: "50+", label: "Clientes satisfechos" },
    { value: "100+", label: "Guardias certificados" },
    { value: "24/7", label: "Monitoreo continuo" }
  ]

  return (
    <PageTransition>
    <MainLayout>
        {/* Fondo 3D */}
        <Suspense fallback={<div className="fixed inset-0 -z-10 bg-black"></div>}>
          <SecurityBackground className="opacity-30" />
        </Suspense>
        
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/portada.jpeg" 
              alt="Portada Servileon" 
              fill
              priority
              className="object-cover w-full h-full brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-10"></div>
          </div>
          
          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-playfair mb-6">
                  <span className="block">Portería y Vigilancia de</span>
                  <span className="bg-clip-text text-transparent bg-gold-gradient bg-gradient-size animate-gradient-slow">
                    Clase Mundial
                  </span>
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-xl text-white/80 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Protegemos lo que más valora con soluciones de portería, vigilancia y control personalizadas, tecnología avanzada y personal altamente capacitado.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <AnimatedButton 
                  href="/contacto" 
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                >
                  Solicitar Consulta
                </AnimatedButton>
                
                <AnimatedButton 
                  href="/servicios" 
                  variant="ghost"
                  size="lg"
                >
                  Nuestros Servicios
                </AnimatedButton>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <InteractiveScroll />
      </section>

        {/* Stats Section */}
        <section id="stats-section" className="py-16 bg-servileon-black relative overflow-hidden">
          {/* Partículas flotantes */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            {isStatsVisible && (
              <Suspense fallback={null}>
                <FloatingParticles particleCount={50} />
              </Suspense>
            )}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <AnimatedCounter
                      end={parseInt(stat.value.replace(/\D/g, ''))}
                      suffix={stat.value.includes('+') ? '+' : stat.value.includes('/') ? '/7' : ''}
                      className="text-4xl md:text-5xl font-bold text-gold mb-2"
                      duration={2.5}
                      delay={index * 0.2}
                    />
                    <p className="text-white/70">{stat.label}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

        {/* Services Section */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
          <ParallaxSection speed={0.2} direction="up" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <Image 
                src="/leon_logo.png" 
                alt="Background Logo" 
                fill
                className="object-contain"
              />
            </div>
          </ParallaxSection>
          
          <div className="container mx-auto px-4 relative z-10">
            <FadeInOnScroll>
              <div className="text-center mb-16">
                <div className="inline-block mb-3">
                  <div className="h-1 w-20 bg-gold mx-auto"></div>
                  <p className="text-gold font-medium mt-2">SOLUCIONES PROFESIONALES</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-black">Nuestros Servicios</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Ofrecemos soluciones integrales de aseo, limpieza y portería para empresas, conjuntos residenciales y oficinas.
                </p>
              </div>
            </FadeInOnScroll>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* Servicio 1: Aseo y Limpieza */}
              <FadeInOnScroll delay={0.1}>
                <ServiceCard3D 
                  icon={<Sparkles className="h-6 w-6 text-gold" />}
                  title="Aseo y Limpieza"
                  description="Servicio profesional de aseo y limpieza para mantener sus instalaciones impecables, con personal capacitado y productos de alta calidad."
                  link="/servicios/1"
                  delay={0.1}
                />
              </FadeInOnScroll>
              
              {/* Servicio 2: Portería 2x2x2 */}
              <FadeInOnScroll delay={0.2}>
                <ServiceCard3D 
                  icon={<Shield className="h-6 w-6 text-gold" />}
                  title="Portería 2x2x2"
                  description="Servicio de portería 24 horas con personal capacitado y equipado para garantizar la vigilancia y control de sus instalaciones."
                  link="/servicios/2"
                  delay={0.2}
                />
              </FadeInOnScroll>
              
              {/* Servicio 3: Portería 3x3 */}
              <FadeInOnScroll delay={0.3}>
                <ServiceCard3D 
                  icon={<Users className="h-6 w-6 text-gold" />}
                  title="Portería 3x3"
                  description="Servicio de portería 24 horas con modalidad 3x3 para mayor eficiencia y control, con personal altamente capacitado."
                  link="/servicios/3"
                  delay={0.3}
                />
              </FadeInOnScroll>
            </div>
            
            <div className="text-center mt-12">
              <Link href="/servicios" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-medium py-3 px-6 rounded-md transition-colors duration-300">
                Ver todos los servicios
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 bg-gray-50 relative overflow-hidden">
          <ParallaxSection speed={0.1} direction="down" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
              <Image 
                src="/leon_logo.png" 
                alt="Background Logo" 
                fill
                className="object-contain"
              />
            </div>
          </ParallaxSection>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeInOnScroll>
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/20 rounded-lg z-0"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 rounded-lg z-0"></div>
                  <InteractiveCard className="relative z-10 rounded-lg overflow-hidden shadow-2xl h-[400px] p-0">
                    <div className="h-full w-full">
                      <Image 
                        src="/portada.jpeg" 
                        alt="Servileon Logo" 
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                        loading="eager"
                      />
                    </div>
                  </InteractiveCard>
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={0.2}>
                <div>
                  <h2 className="text-4xl font-bold font-playfair mb-6 text-black">Quiénes Somos</h2>
                  <p className="text-gray-600 mb-6">
                    Con más de 15 años de experiencia, Servileon se ha consolidado como líder en el sector de portería, vigilancia y control, ofreciendo soluciones integrales que combinan personal altamente capacitado, tecnología de vanguardia y protocolos de vigilancia rigurosos.
                  </p>
                  <p className="text-gray-600 mb-8">
                    Nuestra misión es proporcionar tranquilidad a nuestros clientes a través de servicios de portería, vigilancia y control confiables, eficientes y personalizados que se adaptan a sus necesidades específicas.
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
                  
                  <AnimatedButton 
                    href="/nosotros" 
                    variant="outline"
                    size="md"
                    icon={<ArrowRight className="h-5 w-5" />}
                  >
                    Ver más información
                  </AnimatedButton>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* 3D Shield Section */}
        <section className="py-24 bg-servileon-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <FloatingParticles particleCount={30} color="#FFDF00" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeInOnScroll>
                <div className="flex justify-center">
                  <InteractiveCard className="relative z-10 rounded-lg overflow-hidden shadow-2xl h-[400px] w-[400px] p-0">
                    <div className="h-full w-full">
                      <Image 
                        src="/portada.jpeg" 
                        alt="Portería y Vigilancia Profesional" 
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                        loading="eager"
                      />
                    </div>
                  </InteractiveCard>
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={0.2}>
                <div>
                  <h2 className="text-4xl font-bold font-playfair text-white mb-6">Protección de Clase Mundial</h2>
                  <p className="text-white/70 mb-6">
                    En Servileon, entendemos que la portería y vigilancia no es solo un servicio, es una promesa. Nuestro compromiso es proteger lo que más valora con soluciones de portería, vigilancia y control de vanguardia.
                  </p>
                  <p className="text-white/70 mb-8">
                    Combinamos tecnología avanzada, personal altamente capacitado y protocolos rigurosos para ofrecer un escudo de protección impenetrable para su hogar, negocio o evento.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {[
                      { icon: <Lock className="h-6 w-6 text-gold" />, text: "Vigilancia 24/7" },
                      { icon: <Eye className="h-6 w-6 text-gold" />, text: "Monitoreo avanzado" },
                      { icon: <Bell className="h-6 w-6 text-gold" />, text: "Respuesta inmediata" },
                      { icon: <Cpu className="h-6 w-6 text-gold" />, text: "Tecnología de punta" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                        {item.icon}
                        <span className="text-white/90 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials-section" className="py-24 bg-servileon-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-servileon-black to-gray-900"></div>
          
          <div className="container mx-auto px-4 relative z-10">
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
                <motion.div 
                  className="flex transition-all duration-500 ease-in-out"
                  animate={{ x: `-${activeTestimonial * 100}%` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <InteractiveCard className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-lg border-0">
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
                      </InteractiveCard>
                    </div>
                  ))}
                </motion.div>
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
          <ParallaxSection speed={0.2} direction="up" className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-10">
              <FloatingParticles particleCount={20} color="#FFFFFF" />
            </div>
          </ParallaxSection>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-servileon-black mb-6">
                Servicios profesionales de calidad
              </h2>
              <p className="text-servileon-black/80 text-xl mb-8">
                Contáctenos hoy para una consulta gratuita y descubra cómo podemos ayudarle con sus necesidades de aseo, limpieza y portería.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 max-w-xl mx-auto">
                <AnimatedButton 
                  href="/contacto" 
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                  fullWidth={true}
                  className="w-full sm:w-auto"
                >
                  Solicitar Consulta
                </AnimatedButton>
                
                <AnimatedButton 
                  href="/servicios" 
                  variant="ghost"
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                  glowColor="rgba(0, 0, 0, 0.2)"
                  fullWidth={true}
                  className="w-full sm:w-auto"
                >
                  Ver Servicios
                </AnimatedButton>
                
                <AnimatedButton 
                  href="tel:+573113260689" 
                  variant="ghost"
                  size="lg"
                  icon={<Phone className="h-5 w-5" />}
                  glowColor="rgba(0, 0, 0, 0.2)"
                  fullWidth={true}
                  className="w-full sm:w-auto"
                >
                  Llamar Ahora
                </AnimatedButton>
              </div>
            </div>
          </div>
        </section>
    </MainLayout>
    </PageTransition>
  )
}

