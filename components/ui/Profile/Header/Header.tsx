import { FunctionComponent } from "react";
import classes from "./Header.module.css";
import Link from "next/link";

interface HeaderProps {
  userName: string;
}

const Header: FunctionComponent<HeaderProps> = ({ userName }) => {
  return (
    <header className={classes.header}>
      <Link href={"/"}>Back</Link>
      <p>{userName}</p>
    </header>
  );
};

export default Header;
