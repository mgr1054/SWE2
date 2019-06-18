import { Url } from 'url';

export interface Kunde {
  id: string;
  nachname: string;
  email: string;
  kategorie: number;
  newsletter: boolean;
  geburtsdatum: string;
  umsatz: object;
  homepage: string;
  geschlecht: string;
  familienstand: string;
  interessen: [string];
  adresse: {
    plz: string;
    ort: string;
  };
  username: string;
  links: [
    {
      rel: string;
      href: string;
    }
  ];
}

export interface PostKunde {
  nachname: string;
  email: string;
  kategorie: number;
  newsletter: boolean;
  geburtsdatum: string;
  umsatz: {
    betrag: number;
    waehrung: string;
  };
  homepage: string;
  geschlecht: string;
  familienstand: string;
  interessen: any[];
  adresse: {
    plz: string;
    ort: string;
  };
  user: {
    username: string;
    password: string;
  };
}
