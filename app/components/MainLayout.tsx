"use client"

import { useState, useRef, useEffect, memo } from "react"
import Link from "next/link"
import Image from "next/image"
// Importar todos los iconos con un solo import
import * as LucideIcons from "lucide-react"
// Eliminar importaciones individuales
// import { Menu, X, ChevronUp, Phone, Mail } from "lucide-react"
// Eliminar importaciones dinámicas
// const Shield = dynamic(() => import("lucide-react").then(mod => mod.Shield), { ssr: false })
// ... existing code ...

import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { motion, AnimatePresence } from "framer-motion"
// Importar el componente LogoWithText
import LogoWithText from "./LogoWithText"

// Estado de mantenimiento - cambiar a false cuando se termine el mantenimiento
const isMaintenanceMode = false

interface MainLayoutProps {
  children: React.ReactNode;
}

interface TopBarProps {
  isVisible: boolean;
  socialIcons: Array<{
    icon: React.ReactNode;
    href: string;
  }>;
}

// Memoizar componentes para evitar renderizados innecesarios
const TopBar = memo(({ isVisible, socialIcons }: TopBarProps) => (
  <motion.div 
    className="hidden md:block bg-servileon-black text-white py-2 relative z-50"
    initial={{ y: 0 }}
    animate={{ y: isVisible ? 0 : -50 }}
    transition={{ duration: 0.3 }}
  >
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center space-x-6 text-sm">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05, color: "#D4AF37" }}
        >
          <LucideIcons.Phone className="h-4 w-4 mr-2 text-gold" />
          <a href="tel:+573113260689" className="hover:text-gold transition-colors">+57 311 326 0689</a>
        </motion.div>
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05, color: "#D4AF37" }}
        >
          <LucideIcons.Mail className="h-4 w-4 mr-2 text-gold" />
          <a href="mailto:neider.leon@servileon.com" className="hover:text-gold transition-colors">neider.leon@servileon.com</a>
        </motion.div>
        <div className="flex items-center">
          <LucideIcons.MapPin className="h-4 w-4 mr-2 text-gold" />
          <span>Bucaramanga / Bogotá</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {socialIcons.map((social, index) => (
          <motion.a 
            key={index}
            href={social.href} 
            className="text-white hover:text-gold transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </div>
  </motion.div>
));

export default function MainLayout({ children }: MainLayoutProps) {
  const { scrollProgress, showScrollTop, scrollToTop } = useScrollAnimation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  // Si está en modo mantenimiento, solo mostrar el contenido sin navegación
  if (isMaintenanceMode) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
      </div>
    )
  }
  
  // Usar throttle para el evento de scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          
          // Ocultar/mostrar la barra superior al hacer scroll
          if (window.scrollY > 300) {
            setIsVisible(false)
          } else {
            setIsVisible(true)
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Add newsletter signup logic here
    setIsNewsletterOpen(false)
  }

  const navLinks = [
    { name: "Inicio", href: "/" },
    { 
      name: "Servicios", 
      href: "/servicios",
      dropdown: [
        { name: "Aseo y Limpieza", href: "/servicios?category=aseo" },
        { name: "Recurso Humano 2x2x2", href: "/servicios?category=recurso_humano" },
        { name: "Recurso Humano 3x3", href: "/servicios?category=recurso_humano" },
        { name: "Jardinería", href: "/servicios?category=jardineria" },
        { name: "Instalación y Monitoreo de Cámaras", href: "/servicios?category=camaras" },
        { name: "Mantenimiento", href: "/servicios?category=mantenimiento" }
      ]
    },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ]
  
  // Datos para los iconos sociales
  const socialIcons = [
    { icon: <LucideIcons.Facebook className="h-4 w-4" />, href: "#" },
    { icon: <LucideIcons.Instagram className="h-4 w-4" />, href: "#" },
    { icon: <LucideIcons.Twitter className="h-4 w-4" />, href: "#" },
    { icon: <LucideIcons.Linkedin className="h-4 w-4" />, href: "#" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
        {/* Top Bar with Contact Info */}
        <TopBar isVisible={isVisible} socialIcons={socialIcons} />

      {/* Main Navigation */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-white py-5'
      }`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="relative z-10">
                <div className={`transition-all duration-300 ${isScrolled ? 'scale-90' : ''}`}>
                  <LogoWithText 
                    size={isScrolled ? 50 : 60}
                    textColor="text-servileon-black"
                    taglineColor="text-gray-500"
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group" 
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href={link.href}
                      className="px-4 py-2 text-gray-700 hover:text-gold font-medium transition-colors duration-300 flex items-center"
                    >
                      {link.name}
                      {link.dropdown && (
                        <LucideIcons.ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                      )}
                    </Link>
                  </motion.div>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.name && (
                      <motion.div 
                        className="absolute left-0 mt-0 w-60 bg-white shadow-xl rounded-md overflow-hidden z-50"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="py-2">
                          {link.dropdown.map((item) => (
                            <motion.div 
                              key={item.name}
                              whileHover={{ backgroundColor: "rgba(212, 175, 55, 0.1)", x: 5 }}
                            >
                              <Link 
                                href={item.href}
                                className="block px-4 py-3 text-gray-700 hover:text-gold transition-colors duration-300"
                              >
                                {item.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                ))}
              </nav>

            {/* CTA Button */}
              <div className="hidden md:block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/contacto" 
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 group"
                  >
                    Solicitar Consulta
                    <LucideIcons.ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden text-servileon-black z-20 p-2 rounded-md flex items-center justify-center ${isMobileMenuOpen ? 'bg-gray-200' : 'bg-gray-100'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                <LucideIcons.X className="h-6 w-6 text-gold" />
                ) : (
                <LucideIcons.Menu className="h-6 w-6 text-gold" />
                )}
              </motion.button>
            </div>
          </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-white z-10 md:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="container mx-auto px-4 py-20">
                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <div key={link.name} className="border-b border-gray-100 pb-4">
                      {link.dropdown ? (
                        <div className="mb-4">
                          <div 
                            className="flex items-center justify-between text-xl font-medium text-servileon-black hover:text-gold transition-colors duration-300 cursor-pointer"
                            onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                          >
                            <span>{link.name}</span>
                            <LucideIcons.ChevronDown className={`h-5 w-5 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180 text-gold' : ''}`} />
                          </div>
                          
                          <AnimatePresence>
                            {activeDropdown === link.name && (
                              <motion.div 
                                className="mt-4 ml-4 space-y-4"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {link.dropdown.map((item) => (
                                  <Link 
                                    key={item.name}
                                    href={item.href}
                                    className="block text-gray-600 hover:text-gold transition-colors duration-300 py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <motion.div whileHover={{ x: 5 }} className="flex items-center">
                                      <LucideIcons.ArrowRight className="h-4 w-4 mr-2 text-gold" />
                                      {item.name}
                                    </motion.div>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link 
                          href={link.href}
                          className="text-xl font-medium text-servileon-black hover:text-gold transition-colors duration-300 block py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <motion.div whileHover={{ x: 5 }} className="flex items-center">
                            {link.name}
                          </motion.div>
                        </Link>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-medium text-lg mb-4 text-servileon-black">Síguenos</h3>
                    <div className="flex items-center space-x-4 mb-6">
                      {socialIcons.map((social, index) => (
                        <motion.a 
                          key={index}
                          href={social.href} 
                          className="text-gray-500 hover:text-gold transition-colors bg-gray-100 p-2 rounded-full"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                    
                    <h3 className="font-medium text-lg mb-4 text-servileon-black">Contáctanos</h3>
                    <div className="space-y-4">
                      <motion.div 
                        className="flex items-center bg-gray-50 p-3 rounded-lg"
                        whileHover={{ x: 5, color: "#D4AF37" }}
                      >
                        <LucideIcons.Phone className="h-5 w-5 mr-3 text-gold" />
                        <a href="tel:+573113260689" className="text-gray-700 hover:text-gold transition-colors">+57 311 326 0689</a>
                      </motion.div>
                      <motion.div 
                        className="flex items-center bg-gray-50 p-3 rounded-lg"
                        whileHover={{ x: 5, color: "#D4AF37" }}
                      >
                        <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} className="mr-3" />
                        <a href="https://wa.me/573113260689" className="text-gray-700 hover:text-gold transition-colors">
                          +57 311 326 0689
                        </a>
                      </motion.div>
                    </div>
                    
                    <div className="mt-8">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full"
                      >
                        <Link 
                          href="/contacto" 
                          className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 w-full"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Solicitar Consulta
                          <LucideIcons.ArrowRight className="h-4 w-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

        {/* Footer */}
      <footer className="bg-servileon-black text-white relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {/* Company Info */}
              <div>
                <motion.div 
                  className="flex items-center mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <LogoWithText 
                    textColor="text-white"
                    taglineColor="text-gray-400"
                  />
                </motion.div>
                <p className="text-gray-400 mb-6">
                  Empresa líder en recurso humano y control con más de 8 años de experiencia protegiendo lo que más valora.
                </p>
                <div className="flex space-x-4">
                  {[
                    { icon: <LucideIcons.Facebook className="h-5 w-5" />, href: "#" },
                    { icon: <LucideIcons.Instagram className="h-5 w-5" />, href: "#" },
                    { icon: <LucideIcons.Twitter className="h-5 w-5" />, href: "#" },
                    { icon: <LucideIcons.Linkedin className="h-5 w-5" />, href: "#" }
                  ].map((social, index) => (
                    <motion.a 
                      key={index}
                      href={social.href} 
                      className="text-gray-400 hover:text-gold transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5, color: "#D4AF37" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                  </div>
                </div>

              {/* Quick Links */}
              <div className="mt-6 sm:mt-0">
              <h3 className="text-lg font-bold mb-6 text-white">Enlaces Rápidos</h3>
                <ul className="space-y-3 grid grid-cols-1">
                {navLinks.map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 5 }}
                  >
                    <Link href={link.href} className="text-gray-400 hover:text-gold transition-colors flex items-center">
                      <LucideIcons.ArrowRight className="h-4 w-4 mr-2" />
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="mt-6 lg:mt-0">
              <h3 className="text-lg font-bold mb-6 text-white">Nuestros Servicios</h3>
                <ul className="space-y-3 grid grid-cols-1">
                {[
                  { name: "Aseo y Limpieza", href: "/servicios?category=aseo" },
                  { name: "Recurso Humano 2x2x2", href: "/servicios?category=recurso_humano" },
                  { name: "Recurso Humano 3x3", href: "/servicios?category=recurso_humano" },
                  { name: "Jardinería", href: "/servicios?category=jardineria" },
                  { name: "Instalación y Monitoreo de Cámaras", href: "/servicios?category=camaras" },
                  { name: "Mantenimiento", href: "/servicios?category=mantenimiento" }
                ].map((service) => (
                  <motion.li 
                    key={service.name}
                    whileHover={{ x: 5 }}
                  >
                    <Link href={service.href} className="text-gray-400 hover:text-gold transition-colors flex items-center">
                      <LucideIcons.ArrowRight className="h-4 w-4 mr-2" />
                      {service.name}
                    </Link>
                  </motion.li>
                ))}
                </ul>
              </div>

            {/* Contact Info */}
              <div className="mt-6 lg:mt-0">
              <h3 className="text-lg font-bold mb-6 text-white">Contáctenos</h3>
              <ul className="space-y-4">
                <motion.li 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <LucideIcons.MapPin className="h-5 w-5 mr-3 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    Bucaramanga: Carrera 2 #20-50<br />
                    Paseo del puente 2- Piedecuesta, Santander<br />
                    Bogotá: Calle 151 bis #115-81
                  </span>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  whileHover={{ x: 5, color: "#D4AF37" }}
                >
                  <LucideIcons.Phone className="h-5 w-5 mr-3 text-gold" />
                  <a href="tel:+573113260689" className="text-gray-400 hover:text-gold transition-colors">
                    +57 311 326 0689
                  </a>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  whileHover={{ x: 5, color: "#D4AF37" }}
                >
                  <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} className="mr-3" />
                  <a href="https://wa.me/573113260689" className="text-gray-400 hover:text-gold transition-colors">
                    +57 311 326 0689
                  </a>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  whileHover={{ x: 5, color: "#D4AF37" }}
                >
                  <LucideIcons.Mail className="h-5 w-5 mr-3 text-gold" />
                  <a href="mailto:neider.leon@servileon.com" className="text-gray-400 hover:text-gold transition-colors">
                    neider.leon@servileon.com
                  </a>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <LucideIcons.Clock className="h-5 w-5 mr-3 text-gold" />
                  <span className="text-gray-400">
                    Lun - Vie: 8:00 AM - 5:00 PM
                  </span>
                </motion.li>
              </ul>
            </div>
              </div>
            </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
                © {new Date().getFullYear()} Servileon LTDA. Todos los derechos reservados.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 items-center">
                <motion.div whileHover={{ x: 3 }}>
                  <Link href="/terminos" className="text-gray-400 hover:text-gold text-sm transition-colors">
                    Términos y Condiciones
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 3 }}>
                  <Link href="/privacidad" className="text-gray-400 hover:text-gold text-sm transition-colors">
                    Política de Privacidad
                  </Link>
                </motion.div>
              </div>
            </div>
            </div>
          </div>
        </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gold hover:bg-gold-dark text-servileon-black p-3 rounded-full shadow-lg z-50"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <LucideIcons.ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gold z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      ></motion.div>
      </div>
  )
} 