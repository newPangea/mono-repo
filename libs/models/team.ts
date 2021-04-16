export class Team {
  key: string;
  name: string;
  members: string[];
  updatedAt?: number;
  createdAt: number;

  constructor(key: string, name: string, members: string[]) {
    this.key = key;
    this.name = name;
    this.members = members;
    this.createdAt = new Date().getTime();
  }
}
