import useAxios from "./useAxios";
import { ChatRoom } from "../constants/types/types";
import { useCallback, useState } from "react";
import { APIEndPoints } from "../constants/api";
import { buildPath } from "../utils/buildPath";

const useChatting = () => {
  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoom[]>([]);
  const { fetchData: getApi } = useAxios();

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

  return {
    chatRoomInfo,

    getChatRoomInfo,
  };
};

export default useChatting;
