export type AddConctactDTO = {
  name: string;
  email: string;
  message: string;
};

export type ContactDTO = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
};
