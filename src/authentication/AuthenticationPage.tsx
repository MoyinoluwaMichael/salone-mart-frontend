import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "@/authentication/component/LoginForm";
import Register from "@/authentication/component/Register";
import { ArrowLeft, Home, User, UserPlus } from "lucide-react";

const UserAuthentication = () => {
  // Initialize state from URL parameter or default to "login"
  const getInitialPage = (): string => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const page: string | null = params.get("page");
      if (page != null && ["login", "register"].includes(page)) {
        return page;
      }
    }
    return "login";
  };
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [animation, setAnimation] = useState("slide");
  const [isMobile, setIsMobile] = useState(false);

  // Update URL when page changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url: URL = new URL(window.location.href);
      url.searchParams.set("page", currentPage);
      window.history.pushState({}, "", url);
    }
  }, [currentPage]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced gradient backgrounds with more vibrant colors and smoother transitions
  const backgrounds = [
    "bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50",
    "bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-50",
    "bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50",
    "bg-gradient-to-br from-indigo-50 via-violet-100 to-purple-50"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setCurrentPage("profile");
      setLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  const navigateWithAnimation = (page: string, animType = "slide") => {
    setLoading(true);
    setAnimation(animType);
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
    }, 400);
  };

  // Navigate to homepage
  const navigateToHome = () => {
    window.location.href = "/";
  };

  // Enhanced animation variants
  const getAnimationVariants = () => {
    switch (animation) {
      case "slide":
        return {
          initial: { opacity: 0, x: 100 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -100 }
        };
      case "fade":
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 }
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.1 }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  // Get icon and title for current page with enhanced styling
  const getPageDetails = () => {
    switch (currentPage) {
      case "login":
        return {
          icon: <User className="text-orange-500" size={isMobile ? 18 : 22} />,
          title: "Login",
          gradient: "from-orange-500 to-amber-500",
          color: "text-orange-500"
        };
      case "register":
        return {
          icon: <UserPlus className="text-blue-500" size={isMobile ? 18 : 22} />,
          title: "Register",
          gradient: "from-blue-500 to-indigo-500",
          color: "text-blue-500"
        };
      default:
        return {
          icon: <User className="text-orange-500" size={isMobile ? 18 : 22} />,
          title: "Login",
          gradient: "from-orange-500 to-amber-500",
          color: "text-orange-500"
        };
    }
  };

  const { icon, title, gradient, color } = getPageDetails();

  const renderPage = () => {
    const pageVariants = getAnimationVariants();

    return (
        <AnimatePresence mode="wait">
          <motion.div
              key={currentPage}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
          >
            {currentPage === "login" && (
                <LoginForm onLogin={handleLogin} onNavigate={navigateWithAnimation} />
            )}
            {currentPage === "register" && (
                <Register onNavigate={navigateWithAnimation} />
            )}
          </motion.div>
        </AnimatePresence>
    );
  };

  // Enhanced bubble background with more dynamic animations - fewer bubbles on mobile
  const BubbleBackground = () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 6 : 12)].map((_, i) => {
          const size = Math.random() * (isMobile ? 120 : 180) + 60;
          return (
              <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-white to-amber-100 opacity-20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0.7, 1, 0.7],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, Math.random() * 20 - 10, 0],
                    y: [0, Math.random() * 20 - 10, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 15,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "easeInOut"
                  }}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                    filter: "blur(8px)"
                  }}
              />
          );
        })}
      </div>
  );

  // Loading animation component
  const LoadingSpinner = () => (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-20"
      >
        <div className="relative w-12 h-12">
          <motion.div
              className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-amber-500 border-b-blue-500 border-l-purple-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
              className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-4 border-transparent border-t-orange-300 border-r-amber-300 border-b-blue-300 border-l-purple-300"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
  );

  // CSS classes based on device type
  const containerClasses = isMobile
      ? "min-h-screen py-0"
      : "min-h-screen py-8";

  const cardClasses = isMobile
      ? "min-h-screen rounded-none"
      : "rounded-2xl";

  const contentPadding = isMobile
      ? "px-4 py-6"
      : "p-8";

  return (
      <div
          className={`flex items-center justify-center w-full overflow-hidden ${backgrounds[backgroundIndex]} ${containerClasses}`}
          style={{ transition: "background 3s ease-in-out" }}
      >
        <BubbleBackground />

        {/* Home button - Fixed position for easy access */}
        <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={navigateToHome}
            className="fixed top-4 left-4 z-50 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
          <Home size={isMobile ? 20 : 24} className="text-gray-700" />
        </motion.button>

        <div className={`w-full ${isMobile ? 'max-w-full px-0' : 'max-w-lg px-4'} mx-auto relative z-10`}>
          {/* Authentication Card */}
          <motion.div
              initial={{ y: isMobile ? 0 : 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`bg-white shadow-xl overflow-hidden transition-all duration-500 ${cardClasses}`}
          >
            {/* Top Bar with dynamic gradient based on page */}
            <div className={`bg-gradient-to-r ${gradient} ${isMobile ? 'p-4' : 'p-5'} flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                {currentPage !== "login" && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigateWithAnimation("login", "fade")}
                        className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
                    >
                      <ArrowLeft size={isMobile ? 16 : 18} className="text-white" />
                    </motion.button>
                )}
                <motion.h1
                    className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white flex items-center gap-2`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                  {icon} {title}
                </motion.h1>
              </div>

              <div className="flex space-x-1 md:space-x-2">
                {currentPage !== "login" && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigateWithAnimation("login", "scale")}
                        className={`${isMobile ? 'px-3 py-1' : 'px-4 py-1.5'} rounded-full text-sm font-medium bg-white text-orange-500 hover:bg-orange-50 transition-colors duration-300`}
                    >
                      Login
                    </motion.button>
                )}
                {currentPage !== "register" && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigateWithAnimation("register", "scale")}
                        className={`${isMobile ? 'px-3 py-1' : 'px-4 py-1.5'} rounded-full text-sm font-medium bg-white text-blue-500 hover:bg-blue-50 transition-colors duration-300`}
                    >
                      Register
                    </motion.button>
                )}
              </div>
            </div>

            {/* Loading Indicator */}
            <AnimatePresence>
              {loading && <LoadingSpinner />}
            </AnimatePresence>

            {/* Form Content with increased padding and better spacing */}
            <div className={`relative ${contentPadding}`}>
              {renderPage()}
            </div>

            {/* Bottom Info with enhanced styling */}
            <div className={`bg-gray-50 ${isMobile ? 'p-4' : 'p-5'} text-center`}>
              <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600"
              >
                {currentPage === "login" ? "Don't have an account? " : "Already have an account? "}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigateWithAnimation(currentPage === "login" ? "register" : "login", "fade")}
                    className={`${color} hover:opacity-80 font-medium underline transition-colors`}
                >
                  {currentPage === "login" ? "Register here" : "Login here"}
                </motion.button>
              </motion.p>

              {/* Additional helper text - hide on mobile to save space */}
              {!isMobile && (
                  <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-xs text-gray-400 mt-2"
                  >
                    {currentPage === "login" && "Secure login to access your account"}
                    {currentPage === "register" && "Join us to get started with your journey"}
                  </motion.p>
              )}
            </div>
          </motion.div>

          {/* Support link - hide on mobile to save space */}
          {!isMobile && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4 text-center"
              >
                <a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  Need help? Contact support
                </a>
              </motion.div>
          )}
        </div>
      </div>
  );
};

export default UserAuthentication;
