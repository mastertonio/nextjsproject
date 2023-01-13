import { Select } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useStyles } from "@styles/navStyle";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "react-query";
import UserContext from "@app/context/user.context";

type iAdminData = {
  verification_code: string | null;
  phone: number | null;
  manager: string | null;
  first_name: string | null;
  last_name: string | null;
  currency: string | null;
  email_verified_at: Date | null;
  remember_token: string | null;
  role: string;
  isEmailVerified: boolean;
  avatar: string;
  name: string;
  email: string;
  company_id: string;
  id: string;
};

export interface IAdminListProps {
  admin?: iAdminData[];
  actions?: iAdminData[];
  refetch: () => void;
  name?: string;
  user?: iAdminData;
}

const AdminList: React.FC = () => {
  const { classes } = useStyles();
  const [values, setValues] = useState<any>("Admin");

  const getAdminList = async () => {
    return await axios.get(`/v1/dashboard/admin/list`);
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "adminList",
    getAdminList
  );

  const adminList = data?.data.map((a: { name: string }) => a.name);
  adminList?.unshift("Admin");

  const handleChange = (event: string) => {
    setValues(event);
  };

  return (
    <Select
      searchable
      nothingFound="No options"
      variant="filled"
      data={adminList ?? []}
      rightSection={<AiFillCaretDown />}
      styles={{
        wrapper: { color: "white" },
        dropdown: { color: "white" },
        item: { color: "teal" },
        input: {
          color: "white",
          backgroundColor: "#00acac",
          placeholder: "red",
        },
        required: { color: "teal" },
      }}
      value={values}
      onChange={(event: string) => handleChange(event)}
      className={classes.childrenSpacing}
    />
  );
};

export default AdminList;
