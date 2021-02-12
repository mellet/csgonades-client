const IS_PROD = process.env.NODE_ENV === "production";

export const GA_TRACKING_ID = "G-QRDVMPQ5C5";

export const pageview = (url: string) => {
  if (!IS_PROD) {
    return;
  }

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  non_interaction?: boolean;
};

export const event = (eventData: GTagEvent) => {
  if (!IS_PROD) {
    return;
  }

  const { action, category, label, non_interaction, value } = eventData;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    non_interaction: non_interaction,
  });
};

export const exception = (description: string, fatal = false) => {
  window.gtag("event", "exception", {
    description: description,
    fatal: fatal,
  });
};
