import { Button, Divider, Menu, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import short from "short-uuid";
import { useStyles } from "@styles/navStyle";
import { IAdminListProps } from "./AdminList";
import { useRouter } from "next/router";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";

const ActionList: React.FC<IAdminListProps> = ({ actions }) => {
  const { classes } = useStyles();
  const router = useRouter();
  const [value, setValue] = useLocalStorage({ key: "auth-token" });
  const [refresh, setRefresh] = useLocalStorage({ key: "refresh-token" })
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const p = router.query;

  const actionList = actions?.map((a) => ({
    key: short.generate(),
    value: a.name,
    label: a.name,
  }));
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
    <Menu control={<Button> Account </Button>} style={{ marginLeft: 10, marginRight: 5 }}>
      <Menu.Label>Application</Menu.Label>
      <Menu.Item onClick={()=> { router.push(`/user/${p.id}`)}}>Profile</Menu.Item>
      {/* <Menu.Item></Menu.Item> */}
      {/* <Menu.Item>Gallery</Menu.Item> */}
      {/* <Menu.Item
        rightSection={
          <Text size="xs" color="dimmed">
            ⌘K
          </Text>
        }
      >
        Search
      </Menu.Item> */}

      <Divider />

      <Menu.Label>Danger zone</Menu.Label>
      {/* <Menu.Item>Transfer my data</Menu.Item> */}
      <Menu.Item onClick={handleLogout} color="red">Logout</Menu.Item>
    </Menu>
  );
};

export default ActionList;
