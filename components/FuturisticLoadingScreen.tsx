"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Globe } from 'lucide-react'
import styles from './FuturisticLoadingScreen.module.css'

interface FuturisticLoadingScreenProps {
  onContinue: () => void
  initialLanguage: string
}

const colors = ['#0060fe', '#FF00FF', '#FFFF00', '#FF1493', '#00FF00', '#FF4500']

export default function FuturisticLoadingScreen({ onContinue, initialLanguage }: FuturisticLoadingScreenProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [titleColor, setTitleColor] = useState('#8B0000')
  const [language, setLanguage] = useState(initialLanguage)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showContent) {
      const interval = setInterval(() => {
        setTitleColor(colors[Math.floor(Math.random() * colors.length)])
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [showContent])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es')
  }

  return (
    <div className={styles.container}>
      {[...Array(150)].map((_, index) => (
        <div
          key={index}
          className={styles.star}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}
        />
      ))}

      <motion.div
        className={styles.movingLine}
        initial={{ left: '-100%' }}
        animate={{ left: '100%' }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Diagonal lines moving from top-left to bottom-right */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={`diagonal-right-${index}`}
          className={`${styles.movingLineDiagonal} ${styles.diagonalRight}`}
          style={{
            top: `${-100 + index * 100}%`,
            left: '-100%',
          }}
          initial={{ left: '-100%' }}
          animate={{ left: '100%' }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 2,
          }}
        />
      ))}

      {/* Diagonal lines moving from top-right to bottom-left */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={`diagonal-left-${index}`}
          className={`${styles.movingLineDiagonal} ${styles.diagonalLeft}`}
          style={{
            top: `${-100 + index * 100}%`,
            right: '-100%',
          }}
          initial={{ right: '-100%' }}
          animate={{ right: '100%' }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 2,
          }}
        />
      ))}
      
      <AnimatePresence>
        {showContent && (
          <>
            <motion.h1
              className={`${styles.neonText} ${styles.varinoFont}`}
              initial={{ opacity: 1, y: -20 }}
              animate={{ opacity: 1, y: 0, color: titleColor }}
              transition={{ duration: 1, delay: 0 }}
            >
              {language === 'es' ? 'Bienvenido a mi portafolio' : 'Welcome to my portfolio'}
            </motion.h1>
            
            <motion.div
              className={styles.logoContainer}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <img
                src="/images/LOADLOGO.png"
                alt="Logo"
                className={styles.logo}
              />
            </motion.div>
            
            <motion.button
              className={`${styles.neonButton} ${styles.varinoFont}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={onContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isHovered ? { boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff" } : {opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {language === 'es' ? 'Continuar' : 'Continue'}
            </motion.button>

            <motion.div
              className={styles.heart}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <Heart size={16} fill="#FFA500" stroke="#FFA500" />
            </motion.div>

            <motion.button
              className={styles.languageToggle}
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Globe size={24} />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}