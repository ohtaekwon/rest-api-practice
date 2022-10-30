import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";

import { useRouter } from "next/router";
import { useQueryClient, useMutation, useQuery } from "react-query";

import { QueryKeys, fetcher } from "../query";
import MsgInput from "./MsgInput";
import MsgItem from "./MsgItem";

// import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { MessageType } from "../types/messages";
import { UsersType } from "../types/users";
import { CREATE_MESSAGE, GET_MESSAGES } from "../graphql/message";

type Props = {
  smsgs: MessageType[];
  users: UsersType;
};
const MsgList: FC<Props> = (props): JSX.Element => {
  const { smsgs, users } = props;
  const client = useQueryClient();
  const { query } = useRouter();
  const userId = query.userId || query.userid || "";
  const [msgs, setMsgs] = useState(smsgs);
  const [editingId, setEditingId] = useState(null);
  // const [hasNext, setHasNext] = useState(true);
  // const fetchMoreEl = useRef(null);
  // const intersecting = useInfiniteScroll(fetchMoreEl);

  const { mutate: onCreate } = useMutation(
    ({ text }: any) => fetcher(CREATE_MESSAGE, { text, userId }),
    {
      onSuccess: ({ createMessage }) => {
        client.setQueryData(QueryKeys.MESSAGES, (old: any) => {
          return {
            messages: [createMessage, ...old.messages],
          };
        });
      },
    }
  );

  // const onCreate = async (text) => {
  //   const newMsg = await fetcher("post", "/messages", { text, userId });
  //   if (!newMsg) throw Error("something is wrong");
  //   setMsgs((msgs) => [newMsg, ...msgs]);
  // };

  const onUpdate = async (text, id) => {
    const newMsg = await fetcher(
      "put",
      `/messages/${id}`
      //{ text, userId }
    );
    if (!newMsg) throw Error("something is wrong");
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id); // 값이 없으면 -1
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, newMsg);
      return newMsgs;
    });
    doneEdit();
  };
  const onDelete = async (id) => {
    const receivedId = await fetcher(
      "delete",
      `/messages/${id}`
      // {
      //   params: { userId }, // object 주의
      // }
    );
    if (!receivedId) throw Error("something is wrong");

    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === receivedId + ""); // 값이 없으면 -1
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1 /* 새로운 데이터 없음*/);
      return newMsgs;
    });
  };

  const doneEdit = () => setEditingId(null);
  const queryFn = () => fetcher(GET_MESSAGES);

  const { data, error, isError, isLoading } = useQuery(
    QueryKeys.MESSAGES,
    queryFn
  );

  useEffect(() => {
    if (!data?.messages) return;
    setMsgs(data?.messages);
  }, [data?.messages]);

  if (isError) {
    console.error(error);
    return null;
  }

  const getMessages = async () => {
    const newMsgs = await fetcher(
      "get",
      "/messages"
      // {
      //   params: { cursor: msgs[msgs.length - 1]?.id || "" },
      // }
    );
    if (newMsgs.length === 0) {
      // setHasNext(false);
      return;
    }
    setMsgs((msgs) => [...msgs, ...newMsgs]);
  };

  // useEffect(() => {
  //   if (intersecting && hasNext) getMessages();
  // }, [intersecting]);

  console.log("render");

  return (
    <React.Fragment>
      {userId && <MsgInput mutate={onCreate} />}
      <Messages>
        {msgs.map((item) => (
          <MsgItem
            key={item.id}
            onUpdate={onUpdate}
            isEditing={editingId === item.id}
            startEdit={() => setEditingId(item.id)}
            onDelete={() => onDelete(item.id)}
            myId={userId}
            user={users.find((x) => userId === x.userId)}
            {...item}
          />
        ))}
      </Messages>
      {/* <FetchMore ref={fetchMoreEl} /> */}
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
