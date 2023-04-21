import Link from "next/link";
import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";

interface ProfileNavProps {}

const ProfileNav: FunctionComponent<ProfileNavProps> = () => {
  const [selectedLink, setSelectedLink] = useState("Tweets");
  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        {navLinks.map((link) => {
          return (
            <li
              className={selectedLink === link.text ? classes.selected : ""}
              onClick={setSelectedLink.bind(null, link.text)}
            >
              {link.text}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const navLinks = [{ text: "Tweets" }, { text: "Replies" }, { text: "Likes" }];

export default ProfileNav;
