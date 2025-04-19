import React from "react";

const Loader = () => {
  return (
    <>
      <div className="fixed inset-0 w-full mt-14 bg-opacity-90 flex items-center justify-center z-50">
            <div className="flex justify-center items-center">
            <span className="loading loading-dots  loading-xl"></span>
                <p> Verifying Otp </p>
            </div>
      </div>
    </>
  );
};

export default Loader;
