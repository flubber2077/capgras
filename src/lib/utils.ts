export const absoluteUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}${path}`;

const words = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

export const numberToWrittenWord = (number: number) => words[number];

export const getFullName = (input: { firstName: string; lastName: string }) =>
  `${input.firstName} ${input.lastName}` as const;
