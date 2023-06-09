import { FunctionComponent } from "react";
import classes from "./LikeIcon.module.css";

type LikeIconProps = {
  liked: boolean;
  fillColor?: string;
};

const LikeIcon: FunctionComponent<LikeIconProps> = ({ liked, fillColor }) => {
  if (liked)
    return (
      <svg
        width="18"
        height="17"
        viewBox="0 0 18 17"
        cursor={"pointer"}
        className={classes.liked}
      >
        <path
          d="M9.00074 1.40615C11.1148 -0.533425 14.3817 -0.469048 16.4184 1.61583C18.4542 3.70164 18.5244 7.02347 16.6308 9.1902L8.99894 17L1.36888 9.1902C-0.524685 7.02347 -0.453586 3.69612 1.58128 1.61583C3.61974 -0.466289 6.88038 -0.536184 9.00074 1.40615Z"
          fill={fillColor ? fillColor : "#492AA1"}
        />
      </svg>
    );
  else
    return (
      <svg width="18" height="17" viewBox="0 0 18 17" cursor={"pointer"}>
        <path
          d="M9.00074 1.40615C11.1148 -0.533425 14.3817 -0.469048 16.4184 1.61583C18.4542 3.70164 18.5244 7.02347 16.6308 9.1902L8.99894 17L1.36888 9.1902C-0.524685 7.02347 -0.453586 3.69612 1.58128 1.61583C3.61974 -0.466289 6.88038 -0.536184 9.00074 1.40615ZM15.144 2.91532C13.794 1.53398 11.6161 1.47788 10.2031 2.77461L9.00164 3.87637L7.79926 2.77553C6.38179 1.47696 4.20833 1.53398 2.85475 2.91716C1.51378 4.28746 1.44628 6.48086 2.68196 7.93026L8.99984 14.3964L15.3177 7.93118C16.5543 6.48086 16.4868 4.29022 15.144 2.91532Z"
          fill={fillColor ? fillColor : "#492AA1"}
        />
      </svg>
    );
};

export default LikeIcon;
