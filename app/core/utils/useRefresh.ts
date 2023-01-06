import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useEffect } from "react";

const useRefresh = async () => {
  const [value, setValue] = useLocalStorage({ key: "auth-token" });
  const [refreshToken, setRefresh] = useLocalStorage({ key: "refresh-token" });
  const setLocal = async () => {
    try {
      const res = await axios.post(
        `/auth/refresh-tokens`,
        refreshToken
      );
      setValue(res.data.access.token);
      setRefresh(res.data.refresh.token);
      return { value };
    } catch (error) {
      return { error, message: "Refresh hook error" };
    }
  };

  useEffect(() => {
    setLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useRefresh;
