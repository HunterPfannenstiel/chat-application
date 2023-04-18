import { FunctionComponent } from "react";
import classes from "./EditModal.module.css";
import Modal from "@ui/Resuable/Modal/Modal";
import { ModalProps } from "@_types/ui";
import Form from "@ui/Resuable/SignupForm/Form";
import { UserInfo } from "@_types/user";
import { formHandler } from "utils/form";

interface EditModalProps extends ModalProps {
  userInfo: UserInfo & { bio: string };
}

const EditModal: FunctionComponent<EditModalProps> = ({
  playAnimation,
  toggle,
  animationTime,
  userInfo,
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

const handleForm = async (
  name: string | null,
  handle: string | null,
  bio: string | null,
  image: Blob | null
) => {
  const formData = formHandler({
    userName: name,
    userHandle: handle,
    bio,
    image,
  });
  const res = await fetch("/api/user/create", {
    method: "PUT",
    body: formData,
  });
  if (res.ok) {
    const data = await res.json();
    console.log("IS VALID", data.isValidHandle);
  }
};

export default EditModal;
