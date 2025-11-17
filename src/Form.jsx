/* eslint-disable no-unused-vars */
import { useState } from "react";

const FormHandle = () => {
  const [formData, setFormData] = useState({
    username: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    country: "",
  });
  const [additionalFields, setAdditionalFields] = useState([]);
  const [additionalErrors, setAdditionalErrors] = useState([]);

  const countries = [
    { value: "", label: "Select Country" },
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "in", label: "India" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
  ];

  const additionalOptions = [
    { value: "", label: "Select Country" },
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "in", label: "India" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAdditionalFieldChange = (index, fieldName, value) => {
    setAdditionalFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, [fieldName]: value } : field
      )
    );

    if (additionalErrors[index] && additionalErrors[index][fieldName]) {
      setAdditionalErrors((prev) =>
        prev.map((error, i) =>
          i === index ? { ...error, [fieldName]: "" } : error
        )
      );
    }
  };

  const addField = () => {
    setAdditionalFields((prev) => [
      ...prev,
      { additionalInput: "", additionalSelect: "" },
    ]);
    setAdditionalErrors((prev) => [
      ...prev,
      { additionalInput: "", additionalSelect: "" },
    ]);
  };

  const removeField = (index) => {
    setAdditionalFields((prev) => prev.filter((_, i) => i !== index));
    setAdditionalErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {
      username: "",
      country: "",
    };

    let isValid = true;

    // Validate main form
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
      isValid = false;
    }

    // Validate additional fields
    const newAdditionalErrors = additionalFields.map((field, index) => {
      const fieldErrors = {
        additionalInput: "",
        additionalSelect: "",
      };

      if (!field.additionalInput.trim()) {
        fieldErrors.additionalInput = "This field is required";
        isValid = false;
      }

      if (!field.additionalSelect) {
        fieldErrors.additionalSelect = "Please select an option";
        isValid = false;
      }

      return fieldErrors;
    });

    setErrors(newErrors);
    setAdditionalErrors(newAdditionalErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, handle submission
      console.log("Form submitted successfully!");
      console.log("Main form data:", formData);
      console.log("Additional fields:", additionalFields);
      // Add your submission logic here
    } else {
      console.log("Form has errors!");
    }
  };

  return (
    <div
      className="form-container"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <form onSubmit={handleSubmit}>
        <div
          className="field-row"
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            alignItems: "flex-start",
          }}
        >
          <div className="field-group" style={{ flex: 1 }}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter Your Name (required)"
              style={{
                width: "100%",
                padding: "8px",
                border: errors.username ? "1px solid red" : "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {errors.username && (
              <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.username}
              </div>
            )}
          </div>

          <div className="field-group" style={{ flex: 1 }}>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "2px",
                border: errors.country ? "1px solid red" : "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            {errors.country && (
              <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.country}
              </div>
            )}
          </div>
        </div>

        {additionalFields.map((field, index) => (
          <div
            key={index}
            className="field-row additional-field"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "20px",
              alignItems: "flex-start",
            }}
          >
            <div className="field-group" style={{ flex: 1 }}>
              <input
                type="text"
                value={field.additionalInput}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    index,
                    "additionalInput",
                    e.target.value
                  )
                }
                placeholder={`Additional field ${index + 1} (required)`}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: additionalErrors[index]?.additionalInput
                    ? "1px solid red"
                    : "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              {additionalErrors[index]?.additionalInput && (
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                >
                  {additionalErrors[index].additionalInput}
                </div>
              )}
            </div>

            <div className="field-group" style={{ flex: 1 }}>
              <select
                value={field.additionalSelect}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    index,
                    "additionalSelect",
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: "2px",
                  border: additionalErrors[index]?.additionalSelect
                    ? "1px solid red"
                    : "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                {additionalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {additionalErrors[index]?.additionalSelect && (
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                >
                  {additionalErrors[index].additionalSelect}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeField(index)}
              style={{
                background: "#ff4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "8px 12px",
                cursor: "pointer",
                marginTop: "8px",
              }}
            >
              Delete
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addField}
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            fontSize: "20px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          +
        </button>

        <button
          type="submit"
          style={{
            background: "#0aa7eaff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            cursor: "pointer",
            fontSize: "18px",
            display: "block",
            width: "100%",
          }}
        >
          Submit
        </button>
      </form>

      <div className="form-state" style={{ marginTop: "40px", color: "#ddd" }}>
        <h3>Form State</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
            margin: "10px",
          }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5", color: "black" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Field Type
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Input Value
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Select Value
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Select Label
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                Main Form
              </td>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                {formData.username || "Not Provided"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                {formData.country || "Not selected"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                {formData.country
                  ? countries.find((c) => c.value === formData.country)?.label
                  : "Not selected"}
              </td>
            </tr>

            {additionalFields.map((field, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                  Additional Field {index + 1}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                  {field.additionalInput || "Not Provided"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                  {field.additionalSelect || "Not selected"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                  {field.additionalSelect
                    ? additionalOptions.find(
                        (opt) => opt.value === field.additionalSelect
                      )?.label
                    : "Not selected"}
                </td>
              </tr>
            ))}

            {additionalFields.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    textAlign: "center",
                    color: "#999",
                  }}
                >
                  No additional fields added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormHandle;
