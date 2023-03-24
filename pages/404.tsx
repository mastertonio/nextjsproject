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

  parser.setFunction('VLOOKUP', (params: number[]) => {
    // Get the row index of the search value
    // let rowIndex = -1;
    // for (let i = 0; i < range.length; i++) {
    //   if (range[i][0] === searchValue) {
    //     rowIndex = i;
    //     break;
    //   }
    // }
  
    // // If exactMatch is true and the search value is not found, return #N/A
    // if (exactMatch && rowIndex === -1) {
    //   return '#N/A';
    // }
  
    // // If exactMatch is false and the search value is not found, find the nearest value
    // if (!exactMatch && rowIndex === -1) {
    //   rowIndex = 0;
    //   let minDiff = Math.abs(range[rowIndex][0] - searchValue);
    //   for (let i = 1; i < range.length; i++) {
    //     const diff = Math.abs(range[i][0] - searchValue);
    //     if (diff < minDiff) {
    //       rowIndex = i;
    //       minDiff = diff;
    //     }
    //   }
    // }
  
    // // Return the value at the specified index
    // if (range[rowIndex] && range[rowIndex][index - 1]) {
    //   return range[rowIndex][index - 1];
    // } else {
    //   return '#N/A';
    // }
    return params[0] + 5;
  });

  parser.on('callFunction', function(name: string, params: number[], done: (arg0: any) => void) {
    if (name === 'VLOOKUP') {
      console.log(name, params)
      // done(params[0] + 5);
    }
  });

  const data = [
    ['TLB4', null, "Incumbent Solution", "text", null, null, "Avamar", null, "749"],
    ["TLC4", null, "Price", "text", "$0,0.00", null, "1267.00", null, "749"],
    ["TLD4", null, "Unit", "text", null, null, "per TB", null, "749"],
    ["TLE4", null, "Discount %", "text", null, null, "80.0%", null, "749"],
];

  // parser.parse('SUM(4, ADD_5(1))')
  
  // Add the data to the parser
  parser.setVariable('A1', 1);
  parser.setVariable('A2', 3);
  parser.setVariable('B1', 4);
  parser.setVariable('B2', 2);
  
  // Parse a VLOOKUP formula
  const formula = 'VLOOKUP(3, A1:B2, 2, true)';
  const result = parser.parse(formula);
  
  console.log(parser.parse('SUM(4, VLOOKUP(1))')); // Output: 2


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