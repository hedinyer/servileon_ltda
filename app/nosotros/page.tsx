"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import * as LucideIcons from "lucide-react"
import { motion } from 'framer-motion'

import PageTransition from "../components/PageTransition"
import MainLayout from "../components/MainLayout"
import FadeInOnScroll from '../components/FadeInOnScroll'
import InteractiveCard from '../components/InteractiveCard'
import AnimatedButton from '../components/AnimatedButton'
import ParallaxSection from '../components/ParallaxSection'

export default function Nosotros() {
  return (
    <PageTransition>
      <MainLayout>
        {/* Hero Section */}
        <section className="relative py-24 bg-servileon-black">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/portada.jpeg" 
              alt="Nosotros Servileon" 
              fill
              priority
              className="object-cover w-full h-full brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair mb-6">
                  Sobre Nosotros
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-xl text-white/80 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Conozca nuestra historia, misión, visión y valores que nos han convertido en líderes del sector.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Historia Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeInOnScroll>
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/20 rounded-lg z-0"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 rounded-lg z-0"></div>
                  <InteractiveCard className="relative z-10 rounded-lg overflow-hidden shadow-2xl h-[400px] p-0">
                    <div className="h-full w-full">
                      <Image 
                        src="/portada.jpeg" 
                        alt="Historia Servileon" 
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
                  <h2 className="text-4xl font-bold font-playfair mb-6 text-black">Nuestra Historia</h2>
                  <p className="text-gray-600 mb-6">
                    Fundada en 2018, Servileon nació con la visión de transformar el sector de portería, vigilancia y control en Colombia, ofreciendo un servicio de calidad superior con personal altamente capacitado y tecnología de vanguardia.
                  </p>
                  <p className="text-gray-600 mb-6">
                    A lo largo de los años, hemos crecido de manera constante, expandiendo nuestras operaciones a las principales ciudades del país y diversificando nuestros servicios para satisfacer las necesidades cambiantes de nuestros clientes.
                  </p>
                  <p className="text-gray-600 mb-8">
                    Hoy, con más de 8 años de experiencia, Servileon se ha consolidado como líder en el sector, reconocido por su excelencia, profesionalismo y compromiso con la seguridad y tranquilidad de sus clientes.
                  </p>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Misión y Visión Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-playfair mb-6 text-black">Misión y Visión</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Nuestros principios fundamentales que guían cada acción y decisión en Servileon.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FadeInOnScroll>
                <InteractiveCard className="p-8 h-full">
                  <h3 className="text-2xl font-bold mb-4 text-black">Nuestra Misión</h3>
                  <p className="text-gray-600 mb-6">
                    Proporcionar tranquilidad a nuestros clientes a través de servicios de portería, vigilancia y control confiables, eficientes y personalizados que se adaptan a sus necesidades específicas, garantizando la seguridad de sus instalaciones y personal.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="bg-gold/20 p-1 rounded-full">
                      <LucideIcons.Check className="h-5 w-5 text-gold" />
                    </div>
                    <span className="text-gray-700">Excelencia en el servicio</span>
                  </div>
                </InteractiveCard>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={0.2}>
                <InteractiveCard className="p-8 h-full">
                  <h3 className="text-2xl font-bold mb-4 text-black">Nuestra Visión</h3>
                  <p className="text-gray-600 mb-6">
                    Ser reconocidos como la empresa líder en servicios de portería, vigilancia y control en Colombia, destacándonos por nuestra innovación, calidad y compromiso con la satisfacción del cliente, y expandir nuestras operaciones a nivel internacional.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="bg-gold/20 p-1 rounded-full">
                      <LucideIcons.Check className="h-5 w-5 text-gold" />
                    </div>
                    <span className="text-gray-700">Innovación constante</span>
                  </div>
                </InteractiveCard>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gold-gradient bg-gradient-size animate-gradient-slow">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-servileon-black mb-6">
                ¿Listo para trabajar con nosotros?
              </h2>
              <p className="text-servileon-black/80 mb-8">
                Contáctenos hoy para una consulta gratuita y descubra cómo podemos ayudarle con sus necesidades de portería, vigilancia y control.
              </p>
              <AnimatedButton 
                href="/contacto" 
                variant="outline"
                size="lg"
                className="px-10 py-4 text-lg whitespace-nowrap bg-transparent text-servileon-black border-servileon-black"
                icon={<LucideIcons.ArrowRight className="h-5 w-5" />}
              >
                Solicitar Consulta
              </AnimatedButton>
            </div>
          </div>
        </section>
      </MainLayout>
    </PageTransition>
  )
} 