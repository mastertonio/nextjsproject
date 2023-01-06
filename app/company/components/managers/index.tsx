import { useState } from "react";
import {
  Modal,
  Button,
  Text,
  TextInput,
  Grid,
  Stack,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineSwap } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { ICompanyProps } from "@app/dashboard/components/table/utils/tableMethods";
import { useQuery } from "react-query";

export interface ITransferButton {
  id: string;
  refetch: () => void;
  name: string;
}

const TransferButton: React.FC<ITransferButton> = ({ id, refetch, name }) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [company, setCompany] = useLocalStorage({ key: "my-company" });
  const p = router.query;
  const [state, setState] = useState<string | null>(null);

  const getManagers = async () => {
    try {
      const res = await axios.get(
        `/v1/company/${company}/manager`
      );
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, isError, error, data, isFetching } = useQuery(
    "getManagers",
    getManagers
  );

  const transferlist = data?.map((item: { id: string; email: string }) => ({
    key: item.id,
    value: item.id,
    label: item.email,
  }));

  return (
    <Grid
      style={{
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        marginBottom: 15,
      }}
    >
      <Text>Email: </Text>
      <Select
        placeholder="New Title Name"
        style={{ width: 550, marginLeft: "auto" }}
        value={state}
        onChange={setState}
        data={transferlist?.length > 0 ? transferlist : []}
      />
    </Grid>
  );
};

export default TransferButton;
