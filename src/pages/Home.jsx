// App.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiSun, FiMoon } from "react-icons/fi";
import { FaJava, FaCode, FaDatabase, FaHtml5, FaReact, FaNodeJs } from 'react-icons/fa';
import ContactPage from "../pages/contact"
import { Mail, MessageCircle, Github, Linkedin,} from "lucide-react";

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
        title: 'Mithles Kumar',
        tagline: 'Crafting digital experiences that blend creativity with technology',
        cta1: 'Explore Work',
        cta2: 'Start Project'
      }
    },
    hi: {
      nav: ['होम', 'परिचय', 'कौशल', 'प्रोजेक्ट्स', 'अनुभव', 'संपर्क'],
      hero: {
        title: 'मिथलेश कुमार',
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
    localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
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
          <p className="text-xl font-semibold mb-2">Loading Project...</p>
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
      <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
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
                    : 'text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white'
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
              className="px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              {language === 'en' ? 'English' : 'हिंदी'}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </motion.button>

            {/* Mobile Menu */}
            <motion.button
              className="md:hidden p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                      : 'text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
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

// Updated Hero Section with Profile Image Layout
const HeroSection = ({ t }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Name and Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
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

            <div className="text-3xl md:text-4xl mb-8 h-20 flex items-center">
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
                className="text-gray-900 dark:text-gray-100 font-bold"
              />
            </div>

            <motion.p
              className="text-xl md:text-2xl mb-12 text-gray-900 dark:text-gray-100 max-w-3xl leading-relaxed"
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
              className="flex flex-col sm:flex-row justify-start items-start space-y-4 sm:space-y-0 sm:space-x-6"
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
                className="px-12 py-4 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-2xl font-bold text-lg hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-all duration-300"
              >
                {t.cta2}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Profile Image Container */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="w-80 h-80 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-2"
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-700">
                  {/* Replace with your actual profile image */}
                  <img
                    src="/profile-image.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback if image doesn't load */}
                  <div className="hidden w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center text-white text-6xl font-bold">
                    MK
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements around profile */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-24 h-24 border-2 border-blue-400 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-purple-400 rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '20+', label: 'Projects', icon: '🚀' },
            { number: '1+', label: 'Years', icon: '💼' },
            { number: '10K+', label: 'Lines of Code', icon: '💻' },
            { number: '24/7', label: 'Support', icon: '🔧' }
          ].map((stat) => (
            <HolographicCard key={stat.label} className="p-6 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.number}</div>
              <div className="text-gray-900 dark:text-gray-100 text-sm">{stat.label}</div>
            </HolographicCard>
          ))}
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
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
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
                className="text-lg text-gray-900 dark:text-gray-100 leading-relaxed"
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
  { 
    name: 'Java', 
    level: 65, 
    color: 'from-blue-500 to-indigo-500', 
    icon: <FaJava className="text-red-500" /> 
  },
  { 
    name: 'C/C++', 
    level: 75, 
    color: 'from-purple-500 to-pink-500', 
    icon: <FaCode className="text-blue-400" /> 
  },
  { 
    name: 'SQL', 
    level: 60, 
    color: 'from-orange-500 to-red-500', 
    icon: <FaDatabase className="text-blue-600" /> 
  },
  { 
    name: 'HTML/Tailwind CSS', 
    level: 90, 
    color: 'from-pink-500 to-rose-500', 
    icon: <FaHtml5 className="text-orange-500" /> 
  },
  { 
    name: 'React', 
    level: 80, 
    color: 'from-cyan-500 to-blue-500', 
    icon: <FaReact className="text-cyan-400" /> 
  },
  { 
    name: 'Node.js', 
    level: 60, 
    color: 'from-green-500 to-emerald-500', 
    icon: <FaNodeJs className="text-green-600" /> 
  },
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
                      className="text-gray-200 black:text-black-000"
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
                    <span className="text-3xl text-black dark:text-gray-200">
                      {skill.icon}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  {skill.name}
                </h3>

                <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-gray-900 dark:text-white">
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
      description:
        'Next.js application with AI-powered image generation using machine learning models',
      tech: ['React.js', 'Node.js', 'Tailwind', 'MySQL'],
      status: 'Live',
      gradient: 'from-purple-500 to-pink-500',
      link: 'https://ai-image-generator-demo.vercel.app',
    },
    {
      title: 'E-Commerce Platform',
      description:
        'Full-stack e-commerce solution with real-time inventory and payment processing',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'Live',
      gradient: 'from-blue-500 to-cyan-500',
      link: 'https://ecommerce-platform-demo.vercel.app',
    },
    {
      title: 'College Management System',
      description:
        'Comprehensive platform for managing college operations, including student enrollment, course management, and grading',
      tech: ['Vue.js', 'Tailwind CSS', 'Node.js', 'MySQL'],
      status: 'Live',
      gradient: 'from-sky-500 to-red-500',
      link: 'https://college-management-demo.vercel.app',
    },
    {
      title: 'Student Management System',
      description:
        'Comprehensive platform for managing student operations, including enrollment, course management, and grading',
      tech: ['Vue.js', 'Tailwind CSS', 'Node.js', 'MySQL'],
      status: 'Live',
      gradient: 'from-blue-500 to-red-500',
      link: 'https://student-management-demo.vercel.app',
    },
    {
      title: 'Mobile Furniture App',
      description:
        'Cross-platform furniture shopping application with AR features',
      tech: ['React Native', 'PostgreSQL', 'Tailwind CSS'],
      status: 'Beta',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      title: 'Mobile Music App',
      description:
        'Comprehensive platform for managing music playlists, including song recommendations and social sharing features',
      tech: ['React Native', 'PostgreSQL', 'CSS'],
      status: 'Live',
      gradient: 'from-orange-500 to-red-500',
      link: 'https://mobile-music-app-demo.vercel.app',
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  // Function to handle project card click
  const handleProjectClick = (project) => {
    if (project.status === 'Live' && project.link) {
      // Open live site in new tab
      window.open(project.link, '_blank', 'noopener,noreferrer');
    } else {
      // Open modal for non-live projects
      setSelectedProject(project);
    }
  };

  // Function to handle live badge click (optional separate action)
  const handleLiveBadgeClick = (project, event) => {
    event.stopPropagation(); // Prevent card click from triggering
    if (project.status === 'Live' && project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-center mb-16"
        >
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Projects
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
              className="relative group"
              onClick={() => handleProjectClick(project)}
            >
              <div className={`bg-gradient-to-r ${project.gradient} p-1 rounded-3xl transition-all duration-500 group-hover:scale-105 ${
                project.status === 'Live' && project.link 
                  ? 'cursor-pointer' 
                  : 'cursor-default'
              }`}>
                <GlassCard className="p-8 h-full relative">
                  {/* Live Project Overlay Indicator */}
                  {project.status === 'Live' && project.link && (
                    <div className="absolute inset-0 rounded-3xl bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {project.title}
                    </h3>
                    
                    {/* Status Badge */}
                    {project.status === 'Live' && project.link ? (
                      <button
                        onClick={(e) => handleLiveBadgeClick(project, e)}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white hover:bg-green-600 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1 z-20"
                        title="Click to visit live site"
                      >
                        Live 🔗
                      </button>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          project.status === 'Beta'
                            ? 'bg-yellow-500 text-black'
                            : 'bg-blue-500 text-white'
                        }`}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>



                  <div className="flex flex-wrap gap-2 relative z-10">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/50 dark:bg-gray-800/50 rounded-full text-sm text-gray-900 dark:text-gray-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Live Project Click Indicator */}
                  {project.status === 'Live' && project.link && (
                    <>
                      <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse z-20" />
                      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-green-500/30 transition-all duration-300 pointer-events-none" />
                    </>
                  )}
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Project Modal */}
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
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  ×
                </button>
                
                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {selectedProject.title}
                </h3>
                
                <p className="text-gray-900 dark:text-gray-100 mb-6">
                  {selectedProject.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-900 dark:text-gray-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {selectedProject.status === 'Live' && selectedProject.link ? (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105"
                    >
                      Visit Live Site ↗
                    </a>
                  ) : null}
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all"
                  >
                    Close
                  </button>
                </div>
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
      year: '2025',
      role: 'Software Engineer',
      company: 'Tech Innovators Inc.',
      achievements: [
        'Developing high-performance web applications',
        'Collaborating in agile sprints with cross-functional teams',
        'Contributing to scalable front-end architecture using React and Node.js'
      ],
    },
    {
      year: '2024',
      role: 'Lead Developer (Internship)',
      company: 'Tech Innovators Inc.',
      achievements: [
        'Led a team of 10 developers in product development',
        'Boosted performance and code efficiency by 40%',
        'Delivered 5 major web products to production'
      ],
    },
    {
      year: '2023',
      role: 'Full Stack Developer (Internship)',
      company: 'No Company',
      achievements: [
        'Built scalable MERN applications',
        'Mentored junior interns and reviewed pull requests',
        'Optimized CI/CD pipelines using GitHub Actions'
      ],
    },
    {
      year: '2022 – 2025',
      role: 'B.Tech in Computer Science & Engineering',
      company: 'SVIET College',
      achievements: [
        'Specialized in software engineering, and web technologies',
        'Completed academic projects on algorithms and full-stack development',
        'Participated in coding hackathons and research seminars'
      ],
    },
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
                  <div className="text-sm text-gray-900 dark:text-black mb-2">{exp.year}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-black mb-2">
                    {exp.role}
                  </h3>
                  <div className="text-lg text-gray-100 dark:text-black mb-3">
                    {exp.company}
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-gray-900 dark:text-black">
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
  const contactMethods = [
    {
      label: "Email",
      value: "hello@example.com",
      action: "mailto:hello@example.com",
      icon: <Mail className="w-8 h-8" />
    },
    {
      label: "WhatsApp",
      value: "Message me",
      action: "https://wa.me/15551234567",
      icon: <MessageCircle className="w-8 h-8" />
    },
    {
      label: "GitHub",
      value: "@username",
      action: "https://github.com/username",
      icon: <Github className="w-8 h-8" />
    },
    {
      label: "LinkedIn",
      value: "Connect with me",
      action: "https://linkedin.com/in/username",
      icon: <Linkedin className="w-8 h-8" />
    }
  ];

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

        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Contact Methods */}
          <div className="grid grid-cols-2 gap-6 h-full">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.action}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="block h-full"
              >
                <div className="p-6 text-center group cursor-pointer transition-all duration-300 h-full flex flex-col justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/20 hover:border-white/30">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 text-white-100 dark:text-black">
                    {method.icon}
                  </div>
                  <div className="font-semibold mb-2 text-white-100 dark:text-black">
                    {method.label}
                  </div>
                  <div className="text-sm text-white-100 dark:text-black opacity-80">
                    {method.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-8 h-full">
            <ContactPage />
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Modern Footer
const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

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
    <footer data-theme={darkMode ? 'dark' : 'light'} className="relative overflow-hidden">
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
                <span>Full Stack Developer</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📱</span>
                <span>Mobile Apps</span>
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
          className="pt-2 border-t border-white/20 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0"
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
      </div>
    </footer>
  );
};

export default Portfolio;