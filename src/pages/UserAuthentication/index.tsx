import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "@/component/UserAuthentication/LoginForm";
import Register from "@/component/UserAuthentication/Register";
import SellerRegister from "@/component/UserAuthentication/SellerRegister";
import { ArrowLeft, ShoppingBag, User, UserPlus } from "lucide-react";

const UserAuthentication = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  // Gradient backgrounds that slowly transition
  const backgrounds = [
    "bg-gradient-to-r from-orange-50 to-amber-50",
    "bg-gradient-to-r from-amber-50 to-orange-50",
    "bg-gradient-to-r from-blue-50 to-indigo-50",
    "bg-gradient-to-r from-indigo-50 to-blue-50"
  ];

  // Cycle through backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoggedIn(true);
      setCurrentPage("profile");
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  const navigateWithAnimation = (page) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
    }, 400);
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  // Get icon and title for current page
  const getPageDetails = () => {
    switch (currentPage) {
      case "login":
        return { icon: <User className="text-orange-500" />, title: "Login" };
      case "register":
        return { icon: <UserPlus className="text-blue-500" />, title: "Register" };
      case "sellerRegister":
        return { icon: <ShoppingBag className="text-purple-500" />, title: "Seller Registration" };
      default:
        return { icon: <User className="text-orange-500" />, title: "Login" };
    }
  };

  const { icon, title } = getPageDetails();

  const renderPage = () => {
    return (
        <AnimatePresence mode="wait">
          <motion.div
              key={currentPage}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ type: "tween", duration: 0.4 }}
              className="w-full"
          >
            {currentPage === "login" && (
                <LoginForm onLogin={handleLogin} onNavigate={navigateWithAnimation} />
            )}
            {currentPage === "register" && (
                <Register onNavigate={navigateWithAnimation} />
            )}
            {currentPage === "sellerRegister" && (
                <SellerRegister onNavigate={navigateWithAnimation} />
            )}
          </motion.div>
        </AnimatePresence>
    );
  };

  // Animated background patterns
  const BubbleBackground = () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
            <div
                key={i}
                className={`absolute rounded-full bg-gradient-to-r from-orange-200 to-amber-200 opacity-20 animate-pulse`}
                style={{
                  width: `${Math.random() * 200 + 50}px`,
                  height: `${Math.random() * 200 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 8 + 4}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
            />
        ))}
      </div>
  );

  return (
      <div className={`flex flex-col min-h-screen transition-colors duration-3000 ${backgrounds[backgroundIndex]}`}>
        <BubbleBackground />

        <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 relative z-10">
          {/* Authentication Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 transform hover:shadow-2xl">
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {currentPage !== "login" && (
                    <button
                        onClick={() => navigateWithAnimation("login")}
                        className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
                    >
                      <ArrowLeft size={18} className="text-white" />
                    </button>
                )}
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  {icon} {title}
                </h1>
              </div>

              <div className="flex space-x-2">
                {currentPage !== "login" && (
                    <button
                        onClick={() => navigateWithAnimation("login")}
                        className="px-3 py-1 rounded-full text-sm bg-white text-orange-500 hover:bg-orange-50 transition-colors duration-300"
                    >
                      Login
                    </button>
                )}
                {currentPage !== "register" && (
                    <button
                        onClick={() => navigateWithAnimation("register")}
                        className="px-3 py-1 rounded-full text-sm bg-white text-blue-500 hover:bg-blue-50 transition-colors duration-300"
                    >
                      Register
                    </button>
                )}
                {currentPage !== "sellerRegister" && (
                    <button
                        onClick={() => navigateWithAnimation("sellerRegister")}
                        className="px-3 py-1 rounded-full text-sm bg-white text-purple-500 hover:bg-purple-50 transition-colors duration-300"
                    >
                      Seller
                    </button>
                )}
              </div>
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-20">
                  <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-orange-500 border-r-amber-500 border-b-blue-500 border-l-purple-500 animate-spin"></div>
                  </div>
                </div>
            )}

            {/* Form Content */}
            <div className="p-6 relative min-h-96">
              {renderPage()}
            </div>

            {/* Bottom Info */}
            <div className="bg-gray-50 p-4 text-center text-gray-600 text-sm">
              <p>
                {currentPage === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                    onClick={() => navigateWithAnimation(currentPage === "login" ? "register" : "login")}
                    className="text-orange-500 hover:text-orange-700 font-medium underline transition-colors"
                >
                  {currentPage === "login" ? "Register here" : "Login here"}
                </button>
              </p>
            </div>
          </div>
        </main>
      </div>
  );
};

export default UserAuthentication;
