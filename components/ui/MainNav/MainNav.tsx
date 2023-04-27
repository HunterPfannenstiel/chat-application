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
import useUserSearch from "@hooks/user-search/useUserSearch";
import Search from "@ui/Search/Search";

interface MainNavProps {
  children: ReactNode;
}

const MainNav: FunctionComponent<MainNavProps> = ({ children }) => {
  const { pathname } = useRouter();
  const [render, setRender] = useState(true);
  const { toggle, showModal, playAnimation } = useAnimateModal(300);
  const [win, setWin] = useState<Window & typeof globalThis>();
  const user = useUserDetails();
  const search = useUserSearch();
  // useEffect(() => {
  //   if (navPages.includes(pathname)) setRender(true);
  //   else setRender(false);
  //   if (showModal) toggle();
  // }, [pathname]);

  useEffect(() => {
    setWin(window);
  }, []);
  const renderSide = !nonNavPages.includes(pathname);
  const searchPage = pathname.includes("/search");
  return (
    <main>
      {render && renderSide && (
        <div className={classes.background}>
          <nav className={classes.nav}>
            <ProfileImage
              src={user.userImage}
              circleDiameter="50px"
              onClick={toggle}
              className={classes.image}
            />
            {(pathname.includes("/search") && (
              <SearchBar
                searchTerm={search.searchTerm}
                setSearchTerm={search.setSearchTerm}
                instantFetch={search.instantFetch}
              />
            )) || <FeedNav />}
          </nav>
        </div>
      )}
      <div className={classes.page_content}>
        {renderSide && (
          <Menu
            showModal={showModal}
            playAnimation={playAnimation}
            user={user}
            toggleModal={toggle}
            isSignedIn={!!user.isSignedIn}
          />
        )}
        {!renderSide && <div></div>}
        {searchPage && (
          <Search
            updateFollowerCount={search.updateFollowerCount}
            users={search.users}
            setScrollEvent={search.setScrollEvent}
          />
        )}
        {!searchPage && <div className={classes.children}>{children}</div>}
        {!searchPage && renderSide && <DesktopSearch />}
      </div>
    </main>
  );
};

const nonNavPages = ["/auth/signin", "/auth/signup"];

export default MainNav;
