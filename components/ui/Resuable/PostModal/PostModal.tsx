import { FormEvent, FunctionComponent, useState } from "react";
import type { ModalProps } from "@_types/ui";
import classes from "./PostModal.module.css";
import Modal from "../Modal/Modal";
import PostForm from "./PostForm/PostForm";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import ImageView from "../ImageView/ImageView";
import useCreateFeedPost from "@hooks/feed-post/useCreateFeedPost";
import { CreatePostHandler, Image } from "@_types/post";
import { useLoading } from "components/providers/Loading/Loading";

interface PostModalProps {
  modalProps: ModalProps;
  modalTitle: string;
  buttonText: string;
  createPostHandler: CreatePostHandler;
  initialContents?: { content: string; imageUrls: Image[] | undefined };
}

const PostModal: FunctionComponent<PostModalProps> = ({
  modalTitle,
  modalProps,
  buttonText,
  createPostHandler,
  initialContents = { content: "", imageUrls: [] },
}) => {
  const { toggle } = useLoading();
  const post = useCreateFeedPost(createPostHandler, initialContents);
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
      <Modal {...modalProps} className={classes.modal} displayCloseIcon>
        <h1>{modalTitle}</h1>
        <PostForm
          handlePost={createPost}
          images={post.images}
          setImages={post.setImages}
          postContent={post.content}
          handleInput={post.handleInput}
          clearImages={post.clearImages}
          onSelectImage={onSelectImage}
          initialImages={initialContents?.imageUrls}
          buttonText={buttonText}
        />
      </Modal>
      {imageViewModal.showModal && post.images.length > 0 && (
        <ImageView
          images={post.images}
          modalProps={{ ...imageViewModal, animationTime: 300 }}
          initialIndex={initialIndex}
        />
      )}
    </>
  );
};

export default PostModal;
