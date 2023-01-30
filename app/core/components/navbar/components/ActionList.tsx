import { Button, Divider, Menu } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import short from "short-uuid";
import { useStyles } from "@styles/navStyle";
import { IAdminListProps } from "./AdminList";
import { useRouter } from "next/router";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { ImProfile } from "react-icons/im";
import { AiFillCaretDown } from "react-icons/ai";
import UserContext from "@app/context/user.context";
import { useCookies, withCookies } from 'react-cookie';


const ActionList: React.FC = () => {
  const router = useRouter();
  const [value, setValue] = useLocalStorage({ key: "auth-token" });
  const [refresh, setRefresh] = useLocalStorage({ key: "refresh-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const p = router.query;
  const [values, setValues] = useState<any>("");
  // const cookies = new Cookies();
  const [cookies, setCookie, removeCookie] = useCookies(['x-access-token']);

  const userCtx = useContext(UserContext);

  const handleChange = (event: any) => {
    setValues(event);
  };

  const handleLogout = () => {
    try {
      setCookie('x-access-token', '', {
        expires: new Date(0),
        path: '/',
        domain: 'localhost'
      });
      router.push("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button
          leftIcon={<ImProfile />}
          rightIcon={<AiFillCaretDown />}
          variant="subtle"
          color="gray"
          size="lg"
          compact
          style={{ marginLeft: 10, marginRight: 5 }}
        >
          {" "}
          Profile{" "}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>User Actions</Menu.Label>
        <Menu.Item
          icon={<ImProfile />}
          onClick={() => {
            router.push(`/users/profile`);
          }}
          style={{ width: 150 }}
        >
          Profile
        </Menu.Item>
        <Divider />
        <Menu.Item onClick={handleLogout} color="red">
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default withCookies(ActionList);
