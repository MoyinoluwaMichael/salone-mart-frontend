import AuthLayout from "@/component/UserAuthentication/AuthLayout";
import LoginForm from "@/component/UserAuthentication/LoginForm";

const UserAuthentication = () => {
  return (
    <>
      <AuthLayout title="Login" subtitle="Register">
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default UserAuthentication;
