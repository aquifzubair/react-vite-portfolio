import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import Button from './Button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    // Default to dark mode if no theme is saved, or if saved is 'dark'
    // This effectively makes 'dark' the default for new users
    if (savedTheme === 'dark' || !savedTheme) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = href => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-secondary-900/90 backdrop-blur-md shadow-lg'
          : isOpen
            ? 'bg-white/95 dark:bg-secondary-900/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
      }`}
      style={{ zIndex: 9997 }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-max section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold text-gradient cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('#home')}
          >
            Aquif Zubair
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <motion.button
                key={item.name}
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
              >
                {item.name}
              </motion.button>
            ))}

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              icon={isDark ? HiSun : HiMoon}
              className="!p-2"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              icon={isDark ? HiSun : HiMoon}
              className="!p-2"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              icon={isOpen ? HiX : HiMenu}
              className="!p-2"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
                style={{ zIndex: 99998 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
              />

              {/* Menu */}
              <motion.div
                ref={menuRef}
                className="md:hidden fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white dark:bg-secondary-900 shadow-2xl border-l border-secondary-200 dark:border-secondary-700"
                style={{ zIndex: 99999 }}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{
                  duration: 0.35,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-secondary-200/30 dark:border-secondary-700/30 flex-shrink-0">
                    <motion.div
                      className="text-lg font-bold text-gradient"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      Menu
                    </motion.div>
                    <motion.button
                      className="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HiX className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                    </motion.button>
                  </div>

                  {/* Navigation Items */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-1">
                      {navItems.map((item, index) => (
                        <motion.button
                          key={item.name}
                          className="group relative w-full text-left text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all duration-200 py-4 px-4 rounded-2xl text-base overflow-hidden"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.06 + 0.25,
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.15 },
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => scrollToSection(item.href)}
                        >
                          {/* Modern hover background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary-500/8 to-accent-500/8 dark:from-primary-400/10 dark:to-accent-400/10 rounded-2xl opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.2 }}
                          />

                          {/* Active indicator line */}
                          <motion.div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-r-full opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.2 }}
                          />

                          {/* Content */}
                          <div className="relative z-10 flex items-center">
                            <motion.div
                              className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-0 group-hover:opacity-100"
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                              transition={{ duration: 0.15 }}
                            />
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <motion.div
                    className="p-4 border-t border-secondary-200/30 dark:border-secondary-700/30 flex-shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.06 + 0.4 }}
                  >
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                        Appearance
                      </span>
                      <motion.button
                        className="flex items-center space-x-2 p-2 rounded-xl bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors duration-200"
                        onClick={toggleDarkMode}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          initial={false}
                          animate={{ rotate: isDark ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isDark ? (
                            <HiSun className="w-4 h-4 text-amber-500" />
                          ) : (
                            <HiMoon className="w-4 h-4 text-slate-600" />
                          )}
                        </motion.div>
                        <span className="text-xs font-medium text-secondary-600 dark:text-secondary-400">
                          {isDark ? 'Light' : 'Dark'}
                        </span>
                      </motion.button>
                    </div>

                    {/* Brand */}
                    <div className="text-center">
                      <motion.div
                        className="text-sm font-bold text-gradient opacity-60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.6 }}
                      >
                        Aquif Zubair
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
