import {AuthenticationResponse} from "@/authentication/authenticationService";

const roles: string[] = ["SUPER_ADMIN", "ORDINARY_ADMIN", "CUSTOMER", "VENDOR", "RIDER"];
const navigateUserProfile = (authenticationResponse: AuthenticationResponse) => {
    let userRoles = authenticationResponse.user.bioData.roles;
    if (userRoles.length > 0) {
        if (roles.includes(userRoles[0])) {
            window.location.href = "/user-profile";
        }
        else {
            window.location.href = "/";
        }
    }
}
