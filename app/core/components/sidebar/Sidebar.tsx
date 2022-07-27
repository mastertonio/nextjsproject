import {
  Button,
  Collapse,
  Navbar,
  Image,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  MdSpaceDashboard,
  MdCalculate,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdAccessTimeFilled,
  MdLineWeight,
} from "react-icons/md";
import { IAdminListProps } from "../navbar/components/AdminList";

const Sidebar: React.FC<IAdminListProps> = ({ name, user }) => {
  const router = useRouter();
  const [openCompany, setOpenCompany] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);

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
        Welcome {name}
      </Text>
      <Navbar.Section>
        <Button
          variant="subtle"
          fullWidth
          style={{ marginTop: 5, color: "lightgray" }}
          onClick={() => router.push(`/dashboard/${user?.id}`)}
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
        <Collapse in={openCompany} style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
          <Button
            variant="subtle"
            color="blue"
            fullWidth
            style={{ marginTop: 5, marginLeft: 17, color: "lightgray" }}
            leftIcon={<MdLineWeight />}
          >
            Create Company
          </Button>
          <Button
            variant="subtle"
            color="blue"
            fullWidth
            style={{ marginTop: 5, marginLeft: 8, color: "lightgray" }}
            leftIcon={<MdLineWeight />}
          >
            Company List
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
