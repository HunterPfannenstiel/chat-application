import { CreatePostHandler, Image } from "@_types/post";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { revokeURLs } from "utils/form";

const useCreateFeedPost = (
  creatPostHandler: CreatePostHandler,
  initialContents: { content: string; imageUrls: Image[] | undefined }
) => {
  const [content, setContent] = useState(initialContents.content);
  const [charCount, setCharCount] = useState(initialContents.content.length);
  const imagesRemoved = useRef(false);
  const [images, setImages] = useState<ImageInfo[]>(
    initialContents.imageUrls || []
  );
  const handlePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (charCount > 0) {
      await creatPostHandler(
        content,
        initialImagesPresent(images) ? [] : images,
        imagesRemoved.current && !!initialContents.imageUrls
      );
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
    imagesRemoved.current = true;
    setImages([]);
  };

  return {
    handlePost,
    handleInput,
    clearImages,
    content,
    charCount,
    images,
    setImages,
  };
};

const initialImagesPresent = (images: ImageInfo[]) => {
  if (images.length > 0) {
    return !!!images[0].blob;
  }
  return true;
};

export default useCreateFeedPost;
