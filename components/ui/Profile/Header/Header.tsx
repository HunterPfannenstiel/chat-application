import { FunctionComponent } from "react";
import classes from "./Header.module.css";
import Link from "next/link";
import BackIcon from "@ui/Resuable/Icons/BackIcon";

interface HeaderProps {
  userName: string;
}

const Header: FunctionComponent<HeaderProps> = ({ userName }) => {
  return (
    <Link href={"/"}>
      <BackIcon />
    </Link>
  );
};

export default Header;
