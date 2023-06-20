import { Button, Divider, Menu } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import short from "short-uuid";
import { useStyles } from "@styles/navStyle";
// import { IAdminListProps } from "./AdminList";
import { useRouter } from "next/router";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { ImProfile } from "react-icons/im";
import { AiFillCaretDown } from "react-icons/ai";
import UserContext, { UserDataProp } from "@context/user.context";
import { useUserStore } from "@app/store/userState";
import Cookies from 'js-cookie';
import { signOut } from "next-auth/react";


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
  user?: iAdminData;
}

const ActionList: React.FC<Partial<UserDataProp>> = ({ user }: any) => {
  const router = useRouter();
  const p = router.query;
  const [values, setValues] = useState<any>("");
  // const cookies = new Cookies();
  // const [cookies, setCookie, removeCookie] = useCookies(['x-access-token']);

  const userCtx = useContext(UserContext);

  const handleChange = (event: any) => {
    setValues(event);
  };

  const handleLogout = () => {
    try {
      // sessionStorage.clear()
      Cookies.set('x-access-token', ' ', {
        expires: Date.now()
      });

      Cookies.set('session.sig', ' ', {
        expires: Date.now()
      });

      Cookies.set('session', ' ', {
        expires: Date.now()
      });

      Cookies.remove('x-access-token', { path: '/', domain: 'localhost' })
      Cookies.remove('session.sig', { path: '/', domain: 'localhost' })
      Cookies.remove('session', { path: '/', domain: 'localhost' })
      router.push("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button
          type="button"
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
        <Menu.Label>
          {user?.first_name && user?.last_name ? `${user?.first_name} ${user?.last_name}` : `${user?.email}`}
        </Menu.Label>
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
        <Menu.Item onClick={async () => {
          // const data = await signOut({ redirect: false, callbackUrl: "/" })
          // console.log('log out', data.url)
          // router.push(data.url)
          signOut();
          router.push("/")
        }} color="red">
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ActionList;
