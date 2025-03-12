"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
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

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-servileon-black">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/portada.jpeg" 
            alt="Contacto" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="text-gold">Contacto</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Estamos aquí para responder a todas sus consultas sobre portería, vigilancia y control.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <div className="bg-white border border-gray-100 shadow-lg p-6 rounded-sm text-center hover:border-gold transition-colors duration-300">
                  <div className="flex justify-center mb-4">
                    {info.icon}
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-servileon-black mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeInOnScroll>
              <div className="bg-white shadow-xl rounded-sm p-8">
                <h2 className="font-playfair text-3xl font-bold text-servileon-black mb-6">
                  Envíenos un <span className="text-gold">Mensaje</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Complete el formulario a continuación y nos pondremos en contacto con usted a la brevedad.
                </p>

                {formSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-sm p-6 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-700 mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-green-600">
                      Gracias por contactarnos. Un representante se comunicará con usted pronto.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="mt-6 bg-servileon-black hover:bg-gray-800 text-white px-6 py-3 rounded-sm font-medium transition-colors duration-300"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre Completo *
                        </label>
                        <input 
                          type="text" 
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gold"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Correo Electrónico *
                        </label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gold"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                          Teléfono
                        </label>
                        <input 
                          type="tel" 
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                          Asunto *
                        </label>
                        <select 
                          id="asunto"
                          name="asunto"
                          value={formData.asunto}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gold"
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
                      <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                        Mensaje *
                      </label>
                      <textarea 
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gold"
                        required
                      ></textarea>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                        Acepto la <a href="/privacidad" className="text-gold hover:underline">Política de Privacidad</a> y el tratamiento de mis datos.
                      </label>
                    </div>
                    <button 
                      type="submit" 
                      className="bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-sm font-medium transition-colors duration-300 inline-flex items-center"
                    >
                      Enviar Mensaje
                      <Send className="ml-2 h-5 w-5" />
                    </button>
                  </form>
                )}
              </div>
            </FadeInOnScroll>

            {/* Map */}
            <FadeInOnScroll delay={0.2}>
              <div className="h-full min-h-[400px] bg-white shadow-xl rounded-sm overflow-hidden">
                <div className="h-full w-full bg-gray-200 relative">
                  {/* This would be replaced with an actual map component */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500 text-center px-4">
                      Aquí se mostraría un mapa interactivo con la ubicación de SERVILEON LTDA.<br />
                      (Implementar con Google Maps, Mapbox u otra API de mapas)
                    </p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-servileon-black mb-4">
              Nuestras <span className="text-gold">Oficinas</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visite nuestras oficinas en las principales ciudades de Colombia para conocer más sobre nuestros servicios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
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
            ].map((office, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <div className="bg-white border border-gray-100 shadow-lg rounded-sm overflow-hidden group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={office.image} 
                      alt={`Oficina ${office.city}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-bold text-servileon-black mb-2">
                      {office.city}
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-start">
                        <MapPin className="h-5 w-5 text-gold mr-2 flex-shrink-0" />
                        <span>{office.address}</span>
                      </p>
                      <p className="flex items-start">
                        <Phone className="h-5 w-5 text-gold mr-2 flex-shrink-0" />
                        <span>{office.phone}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-servileon-black mb-4">
              Preguntas <span className="text-gold">Frecuentes</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Respuestas a las consultas más comunes sobre nuestros servicios.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
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
            ].map((faq, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <div className="bg-white border border-gray-100 shadow-md rounded-sm p-6">
                  <h3 className="font-playfair text-lg font-bold text-servileon-black mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">
              ¿No encuentra respuesta a su pregunta?
            </p>
            <a 
              href="mailto:neider.leon@servileon.com" 
              className="text-gold hover:text-gold-dark font-medium transition-colors duration-300"
            >
              Contáctenos directamente
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  )
} 