"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Info, Briefcase, GraduationCap, Code, Mail, Download, Instagram, Linkedin, Github, Menu, X, Phone, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Globe, BookOpen, Award } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import DynamicLottie from './DynamicLottie'
import animationData from '../public/images/Animation - 1726800141891.json'
import skillsAnimationData from '../public/images/Animation - 1726800369868.json'
import { AnimatedBackground } from './animatedbackground'
import FuturisticLoadingScreen from './FuturisticLoadingScreen'


interface TimelineItemProps {
  year: string;
  content: string;
}

interface Certificate {
  title: string;
  description: string;
  pdf: string;
  image: string;
}

interface CertificateCarouselProps {
  certificates: Certificate[];
}

const getSections = (language: string) => [
  { id: 'santiago', title: 'Santiago', icon: User },
  { id: 'sobre-mi', title: language === 'es' ? 'Sobre mí' : 'About me', icon: Info },
  { id: 'portafolio', title: language === 'es' ? 'Portafolio' : 'Portfolio', icon: Briefcase },
  { id: 'skills', title: 'Skills', icon: Code },
  { id: 'contacto', title: language === 'es' ? 'Contacto' : 'Contact', icon: Mail },
]

const colors = ['#00FFFF', '#FF00FF', '#FFFF00', '#FF1493', '#00FF00', '#FF4500']

export const TimelineItem = ({ year, content }: TimelineItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(itemRef.current as HTMLDivElement);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div ref={itemRef} className="flex items-start mb-8">
      <div className="mr-4 font-bold text-blue-400">{year}</div>
      <div className="flex-1">
        {isVisible && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-gray-300"
          >
            {content}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export const CertificateCarousel = ({ certificates, language }: { certificates: { [key: string]: Certificate[] }, language: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCertificates = certificates[language] || [];

  const nextCertificate = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentCertificates.length);
  };

  const prevCertificate = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + currentCertificates.length) % currentCertificates.length);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={prevCertificate} variant="outline" size="icon" className="bg-gray-800 hover:bg-gray-700">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </motion.div>
        <div className="text-center text-lg font-semibold text-cyan-400">
          {currentCertificates[currentIndex].title}
        </div>
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={nextCertificate} variant="outline" size="icon" className="bg-gray-800 hover:bg-gray-700">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      <Card className="bg-gray-800 bg-opacity-50">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="aspect-w-16 aspect-h-9 mb-4 w-full max-w-md">
            <img
              src={currentCertificates[currentIndex].image}
              alt={currentCertificates[currentIndex].title}
              className="object-cover rounded-lg w-full h-full"
            />
          </div>
          <p className="text-gray-300 mb-4 text-center">{currentCertificates[currentIndex].description}</p>
          <Button className="w-full max-w-md bg-gradient-to-r from-purple-700 to-red-800 hover:from-blue-700 hover:to-purple-700">
            <a href={currentCertificates[currentIndex].pdf} download className="flex items-center justify-center">
              <Download className="mr-2 h-4 w-4" /> Descargar Certificado
            </a>
          </Button>
        </CardContent>
      </Card>
      <div className="flex justify-center mt-4">
        {currentCertificates.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-500'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default function Component() {
  const [activeSection, setActiveSection] = useState('santiago')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [formStatus, setFormStatus] = useState({ message: '', isError: false });
  const [showContinueButton, setShowContinueButton] = useState(false)
  const [titleColor, setTitleColor] = useState(colors[0])
  const [showCertificates, setShowCertificates] = useState(false)
  const [language, setLanguage] = useState('es')
  const fullText = language === 'es' 
    ? 'En camino a ser un mejor desarrollador full stack..!!'
    : 'On the way to becoming a better full stack developer..!!'
    
  const certificates = {
    es: [
      { title: "Diploma Apis.net", description: "Curso de Apis sobre .net", pdf: "/images/diploma-apis-net.pdf", image: "/images/diploma-apis-net.png" },
      { title: "Diploma c# básico", description: "Curso sobre conceptos básicos de c#", pdf: "/images/diploma-csharp-introduccion.pdf", image: "/images/diploma-csharp-introduccion.png" },
      { title: "Diploma introducción a c#", description: "Curso sobre conceptos generales de c#", pdf: "/images/diploma-csharp.pdf", image: "/images/diploma-csharp.png" },
      { title: "Diploma Fundamentos de .Net", description: "Fundamentos generales de .Net", pdf: "/images/diploma-fundamentos-net.pdf", image: "/images/diploma-fundamentos-net.png" },
      { title: "Diploma manejo de datos con linq", description: "Manejo de datos complejos con linq", pdf: "/images/diploma-linq.pdf", image: "/images/diploma-linq.png" },
      { title: "Diploma Python Fundamentos", description: "Conocimientos básicos de python", pdf: "/images/diploma-python-basico.pdf", image: "/images/diploma-python-basico.png" },
      { title: "Diploma terminal y línea de comandos", description: "Dominio total de la terminal y línea de comandos en sistemas operativos", pdf: "/images/diploma-terminal.png", image: "/images/diploma-terminal.png" },
      { title: "Técnico en Diseño e integración de multimedia", description: "Educación avanzada Técnico", pdf: "/images/tecnico.pdf", image: "/images/tecnico.png" },
    ],
    en: [
      { title: "Diploma Apis.net", description: "APIs course about .net", pdf: "/images/diploma-apis-net.pdf", image: "/images/diploma-apis-net.png" },
      { title: "Diploma basic C#", description: "Course on basic concepts of C#", pdf: "/images/diploma-csharp-introduccion.pdf", image: "/images/diploma-csharp-introduccion.png" },
      { title: "Diploma introduction to C#", description: "Course on general concepts of C#", pdf: "/images/diploma-csharp.pdf", image: "/images/diploma-csharp.png" },
      { title: "Diploma Fundamentals of .Net", description: "General fundamentals of .Net", pdf: "/images/diploma-fundamentos-net.pdf", image: "/images/diploma-fundamentos-net.png" },
      { title: "Diploma data management with linq", description: "Management of complex data with linq", pdf: "/images/diploma-linq.pdf", image: "/images/diploma-linq.png" },
      { title: "Diploma Python Fundamentals", description: "Basic knowledge of python", pdf: "/images/diploma-python-basico.pdf", image: "/images/diploma-python-basico.png" },
      { title: "Diploma terminal and command line", description: "Complete mastery of terminal and command line in operating systems", pdf: "/images/diploma-terminal.png", image: "/images/diploma-terminal.png" },
      { title: "Technical in Multimedia Design and Integration", description: "Advanced Technical Education", pdf: "/images/tecnico.pdf", image: "/images/tecnico.png" },
    ]
  };

  const skillsDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: skillsAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const projects = [
    {
      title: language === 'es' ? "LiveDocs" : "LiveDocs",
      description: language === 'es' ? "aplicación web tiempo real de creacion de documentos de texto colaborativos" : "A realtime web aplication for documents, online creating",
      image: "/images/livedocs.png",
      technologies: ["React", "Next.js", "Tailwind", "TypeScript", "MySQL", "API REST"],
      link: "https://live-docs-mmt1.vercel.app/",
      repoLink: "https://github.com/DonEdgarpai/LiveDocs" 
    },
    {
      title: language === 'es' ? "Traductor" : "Translate",
      description: language === 'es' ? "aplicación web de traduccion en tiempo real con funciones modernas - diccionario " : "An real-time translation web application",
      image: "/images/traductor.png",
      technologies: ["React", "Next.js", "Tailwind", "TypeScript", "APIs", "Framer Motion" ],
      link: "https://traductor-iota.vercel.app/",
      repoLink: "https://github.com/DonEdgarpai/Traductor"

    },
    {
      title: language === 'es' ? "Proyecto 3" : "Project 3",
      description: language === 'es' ? "Plataforma inteligente para gestionar el control de vacas lecheras " : "Intelligent platform to manage the control of dairy cows",
      image: "/images/milktrack.png",
      technologies: ["React", "Next.js", "Tailwind", "TypeScript", "MySQL", "Framer Motion"],
      link: "https://milktrack.vercel.app/",
      repoLink: "https://github.com/DonEdgarpai/milktrack"

    }, 
    {
      title: "LuxFinance",
      description: language === 'es' ? "Aplicación de gestión financiera personal o emepresarial en tiempo real " : "Personal finance management application",
      image: "/images/luxfinance.png",
      technologies: ["React", "Next.js", "Tailwind", "TypeScript", "Framer Motion","Firebase"],
      link: "https://lux-finance-eight.vercel.app/",
      repoLink: "https://github.com/DonEdgarpai/LuxFinance"
    },
  ];

  const sections = getSections(language);

  const isClient = typeof window !== 'undefined'

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval)
          setShowContinueButton(true)
          return 100
        }
        return Math.min(oldProgress + 1, 100)
      })
    }, 35)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isClient) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight
        const offset = windowHeight / 2

        for (const section of sections) {
          const element = document.getElementById(section.id)
          if (element) {
            const { top, bottom } = element.getBoundingClientRect()
            if (top <= offset && bottom > offset) {
              setActiveSection(section.id)
              break
            }
          }
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [sections, isClient])

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        index = 0;
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [fullText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleColor(colors[Math.floor(Math.random() * colors.length)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (isClient) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      setIsMenuOpen(false)
    }
  }

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'es' ? 'en' : 'es');
  };


  if (isLoading) {
    return (
      <FuturisticLoadingScreen
        onContinue={() => setIsLoading(false)}
        initialLanguage={language}
      />
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="flex min-h-screen text-white font-['Averox'] text-xl">
          <div className="fixed top-4 right-4 z-50 flex items-center space-x-4">
            <Button
              onClick={toggleLanguage}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full flex items-center space-x-2"
            >
              <Globe size={20} />
              <span>{language === 'es' ? 'EN' : 'ES'}</span>
            </Button>
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden bg-gradient-to-r from-pink-600 to-purple-600 text-white p-2 rounded-full"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          <motion.nav
            className={`fixed left-0 top-0 h-full flex-col justify-center space-y-4 bg-black bg-opacity-90 p-4 backdrop-blur-lg z-40 ${
              isMenuOpen ? 'flex' : 'hidden'
            } lg:flex`}
            initial={{ width: 80 }}
            animate={{ width: isMenuOpen ? '100%' : 80 }}
            transition={{ duration: 0.3 }}
          >
            {sections.map((section, index) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(section.id)
                }}
                className={`flex items-center justify-center space-x-2 rounded-lg p-2 transition-all duration-300 hover:bg-white hover:bg-opacity-10`}
                whileHover={{ scale: 1.05 }}
                animate={{
                  backgroundColor: activeSection === section.id ? colors[index % colors.length] : 'transparent',
                  color: activeSection === section.id ? 'black' : 'white',
                }}
                transition={{ duration: 0.5 }}
              >
                <section.icon className="h-5 w-5" />
                <span className="lg:hidden">{section.title}</span>
              </motion.a>
            ))}
          </motion.nav>
          <main className="flex-1 p-4 lg:p-8 lg:ml-20 transition-all duration-300 w-full">
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                className={`py-8 ${index === 0 ? 'mt-4' : 'mt-2'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="rounded-xl bg-gray-900 p-6 lg:p-8 backdrop-blur-lg relative overflow-hidden border-2 border-purple-500"
                  whileHover={{
                    background: "linear-gradient(135deg, #1a001a 0%, #460a4f 50%, #220000 100%)",
                    boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
                    borderColor: "#00FFFF",
                    borderWidth: "3px",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {section.id !== 'santiago' && (
                    <h2 className="mb-4 text-3xl lg:text-4xl font-bold text-cyan-400 ">{section.title}</h2>
                  )}
                  {section.id === 'santiago' && (
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8 ">                
                      <div className="w-full md:w-1/2 space-y-4 ">
                        <h1 className="text-4xl lg:text-5xl font-bold">
                          <span className="text-cyan-400">SANTIAGO</span>{' '}
                          <span className="text-pink-500">VERGARA</span>
                        </h1>
                        <motion.span
                          className="block text-2xl lg:text-3xl mt-2"
                          style={{ color: titleColor }}
                          animate={{ color: titleColor }}
                          transition={{ duration: 2 }}
                        >
                          -FullStack.Developer
                        </motion.span>
                        <div className="h-10">
                          <p className="text-xl lg:text-2xl text-green-500">{typedText}</p>
                        </div>
                        <p className="text-lg lg:text-xl">
                          {language === 'es' ? 'Bienvenidos a mi porfolio como desarrollador' : 'Welcome to my developer portfolio'}
                          <motion.span
                            className="inline-block"
                            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                          >
                            🖐
                          </motion.span>
                        </p>
                        <p className="text-base lg:text-lg">
                          {language === 'es' ? 'Si quieres contactarme enviame un mensaje a' : 'If you want to contact me, send a message to'}{' '}
                          <a
                            href="mailto:santivergara0215@gmail.com"
                            className="text-cyan-400 hover:underline"
                          >
                            santivergara0215@gmail.com
                          </a>
                          <motion.span
                            className="inline-block ml-2"
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            👈
                          </motion.span>
                        </p>
                        <Button
                          variant="outline"
                          className="border-rose-600 mt-4 bg-pink-500 text-white hover:bg-purple-700 transition-colors duration-300"
                        >
                          <a href="/images/CVedgarsantiagovergara.pdf" download className="flex items-center">
                            <Download className="mr-2 h-4 w-4" /> {language === 'es' ? 'Descarga mi CV' : 'Download my CV'}
                          </a>
                        </Button>
                        <div className="flex space-x-4 mt-4">
                          <a href="https://www.instagram.com/santtiiagop/" target="_blank" rel="noopener noreferrer">
                            <Instagram className="h-6 w-6 text-pink-400 hover:text-pink-300 transition-colors duration-300" />
                          </a>
                          <a href="https://www.linkedin.com/in/santiago-vergaraem/" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-6 w-6 text-blue-400 hover:text-blue-300 transition-colors duration-300" />
                          </a>
                          <a href="https://github.com/DonEdgarpai" target="_blank" rel="noopener noreferrer">
                            <Github className="h-6 w-6 text-gray-400 hover:text-gray-300 transition-colors duration-300" />
                          </a>
                          <Popover>
                            <PopoverTrigger>
                              <Phone className="h-6 w-6 text-green-400 hover:text-green-300 transition-colors duration-300" />
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="flex flex-col space-y-2">
                                <a href="tel:3014732718" className="text-blue-500 hover:underline">{language === 'es' ? 'Llamame 👈' : ' call 👈 '}</a>
                                <a href="https://api.whatsapp.com/send/?phone=%2B573014732718&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">WhatsApp 💚</a>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 flex justify-center items-center">
                        <div className="w-full max-w-md">
                        {animationData && (
                            <DynamicLottie animationData={animationData} height={400} width={400} />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {section.id === 'sobre-mi' && (
                    <div className="space-y-6">
                      <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg mb-6">
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1 }}
                          className="text-purple-400 text-lg text-justify"
                        >
                          {language === 'es' 
                            ? '¡Hola! Bienvenido a mi rincón tecnológico. Soy un entusiasta desarrollador FullStack, siempre en busca de nuevos conocimientos. Aquí podrás explorar mi trayectoria y portafolio en el apasionante mundo del desarrollo, desde mis primeros pasos hasta mis proyectos actuales. ¡Únete a mí en este viaje de innovación y evolución constante!'
                            : 'Hello! Welcome to my tech corner. I\'m an enthusiastic FullStack developer, always seeking new knowledge. Here you can explore my journey and portfolio in the exciting world of development, from my first steps to my current projects. Join me on this journey of constant innovation and evolution!'}
                        </motion.p>
                      </div>

                      <div className="relative">
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                          animate={{
                            background: [
                              "linear-gradient(to bottom, #8b0000, #8b5cf6, #7fff00)",
                              "linear-gradient(to bottom, #7fff00, #8b0000, #8b5cf6)",
                              "linear-gradient(to bottom, #8b5cf6, #7fff00, #8b0000)",
                            ],
                          }}
                          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        />
                        
                        <div className="space-y-8 ml-6">
                          <TimelineItem 
                            year="2018-2019" 
                            content={language === 'es' 
                              ? "Descubrí mi pasión por la programación, dando inicio a un emocionante viaje en el mundo del desarrollo."
                              : "I discovered my passion for programming, starting an exciting journey in the world of development."}
                          />
                          <TimelineItem 
                            year="2019-2021" 
                            content={language === 'es'
                              ? "Desarrollé mi primer proyecto, una app web educativa sobre el espacio y cuerpos celestes, que presenté durante mi graduación."
                              : "I developed my first project, an educational web app about space and celestial bodies, which I presented during my graduation."}
                          />
                          <TimelineItem 
                            year="2022-2023" 
                            content={language === 'es'
                              ? "Me lancé al mundo freelance, creando soluciones para pequeñas empresas y expandiendo mis habilidades mientras participaba en diversos proyectos."
                              : "I launched into the freelance world, creating solutions for small businesses and expanding my skills while participating in various projects."}
                          />
                          <TimelineItem 
                            year="2024-2025" 
                            content={language === 'es'
                              ? "Me sumergí en el desarrollo FullStack y comencé a explorar el fascinante campo del backend y el desarrollo moderno."
                              : "I immersed myself in FullStack development and began exploring the fascinating field of backend and the modern development."}
                          />
                          <TimelineItem 
                            year="..."
                            content={language === 'es'
                              ? "Continúo mi viaje de aprendizaje y crecimiento, siempre buscando nuevos desafíos y oportunidades para innovar en el mundo del desarrollo."
                              : "I continue my journey of learning and growth, always looking for new challenges and opportunities to innovate in the world of development."}
                          />
                        </div>
                      </div>

                      <div className="mt-8">
                        <Button
                          onClick={() => setShowCertificates(!showCertificates)}
                          className="w-full bg-gradient-to-r from-purple-700 to-red-800 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                        >
                          <BookOpen className="mr-2" />
                          {showCertificates 
                            ? (language === 'es' ? 'Ocultar Certificados y educacion profesional' : 'Hide Certificates and professional education')
                            : (language === 'es' ? 'Ver Certificados y educacion profesional' : 'View Certificates and professional education')}
                          {showCertificates ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
                        </Button>
                      </div>

                      <AnimatePresence>
                        {showCertificates && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <CertificateCarousel certificates={certificates} language={language} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                    {section.id === 'portafolio' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                        {projects.map((project, index) => (
                          <motion.div
                            key={index}
                            className="rounded-lg text-card-foreground shadow-lg overflow-hidden w-full max-w-2xl relative group"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 to-green-500 to-yellow-500 animate-gradient-x"></div>
                            <div className="relative z-10 bg-gray-900 hover:bg-black rounded-lg overflow-hidden m-[3.5px]">
                            <div className="relative pt-[29.25%] overflow-hidden">
                              <img 
                                src={project.image} 
                                alt={project.title} 
                                className="absolute top-0 left-0 w-full h-full object-cover object-center"
                              />
                            </div>
                              <div className="p-6 flex flex-col items-center bg-black bg-opacity-30">
                                <h3 className="text-2xl font-bold mb-3 text-cyan-400 text-center">{project.title}</h3>
                                <p className="text-gray-300 mb-4 text-center">{project.description}</p>
                                <div className="flex flex-wrap justify-center gap-2 mb-4">
                                  {project.technologies.map((tech, techIndex) => (
                                    <Badge 
                                      key={techIndex}
                                      variant="secondary" 
                                      className="bg-gray-700 text-white px-3 py-1 text-sm transition-colors duration-300 hover:bg-purple-800 hover:text-white"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-1/2 bg-gradient-to-r  from-fuchsia-700 to-orange-700 hover:from-purple-800 hover:to-blue-800  text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                                  >
                                    {language === 'es' ? 'Ver Proyecto' : 'View Project'}
                                  </a>
                                  <a
                                    href={project.repoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-1/2 bg-gradient-to-r from-purple-800 to-blue-800 hover:from-red-700 hover:to-purple-900 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                                  >
                                    {language === 'es' ? 'Ver Repositorio' : 'View Repository'}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  {section.id === 'skills' && (
                    <div className="flex flex-col md:flex-row items-start justify-between space-y-8 md:space-y-0 md:space-x-8">
                      <div className="w-full md:w-1/2 space-y-6">
                        <div>
                          <h3 className="text-xl lg:text-2xl font-semibold text-purple-500 mb-3">
                            {language === 'es' ? 'Lenguajes de programación' : 'Programming Languages'}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { name: 'Python', icon: '/images/python.svg' },
                              { name: 'C#', icon: '/images/cisharp.svg' },
                              { name: 'CSS', icon: '/images/csss.svg' },
                              { name: 'HTML', icon: '/images/html.svg' },
                              { name: 'PHP', icon: '/images/php.svg' },
                              { name: 'JavaScript', icon: '/images/javascriptt.svg' },
                              { name: 'Java', icon: '/images/java.svg' },
                              { name: 'TypeScript', icon: '/images/typescript.png' },
                            ].map((lang, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-sm lg:text-base py-1 px-2 bg-blue-800 text-white hover:bg-purple-800 hover:border-black flex items-center gap-2"
                              >
                                {lang.icon && <img src={lang.icon} alt={`${lang.name} icon`} className="w-6 h-6" />}
                                {lang.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-semibold text-purple-500 mb-3">Frameworks</h3>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { name: 'React', icon: '/images/react.svg' },
                              { name: 'Next.js', icon: '/images/next.svg' },
                              { name: '.NET', icon: '/images/net.svg' },
                              { name: 'Spring Boot', icon: '/images/spring.svg' },
                              { name: 'Tailwind CSS', icon: '/images/tailwind.svg' },
                              { name: 'Node.js', icon: '/images/node.svg' },
                            ].map((framework, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-sm lg:text-base py-1 px-2 bg-pink-700 text-white hover:bg-purple-800 hover:border-black flex items-center gap-2"
                              >
                                {framework.icon && <img src={framework.icon} alt={`${framework.name} icon`} className="w-6 h-6" />}
                                {framework.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-semibold text-purple-500 mb-3">
                            {language === 'es' ? 'Bases de datos y otros' : 'Databases and others'}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { name: 'SQL', icon: '/images/sql.svg' },
                              { name: 'MongoDB', icon: '/images/mongodb.svg' },
                              { name: 'APIs', icon: '/images/api.svg' },
                              { name: 'REST API', icon: '/images/apirest.svg' },
                            ].map((db, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-sm lg:text-base py-1 px-2 bg-yellow-600 text-white hover:bg-purple-800 hover:border-black flex items-center gap-2"
                              >
                                {db.icon && <img src={db.icon} alt={`${db.name} icon`} className="w-6 h-6" />}
                                {db.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-semibold text-purple-500 mb-3">
                            {language === 'es' ? 'Herramientas' : 'Tools'}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { name: 'Visual Studio Code', icon: '/images/visual.svg' },
                              { name: 'Git', icon: '/images/git.svg' },
                              { name: 'Virtual Box', icon: '/images/virtualbox.svg' },
                            ].map((tool, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-sm lg:text-base py-1 px-2 bg-green-700 text-white hover:bg-purple-800 hover:border-black flex items-center gap-2"
                              >
                                {tool.icon && <img src={tool.icon} alt={`${tool.name} icon`} className="w-6 h-6" />}
                                {tool.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 flex justify-center items-center">
                        <div className="w-full max-w-md rounded-lg overflow-hidden">
                        {skillsAnimationData && (
                            <DynamicLottie animationData={skillsAnimationData} height="100%" width="100%" />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {section.id === 'contacto' && (
                    <div className="bg-gray-950 p-8 rounded-lg shadow-lg max-w-full mx-full">
                      <h3 className="text-4xl font-bold text-purple-500 mb-4">
                        {language === 'es' ? '¡Hablemos!' : 'Let\'s talk!'}
                      </h3>
                      <p className="text-center text-gray-300 mb-6">
                        {language === 'es' 
                          ? 'Estoy siempre abierto a nuevas oportunidades y colaboraciones. No dudes en contactarme.'
                          : 'I\'m always open to new opportunities and collaborations. Don\'t hesitate to contact me.'}
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <a
                          href="mailto:santivergara0215@gmail.com"
                          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-full hover:from-purple-700 hover:to-blue-700 transition duration-300"
                        >
                          <Mail className="h-5 w-5" />
                          <span>Email</span>
                        </a>
                        <a
                          href="https://www.linkedin.com/in/santiago-vergaraem/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-full hover:from-blue-700 hover:to-cyan-700 transition duration-300"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span>LinkedIn</span>
                        </a>
                        <a
                          href="https://github.com/DonEdgarpai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-gradient-to-r from-gray-600 to-black text-white py-2 px-4 rounded-full hover:from-gray-800 hover:to-black transition duration-300"
                        >
                          <Github className="h-5 w-5" />
                          <span>GitHub</span>
                        </a>
                        <Button variant="outline" className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-full hover:from-blue-700 hover:to-cyan-700 transition duration-300">
                          <Phone className="mr-2 h-4 w-4" /> {language === 'es' ? 'Teléfono' : 'Phone'}: (+57 3014732718)
                        </Button>
                      </div>
                      <div className="mt-8 w-full m">
                        <form action="https://formsubmit.co/santivergara0215@gmail.com" method="POST" className="space-y-4">
                          <input type="hidden" name="_subject" value="Nuevo mensaje de contacto!" />
                          <input type="text" name="_honey" style={{ display: 'none' }} />
                          
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                              {language === 'es' ? 'Nombre' : 'Name'}
                            </label>
                            <Input
                              type="text"
                              id="name"
                              name="name"
                              required
                              placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                              {language === 'es' ? 'Correo electrónico' : 'Email'}
                            </label>
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              required
                              placeholder={language === 'es' ? 'Tu correo electrónico' : 'Your email'}
                              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                              {language === 'es' ? 'Mensaje' : 'Message'}
                            </label>
                            <Textarea
                              id="message"
                              name="message"
                              required
                              placeholder={language === 'es' ? 'Tu mensaje' : 'Your message'}
                              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                              rows={4}
                            />
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-blue-700 transition duration-300"
                          >
                            {language === 'es' ? 'Enviar mensaje' : 'Send message'}
                          </Button>
                        </form>
                      </div>
                      {formStatus.message && (
                        <div className={`mt-4 p-2 rounded ${formStatus.isError ? 'bg-red-600' : 'bg-green-600'}`}>
                          {formStatus.message}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.section>
            ))}
          </main>
        </div>
      </div>
    </div>
  )
}