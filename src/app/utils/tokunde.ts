import { toInteressenArr } from './toInteressenArr';

export function toKundenf(form: any) {
  let kunde = {
    id: form.id,
    nachname: String(form.nachname),
    email: String(form.email),
    kategorie: Number(form.kategorie),
    newsletter: Boolean(form.newsletter),
    geburtsdatum: String(form.geburtsdatum),
    umsatz: {
      betrag: Number(form.umsatz.betrag),
      waehrung: String(form.umsatz.waehrung)
    },
    homepage: String(form.homepage),
    geschlecht: String(form.geschlecht),
    familienstand: String(form.familienstand),
    interessen: [String(form.interessen)],
    adresse: {
      plz: String(form.adresse.plz),
      ort: String(form.adresse.ort)
    },
    username: String(form.username),
    user: {
      username: String(form.username),
      password: String(form.password)
    },
    links: null,
    version: form.version
  };
  return kunde;
}

export function toKunde(form: any) {
  let tArr = [];
  tArr.push(form.value.interessenL);
  tArr.push(form.value.interessenR);
  tArr.push(form.value.interessenS);
  tArr = toInteressenArr(tArr);
  let kunde = {
    id: null,
    nachname: String(form.value.nachname),
    email: String(form.value.email),
    kategorie: Number(form.value.kategorie),
    newsletter: Boolean(form.value.newsletter),
    geburtsdatum: String(form.value.geburtsdatum),
    umsatz: {
      betrag: Number(form.value.betrag),
      waehrung: String(form.value.waehrung)
    },
    homepage: String(form.value.homepage),
    geschlecht: String(form.value.geschlecht),
    familienstand: String(form.value.familienstand),
    interessen: tArr,
    adresse: {
      plz: String(form.value.plz),
      ort: String(form.value.ort)
    },
    username: String(form.value.username),
    user: {
      username: String(form.value.username),
      password: String(form.value.password)
    },
    links: null,
    version: form.value.version
  };
  return kunde;
}

export function toKundeme(form: any) {
  let kunde = {
    id: form.id,
    nachname: String(form.nachname),
    email: String(form.email),
    kategorie: Number(form.kategorie),
    newsletter: Boolean(form.newsletter),
    geburtsdatum: String(form.geburtsdatum),
    umsatz: {
      betrag: Number(form.umsatz.betrag),
      waehrung: String(form.umsatz.waehrung)
    },
    homepage: String(form.homepage),
    geschlecht: String(form.geschlecht),
    familienstand: String(form.familienstand),
    interessen: [String(form.interessen)],
    adresse: {
      plz: String(form.adresse.plz),
      ort: String(form.adresse.ort)
    },
    username: String(form.username),
    user: {
      username: String(form.username),
      password: String(form.password)
    },
    links: null,
    version: form.version
  };
  return kunde;
}
