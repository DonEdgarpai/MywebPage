import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  canvas: HTMLCanvasElement
  opacity: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = Math.random() * 2 + 2 // Increased minimum size
    this.speedX = Math.random() * 2 - 1
    this.speedY = Math.random() * 2 - 1
    this.opacity = Math.random() * 0.5 + 0.8 // Added opacity
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#1a001a')
    gradient.addColorStop(0.5, '#4a0072')
    gradient.addColorStop(1, '#000033')

    const particles: Particle[] = []
    const particleCount = 200 // Increased particle count

    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas))
      }
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw(ctx)
      }

      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            const opacity = 1 - distance / 100 // Increased base opacity
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animateParticles)
    }

    createParticles()
    animateParticles()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle, rgba(238,174,202,0.2) 0%, rgba(148,187,233,0.1) 100%)',
            'radial-gradient(circle, rgba(174,238,238,0.2) 0%, rgba(148,187,233,0.1) 100%)',
            'radial-gradient(circle, rgba(238,174,202,0.2) 0%, rgba(148,187,233,0.1) 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </>
  )
}