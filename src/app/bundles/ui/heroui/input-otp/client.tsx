"use client";

import React from "react";
import {InputOtp} from "@heroui/react";

export function InputOtpPage() {
  const [value, setValue] = React.useState("");
  return (
    <div>
      <InputOtp length={4} value={value} onValueChange={setValue} />
      <div className="text-small text-default-500">
        OTP value: <span className="text-md font-medium">{value}</span>
      </div>
    </div>
  );
}
