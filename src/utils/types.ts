import { z } from "zod";

export type EventData = {
  dateTime: string;
  hours: string;
  minutes: string;
  service: string;
  operator: string;
  location?: string;
};

// export type OptionsData = {
//   service: string;
//   operator: string;
//   location: string;
// };

export const optionsDataSchema = z.object({
  service: z.string().optional(),
  operator: z.string().optional(),
  location: z.string().optional(),
});

export type OptionsData = z.infer<typeof optionsDataSchema>;
