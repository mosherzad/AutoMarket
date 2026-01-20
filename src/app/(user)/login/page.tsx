import { LoginForm } from "./LoginForm";
// import { cookies } from "next/headers";
const LoginPage = async () => {
  // const storeCookie = await cookies();
  // const token = storeCookie.get("jwtToken")?.value;
  return (
    <section className="flex items-center justify-center my-20 px-5">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
