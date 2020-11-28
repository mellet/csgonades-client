export type Report = {
  createdAt: Date;
  id: string;
  message: string;
  nadeId: string;
};

export type ReportAddDto = {
  message: string;
  nadeId: string;
};
