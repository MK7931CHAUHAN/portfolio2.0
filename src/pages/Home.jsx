// App.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiSun, FiMoon } from "react-icons/fi";
// Theme Context
const ThemeContext = createContext();

// 3D Floating Elements Background
const Floating3DBackground = () => {
  const shapes = [
    { icon: '⚡', size: 60, x: 10, y: 20, delay: 0 },
    { icon: '🚀', size: 50, x: 85, y: 15, delay: 1 },
    { icon: '🎨', size: 45, x: 15, y: 70, delay: 2 },
    { icon: '💻', size: 55, x: 80, y: 65, delay: 3 },
    { icon: '🌐', size: 40, x: 50, y: 40, delay: 4 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-10 dark:opacity-5"
          style={{
            fontSize: `${shape.size}px`,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {shape.icon}
        </motion.div>
      ))}
    </div>
  );
};

// Interactive Grid Background
const InteractiveGrid = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 opacity-5 dark:opacity-10 pointer-events-none z-0"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, 0.3) 0%, 
            transparent 50%
          )
        `
      }}
    />
  );
};

// Glass Morphism Component
const GlassCard = ({ children, className = "" }) => (
  <div className={`backdrop-blur-lg bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-3xl ${className}`}>
    {children}
  </div>
);

// Holographic Effect Component
const HolographicCard = ({ children, className = "" }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
    <div className="relative backdrop-blur-lg bg-white/5 dark:bg-gray-900/5 border border-white/20 dark:border-gray-700/20 rounded-3xl">
      {children}
    </div>
  </div>
);

// Neural Network Animation
const NeuralNetwork = () => {
  const nodes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          {/* Connections */}
          {nodes.slice(i + 1, i + 3).map((target) => (
            <motion.div
              key={`${i}-${target.id}`}
              className="absolute h-0.5 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${Math.sqrt(Math.pow(target.x - node.x, 2) + Math.pow(target.y - node.y, 2))}%`,
                transform: `rotate(${Math.atan2(target.y - node.y, target.x - node.x) * 180 / Math.PI}deg)`,
                transformOrigin: 'left center'
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                delay: node.delay,
                repeat: Infinity,
              }}
            />
          ))}

          {/* Nodes */}
          <motion.div
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              delay: node.delay,
              repeat: Infinity,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      nav: ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'],
      hero: {
        title: 'Mithles kumar',
        tagline: 'Crafting digital experiences that blend creativity with technology',
        cta1: 'Explore Work',
        cta2: 'Start Project'
      }
    },
    hi: {
      nav: ['होम', 'परिचय', 'कौशल', 'प्रोजेक्ट्स', 'अनुभव', 'संपर्क'],
      hero: {
        title: 'नवीन डेवलपर',
        tagline: 'रचनात्मकता और प्रौद्योगिकी का मेल करने वाले डिजिटल अनुभव बनाना',
        cta1: 'काम देखें',
        cta2: 'प्रोजेक्ट शुरू करें'
      }
    }
  };

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(systemPrefersDark);
    }

    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const t = translations[language];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-white text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
          />
          <p className="text-xl font-semibold mb-2">Loading Innovation...</p>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm flex items-center justify-center space-x-2"
          >
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, language, setLanguage }}>
      <div className={`min-h-screen transition-all duration-500 ${darkMode
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'
        }`}>
        <Floating3DBackground />
        <InteractiveGrid />
        <NeuralNetwork />
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} t={t} />
        <HeroSection t={t.hero} />
        <AboutSection />
        <SkillsShowcase />
        <ProjectsGallery />
        <ExperienceTimeline />
        <ContactSphere />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

// Enhanced Navigation with Morphing Design
const Navigation = ({ activeSection, setActiveSection, t }) => {
  const { darkMode, setDarkMode, language, setLanguage } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/20"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Innovator
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveSection(item);
                  document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 relative overflow-hidden ${activeSection === item
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {activeSection === item && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 capitalize">
                  {t.nav[navItems.indexOf(item)]}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              {language === 'en' ? 'English' : 'हिंदी'}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
            >
              {darkMode ?  <FiSun /> : <FiMoon />}
            </motion.button>

            {/* Mobile Menu */}
            <motion.button
              className="md:hidden p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`w-6 h-0.5 ${darkMode ? 'bg-gray-300' : 'bg-gray-600'} mb-1.5 transition-all`} />
              <div className={`w-6 h-0.5 ${darkMode ? 'bg-gray-300' : 'bg-gray-600'} mb-1.5 transition-all`} />
              <div className={`w-6 h-0.5 ${darkMode ? 'bg-gray-300' : 'bg-gray-600'} transition-all`} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-2 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl p-4 border border-white/20 dark:border-gray-700/20"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => {
                    setActiveSection(item);
                    setIsMenuOpen(false);
                    document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`block w-full text-left capitalize px-4 py-3 rounded-xl transition-all duration-200 ${activeSection === item
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  {t.nav[navItems.indexOf(item)]}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Futuristic Hero Section
const HeroSection = ({ t }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Main Content */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1"
          >
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-4xl">
              <img src="/vite.svg" alt="Logo" width={64} height={64} className="w-16 h-16" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-8xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t.title}
            </span>
          </motion.h1>

          <div className="text-3xl md:text-4xl mb-8 h-20 flex items-center justify-center">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'Tech Innovator',
                2000,
                'AI Enthusiast',
                2000,
                'Problem Solver',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-gray-700 dark:text-gray-300 font-bold"
            />
          </div>

          <motion.p
            className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t.tagline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              {t.cta1}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {t.cta2}
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: '50+', label: 'Projects', icon: '🚀' },
              { number: '1+', label: 'Years', icon: '💼' },
              { number: '99%', label: 'Success', icon: '🎯' },
              { number: '24/7', label: 'Support', icon: '🔧' }
            ].map((stat) => (
              <HolographicCard key={stat.label} className="p-6 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
              </HolographicCard>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Interactive About Section
const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = {
    mission: {
      icon: '🎯',
      title: 'Mission',
      content: 'Creating digital solutions that solve real-world problems through innovative technology and user-centered design.'
    },
    vision: {
      icon: '🔮',
      title: 'Vision',
      content: 'To push the boundaries of web and mobile development, creating experiences that inspire and empower users worldwide.'
    },
    values: {
      icon: '💎',
      title: 'Values',
      content: 'Innovation, Quality, Collaboration, and Continuous Learning drive every project and decision.'
    }
  };

  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-16"
        >
          <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            About Vision
          </span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Tabs */}
          <GlassCard className="p-8">
            <div className="flex space-x-4 mb-8">
              {Object.entries(tabs).map(([key, tab]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${activeTab === key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-semibold">{tab.title}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                {tabs[activeTab].content}
              </motion.div>
            </AnimatePresence>
          </GlassCard>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative h-96"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl" />
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity }
              }}
              className="absolute inset-8 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-2xl"
            />
            <div className="absolute inset-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Circular Skills Showcase
const SkillsShowcase = () => {
  const skills = [
    { name: 'React', level: 95, color: 'from-cyan-500 to-blue-500', icon: '⚛️' },
    { name: 'Node.js', level: 88, color: 'from-green-500 to-emerald-500', icon: '🟢' },
    { name: 'TypeScript', level: 90, color: 'from-blue-500 to-indigo-500', icon: '📘' },
    { name: 'AI/ML', level: 75, color: 'from-purple-500 to-pink-500', icon: '🤖' },
    { name: 'Cloud', level: 85, color: 'from-orange-500 to-red-500', icon: '☁️' },
    { name: 'UI/UX', level: 92, color: 'from-pink-500 to-rose-500', icon: '🎨' },
  ];

  return (
    <section id="skills" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Core Expertise
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <HolographicCard className="p-8 text-center">
                {/* Circular Progress */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: '0 251' }}
                      whileInView={{ strokeDasharray: `${(skill.level / 100) * 251} 251` }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className={`text-${skill.color.split('-')[1]}-500`} />
                        <stop offset="100%" className={`text-${skill.color.split('-')[3]}-500`} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl">{skill.icon}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {skill.name}
                </h3>
                <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {skill.level}%
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Interactive Projects Gallery
const ProjectsGallery = () => {
  const projects = [
    {
      title: 'AI Image Generator',
      description: 'Next.js application with AI-powered image generation using machine learning models',
      tech: ['Next.js', 'AI/ML', 'Tailwind', 'Cloud'],
      status: 'Live',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory and payment processing',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'Live',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Mobile Fitness App',
      description: 'Cross-platform fitness tracking application with AI workout recommendations',
      tech: ['React Native', 'Firebase', 'AI', 'HealthKit'],
      status: 'Beta',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      title: 'Blockchain Dashboard',
      description: 'Real-time cryptocurrency tracking and portfolio management dashboard',
      tech: ['Vue.js', 'Web3', 'Node.js', 'WebSocket'],
      status: 'Development',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-16"
        >
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Innovation Gallery
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className={`bg-gradient-to-r ${project.gradient} p-1 rounded-3xl transition-all duration-500 group-hover:scale-105`}>
                <GlassCard className="p-8 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {project.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${project.status === 'Live' ? 'bg-green-500 text-white' :
                        project.status === 'Beta' ? 'bg-yellow-500 text-black' :
                          'bg-blue-500 text-white'
                      }`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/50 dark:bg-gray-800/50 rounded-full text-sm text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 dark:to-gray-900/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{selectedProject.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {selectedProject.description}
                </p>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// 3D Experience Timeline
const ExperienceTimeline = () => {
  const experiences = [
    {
      year: '2024',
      role: 'Lead Developer',
      company: 'TechInnovate',
      achievements: ['Led team of 10 developers', 'Increased performance by 40%', 'Launched 5 major products']
    },
    {
      year: '2023',
      role: 'Senior Developer',
      company: 'DigitalSolutions',
      achievements: ['Built scalable architectures', 'Mentored junior developers', 'Optimized CI/CD pipelines']
    },
    {
      year: '2022',
      role: 'Full Stack Developer',
      company: 'StartUp Ventures',
      achievements: ['Developed MVP products', 'Integrated third-party APIs', 'Improved user engagement']
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-16"
        >
          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Journey Timeline
          </span>
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
            >
              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <HolographicCard className="p-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{exp.year}</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {exp.role}
                  </h3>
                  <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                    {exp.company}
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-gray-700 dark:text-gray-400">
                        <span className="text-green-500">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </HolographicCard>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white dark:border-gray-900" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Interactive Contact Sphere
const ContactSphere = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const contactMethods = [
    { icon: '📧', label: 'Email', value: '', action: 'mailto:mkchauhan9263@gmail.com' },
    { icon: '📱', label: 'Phone', value: '', action: 'tel:+917631574672' },
    { icon: '💼', label: 'LinkedIn', value: '', action: 'https://linkedin.com' },
    { icon: '🐙', label: 'GitHub', value: '', action: 'https://github.com/MK7931CHAUHAN' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-16"
        >
          <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Let's Connect
          </span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Methods */}
          <div className="grid grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.action}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="block"
              >
                <HolographicCard className="p-6 text-center group cursor-pointer transition-all duration-300">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 text-black dark:text-white">
                    {method.icon}
                  </div>

                  <div className="font-semibold mb-2 text-black dark:text-white">
                    {method.label}
                  </div>

                  <div className="text-sm text-black dark:text-white">
                    {method.value}
                  </div>
                </HolographicCard>



              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Send Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                />
              </div>

              {/* Submit Status */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-600 dark:text-green-400 text-center"
                  >
                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

// Enhanced Modern Footer
const Footer = () => {
  // Removed unused darkMode variable
  useContext(ThemeContext);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: '🐙', href: 'https://github.com' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com' },
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com' },
    { name: 'Instagram', icon: '📷', href: 'https://instagram.com' }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Innovator<span className="text-pink-400">.</span>
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Crafting digital experiences that blend creativity with cutting-edge technology.
              Let's build the future together.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-4 text-blue-100">
              <li className="flex items-center space-x-2">
                <span>🚀</span>
                <span>Web Development</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📱</span>
                <span>Mobile Apps</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🎨</span>
                <span>UI/UX Design</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🤖</span>
                <span>AI Solutions</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xl font-semibold text-white mb-6">Stay Updated</h4>
            <p className="text-blue-100 mb-4">Get the latest updates and insights.</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-pink-500 text-white rounded-2xl font-semibold hover:bg-pink-600 transition-colors duration-300"
              >
                Join
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-blue-100 text-center md:text-left">
            © 2024 Innovator Portfolio. Crafted with ❤️ for the future.
          </p>
          <div className="flex space-x-6 text-blue-100">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Cookies</a>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center space-x-2"
          >
            <span>🚀</span>
            <span>Start Your Project</span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Portfolio;