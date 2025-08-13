import { useRef, useState, useEffect } from "react";

interface OptProps {
  onOtpChange: (otp: string[]) => void;
  restOtpTrigger: boolean;
}

const OtpFields = ({ onOtpChange, restOtpTrigger }: OptProps) => {
  const inputCount = 5;
  const [values, setValues] = useState<string[]>(new Array(inputCount).fill(""));

  const refArr = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newValue = value.trim();
    const updatedValues = [...values];
    updatedValues[index] = newValue.slice(-1); // only allow last digit
    setValues(updatedValues);

    if (newValue) {
      refArr.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value) {
      refArr.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  useEffect(() => {
    onOtpChange(values);
  }, [values, onOtpChange]);

  useEffect(() => {
    if (restOtpTrigger) {
      setValues(new Array(inputCount).fill(""));
      refArr.current[0]?.focus();
    }
  }, [restOtpTrigger]);

  return (
    <div className="App flex">
      {values.map((value, index) => (
        <input
          key={index}
          className="m-1 mx-2 px-3 w-10 h-10 text-center border-2 rounded-md"
          type="text"
          value={value}
          ref={(el) => {
            refArr.current[index] = el;
          }}
          onChange={(e) => handleInputChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OtpFields;
