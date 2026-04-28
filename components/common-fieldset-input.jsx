'use client'
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Select, DatePicker } from "antd";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { cn } from "@/utils";
import ErrorText from "./error-text";

const CommonFieldsetInput = ({
  wrapperClass,
  inputClass,
  labelClass,
  selectClass,
  textareaClass,
  innerWrapper,
  required = true,
  label = "",
  type = "text",
  placeholder = "",
  register_as,
  options = [],
  errors = {},
  validationRules = {},
  readOnly = false,
  defaultValue,
  control,
  selectMode = "single",
  icon,
  disabled = false,
  min,
  max,
}) => {
  const [show, setShow] = useState(false);
  const errorMessage = errors[register_as]?.message;

  const normalizeValue = (val) => {
    if (selectMode === "multiple" || selectMode === "tags") {
      if (Array.isArray(val)) {
        return val.map((i) => (typeof i === "object" ? i.value : i));
      }
      return val ? [typeof val === "object" ? val.value : val] : [];
    }
    return typeof val === "object" ? val?.value : val;
  };

  const disableDate = (current) => {
    if (!current) return false;
    const parse = (v) =>
      v && dayjs(v, ["MM/DD/YYYY", "YYYY-MM-DD"], true).isValid()
        ? dayjs(v, ["MM/DD/YYYY", "YYYY-MM-DD"], true)
        : null;
    const minDate = parse(min);
    const maxDate = parse(max);
    return (
      !!(minDate && current.isBefore(minDate, "day")) ||
      !!(maxDate && current.isAfter(maxDate, "day"))
    );
  };

  return (
    <fieldset
      className={cn(
        "w-full flex flex-col gap-1 justify-start text-base items-start text-[#4c4b4b] border-none ",
        wrapperClass,
      )}
    >
      {label && (
        <label
          htmlFor={register_as}
          className={cn("capitalize font-normal", labelClass)}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div
        className={cn(
          "w-full flex items-center group gap-2 px-4 py-3 bg-[#FAFAFA] border ease-in-out duration-300 text-foreground rounded-xl transition-colors",
          errorMessage
            ? "border-red-500"
            : "border-slate-200 focus-within:border-primary",
          innerWrapper,
        )}
      >
        {icon && <div className="shrink-0 w-fit group-focus:text-foreground text-gray-200 ">{icon}</div>}

        {type === "textarea" ? (
          <Controller
            control={control}
            name={register_as}
            rules={validationRules}
            defaultValue={defaultValue}
            render={({ field }) => (
              <textarea
                {...field}
                value={field.value ?? ""}
                id={register_as}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                aria-label={label}
                className={cn(
                  "w-full border-none disabled:bg-transparent disabled:pointer-events-none disabled:opacity-50 capitalize outline-none resize-none 2xs:min-h-48 min-h-32 placeholder:text-[#6D6D6D] placeholder:text-sm bg-transparent",
                  textareaClass,
                )}
              />
            )}
          />
        ) : type === "select" ? (
          <div className={cn("w-full", selectClass)}>
            <Controller
              control={control}
              name={register_as}
              rules={validationRules}
              defaultValue={defaultValue}
              render={({ field }) => (
                <Select
                  {...field}
                  mode={selectMode !== "single" ? selectMode : undefined}
                  placeholder={placeholder}
                  options={options}
                  optionFilterProp="label"
                  disabled={disabled}
                  showSearch
                  allowClear
                  className="w-full bg-transparent! border-none! capitalize outline-none!"
                  style={{ width: "100%" }}
                  value={
                    field.value === undefined ||
                      field.value === null ||
                      (Array.isArray(field.value) && field.value.length === 0)
                      ? undefined
                      : normalizeValue(field.value)
                  }
                  onChange={(val, option) => {
                    if (selectMode !== "single") {
                      field.onChange(val ?? []);
                    } else {
                      const v = Array.isArray(option)
                        ? option[0]?.value
                        : (option?.value ?? val);
                      field.onChange(v ?? undefined);
                    }
                  }}
                />
              )}
            />
          </div>
        ) : type === "date" || type === "datetime" ? (
          <Controller
            control={control}
            name={register_as}
            rules={validationRules}
            defaultValue={defaultValue}
            render={({ field }) => (
              <DatePicker
                {...field}
                className={cn(
                  "w-full p-0! bg-transparent border-none outline-none",
                  "",
                )}
                placeholder={placeholder}
                disabled={disabled}
                format="MM/DD/YYYY"
                showTime={type === "datetime"}
                disabledDate={disableDate}
                value={field.value ? dayjs(field.value, "MM/DD/YYYY") : null}
                onChange={(date) =>
                  field.onChange(date ? date.format("MM/DD/YYYY") : null)
                }
              />
            )}
          />
        ) : (
          <Controller
            control={control}
            name={register_as}
            rules={validationRules}
            defaultValue={defaultValue}
            render={({ field }) => (
              <input
                {...field}
                value={field.value ?? ""}
                type={type === "password" ? (show ? "text" : "password") : type}
                id={register_as}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                min={type === "number" ? min : undefined}
                max={type === "number" ? max : undefined}
                aria-label={label}
                className={cn(
                  "w-full border-none disabled:bg-transparent disabled:pointer-events-none disabled:opacity-50 placeholder:text-gray-500 placeholder:text-base outline-none bg-transparent",
                  inputClass,
                )}
              />
            )}
          />
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShow((p) => !p)}
            className="cursor-pointer shrink-0 text-gray-600 hover:text-black transition-colors"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? (
              <FaEye className="text-xl" />
            ) : (
              <FaEyeSlash className="text-xl" />
            )}
          </button>
        )}
      </div>

      {errorMessage && <ErrorText error={errorMessage} />}
    </fieldset>
  );
};

export default CommonFieldsetInput;