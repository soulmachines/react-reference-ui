// stuff like emotional data has way more decimal places than is useful, round values
const roundObject = (o: any, multiplier = 10) => {
  const output = {};
  Object.keys(o).forEach((k) => {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    output[k] = Math.floor(o[k] * multiplier) / multiplier;
  });
  return output;
};

export default roundObject;
