import { useCallback } from "react";
import useAxios from "./useAxios";
import { buildPath } from "../utils/buildPath";
import { APIEndPoints } from "../constants/api";
import { ModifyUserData } from "../constants/types/types";

// 유저 정보 수정,조회 hooks
const useUserSetting = () => {
  const { fetchData: getCompanyApi } = useAxios();
  const { fetchData: getTechApi } = useAxios();
  const { fetchData: putApi } = useAxios();
  const { fetchData: putaApi } = useAxios();
  const { fetchData: deleteaApi } = useAxios();
  const { fetchData: techApi } = useAxios();
  const { fetchData: companyApi } = useAxios();

  const getFavoriteCompany = useCallback(async () => {
    const res = await getCompanyApi({
      method: "GET",
      url: APIEndPoints.FAVORITE_COMPANY,
    });

    return res?.data?.map((company: { id: number }) => company.id) || [];
  }, [getCompanyApi]);

  const getFavoriteTech = useCallback(async () => {
    const res = await getTechApi({
      method: "GET",
      url: APIEndPoints.FAVORITE_STACK,
    });
    return (
      res?.data?.map((tech: { techStack: string }) => tech.techStack) || []
    );
  }, [getTechApi]);

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

  const AddACompany = useCallback(
    async (id: number) => {
      await putaApi({
        method: "PUT",
        url: buildPath(APIEndPoints.FAVORITE_A_COMPANY, { id }),
      });
    },
    [putaApi]
  );

  const DeleteACompany = useCallback(
    async (id: number) => {
      await deleteaApi({
        method: "DELETE",
        url: buildPath(APIEndPoints.FAVORITE_A_COMPANY, { id }),
      });
    },
    [deleteaApi]
  );

  const favoriteTech = useCallback(
    async (data: string[]) => {
      console.log(data);
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

  const deleteUser = useCallback(
    async (userId: number) => {
      if (!userId) return;

      await putApi({
        method: "DELETE",
        url: buildPath(APIEndPoints.DELETE_USER, { id: userId }),
      }).then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
    },
    [putApi]
  );

  return {
    getFavoriteCompany,
    getFavoriteTech,
    favoriteCompany,
    AddACompany,
    DeleteACompany,
    favoriteTech,
    modifyUser,
    deleteUser,
  };
};

export default useUserSetting;
