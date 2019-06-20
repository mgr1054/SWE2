export function toKundenf(form: any) {
  let kunde = {
    id: null,
    nachname: String(form.nachname),
    email: String(form.email),
    kategorie: Number(form.kategorie),
    newsletter: Boolean(form.newsletter),
    geburtsdatum: String(form.geburtsdatum),
    umsatz: {
      betrag: Number(form.betrag),
      waehrung: String(form.waehrung)
    },
    homepage: String(form.homepage),
    geschlecht: String(form.geschlecht),
    familienstand: String(form.familienstand),
    interessen: [String(form.interessen)],
    adresse: {
      plz: String(form.plz),
      ort: String(form.ort)
    },
    username: String(form.username),
    user: {
      username: String(form.username),
      password: String(form.password)
    },
    links: null
  };
  return kunde;
}

export function toKunde(form: any) {
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
    interessen: [String(form.value.interessen)],
    adresse: {
      plz: String(form.value.plz),
      ort: String(form.value.ort)
    },
    username: String(form.value.username),
    user: {
      username: String(form.value.username),
      password: String(form.value.password)
    },
    links: null
  };
  return kunde;
}
