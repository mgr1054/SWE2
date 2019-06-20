import { Url } from 'url';

export interface Kunde {
  id: string;
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
  links: [
    {
      rel: string;
      href: string;
    }
  ];
  username: string;
  user: {
    username: string;
    password: string;
  };
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
