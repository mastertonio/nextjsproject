import ActionList from "@app/core/components/navbar/components/ActionList";
import BuilderContext from "@app/context/builder.context";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
} from "@mantine/core";
//   import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons";
import { useContext } from "react";
import shortUUID from "short-uuid";
import AddSectionModal from "@app/company/components/sectionComponents/modals/AddSectionModal";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  builderheader: {
    margin: `30px auto`,
    maxWidth: 1920,
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const mockdata = [
  {
    icon: IconCode,
    title: "Add Quotes",
    description:
      "This will create a section below the blank page with default header",
  },
  {
    icon: IconCoin,
    title: "Add Section Without Header",
    description:
      "This will create a section below the blank page without a header",
  },
  {
    icon: IconBook,
    title: "Add Media Section",
    description: "Media Section for video, pictures and gifs",
  },
  {
    icon: IconFingerprint,
    title: "Add Questions on a Section",
    description: "Adds a question form inside a section",
  },
  {
    icon: IconChartPie3,
    title: "Create Formula",
    description: "Create formula",
  },
  {
    icon: IconNotification,
    title: "Add Carousel",
    description: "Image or Text carousel",
  },
];

const HeaderMegaMenu = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const builderCtx = useContext(BuilderContext);

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        {/* <ThemeIcon size={34} variant="default" radius="md">
            <item.icon size={22} color={theme.fn.primaryColor()} />
          </ThemeIcon> */}
        <div>
          <Text size="sm" weight={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box className={classes.builderheader}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <div>
            <Button
              type="button"
              style={{ marginRight: "auto" }}
              onClick={() => builderCtx.buildDraggable()}
              color={builderCtx.draggableDisabled ? 'gray' : 'blue'}
              variant="light"
            >
              Reorder Sections
            </Button>
          </div>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            {/* <AddSectionModal style={classes.link} /> */}
            <Button type="button" className={classes.link} variant="subtle" onClick={() => builderCtx.addSection({ id: shortUUID.generate(), name: shortUUID.generate(), title: 'Edit Section Title', description: "<p>Edit Section Description</p><p></p>" })}>
              Add Section
            </Button>

            <Link href="/templates/builder/preview" className={classes.link} passHref>
              <a target={"_blank"}>Preview</a>
            </Link>
            <a href="#" className={classes.link}>
              Share
            </a>
          </Group>
          <Group>
            <ActionList />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button type="button" variant="default">Log in</Button>
            <Button type="button">Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default HeaderMegaMenu;
