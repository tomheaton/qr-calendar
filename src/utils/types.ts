export type EventData = {
  dateTime: string;
  hours: string;
  minutes: string;
  service: string;
  operator: string;
  location?: string;
};

export type OptionsData = {
  service: string;
  operator: string;
  location: string;
};
