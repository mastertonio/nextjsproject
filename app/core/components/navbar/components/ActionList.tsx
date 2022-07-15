import { Button, Divider, Menu, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import short from "short-uuid";
import { useStyles } from "@styles/navStyle";
import { IAdminListProps } from "./AdminList";
import { useRouter } from "next/router";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { ImProfile } from "react-icons/im";
import { AiFillCaretDown } from "react-icons/ai";

const ActionList: React.FC<IAdminListProps> = () => {
  const router = useRouter();
  const [value, setValue] = useLocalStorage({ key: "auth-token" });
  const [refresh, setRefresh] = useLocalStorage({ key: "refresh-token" })
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const p = router.query;
  const [values, setValues] = useState<any>("");

  const handleChange = (event: any) => {
    setValues(event);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `http://54.159.8.194/v1/auth/logout`, { refreshToken: refresh }, { headers: { Authorization: `Bearer ${value}` }}
      )
      if(res){
        router.push('/')
        setValue('')
        setRefresh('')
        setCurrent('')
      }
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    console.log("the value has changed", values);
  }, [values]);

  return (
    <Menu control={<Button leftIcon={<ImProfile />} rightIcon={<AiFillCaretDown />} variant="subtle" color="gray" size="lg" compact> Profile </Button>} style={{ marginLeft: 10, marginRight: 5 }}>
      <Menu.Label>User Actions</Menu.Label>
      <Menu.Item icon={<ImProfile />} onClick={()=> { router.push(`/user/${p.id}`)}}>Profile</Menu.Item>
      <Divider />
      <Menu.Item onClick={handleLogout} color="red">Logout</Menu.Item>
    </Menu>
  );
};

export default ActionList;
