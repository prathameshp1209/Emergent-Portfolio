import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import Tilt from 'react-tilt';
import { 
  Menu, 
  X, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  Calendar,
  Code,
  Palette,
  Database,
  Globe,
  Smartphone,
  Moon,
  Sun,
  ChevronDown,
  Send,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Quote,
  ArrowRight,
  Zap,
  Target,
  Coffee,
  Rocket,
  Heart,
  TrendingUp,
  Shield,
  Layers,
  PlayCircle,
  MessageCircle,
  Clock,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import './App.css';

// Floating shapes component
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${10 + i * 15}%`,
            top: `${10 + i * 10}%`,
          }}
        />
      ))}
    </div>
  );
};

// Custom cursor component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'stats', 'experience', 'projects', 'skills', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Stats data
  const stats = [
    { number: 4, label: 'Years Experience', suffix: '+', icon: Clock },
    { number: 50, label: 'Projects Completed', suffix: '+', icon: CheckCircle },
    { number: 25, label: 'Happy Clients', suffix: '+', icon: Heart },
    { number: 15, label: 'Technologies', suffix: '+', icon: Code }
  ];

  const skills = {
    frontend: [
      { name: 'React', level: 95, icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
      { name: 'Angular', level: 90, icon: '🅰️', color: 'from-red-500 to-pink-500' },
      { name: 'Next.js', level: 88, icon: '▲', color: 'from-gray-700 to-gray-900' },
      { name: 'TypeScript', level: 92, icon: '📘', color: 'from-blue-600 to-blue-800' },
      { name: 'Tailwind CSS', level: 95, icon: '🎨', color: 'from-teal-500 to-cyan-500' },
      { name: 'JavaScript', level: 95, icon: '🟨', color: 'from-yellow-500 to-orange-500' }
    ],
    backend: [
      { name: 'Node.js', level: 90, icon: '🟢', color: 'from-green-500 to-emerald-500' },
      { name: 'Express.js', level: 88, icon: '🚂', color: 'from-gray-600 to-gray-800' },
      { name: 'Python', level: 85, icon: '🐍', color: 'from-yellow-500 to-green-500' },
      { name: 'MongoDB', level: 85, icon: '🍃', color: 'from-green-600 to-green-800' },
      { name: 'PostgreSQL', level: 80, icon: '🐘', color: 'from-blue-600 to-indigo-600' },
      { name: 'GraphQL', level: 82, icon: '📊', color: 'from-pink-500 to-rose-500' }
    ],
    tools: [
      { name: 'Git', level: 95, icon: '📚', color: 'from-orange-500 to-red-500' },
      { name: 'Docker', level: 80, icon: '🐳', color: 'from-blue-500 to-blue-700' },
      { name: 'AWS', level: 75, icon: '☁️', color: 'from-orange-400 to-yellow-500' },
      { name: 'Jest', level: 85, icon: '🃏', color: 'from-green-500 to-teal-500' },
      { name: 'Webpack', level: 78, icon: '📦', color: 'from-blue-600 to-purple-600' },
      { name: 'Figma', level: 88, icon: '🎨', color: 'from-purple-500 to-pink-500' }
    ]
  };

  const experiences = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'TechCorp Solutions',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications using React, Node.js, and AWS. Mentoring junior developers and implementing best practices.',
      achievements: ['Improved app performance by 40%', 'Led team of 5 developers', 'Implemented CI/CD pipelines'],
      technologies: ['React', 'Node.js', 'AWS', 'MongoDB'],
      type: 'current'
    },
    {
      title: 'Full-Stack Developer',
      company: 'Digital Innovations Ltd',
      period: '2020 - 2022',
      description: 'Developed responsive web applications using Angular and Express.js. Collaborated with cross-functional teams to deliver high-quality products.',
      achievements: ['Built 10+ client applications', 'Reduced load times by 50%', 'Implemented real-time features'],
      technologies: ['Angular', 'Express.js', 'PostgreSQL'],
      type: 'past'
    },
    {
      title: 'Frontend Developer',
      company: 'StartupTech',
      period: '2019 - 2020',
      description: 'Created modern, responsive user interfaces using React and modern CSS frameworks. Focused on user experience and performance optimization.',
      achievements: ['Increased user engagement by 60%', 'Optimized mobile performance', 'Designed component library'],
      technologies: ['React', 'CSS3', 'JavaScript'],
      type: 'past'
    }
  ];

  const projects = [
    {
      title: 'AI-Powered E-Commerce Platform',
      description: 'A next-generation e-commerce solution with AI recommendations, real-time chat, and advanced analytics. Built with React, Node.js, and machine learning integration.',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
      technologies: ['React', 'Node.js', 'MongoDB', 'AI/ML', 'Socket.io'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'fullstack',
      featured: true,
      status: 'Live'
    },
    {
      title: 'Real-Time Collaboration Suite',
      description: 'A comprehensive collaboration platform with video calls, shared workspaces, and real-time document editing. Features WebRTC and operational transformation.',
      image: 'https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MHx8fHwxNzUxNDQ0MTY5fDA&ixlib=rb-4.1.0&q=85',
      technologies: ['Angular', 'WebRTC', 'Socket.io', 'TypeScript'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'frontend',
      featured: true,
      status: 'Live'
    },
    {
      title: 'Advanced Analytics Dashboard',
      description: 'A sophisticated analytics platform with real-time data visualization, predictive analytics, and customizable reports. Built for enterprise-scale data processing.',
      image: 'https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxzb2Z0d2FyZSUyMGRhc2hib2FyZHxlbnwwfHx8fDE3NTE0NDQxNzZ8MA&ixlib=rb-4.1.0&q=85',
      technologies: ['React', 'D3.js', 'Python', 'PostgreSQL', 'Redis'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'fullstack',
      featured: true,
      status: 'Live'
    },
    {
      title: 'Mobile-First PWA',
      description: 'A progressive web application with offline capabilities, push notifications, and native-like performance. Optimized for mobile devices.',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
      technologies: ['React', 'PWA', 'Service Workers', 'IndexedDB'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'frontend',
      featured: false,
      status: 'Live'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager at TechFlow',
      company: 'TechFlow Inc.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b000?w=150&h=150&fit=crop&crop=face',
      content: 'Alex is an exceptional developer who delivered our project ahead of schedule. His attention to detail and technical expertise is outstanding.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CTO at InnovateLab',
      company: 'InnovateLab',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Working with Alex was a game-changer for our startup. He built our entire platform from scratch and it scales beautifully.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Design Lead at CreativeStudio',
      company: 'CreativeStudio',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'Alex perfectly translated our designs into responsive, performant web applications. His code quality is exceptional.',
      rating: 5
    }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white mb-4"
          >
            Loading Portfolio...
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 1.5 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'} relative overflow-x-hidden`}>
      <CustomCursor />
      <FloatingShapes />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
        style={{ scaleX }}
        transformOrigin="0%"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/10 dark:bg-gray-900/10 backdrop-blur-2xl border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Alex Johnson
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'experience', 'projects', 'skills', 'testimonials', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 relative group ${
                    activeSection === item
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                    />
                  )}
                </motion.button>
              ))}
              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 rounded-xl bg-white/10 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/10 dark:bg-gray-900/10 backdrop-blur-2xl border-t border-white/20 dark:border-gray-700/20"
            >
              <div className="px-4 py-4 space-y-4">
                {['home', 'about', 'experience', 'projects', 'skills', 'testimonials', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left capitalize text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxkZXZlbG9wZXIlMjBjb2RpbmclMjB3b3Jrc3BhY2V8ZW58MHx8fHwxNzUxNDQ0MTQwfDA&ixlib=rb-4.1.0&q=85)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/60 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm font-medium mb-8">
                <Sparkles className="mr-2" size={16} />
                Available for freelance work
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            >
              Alex Johnson
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-3xl md:text-4xl mb-8 text-blue-300 font-light"
            >
              Full-Stack Developer & UI/UX Enthusiast
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed"
            >
              Crafting exceptional digital experiences with cutting-edge technologies. 
              Specializing in React, Angular, Node.js, and modern web development.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.button
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="mr-2 group-hover:animate-bounce" size={20} />
                Download Resume
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </motion.button>
              
              <motion.button 
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-2xl transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="mr-2 group-hover:animate-pulse" size={20} />
                Let's Talk
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex justify-center space-x-6 mt-12"
            >
              {[
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:alex@example.com', label: 'Email' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Numbers Don't Lie
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const { ref, inView } = useInView({
                threshold: 0.3,
                triggerOnce: true
              });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <Tilt
                    options={{
                      max: 25,
                      scale: 1.05,
                      speed: 300,
                    }}
                  >
                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="text-white" size={32} />
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                        {inView && (
                          <CountUp
                            end={stat.number}
                            duration={2}
                            suffix={stat.suffix}
                          />
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Tilt
                options={{
                  max: 15,
                  scale: 1.02,
                  speed: 300,
                }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl mr-4">
                      <User className="text-white" size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">My Story</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    I'm a passionate full-stack developer with 4+ years of experience building scalable, 
                    user-centric web applications. My journey began with a simple curiosity about how 
                    the web works, and it has evolved into a deep passion for creating digital solutions 
                    that make a real impact.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                    I specialize in React, Angular, and Node.js ecosystems, with expertise in modern 
                    development practices, cloud technologies, and agile methodologies. I believe in 
                    writing clean, maintainable code and creating intuitive user experiences.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Location', value: 'San Francisco, CA', icon: MapPin },
                      { label: 'Experience', value: '4+ Years', icon: Clock },
                      { label: 'Focus', value: 'Full-Stack Development', icon: Code }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <item.icon className="text-blue-500 mr-3" size={20} />
                        <span className="text-gray-600 dark:text-gray-300">
                          <strong className="text-gray-900 dark:text-white">{item.label}:</strong> {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                { 
                  icon: Code, 
                  title: 'Clean Code Philosophy', 
                  desc: 'Writing maintainable, scalable, and efficient code that stands the test of time',
                  color: 'from-blue-500 to-cyan-500'
                },
                { 
                  icon: Palette, 
                  title: 'UI/UX Excellence', 
                  desc: 'Creating beautiful, intuitive interfaces that provide exceptional user experiences',
                  color: 'from-purple-500 to-pink-500'
                },
                { 
                  icon: Rocket, 
                  title: 'Performance Optimization', 
                  desc: 'Building lightning-fast applications optimized for speed and scalability',
                  color: 'from-green-500 to-teal-500'
                },
                { 
                  icon: Shield, 
                  title: 'Security First', 
                  desc: 'Implementing robust security measures and best practices in every project',
                  color: 'from-orange-500 to-red-500'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Tilt
                    options={{
                      max: 10,
                      scale: 1.02,
                      speed: 300,
                    }}
                  >
                    <div className="flex items-start space-x-4 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300">
                      <div className={`bg-gradient-to-r ${item.color} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From startup energy to enterprise scale - here's my professional evolution
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-20 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 ${
                    exp.type === 'current' ? 'bg-green-500' : 'bg-blue-500'
                  } shadow-lg`}>
                  </div>
                  {exp.type === 'current' && (
                    <motion.div
                      className="absolute inset-0 w-6 h-6 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <Tilt
                    options={{
                      max: 15,
                      scale: 1.02,
                      speed: 300,
                    }}
                  >
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                            <Briefcase className="text-white" size={24} />
                          </div>
                          <span className={`text-sm font-bold px-4 py-2 rounded-full ${
                            exp.type === 'current' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800' 
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                          }`}>
                            {exp.period}
                          </span>
                        </div>
                        {exp.type === 'current' && (
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-green-500"
                          >
                            <Target size={20} />
                          </motion.div>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {exp.title}
                      </h3>
                      
                      <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
                        {exp.company}
                      </h4>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {exp.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <h5 className="font-semibold text-gray-900 dark:text-white flex items-center">
                          <TrendingUp className="mr-2" size={16} />
                          Key Achievements
                        </h5>
                        {exp.achievements.map((achievement, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                            {achievement}
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Tilt>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Showcasing innovative solutions and cutting-edge technologies
            </p>
            
            {/* Enhanced Filter buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { key: 'all', label: 'All Projects', icon: Layers },
                { key: 'frontend', label: 'Frontend', icon: Palette },
                { key: 'fullstack', label: 'Full-Stack', icon: Database }
              ].map((filter) => (
                <motion.button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedFilter === filter.key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/50 border border-white/20 dark:border-gray-700/20'
                  }`}
                  whileHover={{ scale: selectedFilter === filter.key ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <filter.icon className="mr-2" size={18} />
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Tilt
                    options={{
                      max: 25,
                      scale: 1.05,
                      speed: 300,
                    }}
                  >
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-500">
                      <div className="relative group overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              project.status === 'Live' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-orange-500 text-white'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center space-x-4">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github size={24} />
                          </motion.a>
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink size={24} />
                          </motion.a>
                        </div>
                        {project.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                              <Star className="mr-1" size={12} />
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full border border-blue-200 dark:border-blue-800"
                              whileHover={{ scale: 1.05 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View More Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="mr-2 group-hover:animate-pulse" size={20} />
              View All Projects on GitHub
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Constantly evolving tech stack with expertise across the full development spectrum
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Tilt
                  options={{
                    max: 20,
                    scale: 1.05,
                    speed: 300,
                  }}
                >
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-300 h-full">
                    <div className="text-center mb-8">
                      <div className={`bg-gradient-to-r ${
                        category === 'frontend' ? 'from-blue-500 to-cyan-500' :
                        category === 'backend' ? 'from-green-500 to-emerald-500' :
                        'from-purple-500 to-pink-500'
                      } p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {category === 'frontend' && <Palette className="text-white" size={32} />}
                        {category === 'backend' && <Database className="text-white" size={32} />}
                        {category === 'tools' && <Code className="text-white" size={32} />}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                        {category} {category === 'tools' ? 'Tools' : 'Development'}
                      </h3>
                    </div>
                    
                    <div className="space-y-6">
                      {skillList.map((skill, index) => {
                        const { ref, inView } = useInView({
                          threshold: 0.3,
                          triggerOnce: true
                        });

                        return (
                          <motion.div
                            key={skill.name}
                            ref={ref}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group/skill"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <span className="text-2xl mr-3 group-hover/skill:scale-125 transition-transform duration-300">
                                  {skill.icon}
                                </span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {skill.name}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                                className={`bg-gradient-to-r ${skill.color} h-3 rounded-full relative overflow-hidden`}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-white/30"
                                  animate={{ x: ['-100%', '100%'] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                              </motion.div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Client Testimonials
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              What clients say about working with me
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Tilt
                  options={{
                    max: 20,
                    scale: 1.05,
                    speed: 300,
                  }}
                >
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-300 h-full relative">
                    <div className="absolute top-4 right-4 text-blue-200 dark:text-blue-800">
                      <Quote size={32} />
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {testimonial.role}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Star className="text-yellow-400 fill-current" size={20} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to bring your ideas to life? I'm always excited to discuss new projects and opportunities.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Tilt
                options={{
                  max: 15,
                  scale: 1.02,
                  speed: 300,
                }}
              >
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                    <MessageCircle className="mr-3 text-blue-500" />
                    Get In Touch
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      { 
                        icon: Mail, 
                        label: 'Email', 
                        value: 'alex.johnson@email.com', 
                        href: 'mailto:alex.johnson@email.com',
                        color: 'from-red-500 to-pink-500'
                      },
                      { 
                        icon: Phone, 
                        label: 'Phone', 
                        value: '+1 (555) 123-4567', 
                        href: 'tel:+15551234567',
                        color: 'from-green-500 to-emerald-500'
                      },
                      { 
                        icon: MapPin, 
                        label: 'Location', 
                        value: 'San Francisco, CA', 
                        href: null,
                        color: 'from-blue-500 to-cyan-500'
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300">
                          <div className={`bg-gradient-to-r ${item.color} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="text-white" size={24} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{item.label}</p>
                            {item.href ? (
                              <a 
                                href={item.href} 
                                className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-lg font-bold text-gray-900 dark:text-white">{item.value}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                      <Heart className="mr-2 text-red-500" />
                      Connect With Me
                    </h4>
                    <div className="flex space-x-4">
                      {[
                        { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:bg-gray-800' },
                        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-600' },
                        { icon: Mail, href: 'mailto:alex@example.com', label: 'Email', color: 'hover:bg-red-500' },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl text-gray-600 dark:text-gray-300 ${social.color} hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.label}
                        >
                          <social.icon size={28} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Tilt
                options={{
                  max: 15,
                  scale: 1.02,
                  speed: 300,
                }}
              >
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                    <Send className="mr-3 text-blue-500" />
                    Send Message
                  </h3>
                  
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 group-hover:bg-white/70 dark:group-hover:bg-gray-700/70"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 group-hover:bg-white/70 dark:group-hover:bg-gray-700/70"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 group-hover:bg-white/70 dark:group-hover:bg-gray-700/70"
                        placeholder="Project Discussion"
                        required
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none group-hover:bg-white/70 dark:group-hover:bg-gray-700/70"
                        placeholder="Tell me about your project, timeline, and how I can help bring your vision to life..."
                        required
                      ></textarea>
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-2xl"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="mr-2 group-hover:animate-pulse" size={20} />
                      Send Message
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </motion.button>
                  </form>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-gray-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                Alex Johnson
              </div>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Full-Stack Developer passionate about creating exceptional digital experiences. 
                Always ready for the next challenge.
              </p>
              
              <div className="flex justify-center space-x-6 mb-12">
                {[
                  { icon: Github, href: 'https://github.com', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:alex.johnson@email.com', label: 'Email' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300 border border-white/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={28} />
                  </motion.a>
                ))}
              </div>
              
              <div className="border-t border-gray-800 pt-8">
                <p className="text-gray-400 flex items-center justify-center">
                  © 2025 Alex Johnson. Made with 
                  <Heart className="mx-2 text-red-500" size={16} />
                  using React & Tailwind CSS.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;