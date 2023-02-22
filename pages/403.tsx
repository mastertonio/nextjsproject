import { createStyles, Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  root: {
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 32,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 30,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'block',
    },
  },
}));

const NotFoundImage: React.FC = () => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Container className={`${classes.root} max-w-[100%] bg-gray-100`}>
      <div className='max-w-[85%] h-screen flex mx-auto pt-[50px] lg:pt-0 sm:pt-[50px]'>
        <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-0 sm:gap-8 items-center">
          <div>
            <Title className={`${classes.title} text-teal-800`}>You have found a secret place. Forbidden Access</Title>
            <Text color="dimmed" size="lg" className="mt-[40px]">
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <Button type="button" variant="outline" size="md" mt="xl" className={`${classes.control} mt-[40px]`} onClick={() => router.push('/')}>
              Get back to home page
            </Button>
          </div>
          <div>
            <Image src="/forbidden.png" alt="desktopImage" className={classes.desktopImage} />
          </div>
        </div>
      </div>
      {/* <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
        <div>
          <Title className={classes.title}>You have found a secret place. Forbidden Access</Title>
          <Text color="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Button type="button" variant="outline" size="md" mt="xl" className={classes.control} onClick={()=>{ router.push('/dashboard')}}>
            Get back to home page
          </Button>
        </div>
      </SimpleGrid> */}
    </Container>
  );
}

export default NotFoundImage