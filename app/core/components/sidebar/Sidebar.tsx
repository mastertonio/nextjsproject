import {
  Button,
  Collapse,
  Navbar,
  Image,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  MdSpaceDashboard,
  MdCalculate,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdAccessTimeFilled,
  MdLineWeight,
} from "react-icons/md";
import { useQuery } from "react-query";
import { IAdminListProps } from "../navbar/components/AdminList";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [openCompany, setOpenCompany] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [company, setCompany] = useLocalStorage({ key: "my-company" });
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [user, setUser] = useState<any>({});

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`http://54.159.8.194/v1/users/${current}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "userList",
    getCurrentUser
  );

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      //   hidden={!opened}
      style={{
        backgroundColor: "#2f4050",
        color: "lightgray",
        marginTop: -70,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
      width={{ sm: 200, lg: 250 }}
      height="100vh"
    >
      <Image style={{ marginTop: 35 }} src="/logo.png" alt="random" />
      <Text style={{ marginBottom: 150, marginLeft: 35, width: "full" }}>
        Welcome {user?.name}
      </Text>
      <Navbar.Section>
        <Button
          variant="subtle"
          fullWidth
          style={{ marginTop: 5, color: "lightgray" }}
          onClick={() => router.push(`/dashboard`)}
          leftIcon={<MdSpaceDashboard />}
          size="md"
        >
          Dashboard
        </Button>
      </Navbar.Section>
      <Navbar.Section>
        <Button
          variant="subtle"
          color="blue"
          fullWidth
          style={{ marginTop: 5, color: "lightgray" }}
          onClick={() => setOpenCompany((o) => !o)}
          leftIcon={<MdCalculate />}
          rightIcon={
            openCompany ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />
          }
          size="md"
        >
          Company
        </Button>
        <Collapse
          in={openCompany}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          {user?.role == "admin"? (
            <Button
              variant="subtle"
              color="blue"
              fullWidth
              style={{ marginTop: 5, marginLeft: 17, color: "lightgray" }}
              leftIcon={<MdLineWeight />}
              onClick={() => router.push(`/company`)}
            >
              Manage Company
            </Button>
          ) : (
            ""
          )}
          <Button
            variant="subtle"
            color="blue"
            fullWidth
            style={{ marginTop: 5, marginLeft: 8, color: "lightgray" }}
            leftIcon={<MdLineWeight />}
            onClick={() => router.push(`/users`)}
          >
            Company Users
          </Button>
        </Collapse>
      </Navbar.Section>
      <Navbar.Section>
        <Button
          variant="subtle"
          color="blue"
          fullWidth
          style={{ marginTop: 5, color: "lightgray" }}
          size="md"
          leftIcon={<MdAccessTimeFilled />}
          onClick={() => setOpenTemplate((o) => !o)}
          rightIcon={
            openTemplate ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />
          }
        >
          Template
        </Button>
        <Collapse in={openTemplate}>
          <Button
            variant="subtle"
            color="blue"
            fullWidth
            style={{ marginTop: 5, marginLeft: 17, color: "lightgray" }}
            leftIcon={<MdLineWeight />}
          >
            Create Template
          </Button>
          <Button
            variant="subtle"
            color="blue"
            fullWidth
            style={{ marginTop: 5, marginLeft: 8, color: "lightgray" }}
            leftIcon={<MdLineWeight />}
            onClick={() => router.push(`/templates`)}
          >
            Template List
          </Button>
        </Collapse>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
