export interface UserInterests {
  music: boolean;
  art: boolean;
  gaming: boolean;
  reels: boolean;
  editing: boolean;
  reading: boolean;
  writing: boolean;
  coding: boolean;
  sports: boolean;
}

export interface UserData {
  name: string;
  age: number;
  fieldOfStudy: string;
  interests: UserInterests;
  email: string;
  uid: string;
} 