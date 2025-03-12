"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Tag, ChevronRight, Search } from "lucide-react"
import MainLayout from "../components/MainLayout"
import FadeInOnScroll from "../components/FadeInOnScroll"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("todos")

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "tendencias", name: "Tendencias" },
    { id: "consejos", name: "Consejos" },
    { id: "tecnologia", name: "Tecnología" },
    { id: "empresarial", name: "Empresarial" },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "5 Tendencias de Seguridad en Colombia 2024",
      excerpt: "Descubre las principales innovaciones y cambios en el sector de portería, seguridad y control para este año.",
      image: "/portada.jpeg",
      date: "15 de marzo, 2024",
      author: "Alejandro León",
      authorImage: "/portada.jpeg",
      category: "tendencias",
      tags: ["Tendencias", "Innovación", "Colombia"]
    },
    {
      id: 2,
      title: "Cómo Proteger tu Hogar Durante las Vacaciones",
      excerpt: "Consejos prácticos para mantener tu casa segura mientras disfrutas de tus vacaciones sin preocupaciones.",
      image: "/portada.jpeg",
      date: "28 de febrero, 2024",
      author: "Carolina Martínez",
      authorImage: "/portada.jpeg",
      category: "consejos",
      tags: ["Hogar", "Vacaciones", "Prevención"]
    },
    {
      id: 3,
      title: "Inteligencia Artificial en Sistemas de Vigilancia",
      excerpt: "El impacto revolucionario de la IA en los sistemas de monitoreo y cómo está transformando el sector.",
      image: "/portada.jpeg",
      date: "10 de febrero, 2024",
      author: "Javier Torres",
      authorImage: "/portada.jpeg",
      category: "tecnologia",
      tags: ["IA", "Vigilancia", "Tecnología"]
    },
    {
      id: 4,
      title: "Seguridad Corporativa: Protegiendo Activos Críticos",
      excerpt: "Estrategias efectivas para salvaguardar la información sensible y los activos físicos de tu empresa.",
      image: "/portada.jpeg",
      date: "25 de enero, 2024",
      author: "Alejandro León",
      authorImage: "/portada.jpeg",
      category: "empresarial",
      tags: ["Corporativo", "Activos", "Estrategia"]
    },
    {
      id: 5,
      title: "El Futuro de la Biometría en Control de Accesos",
      excerpt: "Nuevas tecnologías biométricas que están revolucionando la forma de gestionar la seguridad de accesos.",
      image: "/portada.jpeg",
      date: "15 de enero, 2024",
      author: "Javier Torres",
      authorImage: "/portada.jpeg",
      category: "tecnologia",
      tags: ["Biometría", "Accesos", "Innovación"]
    },
    {
      id: 6,
      title: "Cómo Crear un Plan de Emergencia Efectivo",
      excerpt: "Guía paso a paso para desarrollar protocolos de emergencia que realmente funcionen en situaciones críticas.",
      image: "/portada.jpeg",
      date: "5 de enero, 2024",
      author: "Carolina Martínez",
      authorImage: "/portada.jpeg",
      category: "consejos",
      tags: ["Emergencias", "Planificación", "Protocolos"]
    }
  ]

  const filteredPosts = blogPosts
    .filter(post => 
      activeCategory === "todos" || post.category === activeCategory
    )
    .filter(post => 
      searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the filter above
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-servileon-black">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/portada.jpeg" 
            alt="Blog de Seguridad" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Blog de <span className="text-gold">Seguridad</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Artículos, consejos y tendencias sobre portería, seguridad y control y protección.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="w-full md:w-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar artículos..." 
                  className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-1 text-sm rounded-sm transition-colors duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gold text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <FadeInOnScroll key={post.id} delay={index * 0.1}>
                  <article className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-sm overflow-hidden group">
                    <Link href={`/blog/${post.id}`} className="block">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image 
                          src={post.image} 
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-gold text-white text-xs px-2 py-1 rounded-sm">
                          {categories.find(cat => cat.id === post.category)?.name}
                        </div>
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <Link href={`/blog/${post.id}`} className="block group-hover:text-gold transition-colors duration-300">
                        <h2 className="font-playfair text-xl font-bold text-servileon-black mb-3 group-hover:text-gold transition-colors duration-300">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, i) => (
                          <span key={i} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-sm">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link 
                        href={`/blog/${post.id}`}
                        className="text-gold hover:text-gold-dark font-medium inline-flex items-center transition-colors duration-300"
                      >
                        Leer más
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                </FadeInOnScroll>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No se encontraron artículos</h3>
              <p className="text-gray-500">Intenta con otra búsqueda o categoría</p>
              <button 
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("todos")
                }}
                className="mt-4 text-gold hover:text-gold-dark font-medium"
              >
                Ver todos los artículos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-playfair text-3xl font-bold text-servileon-black mb-4">
              Suscríbete a Nuestro Newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Recibe los últimos artículos, consejos y noticias sobre seguridad directamente en tu correo.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-grow px-4 py-3 border border-gray-300 focus:outline-none focus:border-gold"
                required
              />
              <button 
                type="submit" 
                className="bg-gold hover:bg-gold-dark text-white px-6 py-3 font-medium transition-colors duration-300"
              >
                Suscribirme
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              Al suscribirte, aceptas recibir correos electrónicos de SERVILEON LTDA. Puedes darte de baja en cualquier momento.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl font-bold text-servileon-black mb-12 text-center">
            Artículos <span className="text-gold">Destacados</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeInOnScroll delay={0.1}>
              <div className="bg-servileon-black rounded-sm overflow-hidden">
                <div className="p-8">
                  <span className="text-gold text-sm font-medium">GUÍA ESPECIAL</span>
                  <h3 className="font-playfair text-2xl font-bold text-white mt-2 mb-4">
                    Seguridad Residencial Completa: Todo lo que Necesitas Saber
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Una guía exhaustiva con todo lo que debes considerar para proteger tu hogar de manera efectiva.
                  </p>
                  <Link 
                    href="/blog/guia-seguridad-residencial"
                    className="inline-flex items-center text-gold hover:text-white transition-colors duration-300"
                  >
                    Descargar Guía Gratuita
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={0.2}>
              <div className="bg-gray-50 rounded-sm overflow-hidden p-8">
                <h3 className="font-playfair text-2xl font-bold text-servileon-black mb-6">
                  Artículos Populares
                </h3>
                <div className="space-y-6">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm">
                        <Image 
                          src={post.image} 
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link 
                          href={`/blog/${post.id}`}
                          className="font-medium text-servileon-black hover:text-gold transition-colors duration-300"
                        >
                          {post.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>
    </MainLayout>
  )
} 