import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import classes from "./PostModal.module.css";
import Modal from "../Modal/Modal";
import ImageSelect, { revokeURLs } from "./ImageSelect";
import { ImageInfo } from "./types";
import ImageDisplay from "./ImageDisplay";

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
  const [images, setImages] = useState<ImageInfo[]>([]);
  const handlePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  const clearImages = () => {
    revokeURLs(images);
    setImages([]);
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
        <form onSubmit={handlePost}>
          <div className={classes.post_input}>
            {images.length > 0 && (
              <p className={classes.close} onClick={clearImages}>
                x
              </p>
            )}
            <textarea rows={10} onChange={handleInput} value={content} />
            {images.length > 0 && <ImageDisplay images={images} />}
          </div>
          <ImageSelect images={images} setImages={setImages} />
          <button className={classes.button} type="submit">
            Post
          </button>
        </form>
        <p>{`Char count: ${charCount}/280`}</p>
      </div>
    </Modal>
  );
};

export default PostModal;
