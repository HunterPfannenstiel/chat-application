import { Image } from "@_types/post";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { revokeURLs } from "utils/form";

const useCreateFeedPost = (
  creatPostHandler: (content: string, images: ImageInfo[]) => Promise<void>,
  initialContent?: string
) => {
  const [content, setContent] = useState(initialContent || "");
  const [charCount, setCharCount] = useState(initialContent?.length || 0);
  const [images, setImages] = useState<ImageInfo[]>([]);
  const handlePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (charCount > 0) {
      await creatPostHandler(content, images);
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

export default useCreateFeedPost;
