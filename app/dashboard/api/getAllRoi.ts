import axios from "axios";
import { useQuery } from "react-query";

const getRoiListAll = async () => {
  try {
    const value = localStorage.getItem("auth-token");
    const res = await axios.get(`http://54.159.8.194/v1/dashboard/roi/list`, {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const useRoi = () => {
  const { isLoading, isError, error, data, refetch, isFetching } = useQuery(
    "get_all_roi",
    getRoiListAll
  );

  return refetch
};

