export type Report = {
  id: string;
  nadeId: string;
  message: string;
  createdAt: Date;
};

export type ReportAddDto = {
  nadeId: string;
  message: string;
};
