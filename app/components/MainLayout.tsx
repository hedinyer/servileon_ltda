"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronUp, Phone, Mail, Shield, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, ArrowRight, ChevronDown } from "lucide-react"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { scrollProgress, showScrollTop, scrollToTop } = useScrollAnimation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
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
        { name: "Vigilancia Armada", href: "/servicios/vigilancia-armada" },
        { name: "Protección Ejecutiva", href: "/servicios/proteccion-ejecutiva" },
        { name: "Monitoreo 24/7", href: "/servicios/monitoreo" },
        { name: "Seguridad Electrónica", href: "/servicios/seguridad-electronica" }
      ]
    },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contacto" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
        {/* Top Bar with Contact Info */}
        <div className="hidden md:block bg-servileon-black text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gold" />
              <a href="tel:+123456789" className="hover:text-gold transition-colors">+57 (1) 234-5678</a>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gold" />
              <a href="mailto:info@servileon.com" className="hover:text-gold transition-colors">info@servileon.com</a>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gold" />
              <span>Bogotá, Colombia</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white hover:text-gold transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="text-white hover:text-gold transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="text-white hover:text-gold transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-white hover:text-gold transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            </div>
          </div>
        </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-5'}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="relative z-10">
                <div className="flex items-center">
                    <Image 
                      src="/leon_logo.png" 
                      alt="Servileon Logo" 
                  width={isScrolled ? 50 : 60} 
                  height={isScrolled ? 50 : 60}
                  className="transition-all duration-300"
                    />
                <div className={`ml-3 transition-all duration-300 ${isScrolled ? 'scale-90' : ''}`}>
                  <h1 className="font-playfair font-bold text-xl md:text-2xl text-servileon-black">
                    SERVILEON <span className="text-gold">LTDA</span>
                  </h1>
                  <p className="text-xs text-gray-500 tracking-wider">SEGURIDAD PRIVADA</p>
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group" 
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    href={link.href}
                    className="px-4 py-2 text-gray-700 hover:text-gold font-medium transition-colors duration-300 flex items-center"
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <div className={`absolute left-0 mt-0 w-60 bg-white shadow-xl rounded-md overflow-hidden transition-all duration-300 origin-top-left ${
                      activeDropdown === link.name ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}>
                      <div className="py-2">
                        {link.dropdown.map((item) => (
                          <Link 
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-gold/10 hover:text-gold transition-colors duration-300"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                ))}
              </nav>

            {/* CTA Button */}
              <div className="hidden md:block">
                <Link 
                href="/contacto" 
                className="bg-gold hover:bg-gold-dark text-servileon-black px-6 py-2 rounded-md font-medium transition-all duration-300 flex items-center gap-2 group"
                >
                Solicitar Consulta
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-servileon-black z-20"
              >
                {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
                ) : (
                <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

        {/* Mobile Navigation */}
        <div className={`fixed inset-0 bg-white z-10 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}>
          <div className="container mx-auto px-4 py-20">
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <div key={link.name}>
                <Link 
                  href={link.href}
                    className="text-xl font-medium text-servileon-black hover:text-gold transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
                  
                  {/* Mobile Dropdown Items */}
                  {link.dropdown && (
                    <div className="mt-4 ml-4 space-y-4">
                      {link.dropdown.map((item) => (
                        <Link 
                          key={item.name}
                          href={item.href}
                          className="block text-gray-600 hover:text-gold transition-colors duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-4 mb-6">
                  <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-gold" />
                    <a href="tel:+123456789" className="text-gray-700 hover:text-gold transition-colors">+57 (1) 234-5678</a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-gold" />
                    <a href="mailto:info@servileon.com" className="text-gray-700 hover:text-gold transition-colors">info@servileon.com</a>
                  </div>
                </div>
                
                <div className="mt-8">
              <Link 
                    href="/contacto" 
                    className="bg-gold hover:bg-gold-dark text-servileon-black px-6 py-3 rounded-md font-medium transition-all duration-300 inline-flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                    Solicitar Consulta
                    <ArrowRight className="h-4 w-4" />
              </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

        {/* Footer */}
      <footer className="bg-servileon-black text-white">
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Company Info */}
              <div>
                <div className="flex items-center mb-6">
                    <Image 
                      src="/leon_logo.png" 
                      alt="Servileon Logo" 
                  width={60} 
                  height={60}
                    />
                <div className="ml-3">
                  <h3 className="font-playfair font-bold text-xl text-white">
                    SERVILEON <span className="text-gold">LTDA</span>
                  </h3>
                  <p className="text-xs text-gray-400 tracking-wider">SEGURIDAD PRIVADA</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Empresa líder en seguridad privada con más de 15 años de experiencia protegiendo lo que más valora.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                  <Facebook className="h-5 w-5" />
                  </a>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                  <Instagram className="h-5 w-5" />
                  </a>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                  <Twitter className="h-5 w-5" />
                  </a>
                <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                  <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
              <h3 className="text-lg font-bold mb-6 text-white">Enlaces Rápidos</h3>
                <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-gold transition-colors flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
              <h3 className="text-lg font-bold mb-6 text-white">Nuestros Servicios</h3>
                <ul className="space-y-3">
                <li>
                  <Link href="/servicios/vigilancia-armada" className="text-gray-400 hover:text-gold transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Vigilancia Armada
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/proteccion-ejecutiva" className="text-gray-400 hover:text-gold transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Protección Ejecutiva
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/monitoreo" className="text-gray-400 hover:text-gold transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Monitoreo 24/7
                  </Link>
                </li>
                <li>
                  <Link href="/servicios/seguridad-electronica" className="text-gray-400 hover:text-gold transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Seguridad Electrónica
                  </Link>
                </li>
                </ul>
              </div>

            {/* Contact Info */}
              <div>
              <h3 className="text-lg font-bold mb-6 text-white">Contáctenos</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    Calle 123 #45-67, Edificio Seguridad<br />
                    Bogotá, Colombia
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-gold" />
                  <a href="tel:+123456789" className="text-gray-400 hover:text-gold transition-colors">
                    +57 (1) 234-5678
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-gold" />
                  <a href="mailto:info@servileon.com" className="text-gray-400 hover:text-gold transition-colors">
                    info@servileon.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-gold" />
                  <span className="text-gray-400">
                    Lun - Vie: 8:00 AM - 6:00 PM
                  </span>
                </li>
              </ul>
            </div>
              </div>
            </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Servileon LTDA. Todos los derechos reservados.
              </p>
              <div className="flex space-x-6">
                <Link href="/terminos" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Términos y Condiciones
                </Link>
                <Link href="/privacidad" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Política de Privacidad
                </Link>
              </div>
            </div>
            </div>
          </div>
        </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gold hover:bg-gold-dark text-servileon-black p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
      
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gold z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      </div>
  )
} 