import "";
// const onCreate = async (text) => {
//   const newMsg = await fetcher("post", "/messages", { text, userId });
//   if (!newMsg) throw Error("something is wrong");
//   setMsgs((msgs) => [newMsg, ...msgs]);
// };

// const onUpdate = async (text, id) => {
//   const newMsg = await fetcher(
//     "put",
//     `/messages/${id}`
//     //{ text, userId }
//   );
//   if (!newMsg) throw Error("something is wrong");
//   setMsgs((msgs) => {
//     const targetIndex = msgs.findIndex((msg) => msg.id === id); // 값이 없으면 -1
//     if (targetIndex < 0) return msgs;
//     const newMsgs = [...msgs];
//     newMsgs.splice(targetIndex, 1, newMsg);
//     return newMsgs;
//   });
//   doneEdit();
// };

// const onDelete = async (id) => {
//   const receivedId = await fetcher(
//     "delete",
//     `/messages/${id}`
//     // {
//     //   params: { userId }, // object 주의
//     // }
//   );
//   if (!receivedId) throw Error("something is wrong");

//   setMsgs((msgs) => {
//     const targetIndex = msgs.findIndex((msg) => msg.id === receivedId + ""); // 값이 없으면 -1
//     if (targetIndex < 0) return msgs;
//     const newMsgs = [...msgs];
//     newMsgs.splice(targetIndex, 1 /* 새로운 데이터 없음*/);
//     return newMsgs;
//   });
// };
// const getMessages = async () => {
//   const newMsgs = await fetcher(
//     "get",
//     "/messages"
//     // {
//     //   params: { cursor: msgs[msgs.length - 1]?.id || "" },
//     // }
//   );
//   if (newMsgs.length === 0) {
//     // setHasNext(false);
//     return;
//   }
//   setMsgs((msgs) => [...msgs, ...newMsgs]);
// };
