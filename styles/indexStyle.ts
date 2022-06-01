import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    // subscribe to color scheme changes right in your styles
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    maxWidth: 700,
    width: '100%',
    height: 450,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',

    // Dynamic media queries, define breakpoints in theme, use anywhere
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      // Type safe child reference in nested selectors via ref
      [`& .${getRef('child')}`]: {
        fontSize: theme.fontSizes.xs,
      },
    },
  },

  child: {
    // assign ref to element
    ref: getRef('child'),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  login_container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  },

  body: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '95vh',
      margin: 20,
      borderRadius: 8
  },

  button:{
      height: 44,
      width: '100%',
      marginTop: 40,
  },


  title: {
    marginTop: 30,
    marginBottom: 40
  },

  forgot_password: {
    display:"flex",
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20
  }
}));
