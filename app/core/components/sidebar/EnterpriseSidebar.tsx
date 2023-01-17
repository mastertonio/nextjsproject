import { useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  // Code,
  ScrollArea,
  Image,
} from "@mantine/core";
import {
  IconBellRinging,
  // IconFingerprint,
  // IconKey,
  // IconSettings,
  // Icon2fa,
  // IconDatabaseImport,
  // IconReceipt2,
  IconCalculator,
  IconCategory,
  IconX
} from "@tabler/icons";
import { useNavShowStore } from "@app/store/builderStore";
import { LinksGroup } from "@app/core/components/sidebar/BuilderSidebar";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor: "#2f4050",
      paddingBottom: 0,
      hiddenBreakpoint: "sm",
      //   hidden={!opened}
      color: "lightgray",
      marginTop: -70,
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      height: "100vh",
    },

    header: {
      padding: theme.spacing.md,
      paddingTop: 0,
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      borderBottom: `1px solid ${theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[3]
        }`,
    },

    links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
    },

    linksInner: {
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },

    footer: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[3]
        }`,
    },
  };
});

const mockdata = {
  sidebar: {
    brand: {
      logo: "https://www.theroishop.com/company_specific_files/547/logo/logo.png",
      title: "The ROI Shop",
    },
    navigationMenu: [
      {
        label: "ROI Sections",
        icon: IconCategory,
        initiallyOpened: true,
        link: null,
        menuSequence: 1,
        links: [
          {
            label: "Dashboard",
            link: "64648f24-6421-11ed-81ce-0242ac120002",
            listSequence: 1,
            icon: IconBellRinging,
          },
          {
            label: "Narrasoft Section 1",
            link: "64649302-6421-11ed-81ce-0242ac120002",
            listSequence: 1,
            icon: IconBellRinging,
          },
          {
            label: "Narrasoft Section 2",
            link: "64649528-6421-11ed-81ce-0242ac120002",
            listSequence: 1,
            icon: IconBellRinging,
          },
          {
            label: "Narrasoft Section 3",
            link: "64649af0-6421-11ed-81ce-0242ac120002",
            listSequence: 1,
            icon: IconBellRinging,
          },
          {
            label: "Narrasoft Section 4",
            link: "64649d2a-6421-11ed-81ce-0242ac120002",
            listSequence: 1,
            icon: IconBellRinging,
          },
          {
            label: "Narrasoft Section 5",
            link: "64649f5a-6421-11ed-81ce-0242ac120002",
            listSequence: 1,
            icon: IconBellRinging,
          },
          {
            label: "Narrasoft Section 6",
            link: "6464a158-6421-11ed-81ce-0242ac120002",
            listSequence: 1,
            icon: IconBellRinging,
          },
          {
            label: "Summary",
            link: "6464a360-6421-11ed-81ce-0242ac120002",
            listSequence: 1,
            icon: IconBellRinging,
          },
        ],
      },
      {
        label: "My ROIs",
        icon: IconCalculator,
        menuSequence: 2,
        link: "https://www.theroishop.com/login/?ref=/dashboard",
      },
    ],
  },
};

const NavbarSimple = () => {
  const { classes, cx } = useStyles();
  const navShow = useNavShowStore((state) => state.value);
  const hide = useNavShowStore((state) => state.hide);
  const [active, setActive] = useState("Billing");

  const links = mockdata.sidebar.navigationMenu.map((item) => (
    <LinksGroup {...item} key={item.label} icon={item.icon} />
  ));

  return (
    <Navbar width={{ sm: 220 }} p="md" className={`${classes.navbar} ${navShow === false ? 'hidden' : ''} sm:flex`}>
      <Group position="apart">
        <div className="ml-auto flex sm:hidden">
          <IconX className="w-[30px] h-[30px]" onClick={() => hide()} />
        </div>

        <Image
          className="mt-[15px] sm:mt-[35px]"
          src="https://www.theroishop.com/company_specific_files/547/logo/logo.png"
          alt="random"
        />
      </Group>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarSimple;
