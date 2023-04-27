import { FunctionComponent, useEffect, useState } from "react";
import classes from "./Menu.module.css";
import MobileMenu from "@ui/Resuable/MobileMenu/MobileMenu";
import ProfileImage from "@ui/Resuable/Profile/ProfileImage/ProfileImage";
import Links from "@ui/Profile/UserDetails/Links";
import Link from "next/link";
import { UserDetails } from "@_types/user";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import PurpleButton from "@ui/Resuable/Icons/PurpleButton";

interface MenuProps {
  showModal: boolean;
  playAnimation: boolean;
  toggleModal: () => void;
  user: UserDetails;
  isSignedIn: boolean;
}

const Menu: FunctionComponent<MenuProps> = ({
  showModal,
  playAnimation,
  toggleModal,
  user,
  isSignedIn,
}) => {
  const [evalu, setEvalu] = useState(false);
  const router = useRouter();
  const homeSelected = evalu && router.pathname === "/";
  const profileSelected =
    evalu && router.asPath.includes(`/${user.userHandle}`);
  useEffect(() => {
    setEvalu(true);
  }, [router.pathname]);
  return (
    <MobileMenu
      title="Account"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      showModal={showModal}
      playAnimation={playAnimation}
      toggleModal={toggleModal}
      animationTime={300}
    >
      <nav className={classes.content}>
        <ProfileImage src={user.userImage} circleDiameter="75px" />
        <Link href={`/${user.userHandle}`}>
          <p className="username">{user.userName}</p>
          <p className="handle">{`@${user.userHandle}`}</p>
        </Link>
        <Links
          asPath={router.asPath}
          linkInfo={[
            {
              href: `/${user.userHandle}/following`,
              count: user.followingCount,
              label: "Following",
            },
            {
              href: `/${user.userHandle}/followers`,
              count: user.followerCount,
              label: "Followers",
            },
          ]}
        />
        <Link href="/">
          <PurpleButton className={`${homeSelected ? classes.selected : ""}`}>
            Home
          </PurpleButton>
        </Link>
        <Link href={`/${user.userHandle}`}>
          <PurpleButton
            className={`${profileSelected ? classes.selected : ""}`}
          >
            Profile
          </PurpleButton>
        </Link>
        <PurpleButton
          onClick={() => {
            if (!isSignedIn) {
              router.push("/auth/signin");
            } else {
              signOut();
            }
          }}
        >
          {isSignedIn ? "Logout" : "SignIn"}
        </PurpleButton>
      </nav>
    </MobileMenu>
  );
};

export default Menu;
