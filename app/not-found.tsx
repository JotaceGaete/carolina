'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-dark">
      {/* Fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center relative z-10"
      >
        <AlertCircle className="w-24 h-24 text-gold mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 text-lg mb-8">
          Esta página no existe en el universo
        </p>
        <Link href="/">
          <motion.button
            className="px-8 py-4 rounded-full bg-gold text-dark font-semibold flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Volver al Inicio
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

