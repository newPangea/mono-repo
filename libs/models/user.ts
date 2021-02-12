export class User {
  static REF: string = 'users';
  key: string;
  email: string;
  role: number;
  name: string;

  constructor(key: string, email: string) {
    this.key = key;
    this.email = email;
  }
}

export class Administrator extends User {
  dob: Date;
  cellphone: string;
  gender: number;
  studyLevel: number;
  constructor(key: string, email: string) {
    super(key, email);
    this.role = ROLE_TYPES.ADMIN;
  }
}

export enum ROLE_TYPES {
  SUPERADMIN = 1,
  ADMIN = 2,
  PARENT = 3,
  STUDENT = 4,
  TEACHER = 5,
  EXPERT = 6,
}
