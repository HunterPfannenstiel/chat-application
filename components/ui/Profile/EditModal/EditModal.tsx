import { FunctionComponent } from "react";
import classes from "./EditModal.module.css";
import Modal from "@ui/Resuable/Modal/Modal";
import { ModalProps } from "@_types/ui";
import Form from "@ui/Resuable/SignupForm/Form";
import { UserInfo } from "@_types/user";
import { isValidHandle } from "utils/db/user-commands";

interface EditModalProps extends ModalProps {
  userInfo: UserInfo & { bio: string };
}

const EditModal: FunctionComponent<EditModalProps> = ({
  playAnimation,
  toggleModal,
  animationTime,
  userInfo,
}) => {
  return (
    <Modal
      playAnimation={playAnimation}
      animationTime={animationTime}
      toggle={toggleModal}
      className={classes.modal}
    >
      <Form
        handler={formHandler}
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

const formHandler = async (
  name: string,
  handle: string,
  bio: string,
  image: Blob
) => {
  const res = await fetch(`/api/verify?handle=${handle}`);
  if (res.ok) {
    const data = await res.json();
    console.log("IS VALID", data.isValidHandle);
  }
  console.log({ name, handle, bio, image });
};
//TODO: GET FORM HANDLER TO WORK

export default EditModal;
