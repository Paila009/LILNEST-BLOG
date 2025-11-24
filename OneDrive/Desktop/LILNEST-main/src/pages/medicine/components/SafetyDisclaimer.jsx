import React from "react";

const SafetyDisclaimer = () => (
  <div
    className="rounded-lg border p-4 md:p-5 bg-red-50 border-red-300 text-red-800 dark:bg-red-950/40 dark:border-red-600 dark:text-red-100"
    role="alert"
    aria-live="polite"
  >
    <div className="font-semibold text-sm md:text-base">Medical Disclaimer</div>
    <p className="text-xs md:text-sm mt-1">
      LILNEST does NOT prescribe or calculate dosage. All medicines must be
      doctor-approved. Information provided is for education only and does not
      replace professional medical advice.
    </p>
  </div>
);

export default SafetyDisclaimer;
