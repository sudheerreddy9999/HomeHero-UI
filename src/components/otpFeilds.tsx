import { useRef, useState, useEffect } from "react";

const OtpFeilds = () => {
  const inputCount = 5;
  const [values, setValues] = useState<any>(new Array(inputCount).fill(""));
  const refArr = useRef<any>([]);
  const handleInputChange = (value: any, index: number) => {
    if (isNaN(value)) return;
    const newvalue = value.trim();
    const prevValues = [...values];
    prevValues[index] = newvalue.slice(-1);
    setValues(prevValues);
    newvalue && refArr.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key == "Backspace" && !e.target.value) {
      refArr.current[index - 1]?.focus();
    }
  };
  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);
  return (
    <>
      <div className="App flex">
        {values.map((value: number, index: number) => (
          <input
            key={index}
            className="m-1 mx-2 px-3 w-10 h-10 text-center border-2 rounded-md"
            type="text"
            value={values[index]}
            ref={(value) => {
              refArr.current[index] = value;
            }}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
    </>
  );
};

export default OtpFeilds;
