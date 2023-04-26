import { FunctionComponent } from "react";
import classes from "./Links.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

interface LinksProps {}

const Links: FunctionComponent<LinksProps> = ({}) => {
  const { query } = useRouter();
  return (
    <ul className={classes.links}>
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

const links = [
  { label: "Following", href: "/" },
  { label: "Global", href: "/?feed=global" },
];

export default Links;
