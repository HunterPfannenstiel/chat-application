import { FunctionComponent } from "react";
import classes from "./Header.module.css";
import Link from "next/link";
import BackIcon from "@ui/Resuable/Icons/BackIcon";
import { useRouter } from "next/router";

interface HeaderProps {
  userName: string;
}

const Header: FunctionComponent<HeaderProps> = ({ userName }) => {
  const router = useRouter();
  return <BackIcon onClick={router.back} />;
};

export default Header;
