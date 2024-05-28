import { bottombarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
const BottomBar = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
    {bottombarLinks.map((link) =>
         {
          const isActive = pathname === link.route;
          return (
            <Link to={link.route}
                key={link.label}
                className={`flex-center flex-col gap-1 p-4 transition`}>
                  <img
                  src={link.imgURL}
                  alt={link.label}
                  width={isActive ? 34 : 32}
                  height={24}
                  />
                  {/* <p className={`tiny-medium ${isActive ? 'text-light-2' : 'text-dark-2'}`}>
                    {link.label}
                  </p> */}
            </Link>
              )
            })}
          <Link
            to={`/profile/${user.id}`}
            className="flex-center flex-col gap-1 p-4 transition"
          >
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} 
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          </Link>
    </section>
  )
}

export default BottomBar