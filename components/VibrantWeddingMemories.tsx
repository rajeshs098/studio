"use client"
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import images from './images';

export default function VibrantWeddingMemories() {
  const [currentSection, setCurrentSection] = useState('home')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = useMemo(() => [' Home', 'Our Story', 'The Big Day', 'Photo Gallery', 'Guestbook'], []);

  const memories = [
    { title: "First Look", description: "The moment we saw each other for the first time on our wedding day." ,img:"https://images.pexels.com/photos/1456669/pexels-photo-1456669.jpeg?"},
    { title: "Vow Exchange", description: "Sharing our heartfelt promises surrounded by loved ones." ,img:"https://images.pexels.com/photos/1456669/pexels-photo-1456669.jpeg?"},
    { title: "First Dance", description: "Swaying to our favorite song as newlyweds.",img:"https://images.pexels.com/photos/15865306/pexels-photo-15865306/free-photo-of-bride-and-groom-dancing-with-fireworks-in-dark.jpeg?" },
    { title: "Cake Cutting", description: "Slicing into our beautiful wedding cake together." ,img:"https://images.pexels.com/photos/1345574/pexels-photo-1345574.jpeg?"},
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const sectionElements = sections.map(section => 
        document.getElementById(section.toLowerCase().replace(' ','-'))
      )

      sectionElements.forEach((element, index) => {
        if (element) {
          const sectionTop = element.offsetTop
          const sectionBottom = sectionTop + element.offsetHeight

          if (scrollPosition >= sectionTop - windowHeight / 2 && 
              scrollPosition < sectionBottom - windowHeight / 2) {
            setCurrentSection(sections[index].toLowerCase().replace(' ', '-'))
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 text-gray-800 font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo or branding */}
          <div className="text-lg font-semibold">Website</div>
          
          <button 
            className="block md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Full menu for desktop and mobile (toggle visibility on mobile) */}
          <ul
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex flex-wrap justify-center space-x-4 md:space-x-6 md:static absolute top-full left-0 w-full bg-white md:bg-transparent z-50 shadow-md md:shadow-none`}
          >
            {sections.map((section) => (
              <li key={section} className="mb-2 md:mb-0">
                <a
                  href={`#${section.toLowerCase().replace(' ', '-')}`}
                  className={`text-sm md:text-lg font-medium hover:text-pink-500 transition-colors ${
                    currentSection === section.toLowerCase().replace(' ', '-')
                      ? 'text-pink-500'
                      : 'text-gray-600'
                  }`}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>


      <main className="pt-24 md:pt-16">
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.img
              src={images[currentImageIndex]}
              alt="Wedding background"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10 }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center relative z-10 text-white"
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-light mb-4">Sarah & John</h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8">Our Wedding Journey</p>
            <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto text-pink-400" />
          </motion.div>
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white z-20 bg-black bg-opacity-50 p-2 rounded-full"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
          </button>
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white z-20 bg-black bg-opacity-50 p-2 rounded-full"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
          </button>
        </section>

        <section id="our-story" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-light mb-12 text-center text-pink-600">Our Love Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="https://images.pexels.com/photos/2058070/pexels-photo-2058070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Sarah and John's journey"
                  width={1260}
                  height={750}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <p className="text-lg">
                  Our journey began on a sunny afternoon in Central Park, both of us reaching for the same book at a pop-up library. 
                  It was Shakespeare&apos;s &quot;A Midsummer Night&apos;s Dream&quot; - fitting for what was to become our own dream-like romance.
                </p>
                <p className="text-lg">
                  From that first laugh over our shared taste in literature, we knew there was something special between us. 
                  Our love story unfolded over cozy coffee dates, long walks through the city, and countless adventures.
                </p>
                <p className="text-lg">
                  Each day, we fell more in love with each other&apos;s quirks, dreams, and the way we fit so perfectly together. 
                  Now, as we embark on this new chapter as husband and wife, we&apos;re excited to share our joy with you through these cherished memories.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="the-big-day" className="py-20 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-light mb-12 text-center text-purple-600">The Big Day</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {memories.map((memory, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={`${memory.img}&text=${encodeURIComponent(memory.title)}`}
                    alt={memory.title}
                    width={300}
                    height={192}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-pink-600">{memory.title}</h3>
                  <p className="text-gray-600">{memory.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="photo-gallery" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-light mb-12 text-center text-pink-600">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image 
                    src={image} 
                    alt={`Wedding photo ${index + 1}`} 
                    width={300}
                    height={256}
                    className="w-full h-64 object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="guestbook" className="py-20 bg-gradient-to-r from-pink-100 to-purple-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-light mb-12 text-center text-purple-600">Guestbook</h2>
            <div className="max-w-2xl mx-auto">
              <form className="bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" id="name" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea id="message" name="message" rows={4} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors duration-300">
                  Leave a Message
                </button>
              </form>
              <div className="mt-12 space-y-8">
                {[
                  { name: "Emily & David", message: "What a beautiful celebration of your love! We're so happy we could be a part of your special day." },
                  { name: "Michael", message: "Wishing you both a lifetime of love and happiness. Your wedding was absolutely magical!" },
                  { name: "Sophie", message: "Thank you for letting us share in your joy. The love between you two is truly inspiring." }
                ].map((entry, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-lg mb-2">{entry.message}</p>
                    <p className="text-right text-pink-600 font-medium">- {entry.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Full-screen wedding photo"
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
            <button
              className="absolute top-4 right-4 text-white"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
              aria-label="Close full-screen image"
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-white py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-2xl font-light text-pink-600 mb-4">Sarah & John</p>
          <p className="text-gray-600 mb-4">Forever & Always</p>
          <Heart className="w-8 h-8 mx-auto text-pink-400" />
        </div>
      </footer>
    </div>
  )
}