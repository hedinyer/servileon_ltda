"use client"

import React, { useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
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
        "Bucaramanga: Carrera 2 #20-50",
        "Paseo del puente 2- Piedecuesta, Santander",
        "Bogotá: Calle 151 bis #115-81"
      ]
    },
    {
      icon: <Phone className="h-6 w-6 text-gold" />,
      title: "Teléfonos",
      details: [
        "+57 311 326 0689"
      ]
    },
    {
      icon: <Mail className="h-6 w-6 text-gold" />,
      title: "Correo Electrónico",
      details: [
        "neider.leon@servileon.com"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-gold" />,
      title: "Horario de Atención",
      details: [
        "Lunes a Viernes: 8:00 AM - 6:00 PM",
        "Sábados: 9:00 AM - 1:00 PM"
      ]
    }
  ]

  const faqs = [
    {
      question: "¿Cuál es el tiempo de respuesta ante una emergencia?",
      answer: "Nuestro tiempo de respuesta promedio es de 10-15 minutos en zonas urbanas. Contamos con personal estratégicamente ubicado y sistemas de despacho optimizados para garantizar la respuesta más rápida posible."
    },
    {
      question: "¿Ofrecen servicios personalizados para necesidades específicas?",
      answer: "Sí, realizamos una evaluación detallada de sus necesidades de portería, vigilancia y control y diseñamos un plan a medida. Nuestros consultores trabajarán con usted para desarrollar la solución más adecuada para su situación particular."
    },
    {
      question: "¿Cuáles son los requisitos para contratar servicios de vigilancia?",
      answer: "Para contratar nuestros servicios, necesitamos realizar una evaluación inicial de riesgos de su propiedad o negocio. Luego, formalizamos el contrato especificando el alcance del servicio, personal asignado, horarios y condiciones específicas."
    },
    {
      question: "¿Cómo se selecciona y capacita al personal de vigilancia?",
      answer: "Nuestro personal pasa por un riguroso proceso de selección que incluye verificación de antecedentes, pruebas psicotécnicas y entrevistas. Posteriormente, reciben capacitación continua en protocolos de portería, vigilancia y control, manejo de crisis, primeros auxilios y servicio al cliente."
    }
  ]

  const offices = [
    {
      city: "Bucaramanga",
      address: "Carrera 2 #20-50, Paseo del puente 2- Piedecuesta, Santander",
      phone: "+57 311 326 0689",
      image: "/placeholder.jpg"
    },
    {
      city: "Bogotá",
      address: "Calle 151 bis #115-81",
      phone: "+57 311 326 0689",
      image: "/placeholder.jpg"
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
            <p className="text-white text-xl mb-8 leading-relaxed">
              Estamos aquí para responder a todas sus consultas sobre portería, vigilancia y control.
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
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Múltiples formas de comunicarse con nosotros para su comodidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <div className="bg-white border border-gray-100 shadow-lg rounded-sm overflow-hidden group h-[320px] flex flex-col transition-all duration-300 hover:shadow-xl hover:border-gold transform hover:-translate-y-1 relative">
                  {/* Cabecera con color de fondo */}
                  <div className="bg-servileon-black/5 py-8 px-4 border-b border-gray-100 text-center relative">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-4 border-2 border-gray-50">
                      {React.cloneElement(info.icon, { className: "h-8 w-8 text-gold" })}
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-servileon-black">
                      {info.title}
                    </h3>
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  {/* Contenido */}
                  <div className="p-6 flex-grow flex flex-col justify-center text-center">
                    <div className="space-y-3">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 py-1">
                          {detail}
                        </p>
                      ))}
                    </div>
                    {/* Añadir botón de acción para algunas tarjetas */}
                    {info.title === "Teléfonos" && (
                      <a 
                        href={`tel:${info.details[0].replace(/\s+/g, '')}`}
                        className="mt-4 inline-flex items-center justify-center text-gold hover:text-gold-dark font-medium transition-colors duration-300"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Llamar ahora
                      </a>
                    )}
                    {info.title === "Correo Electrónico" && (
                      <a 
                        href={`mailto:${info.details[0]}`}
                        className="mt-4 inline-flex items-center justify-center text-gold hover:text-gold-dark font-medium transition-colors duration-300"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Enviar correo
                      </a>
                    )}
                  </div>
                  {/* Borde inferior dorado que aparece en hover */}
                  <div className="h-1 w-full bg-transparent group-hover:bg-gold transition-all duration-300"></div>
                  {/* Decorative elements */}
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map - Improved layout and form styling */}
      <section id="contactForm" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form - Now spans 3 columns for better prominence */}
            <FadeInOnScroll className="lg:col-span-3">
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
                          <option value="">Seleccione un asunto</option>
                          <option value="cotizacion">Solicitud de Cotización</option>
                          <option value="informacion">Información General</option>
                          <option value="servicio">Servicio al Cliente</option>
                          <option value="emergencia">Emergencia</option>
                          <option value="otro">Otro</option>
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

            {/* Map - Now spans 2 columns */}
            <FadeInOnScroll delay={0.2} className="lg:col-span-2">
              <div className="h-full flex flex-col">
                <div className="bg-white shadow-2xl rounded-sm p-6 mb-6 border-t-4 border-gold">
                  <h3 className="font-playfair text-xl font-bold text-servileon-black mb-4">
                    Nuestra Ubicación
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Encuentre nuestras oficinas principales en Bucaramanga y Bogotá.
                  </p>
                </div>
                <div className="flex-grow bg-white shadow-2xl rounded-sm overflow-hidden">
                  <div className="h-full w-full bg-gray-200 relative">
                    {/* This would be replaced with an actual map component */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <p className="text-gray-500 text-center">
                        Aquí se mostraría un mapa interactivo con la ubicación de SERVILEON LTDA.<br />
                        (Implementar con Google Maps, Mapbox u otra API de mapas)
                      </p>
                    </div>
                  </div>
                </div>
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
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visite nuestras oficinas en las principales ciudades de Colombia para conocer más sobre nuestros servicios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {offices.map((office, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <div className="bg-white border border-gray-100 shadow-xl rounded-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                      src={office.image} 
                      alt={`Oficina ${office.city}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
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
            <p className="text-gray-600 max-w-2xl mx-auto">
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
                    <p className="p-6 text-gray-600">
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
            <p className="text-gray-600 mb-6">
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