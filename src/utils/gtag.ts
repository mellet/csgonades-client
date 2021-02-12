const IS_PROD = process.env.NODE_ENV === "production";

export const GA_TRACKING_ID = "G-QRDVMPQ5C5";

export const pageview = (url: URL) => {
  if (!IS_PROD) {
    return;
  }

  console.log("GA-Pageview", url);

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

  console.log("GA-Event", eventData);

  const { action, category, label, non_interaction, value } = eventData;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    non_interaction: non_interaction,
  });
};
