export function toKunde(form: any) {
  let kunde = {
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
    user: {
      username: String(form.value.username),
      password: String(form.value.password)
    }
  };
  return kunde;
}
