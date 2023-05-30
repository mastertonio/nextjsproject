import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Text,
  UnstyledButton,
  Box,
  ThemeIcon,
  Collapse,
} from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  TablerIcon,
  IconChevronRight,
  IconChevronLeft,
  IconCalculator
} from "@tabler/icons";
import { useState } from "react";
// import { UserButton } from '../UserButton/UserButton';
// import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
// import { Logo } from './Logo';

const mockdata = [
  { title: "Dashboard", icon: IconGauge },
  {
    title: "My ROIs",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { title: "ROI 1", link: "/" },
      { title: "ROI 2", link: "/" },
      { title: "ROI 3", link: "/" },
      { title: "ROI 4", link: "/" },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
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
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },

  control: {
    fontWeight: 500,
    // display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor: "teal",
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: "gray",
    borderLeft: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,

    "&:hover": {
      backgroundColor: "teal",
      color: "white",
    },
    cursor: "pointer"
  },

  hov: {
    color: "gray",

    "&:hover": {
      backgroundColor: "teal",
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
    color: 'white',
  },
}));

interface LinksGroupProps {
  icon: TablerIcon;
  title: string;
  initiallyOpened?: boolean;
  navigationlist?: { title: string; link: string }[];
  scroll: any;
}

export function LinksGroup({
  icon: Icon,
  title,
  initiallyOpened,
  navigationlist,
  scroll
}: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(navigationlist);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? navigationlist : []).map((link) => (
    <Text<"a">
      component="a"
      className={classes.link}
      href={link.link}
      key={link.title}
      onClick={() => {
        scroll();
      }}
    >
      {link.title}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className='!font-[500] !w-full !py-[10px] !px-[16px] !text-[#000] !text-[14px] hover:bg-teal-700'
      >
        <Group position="apart" spacing={0} className="flex flex-row justify-between w-full">
          <Box sx={{ display: "flex" }}>
            {title === 'ROI Sections' ? (
              <IconCalculator size={18} color={'white'} />
            ) : title === 'My ROIs' ? (
              <IconGauge size={18} color={'white'} />
            ) : (
              <IconNotes size={18} color={'white'} />
            )}

            <Box ml="md">
              <Text color={"white"}>{title}</Text>
            </Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const NavbarNested = () => {
  const { classes } = useStyles();

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.title} scroll />
  ));

  return (
    <Navbar width={{ sm: 220 }} p="xs" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          {/* <Logo width={120} /> */}
          <Code sx={{ fontWeight: 700 }}>Template Builder</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarNested;
