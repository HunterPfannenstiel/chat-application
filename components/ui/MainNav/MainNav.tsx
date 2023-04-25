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
  // useEffect(() => {
  //   if (navPages.includes(pathname)) setRender(true);
  //   else setRender(false);
  //   if (showModal) toggle();
  // }, [pathname]);

  let showSideBar = render;
  // if (render) {
  //   if (window && window.innerWidth < 640) showSideBar = showModal;
  // }

  return (
    <main>
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
      <div className={`${showSideBar ? classes.page_content : ""}`}>
        <></>
        {showSideBar && (
          <Menu
            showModal={showSideBar}
            playAnimation={playAnimation}
            user={user}
            toggleModal={toggle}
            isSignedIn={!!(user.userId && user.userId !== 0)}
          />
        )}
        <div className={classes.children}>{children}</div>
        <></>
      </div>
    </main>
  );
};

const navPages = ["/", "/search"];

export default MainNav;
