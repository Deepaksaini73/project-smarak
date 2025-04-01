export type Transaction = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  institute: string;
  idCardImage: string;
  rollNo: string;
  yearOfStudy: number;
  createdAt: string;
  updatedAt: string;
  hasPaid: boolean;
  role: string;
  transactions?: Transaction[];
  referralCode?: string;
};
