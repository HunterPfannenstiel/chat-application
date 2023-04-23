import { FunctionComponent } from "react";
import classes from "./EditModal.module.css";
import Modal from "@ui/Resuable/Modal/Modal";
import { ModalProps } from "@_types/ui";
import Form, { FormImage } from "@ui/Resuable/SignupForm/Form";
import { UserInfo } from "@_types/user";

interface EditModalProps extends ModalProps {
  userInfo: UserInfo & { bio: string };
  handleForm: (
    name: string | undefined,
    handle: string | undefined,
    bio: string | undefined,
    image: FormImage | undefined
  ) => Promise<void>;
}

const EditModal: FunctionComponent<EditModalProps> = ({
  playAnimation,
  toggle,
  animationTime,
  userInfo,
  handleForm,
}) => {
  return (
    <Modal
      playAnimation={playAnimation}
      animationTime={animationTime}
      toggle={toggle}
      className={classes.modal}
    >
      <Form
        handler={handleForm}
        initialInput={{
          name: userInfo.userName,
          handle: userInfo.userHandle,
          image: userInfo.userImage,
          bio: userInfo.bio,
        }}
        buttonDisplay="Update Account"
      />
    </Modal>
  );
};

export default EditModal;
