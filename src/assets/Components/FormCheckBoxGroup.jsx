/* eslint-disable react/prop-types */
const FormCheckboxGroup = ({
  groupLabel,
  options,
  id,
  onChange,
  required,
  title,
  pattern,
}) => {
  return (
    <div className="mt-10 xl:mt-3 xl:col-span-2">
      <p className="text-sm xl:text-xl  font-Montserrat mb-5">
        {groupLabel}
        {required && (
          <p className="text-red-500">
            Please select at least one subject expertise.
          </p>
        )}
      </p>
      <div className="flex flex-wrap gap-5">
        {options.map((option, index) => (
          <label
            key={index}
            className="inline-flex items-center font-Montserrat mr-6  text-gray-600"
          >
            <input
              type="checkbox"
              className="form-checkbox shadow-lg mr-2"
              value={option.value}
              id={`${id}-${index}`}
              onChange={onChange}
              title={title}
              pattern={pattern}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};
export default FormCheckboxGroup;
