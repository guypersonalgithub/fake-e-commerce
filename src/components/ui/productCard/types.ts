import type { OptionValues } from "./constants";

export type AddProductToCardProps =
  | {
      amount: Exclude<OptionValues, "custom">;
      customInputAmount?: never;
    }
  | {
      amount: Exclude<OptionValues, "1" | "2" | "3">;
      customInputAmount: number;
    };

