import axios from "axios";
import { useQuery } from "react-query";

const getRoiListAll = async () => {
    return await axios.get(`/v1/dashboard/roi/list`);
};
export const useRoi = () => {
  const { isLoading, isError, error, data, refetch, isFetching } = useQuery(
    "get_all_roi",
    getRoiListAll
  );

  return refetch
};

