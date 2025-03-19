// import AuthLayout from "@/component/UserAuthentication/AuthLayout";
import LoginForm from "@/component/UserAuthentication/LoginForm";
import Register from "@/component/UserAuthentication/Register";
import SellerRegister from "@/component/UserAuthentication/SellerRegister";
import React, { useState } from "react";

const UserAuthentication = () => {
  const [currentPage, setCurrentPage] = useState("login");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("profile");
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginForm onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case "register":
        return <Register onNavigate={setCurrentPage} />;
      case "sellerRegister":
        return <SellerRegister onNavigate={setCurrentPage} />;
      //   case 'profile':
      //     return <Profile onLogout={handleLogout} />
      default:
        return <LoginForm onLogin={handleLogin} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
      /> */}
        <main className="flex-grow w-full">{renderPage()}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default UserAuthentication;
