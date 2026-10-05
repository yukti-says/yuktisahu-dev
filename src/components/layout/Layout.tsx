import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import Dateline from './Dateline'
import Footer from './Footer'
import ScrollProgress from '../ui/ScrollProgress'
import BackToTop from '../ui/BackToTop'
import NewsletterPopup from '../ui/NewsletterPopup'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Dateline />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      <NewsletterPopup />
    </div>
  )
}
