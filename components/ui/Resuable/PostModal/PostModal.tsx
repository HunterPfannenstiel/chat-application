import { FormEvent, FunctionComponent, useState } from "react";
import type { ModalProps } from "@_types/ui";
import classes from "./PostModal.module.css";
import Modal from "../Modal/Modal";
import { ImageInfo } from "./types";
import PostForm from "./PostForm/PostForm";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import ImageView from "../ImageView/ImageView";
import useCreateFeedPost from "@hooks/feed-post/useCreateFeedPost";

interface PostModalProps {
  modalProps: ModalProps;
  modalTitle: string;
  createPostHandler: (content: string, images: ImageInfo[]) => Promise<void>;
}

const PostModal: FunctionComponent<PostModalProps> = ({
  modalTitle,
  modalProps,
  createPostHandler,
}) => {
  const post = useCreateFeedPost(createPostHandler);
  const [initialIndex, setInitialIndex] = useState(0);
  const imageViewModal = useAnimateModal(300);
  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    try {
      await post.handlePost(e);
      modalProps.toggle();
    } catch {
      console.log("ERROR");
    }
  };
  console.log("SHOW IMAGES", imageViewModal.showModal);
  const onSelectImage = (index: number) => {
    setInitialIndex(index);
    imageViewModal.toggle();
  };
  return (
    <>
      <Modal {...modalProps} className={classes.modal}>
        <div className={classes.content}>
          <h1>{modalTitle}</h1>
          <PostForm
            handlePost={createPost}
            images={post.images}
            setImages={post.setImages}
            postContent={post.content}
            handleInput={post.handleInput}
            clearImages={post.clearImages}
            onSelectImage={onSelectImage}
          />
          <p>{`Char count: ${post.charCount}/280`}</p>
        </div>
      </Modal>
      {imageViewModal.showModal && post.images.length > 0 && (
        <ImageView
          images={getImageViewProps(post.images)}
          modalProps={{ ...imageViewModal, animationTime: 300 }}
          initialIndex={initialIndex}
        />
      )}
    </>
  );
};

const getImageViewProps = (images: ImageInfo[]) => {
  return images.map((image) => {
    return {
      imageUrl: image.src,
      aspectRatio: image.width / image.height,
    };
  });
};

export default PostModal;
