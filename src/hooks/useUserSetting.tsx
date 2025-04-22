import { useCallback } from "react";
import useAxios from "./useAxios";
import { buildPath } from "../utils/buildPath";
import { APIEndPoints } from "../constants/api";
import { ModifyUserData } from "../constants/types/types";

// 유저 정보 수정 hooks
const useUserSetting = () => {
  const { fetchData: putApi } = useAxios();
  const { fetchData: techApi } = useAxios();
  const { fetchData: companyApi } = useAxios();

  const favoriteCompany = useCallback(
    async (data: string[]) => {
      await companyApi({
        method: "POST",
        url: APIEndPoints.FAVORITE_COMPANY,
        data: {
          companyNameList: data,
        },
      });
    },
    [companyApi]
  );

  const favoriteTech = useCallback(
    async (data: string[]) => {
      await techApi({
        method: "PUT",
        url: APIEndPoints.FAVORITE_STACK,
        data: {
          techStackNameList: data,
        },
      });
    },
    [techApi]
  );

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
    },
    [putApi]
  );

  return {
    favoriteCompany,
    favoriteTech,
    modifyUser,
  };
};

export default useUserSetting;
