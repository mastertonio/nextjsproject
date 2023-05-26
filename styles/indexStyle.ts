import { createStyles, getStylesRef } from '@mantine/core';
import { url } from 'inspector';

export const useStyles = createStyles((theme, _params) => ({
  wrapper: {
    // subscribe to color scheme changes right in your styles
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    maxWidth: 600,
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
      [`& .${getStylesRef('child')}`]: {
        fontSize: theme.fontSizes.xs,
      },
    },
  },

  child: {
    // assign ref to element
    ref: getStylesRef('child'),
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
      borderRadius: 8,
  },

  button:{
      height: 44,
      width: '100%',
      marginTop: 40,
      textAlign: 'center'
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
  },

  wrapper2: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    // backgroundImage: `url("/login.jpg")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center'
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: `100vh`,
    maxWidth: 600,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },

     [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      maxWidth: '100%',
    },
  },

  title2: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

    forgotImage: {
        [theme.fn.smallerThan('sm')]: {
            display: 'block',
        },
    },
}));
