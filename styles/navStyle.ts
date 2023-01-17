import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    // subscribe to color scheme changes right in your styles
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : "",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    // Dynamic media queries, define breakpoints in theme, use anywhere
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      // Type safe child reference in nested selectors via ref
      [`& .${getRef("child")}`]: {
        fontSize: theme.fontSizes.xs,
      },
    },
  },

  header: {
    backgroundColor: theme.colors.gray[2],
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 1920,
    margin: "0 auto",
    transition: 'all 0.5s'
  },

  placeholder: {
    text: 'white'
  },

  childrenSpacing: {
    marginLeft: 15,
    marginRight: 15
  },

  powered_by: {
    display: "flex",
    flexDirection: "row"
  }
}));
