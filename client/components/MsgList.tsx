import React, { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { useRouter } from "next/router";
import {
  useQueryClient,
  useMutation,
  useQuery,
  useInfiniteQuery,
  InfiniteData,
} from "react-query";

import { QueryKeys, fetcher } from "../query";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";

import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { MessageType } from "../types/messages";
import { UsersType } from "../types/users";
import {
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  GET_MESSAGES,
  UPDATE_MESSAGE,
} from "../graphql/message";

const findTargetMsgIndex = (pages, id) => {
  let msgIndex = -1;
  const pageIndex = pages.findIndex(({ messages }) => {
    msgIndex = messages.findIndex((msg) => msg.id === id);
    if (msgIndex > -1) {
      return true;
    }
    return false;
  });
  return { pageIndex, msgIndex };
};

type Props = {
  smsgs: MessageType[];
  users: UsersType;
};
const MsgList: FC<Props> = ({ smsgs, users }): JSX.Element => {
  const client = useQueryClient();
  const { query } = useRouter();
  const userId = query.userId || query.userid || "";
  const [msgs, setMsgs] = useState([{ messages: smsgs }]);
  const [editingId, setEditingId] = useState(null);
  // const [hasNext, setHasNext] = useState(true);
  const fetchMoreEl = useRef(null);
  const intersecting = useInfiniteScroll(fetchMoreEl);

  const queryFn = ({ pageParam = "" }) =>
    fetcher(GET_MESSAGES, { cursor: pageParam });
  const queryOptions = {
    getNextPageParam: ({ messages }) => {
      return messages?.[messages.length - 1]?.id;
    },
  };

  const { data, error, isError, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery(QueryKeys.MESSAGES, queryFn, queryOptions);

  const { mutate: onCreate } = useMutation(
    ({ text }: { text: string }) => fetcher(CREATE_MESSAGE, { text, userId }),
    {
      onSuccess: ({ createMessage }) => {
        client.setQueryData(QueryKeys.MESSAGES, (old: any) => {
          return {
            pageParam: old.pageParam,
            pages: [
              { messages: [createMessage, ...old.pages[0].messages] },
              ...old.pages.slice(1),
            ],
          };
        });
      },
    }
  );

  const { mutate: onUpdate } = useMutation(
    ({ text, id }: { text: string; id: string }) =>
      fetcher(UPDATE_MESSAGE, { text, id, userId }),
    {
      onSuccess: ({ updateMessage }) => {
        client.setQueryData(QueryKeys.MESSAGES, (old: any) => {
          const { pageIndex, msgIndex } = findTargetMsgIndex(
            old.pages,
            updateMessage.id
          );

          if (pageIndex < 0 || msgIndex < 0) return old;
          const newPages = [...old.pages];
          newPages[pageIndex] = { messages: [...newPages[pageIndex].messages] };
          newPages[pageIndex].messages.splice(msgIndex, 1, updateMessage);
          return {
            pageParam: old.pageParam,
            pages: newPages,
          };
        });
        doneEdit();
      },
    }
  );

  const { mutate: onDelete } = useMutation(
    (id: string) => fetcher(DELETE_MESSAGE, { id, userId }),
    {
      onSuccess: ({ deleteMessage: deletedId }) => {
        client.setQueryData(QueryKeys.MESSAGES, (old: any) => {
          const targetIndex = old.messages.findIndex(
            (msg) => msg.id === deletedId
          );
          if (targetIndex < 0) return old;
          const newMsgs = [...old.messages];
          newMsgs.splice(targetIndex, 1);
          return { messages: newMsgs };
        });
      },
    }
  );

  const doneEdit = () => setEditingId(null);

  useEffect(() => {
    if (!data?.pages) return;
    // const data.params = [{messages:[....]},{messages:[....]}] => [{messages:[....]}]
    // const mergedMsgs = data.pages.flatMap((depth) => depth.messages);
    setMsgs(data?.pages);
  }, [data?.pages]);

  useEffect(() => {
    if (intersecting && hasNextPage) fetchNextPage();
  }, [intersecting, hasNextPage]);

  console.log("render");

  if (isError) {
    console.error(error);
    return null;
  }

  return (
    <React.Fragment>
      {userId && <MsgInput mutate={onCreate} />}
      <Messages>
        {msgs.map(({ messages }: any) =>
          messages.map((item) => (
            <MsgItem
              key={item.id}
              onUpdate={onUpdate}
              isEditing={editingId === item.id}
              startEdit={() => setEditingId(item.id)}
              onDelete={() => onDelete(item.id)}
              myId={userId}
              user={users.find((x) => x.id === item.userId)}
              {...item}
            />
          ))
        )}
      </Messages>
      <FetchMore ref={fetchMoreEl} />
    </React.Fragment>
  );
};
export default MsgList;

const Messages = styled.ul`
  width: 100%;
  padding: 0;
`;
const FetchMore = styled.div`
  border-color: transparent;
  height: 1px;
  margin-bottom: 1px;
  padding-bottom: 1px;
`;
