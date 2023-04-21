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
  buttonText: string;
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
  buttonText,
}) => {
  return (
    <form onSubmit={handlePost} className={classes.form}>
      <textarea
        rows={8}
        onChange={handleInput}
        value={postContent}
        className={classes.textarea}
      />
      <p>
        Characters: <span>{postContent.length}/280</span>
      </p>
      <p>
        Images: <span>{images.length}/4</span>
      </p>
      {images.length > 0 && (
        <ImageDisplay
          images={
            images.length > 0 ? images : initialImages ? initialImages : []
          }
          onSelectImage={onSelectImage}
          onRemoveImages={clearImages}
          displayRemove
        />
      )}

      <ImageSelect images={images} setImages={setImages} />
      <button className={classes.button} type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default PostForm;
