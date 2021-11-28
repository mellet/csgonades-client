export type ToastSeverity = "info" | "success" | "warning" | "error";

export type AppToastCreate = {
  id?: string;
  title?: string;
  message: string;
  severity: ToastSeverity;
  durationSeconds?: number;
};

export type AppToast = {
  id: string;
  title?: string;
  message: string;
  severity: ToastSeverity;
  durationSeconds: number;
};
