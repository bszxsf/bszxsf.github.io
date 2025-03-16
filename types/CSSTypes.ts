export {};

// See https://stackoverflow.com/questions/57874146/how-to-create-a-typescript-type-that-validates-string-format-i-e-checks-is-str

declare global {
  type CssLengthUnit = '%' | 'px' | 'em' | 'rem' | 'vw' | 'vh';
  type CssLength = `${number}${CssLengthUnit}`;
}
