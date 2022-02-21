const IS_PROD = process.env.NODE_ENV === "production";

export const GA_TRACKING_ID = "G-QRDVMPQ5C5";

export const pageview = (url: string) => {
  if (!window || !IS_PROD) {
    return;
  }

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export type GTagEvent = {
  action: string;
  category:
    | "modal"
    | "nade_page"
    | "map_page"
    | "auth"
    | "nade_item"
    | "settings"
    | "share"
    | "user_page";
  label?: string;
  value?: number;
  non_interaction?: boolean;
};

export const event = (eventData: GTagEvent) => {
  if (!window || !IS_PROD) {
    return;
  }

  const { action, category, label, non_interaction, value } = eventData;

  const actionName = makeActionsTheSame(action);

  window.gtag("event", actionName, {
    event_category: category,
    event_label: label,
    value: value,
    non_interaction: non_interaction,
  });
};

export const exception = (description: string, fatal = false) => {
  if (!window || !IS_PROD) {
    return;
  }

  window.gtag("event", "exception", {
    description: description,
    fatal: fatal,
  });
};

export const timing = (
  name: string,
  durationMs: number,
  category: string,
  label: string
) => {
  if (!window || !IS_PROD) {
    return;
  }

  window.gtag("event", "timing_complete", {
    name: name,
    value: durationMs,
    event_category: category,
    event_label: label,
  });
};

function makeActionsTheSame(action: string) {
  const words = action.split(" ");
  const newAction = words.map((word) => word.toLowerCase()).join("_");
  return newAction;
}
