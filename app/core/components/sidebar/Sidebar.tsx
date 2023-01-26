import { useUserStore } from "@app/store/userState";
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
import { useNavShowStore } from "@app/store/builderStore";
import { IAdminListProps } from "../navbar/components/AdminList";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const navShow = useNavShowStore((state) => state.value);
  const [openCompany, setOpenCompany] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [user, setUser] = useState<any>({});
  const userZ = useUserStore((state) => (state.user))

  const getCurrentUser = async () => {
    return await axios.get(`/v1/users/${userZ?.id}`);
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "userList",
    getCurrentUser
  );

  useEffect(() => {
    setUser(data?.data);
  }, [data]);

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      //   hidden={!opened}
      width={{ sm: 200, lg: 250 }}
      height="100vh"
      className={`bg-[#2f4050] text-[lightgray] mt-[-70px] flex-col items-start ${navShow === false ? 'hidden' : ''} sm:flex`}
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
          {user?.role == "admin" ? (
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
            onClick={() => router.push(`/templates/builder`)}
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
