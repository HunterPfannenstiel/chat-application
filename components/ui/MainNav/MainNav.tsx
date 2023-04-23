import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import classes from "./MainNav.module.css";
import ProfileImage from "@ui/Resuable/Profile/ProfileImage/ProfileImage";
import { useUserDetails } from "components/providers/User/User";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import Menu from "@ui/HomeFeed/Menu/Menu";
import FeedNav from "./FeedNav/FeedNav";
import SearchBar from "./SearchBar/SearchBar";
import { useRouter } from "next/router";

interface MainNavProps {
  children: ReactNode;
}

const MainNav: FunctionComponent<MainNavProps> = ({ children }) => {
  const { pathname } = useRouter();
  const [render, setRender] = useState(true);
  const { toggle, showModal, playAnimation } = useAnimateModal(300);
  const user = useUserDetails();
  useEffect(() => {
    if (navPages.includes(pathname)) setRender(true);
    else setRender(false);
    if (showModal) toggle();
  }, [pathname]);
  return (
    <>
      {render && (
        <nav className={classes.nav}>
          <ProfileImage
            src={user.userImage}
            circleDiameter="50px"
            onClick={toggle}
          />
          {(pathname.includes("/search") && <SearchBar />) || <FeedNav />}
        </nav>
      )}
      <div className={classes.page_content}>
        {showModal && render && (
          <Menu
            showModal={showModal}
            playAnimation={playAnimation}
            user={user}
            toggleModal={toggle}
            isSignedIn={!!(user.userId && user.userId !== 0)}
          />
        )}
        {children}
      </div>
    </>
  );
};

const navPages = ["/", "/search"];

export default MainNav;
