import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Wrench, CreditCard, Calendar, Phone } from 'lucide-react';
import Faq from './components/Home/Faq';
import InsurancePartner from './components/Home/InsurencePartner';
import Guarantee from './components/Home/Guarantee';
import HowItWorks from './components/Home/HowItWorks';
import Services from './components/Home/Services';
import Workshops from './components/Home/Workshops';
import InsuranceClaims from './components/Home/InsuranceClaims';
import Testimonials from './components/Home/Testimonials';
import Footer from './components/Home/Footer';
import Hero from './components/Home/Hero';
import Live from './components/Home/Live';
import Best from './components/Home/Best';
import mainlogo from './assets/mainlogo.png'

// Smooth scroll utility function
const smoothScrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = 80; // Adjust based on your navbar height
    const targetPosition = element.offsetTop - navbarHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

// --- SVG ICONS ---
const MenuIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// --- Reusable Components ---
const AnimatedSection = ({ children, className, id }) => (
  <motion.section 
    id={id} 
    className={className} 
    initial="hidden" 
    whileInView="visible" 
    viewport={{ once: true, amount: 0.2 }}
    variants={{ 
      hidden: { opacity: 0, y: 50 }, 
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } 
    }}
  >
    {children}
  </motion.section>
);

// --- ENHANCED MOBILE NAVIGATION ---
const MobileNav = ({ isOpen, closeMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (href) => {
    closeMenu();
    
    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => smoothScrollToSection(sectionId), 100);
      } else {
        smoothScrollToSection(sectionId);
      }
    } else {
      navigate(href);
    }
  };

  const navLinks = [
    { 
      title: "Services", 
      href: "/#services", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      description: "Explore our services"
    },
    { 
      title: "How It Works", 
      href: "/#how-it-works", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: "Simple & fast process"
    },
    { 
      title: "Insurance", 
      href: "/#insurance", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "Protected coverage"
    },
    { 
      title: "Workshops", 
      href: "/#workshops", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: "Trusted partners"
    },
    { 
      title: "FAQ", 
      href: "/faq", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "Common questions"
    }
  ];

  const menuVariants = {
    hidden: { 
      x: '100%',
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    visible: { 
      x: 0,
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.06,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { 
      x: 30,
      opacity: 0
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-gray-900/20 backdrop-blur-md z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeMenu}
          />
          
          <motion.div 
            className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white z-50 shadow-2xl overflow-y-auto"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col h-full">
              <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-5 z-10">
                <div className="flex justify-between items-center">
                  <motion.div 
                    className="flex items-center text-blue-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="h-16 w-16 rounded-full flex items-center justify-center text-white font-bold">
                      <img src={mainlogo}/>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight ml-2">Mechanic Uncle</span>
                  </motion.div>
                  
                  <motion.button 
                    onClick={closeMenu} 
                    className="p-2.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <CloseIcon />
                  </motion.button>
                </div>
              </div>

              <motion.div 
                className="flex-grow px-6 py-8"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="mb-8"
                  variants={itemVariants}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome Back! 👋
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Discover our premium car care services
                  </p>
                </motion.div>

                <motion.nav className="space-y-3">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.title}
                      variants={itemVariants}
                    >
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="group block w-full text-left"
                      >
                        <motion.div 
                          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 hover:from-blue-50 hover:to-blue-100/50 p-5 transition-all duration-300 border border-gray-200/50 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50"
                          whileHover={{ x: 4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white group-hover:bg-blue-600 flex items-center justify-center shadow-sm transition-all duration-300 text-blue-600 group-hover:text-white border border-gray-200 group-hover:border-blue-600">
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                {link.icon}
                              </motion.div>
                            </div>
                            
                            <div className="flex-grow min-w-0">
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-1">
                                {link.title}
                              </h3>
                              <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                                {link.description}
                              </p>
                            </div>

                            <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-all duration-300 group-hover:translate-x-1">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>

                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.8 }}
                          />
                        </motion.div>
                      </button>
                    </motion.div>
                  ))}
                </motion.nav>

                <motion.div 
                  className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      <span className="font-bold text-lg">Special Offer</span>
                    </div>
                    <p className="text-blue-100 text-sm mb-4">
                      Get 20% off on your first service booking
                    </p>
                    <motion.button 
                      className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Claim Offer
                    </motion.button>
                  </div>
                  
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
                </motion.div>
              </motion.div>

              <motion.div 
                className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button 
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeMenu}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Service Now
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
                
                <p className="text-center text-xs text-gray-500 mt-3">
                  Available 24/7 • Free Pickup & Drop
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- ENHANCED NAVBAR ---
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => smoothScrollToSection(sectionId), 100);
      } else {
        smoothScrollToSection(sectionId);
      }
    } else {
      navigate(href);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const toggleBodyScroll = () => {
      document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    };
    toggleBodyScroll();
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const navLinks = [
    { title: "Services", href: "/#services" },
    { title: "How It Works", href: "/#how-it-works" },
    { title: "Insurance", href: "/#insurance" },
    { title: "Workshops", href: "/#workshops" },
    { title: "FAQ", href: "/faq" }
  ];

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' 
            : 'bg-white/90 backdrop-blur-lg shadow-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-6">
          <div className={`flex justify-between items-center transition-all duration-300 ${
            scrolled ? 'py-3' : 'py-4'
          }`}>
            <Link 
              to="/" 
              className="flex items-center text-blue-600 group relative"
            >
              <div className="relative">
                <div className={` rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
                  scrolled ? 'h-16 w-16' : 'h-20 w-20'
                }`}>
                <img src={mainlogo}/>
                </div>
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="ml-3">
                <span className={`font-extrabold tracking-tight block transition-all duration-300 ${
                  scrolled ? 'text-xl' : 'text-2xl'
                }`}>
                  Mechanic Uncle
                </span>
                <span className="text-xs text-gray-500 font-medium">Premium Car Care</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredLink(link.title)}
                  onHoverEnd={() => setHoveredLink(null)}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-5 py-2.5 font-semibold transition-colors duration-300 group ${
                      location.pathname === link.href || (link.href.startsWith('/#') && location.pathname === '/')
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <span className="relative z-10">{link.title}</span>
                    
                    <motion.span 
                      className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                      initial={{ width: 0, x: '-50%' }}
                      animate={{ 
                        width: hoveredLink === link.title ? '80%' : 0,
                        x: '-50%'
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl -z-10"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: hoveredLink === link.title ? 1 : 0,
                        opacity: hoveredLink === link.title ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </a>
                </motion.div>
              ))}

              <div className="w-px h-8 bg-gray-200 mx-2" />

              <motion.button
                className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden group"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Now
                </span>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  initial={{ x: '-200%' }}
                  animate={{ x: '200%' }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3, 
                    ease: "easeInOut",
                    repeatDelay: 1 
                  }}
                />
              </motion.button>
            </div>

            <motion.button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden relative p-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MenuIcon />
            </motion.button>
          </div>
        </div>

        {scrolled && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: 'left' }}
          />
        )}
      </motion.nav>

      <MobileNav 
        isOpen={isMenuOpen} 
        closeMenu={() => setIsMenuOpen(false)}
      />
    </>
  );
};




// --- CTA SECTION ---
const CTA = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Experience Car Service, Reimagined?
        </motion.h2>
        <motion.p 
          className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Get an instant estimate and book your service in just a few clicks. Your car deserves the best.
        </motion.p>
        <motion.button 
          className="py-4 px-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Book a Service Now</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </div>
    </section>
  );
};

// --- HOME PAGE ---
const HomePage = () => {
  return (
    <main className="pt-24">
      <Hero />
      <AnimatedSection id="best" className="bg-gray-50">
        <Best />
      </AnimatedSection>
      <AnimatedSection id="guarantee" className="bg-white">
        <Guarantee />
      </AnimatedSection>
      <AnimatedSection id="how-it-works" className="bg-gray-50">
        <HowItWorks />
      </AnimatedSection>
      <AnimatedSection id="services" className="bg-white">
        <Services />
      </AnimatedSection>
      <AnimatedSection id="workshops" className="bg-gray-50">
        <Workshops />
      </AnimatedSection>
      <AnimatedSection id="insurance" className="bg-white">
        <InsuranceClaims />
      </AnimatedSection>
      <AnimatedSection id="insurance-partner" className="bg-gray-50">
        <InsurancePartner />
      </AnimatedSection>
      <Testimonials />
      <CTA />
    </main>
  );
};

// --- MAIN APP ---
function App() {
  return (
    <Router>
      <div className="font-sans antialiased bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;