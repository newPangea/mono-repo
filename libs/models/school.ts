export class School {
  key: string;
  name: string;
  addres: string;
  latitude: number;
  longitude: number;
  acode: string;
  tcode: string;
  scode: string;
  pcode: string;
  ecode: string;
  updated_at?: number;
  created_at: number;

  constructor(
    key: string,
    name: string,
    addres: string,
    latitude: number,
    longitude: number,
    acode: string,
    tcode: string,
    scode: string,
    pcode: string,
    ecode: string,
  ) {
    this.key = key;
    this.name = name;
    this.addres = addres;
    this.latitude = latitude;
    this.longitude = longitude;
    this.acode = acode;
    this.tcode = tcode;
    this.scode = scode;
    this.pcode = pcode;
    this.ecode = ecode;
    this.created_at = new Date().getTime();
  }
}
