import * as gtag from "./gtag";

type InstrumentationTracker = {
  start: Date;
  functionName: string;
  category: string;
};

export function startMeasurement(
  functionName: string,
  category: string
): InstrumentationTracker {
  return {
    start: new Date(),
    functionName,
    category,
  };
}

export function endMeasurement(tracker: InstrumentationTracker) {
  const end = new Date();
  const diff = end.getTime() - tracker.start.getTime();
  gtag.timing("load", diff, tracker.category, tracker.functionName);
  return diff;
}
