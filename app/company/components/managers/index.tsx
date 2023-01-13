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
import { useUserStore } from "@app/store/userState";

export interface ITransferButton {
  id: string;
  refetch: () => void;
  name: string;
}

const TransferButton: React.FC<ITransferButton> = ({ id, refetch, name }) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const p = router.query;
  const [state, setState] = useState<string | null>(null);
  const userZ = useUserStore((state) => (state.user))

  const getManagers = async () => {
    return await axios.get(
        `/v1/company/${userZ?.company_id}/manager`
      );
  };

  const { isLoading, isError, error, data, isFetching } = useQuery(
    "getManagers",
    getManagers
  );

  const transferlist = data?.data.map((item: { id: string; email: string }) => ({
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
