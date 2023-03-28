import Link from "next/link";
import { FunctionComponent } from "react";
import classes from "./index.module.css";

interface ProfileNavProps {}

const ProfileNav: FunctionComponent<ProfileNavProps> = () => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        {navLinks.map((link) => {
          return (
            <li>
              <Link href={link.href}>{link.text}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const navLinks = [
  { text: "Tweets", href: "/" },
  { text: "Replies", href: "/replies" },
  { text: "Likes", href: "/likes" },
];

export default ProfileNav;
