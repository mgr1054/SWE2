export function extractArr(form) {
  if (form == null) {
    return [];
  }
  let ergArr = [];
  if (form.value.email != null && form.value.email != undefined) {
    ergArr.push(`email=${form.value.email}`);
  }
  if (form.value.ort != null && form.value.ort != undefined) {
    ergArr.push(`ort=${form.value.ort}`);
  }
  if (form.value.kategorie != null && form.value.kategorie != undefined) {
    ergArr.push(`kategorie=${form.value.kategorie}`);
  }
  if (form.value.geschlecht != null && form.value.geschlecht != undefined) {
    ergArr.push(`geschlecht=${form.value.geschlecht}`);
  }
  if (form.value.familienstand != null && form.value.familienstand != undefined) {
    ergArr.push(`familienstand=${form.value.familienstand}`);
  }
  if (form.value.plz != null && form.value.plz != undefined) {
    ergArr.push(`plz=${form.value.plz}`);
  }
  if (form.value.nachname != null && form.value.nachname != undefined) {
    ergArr.push(`nachname=${form.value.nachname}`);
  }
  return ergArr;
}
