import { ChangeEvent, FormEvent, FunctionComponent } from "react";
import classes from "./PostForm.module.css";
import { ImageInfo } from "../types";
import ImageDisplay from "../ImageDisplay";
import ImageSelect from "../ImageSelect";
import { Image } from "@_types/post";

interface PostFormProps {
  handlePost: (e: FormEvent<HTMLFormElement>) => void;
  images: ImageInfo[];
  setImages: (images: ImageInfo[]) => void;
  postContent: string;
  handleInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  clearImages: () => void;
  onSelectImage: (index: number) => void;
  initialImages?: Image[];
}

const PostForm: FunctionComponent<PostFormProps> = ({
  handlePost,
  images,
  setImages,
  handleInput,
  clearImages,
  postContent,
  onSelectImage,
  initialImages,
}) => {
  return (
    <form onSubmit={handlePost}>
      <div className={classes.post_input}>
        {images.length > 0 && (
          <p className={classes.close} onClick={clearImages}>
            x
          </p>
        )}
        <textarea
          rows={10}
          onChange={handleInput}
          value={postContent}
          className={classes.textarea}
        />
        {images.length > 0 && (
          <ImageDisplay
            inputImages={images}
            onSelectImage={onSelectImage}
            initialImages={initialImages}
          />
        )}
      </div>
      <ImageSelect images={images} setImages={setImages} />
      <button className={classes.button} type="submit">
        Post
      </button>
    </form>
  );
};

export default PostForm;
