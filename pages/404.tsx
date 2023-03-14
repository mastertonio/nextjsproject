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

const FourOhFour: React.FC = () => {
  const { classes } = useStyles();
  const router = useRouter();

  const FormulaParser = require('hot-formula-parser');
  const parser = new FormulaParser.Parser();

  // Define a test data set
  const data: { [key: string]: number } = {
    A1: 1,
    A2: 2,
    A3: 3,
    A4: 4,
    A5: 5,
  };

  // Create a new parser instance

  // Set up a custom variable resolver to fetch data from the test data set
  parser.on('callVariable', (name: string) => {
    return data[name];
  });

  parser.on('callRangeValue', function(startCellCoord: { row: { index: any; }; column: { index: any; }; }, endCellCoord: { row: { index: number; }; column: { index: number; }; }, done: (arg0: number[][]) => void) {
    var data = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
    ];
    var fragment = [];
  
    for (var row = startCellCoord.row.index; row <= endCellCoord.row.index; row++) {
      var rowData = data[row];
      var colFragment = [];
  
      for (var col = startCellCoord.column.index; col <= endCellCoord.column.index; col++) {
        colFragment.push(rowData[col]);
      }
      fragment.push(colFragment);
    }
  
    if (fragment) {
      done(fragment);
    }
  });
  
  
  console.log(parser.parse('JOIN(A1:E2)')); // returns `"1,2,3,4,5,6,7,8,9,10"`
  console.log(parser.parse('COLUMNS(A1:E2)')); // returns `5`
  console.log(parser.parse('ROWS(A1:E2)')); // returns `2`
  console.log(parser.parse('COUNT(A1:E2)')); // returns `10`
  console.log(parser.parse('COUNTIF(A1:E2, ">5")'))
  console.log(parser.parse('SUM(A1:E2)')); // returns `5`


  return (
    <Container className={`${classes.root} max-w-[100%] bg-gray-100`}>
      <div className='max-w-[85%] h-screen flex mx-auto pt-[50px] lg:pt-0 sm:pt-[50px]'>
        <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-0 sm:gap-8 items-center">
          <div>
            <Title className={`${classes.title} text-teal-800`}>You have found our error page 404.</Title>
            <Text color="dimmed" size="lg" className="mt-[40px]">
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <Button type="button" variant="outline" size="md" mt="xl" className={`${classes.control} mt-[40px]`} onClick={() => router.push('/')}>
              Get back to home page
            </Button>
          </div>
          <div>
            <Image src="/404-png.png" alt="desktopImage" className={classes.desktopImage} />
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
          <Button type="button" variant="outline" size="md" mt="xl" className={classes.control} onClick={() => { router.push('/dashboard') }}>
            Get back to home page
          </Button>
        </div>
      </SimpleGrid> */}
    </Container>
  );
}

export default FourOhFour