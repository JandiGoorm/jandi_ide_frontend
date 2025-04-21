import useAxios from "./useAxios";
import { ChatRoom } from "../constants/types/types";
import { useCallback, useState } from "react";
import { APIEndPoints } from "../constants/api";
import { buildPath } from "../utils/buildPath";

const useChatting = () => {
  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoom | null>(null);
  const { fetchData: getApi } = useAxios();
  const { fetchData: getParticipantsApi } = useAxios();

  const getChatRoomInfo = useCallback(
    async (id: string) => {
      await getApi({
        method: "GET",
        url: buildPath(APIEndPoints.CHATROOM_MANAGE, { id }),
      }).then((res) => {
        console.log(res);
        setChatRoomInfo(res?.data);
      });
    },
    [getApi]
  );

  const getChatRoomParticipants = useCallback(
    async (id: string) => {
      const res = await getParticipantsApi({
        method: "GET",
        url: buildPath(APIEndPoints.CHATROOM_PARTICIPANTS, { id }),
      });

      return res?.data.length;
    },
    [getParticipantsApi]
  );

  return {
    chatRoomInfo,

    getChatRoomInfo,
    getChatRoomParticipants,
  };
};

export default useChatting;
