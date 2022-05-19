import { useField } from "formik";
import DatePicker from "react-datepicker";
import Select from "react-select";

type DatePickerProps = {
  name: string;
  value: Date | null;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const DatePickerField: React.FC<DatePickerProps> = ({
  name,
  value,
  setFieldValue,
}) => {
  return (
    <DatePicker
      className={"date-picker"}
      selected={value !== null ? new Date(value) : null}
      isClearable
      onChange={(val) => {
        setFieldValue(name, val);
      }}
    />
  );
};

type SelectProps = {
  options: {
    value: any;
    label: any;
  }[];
  name: string;
  defaultValue: any;
};
export const SelectField: React.FC<SelectProps> = ({
  options,
  name,
  defaultValue,
}) => {
  const [, , helpers] = useField(name); // can pass 'props' into useField also, if 'props' contains a name attribute
  const { setValue, setTouched, setError } = helpers;

  const setFieldProps = (selectedOption: { value: any }) => {
    setValue(selectedOption.value);
    setTouched(true);
    setError(undefined);
  };
  const toUpperCase = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <Select
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "var(--input-hover-color)",
          primary: "var(--accent-color)",
          neutral0: "var(--third-background-color)",
          primary50: "var(--input-hover-color)",
          neutral80: "var(--text-color)",
        },
      })}
      defaultValue={options.find((el) => el.value === defaultValue)}
      options={options}
      onChange={(selectedOption: any) => setFieldProps(selectedOption)}
    />
  );
};
