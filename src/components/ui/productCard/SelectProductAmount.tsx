import type { AddProductToCardProps } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../Input";
import { Label } from "../Label";
import { options } from "./constants";

type SelectProductAmountProps = Pick<
  ReturnType<typeof useForm<AddProductToCardProps>>,
  "register" | "control" | "watch" | "formState"
>;

export const SelectProductAmount = ({
  register,
  control,
  watch,
  formState,
}: SelectProductAmountProps) => {
  const amount = watch("amount");
  const { errors } = formState;

  return (
    <div className="space-y-2 mb-2">
      <Label>Pick amount</Label>
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {options.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {amount === "custom" ? (
        <Input
          id="customInputAmount"
          {...register("customInputAmount", { required: true, pattern: /^[0-9]*$/ })}
          label="Custom amount"
          error={errors.customInputAmount ? "Only digits are allowed" : undefined}
        />
      ) : null}
    </div>
  );
};

