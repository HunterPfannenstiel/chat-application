import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import classes from "./MainNav.module.css";
import ProfileImage from "@ui/Resuable/Profile/ProfileImage/ProfileImage";
import { useUserDetails } from "components/providers/User/User";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import Menu from "@ui/HomeFeed/Menu/Menu";
import FeedNav from "./FeedNav/FeedNav";
import SearchBar from "./SearchBar/SearchBar";
import { useRouter } from "next/router";
import DesktopSearch from "./DesktopSearch/DesktopSearch";
import FadeImage from "@ui/Resuable/FadeImage/FadeImage";

interface MainNavProps {
  children: ReactNode;
}

const MainNav: FunctionComponent<MainNavProps> = ({ children }) => {
  const { pathname } = useRouter();
  const [render, setRender] = useState(true);
  const { toggle, showModal, playAnimation } = useAnimateModal(300);
  const [win, setWin] = useState<Window & typeof globalThis>();
  const user = useUserDetails();
  // useEffect(() => {
  //   if (navPages.includes(pathname)) setRender(true);
  //   else setRender(false);
  //   if (showModal) toggle();
  // }, [pathname]);

  let showSideBar = render;
  if (render) {
    if (win && win.innerWidth < 640) showSideBar = showModal;
  }

  useEffect(() => {
    setWin(window);
  }, []);

  return (
    <main>
      {render && (
        <div className={classes.background}>
          <nav className={classes.nav}>
            <ProfileImage
              src={user.userImage}
              circleDiameter="50px"
              onClick={toggle}
              className={classes.image}
            />
            {(pathname.includes("/search") && <SearchBar />) || <FeedNav />}
          </nav>
        </div>
      )}
      <div className={`${showSideBar ? classes.page_content : ""}`}>
        {showSideBar && (
          <Menu
            showModal={showSideBar}
            playAnimation={playAnimation}
            user={user}
            toggleModal={toggle}
            isSignedIn={!!user.isSignedIn}
          />
        )}
        <div className={classes.children}>{children}</div>
        <DesktopSearch />
      </div>
    </main>
  );
};

const nonNavPages = ["/login"];

export default MainNav;
