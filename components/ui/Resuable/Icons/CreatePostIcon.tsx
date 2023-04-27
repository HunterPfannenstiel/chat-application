import { FunctionComponent } from "react";
import classes from "./CreatePostIcon.module.css";
import { useUserDetails } from "components/providers/User/User";

interface CreatePostIconProps {
  onClick?: () => void;
}

const CreatePostIcon: FunctionComponent<CreatePostIconProps> = ({
  onClick,
}) => {
  const { userId } = useUserDetails();
  if (userId === 0) return <></>;
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      className={classes.create_post}
      onClick={onClick}
    >
      <circle cx="29" cy="29" r="22" fill="#5A3CD2" />
      <path
        d="M24.6553 32.193L32.5436 24.0675L31.4438 22.9347L23.5556 31.0601V32.193H24.6553ZM25.3001 33.7953H22V30.396L30.8939 21.2346C31.0397 21.0844 31.2375 21 31.4438 21C31.65 21 31.8478 21.0844 31.9937 21.2346L34.194 23.5011C34.3398 23.6513 34.4217 23.8551 34.4217 24.0675C34.4217 24.28 34.3398 24.4837 34.194 24.6339L25.3001 33.7953ZM22 35.3977H36V37H22V35.3977Z"
        fill="white"
      />
    </svg>
  );
};

export default CreatePostIcon;
