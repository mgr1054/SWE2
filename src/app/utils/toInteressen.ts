export function toInteressen(arrayofInterest: String[]) {
  if (arrayofInterest != null && arrayofInterest != undefined) {
    let ergArr = [false, false, false];
    if (arrayofInterest.includes('L')) {
      ergArr[0] = true;
    }
    if (arrayofInterest.includes('R')) {
      ergArr[1] = true;
    }
    if (arrayofInterest.includes('S')) {
      ergArr[2] = true;
    }
    return ergArr;
  } else {
    return [false, false, false];
  }
}
