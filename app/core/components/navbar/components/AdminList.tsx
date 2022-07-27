import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useStyles } from "@styles/navStyle";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "react-query";

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
  refetch?: () => void;
  name?: string;
  user?: iAdminData;
}

const AdminList: React.FC = () => {
  const { classes } = useStyles();
  const [values, setValues] = useState<any>("Admin");
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });

  const getAdminList = async () => {
    try {
      const res = await axios.get(
        `http://54.159.8.194/v1/dashboard/admin/list`,
        {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "adminList",
    getAdminList
  );

  const adminList = data?.map((a: { name: string }) => a.name);
  adminList?.unshift("Admin");

  useEffect(() => {
    console.log(data);
  }, [data]);

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
