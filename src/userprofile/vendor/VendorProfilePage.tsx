import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileForm from "@/userprofile/admin/components/EditProfileForm";
import {
  AUTHENTICATION_RESPONSE_DATA,
  AuthenticationResponse,
} from "@/authentication/authenticationService";

// Import Components
import VendorHeader from "@/userprofile/vendor/components/VendorHeader";
import VendorSidebar from "@/userprofile/vendor/components/VendorSidebar";
import VendorDashboard from "@/userprofile/vendor/components/VendorDashboard";
import VendorProductManagement from "@/userprofile/vendor/components/VendorProductManagement";
import VendorOrderManagement from "@/userprofile/vendor/components/VendorOrderManagement";
import VendorBusinessProfile from "@/userprofile/vendor/components/VendorBusinessProfile";
import VendorAccountProfile from "@/userprofile/vendor/components/VendorAccountProfile";
import VendorTransporterManagement from "@/userprofile/vendor/components/VendorTransporterManagement";
import { BioData } from "@/authentication/authenticationService";
import { removeFromStorage, retrieveFromStorage } from "@/utils/storageservice";
import { Roles } from "@/utils/routes";
import { updateUserData } from "@/userprofile/userProfileService";

// Define constants for localStorage keys
const ACTIVE_TAB_KEY = "vendor_active_tab";
const SIDEBAR_OPEN_KEY = "vendor_sidebar_open";

const VendorProfile: React.FC = () => {
  const [userData, setUserData] = useState<AuthenticationResponse | null>(null);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem(ACTIVE_TAB_KEY) || "dashboard";
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<BioData>({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    profilePicture: "",
    media: [],
    roles: [],
    isEnabled: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem(SIDEBAR_OPEN_KEY);
    return savedState ? savedState === "true" : window.innerWidth >= 768;
  });
  const navigate = useNavigate();

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserData({
      ...userData,
      user: {
        ...userData?.user,
        bioData: {
          ...userData?.user.bioData,
          ...editForm,
        },
      },
    } as AuthenticationResponse);

    if (userData) {
      await updateUserData(
        userData.user.id,
        editForm,
        userData.accessToken,
        userData.user.bioData.roles
      );
    }
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // Persist active tab and sidebar state
  useEffect(() => {
    localStorage.setItem(ACTIVE_TAB_KEY, activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_OPEN_KEY, String(sidebarOpen));
  }, [sidebarOpen]);

  // Authentication and role check
  useEffect(() => {
    const authenticationResponse: AuthenticationResponse = retrieveFromStorage(
      AUTHENTICATION_RESPONSE_DATA
    ) as AuthenticationResponse;
    if (authenticationResponse) {
      const userRoles = authenticationResponse.user.bioData.roles;
      if (userRoles.length > 0) {
        if (!userRoles.includes(Roles.VENDOR)) {
          navigate("/auth");
        }
      }
      setUserData(authenticationResponse);
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem(ACTIVE_TAB_KEY);
    localStorage.removeItem(SIDEBAR_OPEN_KEY);
    removeFromStorage(AUTHENTICATION_RESPONSE_DATA);
    navigate("/auth");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="p-8 rounded-lg shadow-lg bg-white w-full max-w-md text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <VendorHeader
          onLogout={handleLogout}
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        <div className="container mx-auto px-4 py-6 pt-[5rem]">
          <div className="flex flex-col md:flex-row gap-6 relative">
            {/* Sidebar - Mobile responsive */}
            <div
              className={`
                        ${sidebarOpen ? "block" : "hidden"}
                        md:block
                        fixed md:static
                        top-16 left-0 z-20
                        w-5/6 md:w-64
                        h-full md:h-auto
                        bg-gray-800
                        shadow-lg md:shadow-none
                        overflow-y-auto
                        transition-all duration-300
                    `}
            >
              <VendorSidebar
                userData={userData}
                activeTab={activeTab}
                setActiveTab={handleTabChange}
              />
            </div>

            {/* Overlay for mobile when sidebar is open */}
            {sidebarOpen && (
              <div
                className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
                onClick={() => setSidebarOpen(false)}
              ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-500 ease-in-out">
              {activeTab === "dashboard" && (
                <VendorDashboard
                  userData={userData}
                  setIsEditing={setIsEditing}
                />
              )}
              {activeTab === "products" && <VendorProductManagement />}
              {activeTab === "orders" && <VendorOrderManagement />}
              {activeTab === "business-profile" && <VendorBusinessProfile />}
              {activeTab === "account-profile" && <VendorAccountProfile />}
              {activeTab === "transporters" && <VendorTransporterManagement />}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <EditProfileForm
          editForm={editForm}
          handleInputChange={handleInputChange}
          handleEditSubmit={handleEditSubmit}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

export default VendorProfile;
