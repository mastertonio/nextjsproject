// type TerminalMap = { [key: number]: string };

// type Production = [number, number[]];

// interface ParserFactoryProps {
//   sheet: any;
//   parser: {
//     trace: () => void,
//     yy: any,
//     symbols_: any,
//     terminals_: TerminalMap;
//     productions_: Production[];
//   };
// }

// const ParserFactory: React.FC<ParserFactoryProps> = ({ sheet, parser }) => {
//   const symbols = {
//     error: 2,
//     expressions: 3,
//     e: 4,
//     EOF: 5,
//     variableSequence: 6,
//     TRUE: 7,
//     FALSE: 8,
//     NULL: 9,
//     TIME_AMPM: 10,
//     TIME_24: 11,
//     number: 12,
//     STRING: 13,
//     "&": 14,
//     "=": 15,
//     "+": 16,
//     "(": 17,
//     ")": 18,
//     "[": 19,
//     expseq: 20,
//     "]": 21,
//     "<": 22,
//     ">": 23,
//     NOT: 24,
//     "-": 25,
//     "*": 26,
//     "/": 27,
//     "^": 28,
//     E: 29,
//     FUNCTION: 30,
//     cell: 31,
//     FIXEDCELL: 32,
//     ":": 33,
//     CELL: 34,
//     SHEET: 35,
//     "!": 36,
//     ";": 37,
//     ",": 38,
//     VARIABLE: 39,
//     DECIMAL: 40,
//     NUMBER: 41,
//     "%": 42,
//     "#": 43,
//     $accept: 0,
//     $end: 1,
//   };

//   const terminals_ = {
//     5: "EOF",
//     7: "TRUE",
//     8: "FALSE",
//     9: "NULL",
//     10: "TIME_AMPM",
//     11: "TIME_24",
//     13: "STRING",
//     14: "&",
//     15: "=",
//     16: "+",
//     17: "(",
//     18: ")",
//     19: "[",
//     21: "]",
//     22: "<",
//     23: ">",
//     24: "NOT",
//     25: "-",
//     26: "*",
//     27: "/",
//     28: "^",
//     29: "E",
//     30: "FUNCTION",
//     32: "FIXEDCELL",
//     33: ":",
//     34: "CELL",
//     35: "SHEET",
//     36: "!",
//     37: ";",
//     38: ",",
//     39: "VARIABLE",
//     40: "DECIMAL",
//     41: "NUMBER",
//     42: "%",
//     43: "#",
//   };

//   const productions_ = [
//     0,
//     [3, 2],
//     [4, 1],
//     [4, 1],
//     [4, 1],
//     [4, 1],
//     [4, 1],
//     [4, 1],
//     [4, 1],
//     [4, 1],
//     [4, 3],
//     [4, 3],
//     [4, 3],
//     [4, 3],
//     [4, 3],
//     [4, 4],
//     [4, 4],
//     [4, 4],
//     [4, 3],
//     [4, 3],
//     [4, 3],
//     [4, 3],
//     [4, 3],
//     [4, 3],
//     [4, 3],
//     [4, 2],
//     [4, 2],
//     [4, 1],
//     [4, 3],
//     [4, 4],
//     [4, 1],
//     [4, 1],
//     [4, 2],
//     [31, 1],
//     [31, 3],
//     [31, 1],
//     [31, 3],
//     [31, 3],
//     [31, 5],
//     [20, 1],
//     [20, 3],
//     [20, 3],
//     [6, 1],
//     [6, 3],
//     [12, 1],
//     [12, 3],
//     [12, 2],
//     [2, 3],
//     [2, 4],
//   ];

//   const table = [
//     {
//       2: 18,
//       3: 1,
//       4: 2,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       1: [3],
//     },
//     {
//       5: [1, 25],
//       14: [1, 26],
//       15: [1, 27],
//       16: [1, 28],
//       22: [1, 29],
//       23: [1, 30],
//       24: [1, 31],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//     },
//     {
//       5: [2, 2],
//       14: [2, 2],
//       15: [2, 2],
//       16: [2, 2],
//       18: [2, 2],
//       21: [2, 2],
//       22: [2, 2],
//       23: [2, 2],
//       24: [2, 2],
//       25: [2, 2],
//       26: [2, 2],
//       27: [2, 2],
//       28: [2, 2],
//       37: [2, 2],
//       38: [2, 2],
//       40: [1, 36],
//     },
//     {
//       5: [2, 3],
//       14: [2, 3],
//       15: [2, 3],
//       16: [2, 3],
//       18: [2, 3],
//       21: [2, 3],
//       22: [2, 3],
//       23: [2, 3],
//       24: [2, 3],
//       25: [2, 3],
//       26: [2, 3],
//       27: [2, 3],
//       28: [2, 3],
//       37: [2, 3],
//       38: [2, 3],
//     },
//     {
//       5: [2, 4],
//       14: [2, 4],
//       15: [2, 4],
//       16: [2, 4],
//       18: [2, 4],
//       21: [2, 4],
//       22: [2, 4],
//       23: [2, 4],
//       24: [2, 4],
//       25: [2, 4],
//       26: [2, 4],
//       27: [2, 4],
//       28: [2, 4],
//       37: [2, 4],
//       38: [2, 4],
//     },
//     {
//       5: [2, 5],
//       14: [2, 5],
//       15: [2, 5],
//       16: [2, 5],
//       18: [2, 5],
//       21: [2, 5],
//       22: [2, 5],
//       23: [2, 5],
//       24: [2, 5],
//       25: [2, 5],
//       26: [2, 5],
//       27: [2, 5],
//       28: [2, 5],
//       37: [2, 5],
//       38: [2, 5],
//     },
//     {
//       5: [2, 6],
//       14: [2, 6],
//       15: [2, 6],
//       16: [2, 6],
//       18: [2, 6],
//       21: [2, 6],
//       22: [2, 6],
//       23: [2, 6],
//       24: [2, 6],
//       25: [2, 6],
//       26: [2, 6],
//       27: [2, 6],
//       28: [2, 6],
//       37: [2, 6],
//       38: [2, 6],
//     },
//     {
//       5: [2, 7],
//       14: [2, 7],
//       15: [2, 7],
//       16: [2, 7],
//       18: [2, 7],
//       21: [2, 7],
//       22: [2, 7],
//       23: [2, 7],
//       24: [2, 7],
//       25: [2, 7],
//       26: [2, 7],
//       27: [2, 7],
//       28: [2, 7],
//       37: [2, 7],
//       38: [2, 7],
//     },
//     {
//       5: [2, 8],
//       14: [2, 8],
//       15: [2, 8],
//       16: [2, 8],
//       18: [2, 8],
//       21: [2, 8],
//       22: [2, 8],
//       23: [2, 8],
//       24: [2, 8],
//       25: [2, 8],
//       26: [2, 8],
//       27: [2, 8],
//       28: [2, 8],
//       37: [2, 8],
//       38: [2, 8],
//       42: [1, 37],
//     },
//     {
//       5: [2, 9],
//       14: [2, 9],
//       15: [2, 9],
//       16: [2, 9],
//       18: [2, 9],
//       21: [2, 9],
//       22: [2, 9],
//       23: [2, 9],
//       24: [2, 9],
//       25: [2, 9],
//       26: [2, 9],
//       27: [2, 9],
//       28: [2, 9],
//       37: [2, 9],
//       38: [2, 9],
//     },
//     {
//       2: 18,
//       4: 38,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 40,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       20: 39,
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 41,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 42,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       5: [2, 27],
//       14: [2, 27],
//       15: [2, 27],
//       16: [2, 27],
//       18: [2, 27],
//       21: [2, 27],
//       22: [2, 27],
//       23: [2, 27],
//       24: [2, 27],
//       25: [2, 27],
//       26: [2, 27],
//       27: [2, 27],
//       28: [2, 27],
//       37: [2, 27],
//       38: [2, 27],
//     },
//     {
//       17: [1, 43],
//     },
//     {
//       5: [2, 30],
//       14: [2, 30],
//       15: [2, 30],
//       16: [2, 30],
//       18: [2, 30],
//       21: [2, 30],
//       22: [2, 30],
//       23: [2, 30],
//       24: [2, 30],
//       25: [2, 30],
//       26: [2, 30],
//       27: [2, 30],
//       28: [2, 30],
//       37: [2, 30],
//       38: [2, 30],
//     },
//     {
//       2: 44,
//       5: [2, 31],
//       14: [2, 31],
//       15: [2, 31],
//       16: [2, 31],
//       18: [2, 31],
//       21: [2, 31],
//       22: [2, 31],
//       23: [2, 31],
//       24: [2, 31],
//       25: [2, 31],
//       26: [2, 31],
//       27: [2, 31],
//       28: [2, 31],
//       37: [2, 31],
//       38: [2, 31],
//       39: [1, 45],
//       43: [1, 24],
//     },
//     {
//       5: [2, 42],
//       14: [2, 42],
//       15: [2, 42],
//       16: [2, 42],
//       18: [2, 42],
//       21: [2, 42],
//       22: [2, 42],
//       23: [2, 42],
//       24: [2, 42],
//       25: [2, 42],
//       26: [2, 42],
//       27: [2, 42],
//       28: [2, 42],
//       37: [2, 42],
//       38: [2, 42],
//       40: [2, 42],
//       43: [1, 46],
//     },
//     {
//       5: [2, 44],
//       14: [2, 44],
//       15: [2, 44],
//       16: [2, 44],
//       18: [2, 44],
//       21: [2, 44],
//       22: [2, 44],
//       23: [2, 44],
//       24: [2, 44],
//       25: [2, 44],
//       26: [2, 44],
//       27: [2, 44],
//       28: [2, 44],
//       37: [2, 44],
//       38: [2, 44],
//       40: [1, 47],
//       42: [2, 44],
//     },
//     {
//       5: [2, 33],
//       14: [2, 33],
//       15: [2, 33],
//       16: [2, 33],
//       18: [2, 33],
//       21: [2, 33],
//       22: [2, 33],
//       23: [2, 33],
//       24: [2, 33],
//       25: [2, 33],
//       26: [2, 33],
//       27: [2, 33],
//       28: [2, 33],
//       33: [1, 48],
//       37: [2, 33],
//       38: [2, 33],
//     },
//     {
//       5: [2, 35],
//       14: [2, 35],
//       15: [2, 35],
//       16: [2, 35],
//       18: [2, 35],
//       21: [2, 35],
//       22: [2, 35],
//       23: [2, 35],
//       24: [2, 35],
//       25: [2, 35],
//       26: [2, 35],
//       27: [2, 35],
//       28: [2, 35],
//       33: [1, 49],
//       37: [2, 35],
//       38: [2, 35],
//     },
//     {
//       36: [1, 50],
//     },
//     {
//       39: [1, 51],
//     },
//     {
//       1: [2, 1],
//     },
//     {
//       2: 18,
//       4: 52,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 53,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 54,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 57,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       15: [1, 55],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       23: [1, 56],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 59,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       15: [1, 58],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 60,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 61,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 62,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 63,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 64,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       39: [1, 65],
//     },
//     {
//       5: [2, 46],
//       14: [2, 46],
//       15: [2, 46],
//       16: [2, 46],
//       18: [2, 46],
//       21: [2, 46],
//       22: [2, 46],
//       23: [2, 46],
//       24: [2, 46],
//       25: [2, 46],
//       26: [2, 46],
//       27: [2, 46],
//       28: [2, 46],
//       37: [2, 46],
//       38: [2, 46],
//       42: [2, 46],
//     },
//     {
//       14: [1, 26],
//       15: [1, 27],
//       16: [1, 28],
//       18: [1, 66],
//       22: [1, 29],
//       23: [1, 30],
//       24: [1, 31],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//     },
//     {
//       21: [1, 67],
//       37: [1, 68],
//       38: [1, 69],
//     },
//     {
//       14: [1, 26],
//       15: [1, 27],
//       16: [1, 28],
//       18: [2, 39],
//       21: [2, 39],
//       22: [1, 29],
//       23: [1, 30],
//       24: [1, 31],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 39],
//       38: [2, 39],
//     },
//     {
//       5: [2, 25],
//       14: [2, 25],
//       15: [2, 25],
//       16: [2, 25],
//       18: [2, 25],
//       21: [2, 25],
//       22: [2, 25],
//       23: [2, 25],
//       24: [2, 25],
//       25: [2, 25],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 25],
//       38: [2, 25],
//     },
//     {
//       5: [2, 26],
//       14: [2, 26],
//       15: [2, 26],
//       16: [2, 26],
//       18: [2, 26],
//       21: [2, 26],
//       22: [2, 26],
//       23: [2, 26],
//       24: [2, 26],
//       25: [2, 26],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 26],
//       38: [2, 26],
//     },
//     {
//       2: 18,
//       4: 40,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       18: [1, 70],
//       19: [1, 12],
//       20: 71,
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       5: [2, 32],
//       14: [2, 32],
//       15: [2, 32],
//       16: [2, 32],
//       18: [2, 32],
//       21: [2, 32],
//       22: [2, 32],
//       23: [2, 32],
//       24: [2, 32],
//       25: [2, 32],
//       26: [2, 32],
//       27: [2, 32],
//       28: [2, 32],
//       37: [2, 32],
//       38: [2, 32],
//     },
//     {
//       43: [1, 46],
//     },
//     {
//       39: [1, 72],
//     },
//     {
//       41: [1, 73],
//     },
//     {
//       32: [1, 74],
//     },
//     {
//       34: [1, 75],
//     },
//     {
//       34: [1, 76],
//     },
//     {
//       36: [1, 77],
//     },
//     {
//       5: [2, 10],
//       14: [2, 10],
//       15: [2, 10],
//       16: [1, 28],
//       18: [2, 10],
//       21: [2, 10],
//       22: [1, 29],
//       23: [1, 30],
//       24: [1, 31],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 10],
//       38: [2, 10],
//     },
//     {
//       5: [2, 11],
//       14: [2, 11],
//       15: [2, 11],
//       16: [1, 28],
//       18: [2, 11],
//       21: [2, 11],
//       22: [1, 29],
//       23: [1, 30],
//       24: [1, 31],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 11],
//       38: [2, 11],
//     },
//     {
//       5: [2, 12],
//       14: [2, 12],
//       15: [2, 12],
//       16: [2, 12],
//       18: [2, 12],
//       21: [2, 12],
//       22: [2, 12],
//       23: [2, 12],
//       24: [2, 12],
//       25: [2, 12],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 12],
//       38: [2, 12],
//     },
//     {
//       2: 18,
//       4: 78,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 79,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       5: [2, 20],
//       14: [2, 20],
//       15: [2, 20],
//       16: [1, 28],
//       18: [2, 20],
//       21: [2, 20],
//       22: [2, 20],
//       23: [2, 20],
//       24: [2, 20],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 20],
//       38: [2, 20],
//     },
//     {
//       2: 18,
//       4: 80,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       5: [2, 19],
//       14: [2, 19],
//       15: [2, 19],
//       16: [1, 28],
//       18: [2, 19],
//       21: [2, 19],
//       22: [2, 19],
//       23: [2, 19],
//       24: [2, 19],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 19],
//       38: [2, 19],
//     },
//     {
//       5: [2, 18],
//       14: [2, 18],
//       15: [2, 18],
//       16: [1, 28],
//       18: [2, 18],
//       21: [2, 18],
//       22: [1, 29],
//       23: [1, 30],
//       24: [2, 18],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 18],
//       38: [2, 18],
//     },
//     {
//       5: [2, 21],
//       14: [2, 21],
//       15: [2, 21],
//       16: [2, 21],
//       18: [2, 21],
//       21: [2, 21],
//       22: [2, 21],
//       23: [2, 21],
//       24: [2, 21],
//       25: [2, 21],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 21],
//       38: [2, 21],
//     },
//     {
//       5: [2, 22],
//       14: [2, 22],
//       15: [2, 22],
//       16: [2, 22],
//       18: [2, 22],
//       21: [2, 22],
//       22: [2, 22],
//       23: [2, 22],
//       24: [2, 22],
//       25: [2, 22],
//       26: [2, 22],
//       27: [2, 22],
//       28: [1, 35],
//       37: [2, 22],
//       38: [2, 22],
//     },
//     {
//       5: [2, 23],
//       14: [2, 23],
//       15: [2, 23],
//       16: [2, 23],
//       18: [2, 23],
//       21: [2, 23],
//       22: [2, 23],
//       23: [2, 23],
//       24: [2, 23],
//       25: [2, 23],
//       26: [2, 23],
//       27: [2, 23],
//       28: [1, 35],
//       37: [2, 23],
//       38: [2, 23],
//     },
//     {
//       5: [2, 24],
//       14: [2, 24],
//       15: [2, 24],
//       16: [2, 24],
//       18: [2, 24],
//       21: [2, 24],
//       22: [2, 24],
//       23: [2, 24],
//       24: [2, 24],
//       25: [2, 24],
//       26: [2, 24],
//       27: [2, 24],
//       28: [2, 24],
//       37: [2, 24],
//       38: [2, 24],
//     },
//     {
//       5: [2, 43],
//       14: [2, 43],
//       15: [2, 43],
//       16: [2, 43],
//       18: [2, 43],
//       21: [2, 43],
//       22: [2, 43],
//       23: [2, 43],
//       24: [2, 43],
//       25: [2, 43],
//       26: [2, 43],
//       27: [2, 43],
//       28: [2, 43],
//       37: [2, 43],
//       38: [2, 43],
//       40: [2, 43],
//     },
//     {
//       5: [2, 13],
//       14: [2, 13],
//       15: [2, 13],
//       16: [2, 13],
//       18: [2, 13],
//       21: [2, 13],
//       22: [2, 13],
//       23: [2, 13],
//       24: [2, 13],
//       25: [2, 13],
//       26: [2, 13],
//       27: [2, 13],
//       28: [2, 13],
//       37: [2, 13],
//       38: [2, 13],
//     },
//     {
//       5: [2, 14],
//       14: [2, 14],
//       15: [2, 14],
//       16: [2, 14],
//       18: [2, 14],
//       21: [2, 14],
//       22: [2, 14],
//       23: [2, 14],
//       24: [2, 14],
//       25: [2, 14],
//       26: [2, 14],
//       27: [2, 14],
//       28: [2, 14],
//       37: [2, 14],
//       38: [2, 14],
//     },
//     {
//       2: 18,
//       4: 81,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       2: 18,
//       4: 82,
//       6: 3,
//       7: [1, 4],
//       8: [1, 5],
//       9: [1, 6],
//       10: [1, 7],
//       11: [1, 8],
//       12: 9,
//       13: [1, 10],
//       16: [1, 14],
//       17: [1, 11],
//       19: [1, 12],
//       25: [1, 13],
//       29: [1, 15],
//       30: [1, 16],
//       31: 17,
//       32: [1, 21],
//       34: [1, 22],
//       35: [1, 23],
//       39: [1, 19],
//       41: [1, 20],
//       43: [1, 24],
//     },
//     {
//       5: [2, 28],
//       14: [2, 28],
//       15: [2, 28],
//       16: [2, 28],
//       18: [2, 28],
//       21: [2, 28],
//       22: [2, 28],
//       23: [2, 28],
//       24: [2, 28],
//       25: [2, 28],
//       26: [2, 28],
//       27: [2, 28],
//       28: [2, 28],
//       37: [2, 28],
//       38: [2, 28],
//     },
//     {
//       18: [1, 83],
//       37: [1, 68],
//       38: [1, 69],
//     },
//     {
//       36: [1, 84],
//     },
//     {
//       5: [2, 45],
//       14: [2, 45],
//       15: [2, 45],
//       16: [2, 45],
//       18: [2, 45],
//       21: [2, 45],
//       22: [2, 45],
//       23: [2, 45],
//       24: [2, 45],
//       25: [2, 45],
//       26: [2, 45],
//       27: [2, 45],
//       28: [2, 45],
//       37: [2, 45],
//       38: [2, 45],
//       42: [2, 45],
//     },
//     {
//       5: [2, 34],
//       14: [2, 34],
//       15: [2, 34],
//       16: [2, 34],
//       18: [2, 34],
//       21: [2, 34],
//       22: [2, 34],
//       23: [2, 34],
//       24: [2, 34],
//       25: [2, 34],
//       26: [2, 34],
//       27: [2, 34],
//       28: [2, 34],
//       37: [2, 34],
//       38: [2, 34],
//     },
//     {
//       5: [2, 36],
//       14: [2, 36],
//       15: [2, 36],
//       16: [2, 36],
//       18: [2, 36],
//       21: [2, 36],
//       22: [2, 36],
//       23: [2, 36],
//       24: [2, 36],
//       25: [2, 36],
//       26: [2, 36],
//       27: [2, 36],
//       28: [2, 36],
//       37: [2, 36],
//       38: [2, 36],
//     },
//     {
//       5: [2, 37],
//       14: [2, 37],
//       15: [2, 37],
//       16: [2, 37],
//       18: [2, 37],
//       21: [2, 37],
//       22: [2, 37],
//       23: [2, 37],
//       24: [2, 37],
//       25: [2, 37],
//       26: [2, 37],
//       27: [2, 37],
//       28: [2, 37],
//       33: [1, 85],
//       37: [2, 37],
//       38: [2, 37],
//     },
//     {
//       5: [2, 47],
//       14: [2, 47],
//       15: [2, 47],
//       16: [2, 47],
//       18: [2, 47],
//       21: [2, 47],
//       22: [2, 47],
//       23: [2, 47],
//       24: [2, 47],
//       25: [2, 47],
//       26: [2, 47],
//       27: [2, 47],
//       28: [2, 47],
//       37: [2, 47],
//       38: [2, 47],
//       39: [2, 47],
//       43: [2, 47],
//     },
//     {
//       5: [2, 15],
//       14: [2, 15],
//       15: [2, 15],
//       16: [1, 28],
//       18: [2, 15],
//       21: [2, 15],
//       22: [2, 15],
//       23: [2, 15],
//       24: [2, 15],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 15],
//       38: [2, 15],
//     },
//     {
//       5: [2, 17],
//       14: [2, 17],
//       15: [2, 17],
//       16: [1, 28],
//       18: [2, 17],
//       21: [2, 17],
//       22: [2, 17],
//       23: [2, 17],
//       24: [2, 17],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 17],
//       38: [2, 17],
//     },
//     {
//       5: [2, 16],
//       14: [2, 16],
//       15: [2, 16],
//       16: [1, 28],
//       18: [2, 16],
//       21: [2, 16],
//       22: [2, 16],
//       23: [2, 16],
//       24: [2, 16],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 16],
//       38: [2, 16],
//     },
//     {
//       14: [1, 26],
//       15: [1, 27],
//       16: [1, 28],
//       18: [2, 40],
//       21: [2, 40],
//       22: [1, 29],
//       23: [1, 30],
//       24: [1, 31],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 40],
//       38: [2, 40],
//     },
//     {
//       14: [1, 26],
//       15: [1, 27],
//       16: [1, 28],
//       18: [2, 41],
//       21: [2, 41],
//       22: [1, 29],
//       23: [1, 30],
//       24: [1, 31],
//       25: [1, 32],
//       26: [1, 33],
//       27: [1, 34],
//       28: [1, 35],
//       37: [2, 41],
//       38: [2, 41],
//     },
//     {
//       5: [2, 29],
//       14: [2, 29],
//       15: [2, 29],
//       16: [2, 29],
//       18: [2, 29],
//       21: [2, 29],
//       22: [2, 29],
//       23: [2, 29],
//       24: [2, 29],
//       25: [2, 29],
//       26: [2, 29],
//       27: [2, 29],
//       28: [2, 29],
//       37: [2, 29],
//       38: [2, 29],
//     },
//     {
//       5: [2, 48],
//       14: [2, 48],
//       15: [2, 48],
//       16: [2, 48],
//       18: [2, 48],
//       21: [2, 48],
//       22: [2, 48],
//       23: [2, 48],
//       24: [2, 48],
//       25: [2, 48],
//       26: [2, 48],
//       27: [2, 48],
//       28: [2, 48],
//       37: [2, 48],
//       38: [2, 48],
//       39: [2, 48],
//       43: [2, 48],
//     },
//     {
//       34: [1, 86],
//     },
//     {
//       5: [2, 38],
//       14: [2, 38],
//       15: [2, 38],
//       16: [2, 38],
//       18: [2, 38],
//       21: [2, 38],
//       22: [2, 38],
//       23: [2, 38],
//       24: [2, 38],
//       25: [2, 38],
//       26: [2, 38],
//       27: [2, 38],
//       28: [2, 38],
//       37: [2, 38],
//       38: [2, 38],
//     },
//   ];

//   const defaultActions = {
//     25: [2, 1],
//   }

//   function performAction(yytext: any, yyleng: any, yylineno: any, yy: any, yystate: any, $$: any, _$: any) {
//     let $0 = $$.length - 1;
//     let self = {
//       $: null,
//       sheet: sheet,
//     };
//     switch (yystate) {
//       case 1:
//         return $$[$0 - 1];
//         break;
//       case 2:
//         self.$ = self.sheet.getVariable($$[$0]);
//         break;
//       case 3:
//         self.$ = true;
//         break;
//       case 4:
//         self.$ = false;
//         break;
//       case 5:
//         self.$ = null;
//         break;
//       case 6:
//         self.$ = self.sheet.time($$[$0]);
//         break;
//       case 7:
//         self.$ = self.sheet.time($$[$0]);
//         break;
//       case 8:
//         self.$ = $$[$0] * 1;
//         if (isNaN(self.$)) self.$ = 0;
//         break;
//       case 9:
//         self.$ = $$[$0].substring(1, $$[$0].length - 1);
//         break;
//       case 10:
//         self.$ = "" + $$[$0 - 2] + $$[$0];
//         break;
//       case 11:
//         self.$ = self.sheet.comparator.equal.call(
//           self.sheet,
//           $$[$0 - 2],
//           $$[$0]
//         );
//         break;
//       case 12:
//         self.$ = formula.math.SUM.call(self.sheet, $$[$0 - 2], $$[$0]);
//         break;
//       case 13:
//         self.$ = $$[$0 - 1] * 1;
//         break;
//       case 14:
//         self.$ = $$[$0 - 1];
//         break;
//       case 15:
//         self.$ = self.sheet.comparator.lessEqual.call(
//           self.sheet,
//           $$[$0 - 3],
//           $$[$0]
//         );
//         break;
//       case 16:
//         self.$ = self.sheet.comparator.greaterEqual.call(
//           self.sheet,
//           $$[$0 - 3],
//           $$[$0]
//         );
//         break;
//       case 17:
//         self.$ = self.sheet.comparator.notEqual.call(
//           self.sheet,
//           $$[$0 - 3],
//           $$[$0]
//         );
//         break;
//       case 18:
//         self.$ = $$[$0 - 2] != $$[$0];
//         break;
//       case 19:
//         self.$ = self.sheet.comparator.greater.call(
//           self.sheet,
//           $$[$0 - 2],
//           $$[$0]
//         );
//         break;
//       case 20:
//         self.$ = self.sheet.comparator.less.call(
//           self.sheet,
//           $$[$0 - 2],
//           $$[$0]
//         );
//         break;
//       case 21:
//         self.$ = formula.math.SUBTRACT($$[$0 - 2], $$[$0]);
//         break;
//       case 22:
//         self.$ = formula.math.MULTIPLY($$[$0 - 2], $$[$0]);
//         break;
//       case 23:
//         self.$ = formula.math.DIVIDE($$[$0 - 2], $$[$0]);

//         break;
//       case 24:
//         self.$ = formula.math.POWER($$[$0 - 2], $$[$0]);

//         break;
//       case 25:
//         self.$ = $$[$0] * -1;
//         if (isNaN(self)) self = 0;

//         break;


//         return <>{/* Functionality of ParserFactory */}</>;
//     };
