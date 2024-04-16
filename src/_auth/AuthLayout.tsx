import { Navigate, Outlet } from "react-router-dom";

const  AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
    {isAuthenticated ? (
      <Navigate to="/" />
    ):
    (
      <>
      <section className="w-full h-screen flex-center flex-1 flex-col">
        <Outlet/>
      </section>

      <img src="/assets/images/img.jpg"
      alt="logo"
      className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"/>
      </>
    )
    }
    </>
  )
}

export default AuthLayout