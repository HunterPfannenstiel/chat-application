import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { fetchPostComments } from "utils/actions";

const usePostComments = () => {
  const [page, setPage] = useState(0);
  const { postId } = useRouter().query;
  const { data, isLoading, isError } = useQuery(
    ["comments", postId, page],
    fetchPostComments.bind(null, postId, page)
  );

  return { post: data, isLoading, isError, setPage };
};

export default usePostComments;
