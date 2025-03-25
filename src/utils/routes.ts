import { AuthenticationResponse } from "@/authentication/authenticationService";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Roles = {
    CUSTOMER: "CUSTOMER",
    SUPER_ADMIN: "SUPER_ADMIN",
    ORDINARY_ADMIN: "ORDINARY_ADMIN",
    VENDOR: "VENDOR",
    ADMINS: ["ORDINARY_ADMIN", "SUPER_ADMIN"]
};

const useNavigateBasedOnRole = (authenticationResponse: AuthenticationResponse) => {
    const navigate = useNavigate();

    useEffect(() => {
        let userRoles = authenticationResponse.user.bioData.roles;
        if (userRoles.length > 0) {
            if ("CUSTOMER" === userRoles[0]) {
                navigate("/profile", { state: { authenticationResponse: authenticationResponse.user } });
            } else if (["SUPER_ADMIN", "ORDINARY_ADMIN"].includes(userRoles[0])) {
                navigate("/auth");
            }
        }
    }, [authenticationResponse, navigate]);
};

export default useNavigateBasedOnRole;
