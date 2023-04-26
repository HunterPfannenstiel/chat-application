import Link from "next/link";
import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";
import { useRouter } from "next/router";

interface ProfileNavProps {
  handle: string;
}

const ProfileNav: FunctionComponent<ProfileNavProps> = ({ handle }) => {
  const { asPath } = useRouter();
  const [selectedLink, setSelectedLink] = useState("Posts");
  const navLinks = [
    { text: "Posts", href: `/${handle}` },
    { text: "Replies", href: `/${handle}?category=replies` },
    { text: "Likes", href: `/${handle}?category=likes` },
  ];
  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        {navLinks.map((link) => {
          const bold = link.href === asPath;
          return (
            <Link href={link.href} key={link.href}>
              <li
                className={bold ? classes.selected : ""}
                onClick={setSelectedLink.bind(null, link.text)}
              >
                {link.text}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default ProfileNav;
