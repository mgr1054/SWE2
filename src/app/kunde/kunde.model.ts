import { Url } from 'url';

export interface Kunde {
  id: string;
  nachname: string;
  email: string;
  kategorie: number;
  newsletter: boolean;
  geburtsdatum: Date;
  umsatz: object;
  homepage: Url;
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
