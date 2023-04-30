import { FunctionComponent } from "react";
import classes from "./ReplyIcon.module.css";
import Link from "next/link";

interface ReplyIconProps {
  replyToPostId?: number;
}

const ReplyIcon: FunctionComponent<ReplyIconProps> = ({ replyToPostId }) => {
  if (replyToPostId) {
    return (
      <Link href={`/post/${replyToPostId}`} className={classes.reply}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.564 13.1282L0 16V0.820513C0 0.602899 0.0842854 0.394199 0.234315 0.240323C0.384344 0.0864466 0.587827 0 0.8 0H15.2C15.4122 0 15.6157 0.0864466 15.7657 0.240323C15.9157 0.394199 16 0.602899 16 0.820513V12.3077C16 12.5253 15.9157 12.734 15.7657 12.8879C15.6157 13.0418 15.4122 13.1282 15.2 13.1282H3.564ZM8.8 6.5641H11.2L8 3.28205L4.8 6.5641H7.2V9.84615H8.8V6.5641Z"
            fill="#5A3CD2"
          />
        </svg>
      </Link>
    );
  }
  return <></>;
};

export default ReplyIcon;
