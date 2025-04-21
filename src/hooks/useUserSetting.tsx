import { useCallback, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "./useAxios";
import { buildPath } from "../utils/buildPath";
import { APIEndPoints } from "../constants/api";
import { ModifyUserData } from "../constants/types/types";

// 유저 정보 수정 hooks
const useUserSetting = () => {
  const { setUser } = useAuth();
  const { fetchData: getApi } = useAxios();
  const { fetchData: putApi } = useAxios();

  const getUserData = useCallback(async () => {}, [getApi, setUser]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const modifyUser = useCallback(
    async (userId: number, data: ModifyUserData) => {
      if (!userId) return;

      await putApi({
        method: "PUT",
        url: buildPath(APIEndPoints.MODIFY_PROFILE, { id: userId }),
        data: {
          introduction: data.introduction,
          email: data.email,
          nickname: data.nickname,
          profileImage: data.profileImage,
        },
      });
      await getUserData();
    },
    [putApi, getUserData]
  );

  return {
    modifyUser,
  };
};

export default useUserSetting;
