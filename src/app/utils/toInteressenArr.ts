export function toInteressenArr(arrayofInterest: Boolean[]) {
  let ergArr = [];
  if (arrayofInterest[0]) {
    ergArr.push('L');
  }
  if (arrayofInterest[1]) {
    ergArr.push('R');
  }
  if (arrayofInterest[2]) {
    ergArr.push('S');
  }
  return ergArr;
}
