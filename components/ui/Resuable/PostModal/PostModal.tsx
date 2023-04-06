import { ChangeEvent, FunctionComponent, useRef, useState } from "react";
import classes from "./PostModal.module.css";
import Modal from "../Modal/Modal";

interface PostModalProps {
  modalTitle: string;
  playAnimation: boolean;
  toggle: () => void;
  animationTime: number;
  creatPostHandler: (content: string) => Promise<void>;
}

const PostModal: FunctionComponent<PostModalProps> = ({
  modalTitle,
  playAnimation,
  toggle,
  animationTime,
  creatPostHandler,
}) => {
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const handlePost = async () => {
    if (charCount > 0) {
      try {
        await creatPostHandler(content);
      } catch (error) {
        console.log("ERROR");
      }
    }
  };
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 280) {
      setContent(e.target.value);
      setCharCount(e.target.value.length);
    }
  };
  let className = classes.modal;
  return (
    <Modal
      toggle={toggle}
      className={className}
      playAnimation={playAnimation}
      animationTime={animationTime}
    >
      <div className={classes.content}>
        <h1>{modalTitle}</h1>
        <textarea rows={10} onChange={handleInput} value={content} />
        <button className={classes.button} onClick={handlePost}>
          Post
        </button>
        <p>{`Char count: ${charCount}/280`}</p>
      </div>
    </Modal>
  );
};

export default PostModal;
