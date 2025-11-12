"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronDown, ChevronUp, Users, Sparkles, Flower, Camera } from "lucide-react"
import MainLayout from "../components/MainLayout"
import FadeInOnScroll from "../components/FadeInOnScroll"

export default function ContactoPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: ""
  })
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally send the form data to your backend
    console.log("Form submitted:", formData)
    
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: ""
      })
    }, 1000)
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-gold" />,
      title: "Dirección",
      details: [
        {
          city: "Bucaramanga",
          address: "Carrera 2 #20-50",
          fullAddress: "Paseo del puente 2- Piedecuesta, Santander",
          link: "https://maps.google.com/?q=Carrera+2+%2320-50+Paseo+del+puente+2+Piedecuesta+Santander"
        },
        {
          city: "Bogotá",
          address: "Calle 151 bis #115-81",
          fullAddress: "",
          link: "https://maps.google.com/?q=Calle+151+bis+%23115-81+Bogotá"
        }
      ],
      type: "address"
    },
    {
      icon: <Phone className="h-6 w-6 text-gold" />,
      title: "Teléfonos",
      details: [
        {
          label: "+57 311 326 0689",
          link: "tel:+573113260689"
        }
      ],
      type: "phone",
      whatsapp: true
    },
    {
      icon: <Mail className="h-6 w-6 text-gold" />,
      title: "Correo Electrónico",
      details: [
        {
          label: "neider.leon@servileon.com",
          link: "mailto:neider.leon@servileon.com"
        }
      ],
      type: "email"
    },
    {
      icon: <Clock className="h-6 w-6 text-gold" />,
      title: "Horario de Atención",
      details: [
        "Lunes a Viernes: 8:00 AM - 5:00 PM",
        "Sábados: 9:00 AM - 1:00 PM"
      ],
      type: "schedule"
    }
  ]

  const faqs = [
    {
      question: "¿Cuál es el tiempo de respuesta ante una emergencia?",
      answer: "Nuestro tiempo de respuesta promedio es de 10-15 minutos en zonas urbanas. Contamos con personal estratégicamente ubicado y sistemas de despacho optimizados para garantizar la respuesta más rápida posible."
    },
    {
      question: "¿Ofrecen servicios personalizados para necesidades específicas?",
      answer: "Sí, realizamos una evaluación detallada de sus necesidades de recurso humano y control y diseñamos un plan a medida. Nuestros consultores trabajarán con usted para desarrollar la solución más adecuada para su situación particular."
    },
    {
      question: "¿Cuáles son los requisitos para contratar servicios de recurso humano?",
      answer: "Para contratar nuestros servicios, necesitamos realizar una evaluación inicial de riesgos de su propiedad o negocio. Luego, formalizamos el contrato especificando el alcance del servicio, personal asignado, horarios y condiciones específicas."
    },
    {
      question: "¿Cómo se selecciona y capacita al personal de recurso humano?",
      answer: "Nuestro personal pasa por un riguroso proceso de selección que incluye verificación de antecedentes, pruebas psicotécnicas y entrevistas. Posteriormente, reciben capacitación continua en protocolos de recurso humano y control, manejo de crisis, primeros auxilios y servicio al cliente."
    }
  ]

  const offices = [
    {
      city: "Bucaramanga",
      address: "Carrera 2 #20-50, Paseo del puente 2- Piedecuesta, Santander",
      phone: "+57 311 326 0689",
      lat: 6.9886,
      lon: -73.0503,
      mapUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${-73.0603}%2C${6.9786}%2C${-73.0403}%2C${6.9986}&layer=mapnik&marker=${6.9886}%2C${-73.0503}`
    },
    {
      city: "Bogotá",
      address: "Calle 151 bis #115-81",
      phone: "+57 311 326 0689",
      lat: 4.7110,
      lon: -74.0721,
      mapUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${-74.0821}%2C${4.7010}%2C${-74.0621}%2C${4.7210}&layer=mapnik&marker=${4.7110}%2C${-74.0721}`
    }
  ]

  return (
    <MainLayout>
      {/* Hero Section - Modernized with better overlay and typography */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-servileon-black">
        <div className="absolute inset-0 opacity-30">
          <Image 
            src="/portada.jpeg" 
            alt="Contacto" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-servileon-black/70 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              <span className="text-gold">Contacto</span>
            </h1>
            <p className="text-white text-xl mb-8 leading-relaxed text-justify">
              Estamos aquí para responder a todas sus consultas sobre recurso humano y control.
            </p>
            <a 
              href="#contactForm" 
              className="inline-block bg-gold hover:bg-gold-dark text-white px-8 py-4 rounded-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Contáctenos Ahora
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information - Improved cards with better spacing and hover effects */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-servileon-black mb-4">
              Información de <span className="text-gold">Contacto</span>
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg text-justify">
              Múltiples formas de comunicarse con nosotros para su comodidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <div className="bg-white border-2 border-gray-100 shadow-lg rounded-lg overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-gold hover:-translate-y-2 relative">
                  {/* Cabecera con gradiente */}
                  <div className="bg-gradient-to-br from-servileon-black/10 via-servileon-black/5 to-transparent py-6 px-5 border-b-2 border-gray-100 text-center relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full shadow-lg mb-3 border-2 border-gold/30 group-hover:border-gold group-hover:scale-110 transition-all duration-300">
                      {React.cloneElement(info.icon, { className: "h-7 w-7 text-gold" })}
                    </div>
                    <h3 className="font-playfair text-lg font-bold text-servileon-black group-hover:text-gold transition-colors duration-300">
                      {info.title}
                    </h3>
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6 flex-grow flex flex-col justify-center">
                    {info.type === "address" ? (
                      <div className="space-y-4">
                        {info.details.map((location: any, i: number) => (
                          <div key={i} className="text-left">
                            <div className="flex items-start mb-2">
                              <MapPin className="h-4 w-4 text-gold mr-2 mt-1 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="font-semibold text-servileon-black text-sm mb-1">
                                  {location.city}
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                  {location.address}
                                </p>
                                {location.fullAddress && (
                                  <p className="text-gray-500 text-xs mt-1">
                                    {location.fullAddress}
                                  </p>
                                )}
                              </div>
                            </div>
                            <a 
                              href={location.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gold hover:text-gold-dark font-medium inline-flex items-center mt-2 transition-colors duration-300"
                            >
                              Ver en mapa →
                            </a>
                            {i < info.details.length - 1 && (
                              <div className="border-t border-gray-100 mt-4 pt-4"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : info.type === "phone" ? (
                      <div className="text-center space-y-4">
                        <div className="space-y-2">
                          <p className="text-gray-500 text-sm font-medium">
                            Línea de atención
                          </p>
                          <a 
                            href={info.details[0].link}
                            className="text-2xl font-bold text-servileon-black hover:text-gold transition-colors duration-300 inline-block"
                          >
                            {info.details[0].label}
                          </a>
                          <p className="text-gray-400 text-xs mt-2">
                            Disponible 24/7 para emergencias
                          </p>
                        </div>
                        {info.whatsapp && (
                          <div className="space-y-2 pt-2">
                            <a 
                              href="https://wa.me/573113260689"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                              <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} className="mr-2" />
                              Chatear por WhatsApp
                            </a>
                            <p className="text-gray-400 text-xs">
                              Respuesta inmediata
                            </p>
                          </div>
                        )}
                      </div>
                    ) : info.type === "email" ? (
                      <div className="text-center space-y-4">
                        <div className="space-y-2">
                          <p className="text-gray-500 text-sm font-medium">
                            Escríbenos a
                          </p>
                          <a 
                            href={info.details[0].link}
                            className="text-gray-800 hover:text-gold transition-colors duration-300 break-all text-base font-semibold inline-block"
                          >
                            {info.details[0].label}
                          </a>
                          <p className="text-gray-400 text-xs mt-2">
                            Respondemos en menos de 24 horas
                          </p>
                        </div>
                        <div className="space-y-2 pt-2">
                          <a 
                            href={info.details[0].link}
                            className="inline-flex items-center justify-center w-full bg-servileon-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Enviar mensaje
                          </a>
                          <p className="text-gray-400 text-xs">
                            Abre tu cliente de correo
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 text-center">
                        <div className="space-y-3">
                          <p className="text-gray-500 text-sm font-medium mb-3">
                            Horarios de atención
                          </p>
                          <div className="space-y-3">
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                              <p className="text-xs text-gray-500 font-medium mb-1">
                                Días laborales
                              </p>
                              <p className="text-servileon-black font-semibold text-sm">
                                Lunes a Viernes
                              </p>
                              <p className="text-gray-600 text-sm mt-1">
                                8:00 AM - 5:00 PM
                              </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                              <p className="text-xs text-gray-500 font-medium mb-1">
                                Sábados
                              </p>
                              <p className="text-servileon-black font-semibold text-sm">
                                9:00 AM - 1:00 PM
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-400 text-xs pt-2 border-t border-gray-100">
                            Servicio de emergencias disponible 24/7
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Borde inferior dorado que aparece en hover */}
                  <div className="h-1 w-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-gold group-hover:to-transparent transition-all duration-300"></div>
                  
                  {/* Decorative corner elements */}
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Visual display of available services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-servileon-black mb-4">
              Nuestros <span className="text-gold">Servicios</span>
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-justify">
              Seleccione el servicio sobre el cual desea consultar o solicitar información.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Servicio 1: Recurso Humano 2x2x2 */}
            <FadeInOnScroll delay={0.1}>
              <Link href="/servicios?category=recurso_humano" className="block">
                <div className="bg-white border-2 border-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl hover:border-gold transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-gold/10 p-3 rounded-lg mr-4">
                      <Users className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-servileon-black">
                      Recurso Humano 2x2x2
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Suministro de personal capacitado y certificado con modalidad 2x2x2 para garantizar cobertura continua.
                  </p>
                </div>
              </Link>
            </FadeInOnScroll>

            {/* Servicio 2: Recurso Humano 3x3 */}
            <FadeInOnScroll delay={0.2}>
              <Link href="/servicios?category=recurso_humano" className="block">
                <div className="bg-white border-2 border-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl hover:border-gold transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-gold/10 p-3 rounded-lg mr-4">
                      <Users className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-servileon-black">
                      Recurso Humano 3x3
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Suministro de personal capacitado con modalidad 3x3 para mayor eficiencia y cobertura.
                  </p>
                </div>
              </Link>
            </FadeInOnScroll>

            {/* Servicio 3: Aseo y Limpieza */}
            <FadeInOnScroll delay={0.3}>
              <Link href="/servicios?category=aseo" className="block">
                <div className="bg-white border-2 border-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl hover:border-gold transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-gold/10 p-3 rounded-lg mr-4">
                      <Sparkles className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-servileon-black">
                      Aseo y Limpieza
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Servicio profesional de aseo y limpieza con personal capacitado y productos de alta calidad.
                  </p>
                </div>
              </Link>
            </FadeInOnScroll>

            {/* Servicio 4: Jardinería */}
            <FadeInOnScroll delay={0.4}>
              <Link href="/servicios?category=jardineria" className="block">
                <div className="bg-white border-2 border-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl hover:border-gold transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-gold/10 p-3 rounded-lg mr-4">
                      <Flower className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-servileon-black">
                      Jardinería
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Mantenimiento profesional de jardines y áreas verdes con personal especializado.
                  </p>
                </div>
              </Link>
            </FadeInOnScroll>

            {/* Servicio 5: Instalación y Monitoreo de Cámaras */}
            <FadeInOnScroll delay={0.5}>
              <Link href="/servicios?category=camaras" className="block">
                <div className="bg-white border-2 border-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl hover:border-gold transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-gold/10 p-3 rounded-lg mr-4">
                      <Camera className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-servileon-black">
                      Instalación y Monitoreo de Cámaras
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Instalación y monitoreo profesional de sistemas de seguridad con tecnología avanzada.
                  </p>
                </div>
              </Link>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Contact Form - Improved layout and form styling */}
      <section id="contactForm" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Contact Form */}
            <FadeInOnScroll>
              <div className="bg-white shadow-2xl rounded-sm p-10 border-t-4 border-gold">
                <h2 className="font-playfair text-3xl font-bold text-servileon-black mb-6">
                  Envíenos un <span className="text-gold">Mensaje</span>
                </h2>
                <div className="w-16 h-1 bg-gold mb-8"></div>
                <p className="text-gray-600 mb-8">
                  Complete el formulario a continuación y nos pondremos en contacto con usted a la brevedad.
                </p>

                {formSubmitted ? (
                  <div className="bg-green-50 border-l-4 border-green-500 rounded-sm p-8 text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-green-700 mb-4">¡Mensaje Enviado!</h3>
                    <p className="text-green-600 text-lg mb-6">
                      Gracias por contactarnos. Un representante se comunicará con usted pronto.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="mt-6 bg-servileon-black hover:bg-gray-800 text-white px-8 py-4 rounded-sm font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre Completo *
                        </label>
                        <input 
                          type="text" 
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                          required
                          placeholder="Su nombre completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Correo Electrónico *
                        </label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                          required
                          placeholder="ejemplo@correo.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <input 
                          type="tel" 
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                          placeholder="+57 300 000 0000"
                        />
                      </div>
                      <div>
                        <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-2">
                          Asunto *
                        </label>
                        <select 
                          id="asunto"
                          name="asunto"
                          value={formData.asunto}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300 bg-white"
                          required
                        >
                          <option value="">Seleccione un servicio o asunto</option>
                          <optgroup label="Servicios">
                            <option value="recurso_humano_2x2x2">Recurso Humano 2x2x2</option>
                            <option value="recurso_humano_3x3">Recurso Humano 3x3</option>
                            <option value="aseo_limpieza">Aseo y Limpieza</option>
                            <option value="jardineria">Jardinería</option>
                            <option value="instalacion_camaras">Instalación y Monitoreo de Cámaras</option>
                          </optgroup>
                          <optgroup label="Otros Asuntos">
                            <option value="cotizacion">Solicitud de Cotización</option>
                            <option value="informacion">Información General</option>
                            <option value="servicio">Servicio al Cliente</option>
                            <option value="emergencia">Emergencia</option>
                            <option value="otro">Otro</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje *
                      </label>
                      <textarea 
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                        required
                        placeholder="Escriba su mensaje aquí..."
                      ></textarea>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        className="h-5 w-5 text-gold focus:ring-gold border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="privacy" className="ml-3 block text-sm text-gray-700">
                        Acepto la <a href="/privacidad" className="text-gold hover:underline font-medium">Política de Privacidad</a> y el tratamiento de mis datos.
                      </label>
                    </div>
                    <button 
                      type="submit" 
                      className="bg-gold hover:bg-gold-dark text-white px-10 py-4 rounded-sm font-medium transition-all duration-300 inline-flex items-center transform hover:scale-105 hover:shadow-lg"
                    >
                      Enviar Mensaje
                      <Send className="ml-2 h-5 w-5" />
                    </button>
                  </form>
                )}
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Offices Section - Improved cards with better imagery and hover effects */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-servileon-black mb-4">
              Nuestras <span className="text-gold">Oficinas</span>
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-justify">
              Visite nuestras oficinas en las principales ciudades de Colombia para conocer más sobre nuestros servicios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {offices.map((office, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <div className="bg-white border border-gray-100 shadow-xl rounded-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-64 w-full overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src={office.mapUrl}
                      className="absolute inset-0"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full pointer-events-none">
                      <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                        {office.city}
                      </h3>
                      <div className="w-12 h-1 bg-gold mb-4 transition-all duration-500 group-hover:w-20"></div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="space-y-4 text-gray-600">
                      <p className="flex items-start">
                        <MapPin className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                        <span>{office.address}</span>
                      </p>
                      <p className="flex items-start">
                        <Phone className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                        <span>{office.phone}</span>
                      </p>
                      <a 
                        href={`https://maps.google.com/?q=${office.address}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-gold hover:text-gold-dark font-medium transition-colors duration-300"
                      >
                        Ver en Google Maps →
                      </a>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Improved with accordion style */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-servileon-black mb-4">
              Preguntas <span className="text-gold">Frecuentes</span>
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-justify">
              Respuestas a las consultas más comunes sobre nuestros servicios.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <div className="mb-4">
                  <button
                    onClick={() => toggleFaq(index)}
                    className={`w-full flex justify-between items-center p-6 text-left bg-white shadow-md rounded-sm transition-all duration-300 ${openFaqIndex === index ? 'border-l-4 border-gold' : ''}`}
                  >
                    <h3 className="font-playfair text-lg font-bold text-servileon-black pr-8">
                      {faq.question}
                    </h3>
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gold flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gold flex-shrink-0" />
                    )}
                  </button>
                  <div 
                    className={`bg-white shadow-md rounded-b-sm overflow-hidden transition-all duration-500 ${
                      openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="p-6 text-gray-600 text-justify">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-white shadow-lg rounded-sm max-w-2xl mx-auto border-t-4 border-gold">
            <h3 className="font-playfair text-xl font-bold text-servileon-black mb-4">
              ¿No encuentra respuesta a su pregunta?
            </h3>
            <p className="text-gray-600 mb-6 text-justify">
              Estamos aquí para ayudarle con cualquier consulta adicional que pueda tener.
            </p>
            <a 
              href="mailto:neider.leon@servileon.com" 
              className="inline-flex items-center bg-servileon-black hover:bg-gray-800 text-white px-8 py-3 rounded-sm font-medium transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contáctenos directamente
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  )
} 