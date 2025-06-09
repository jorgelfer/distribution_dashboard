"use client";

import { useFormStatus } from "react-dom";

export default function CaseFormSubmit() {
  const { pending } = useFormStatus();
  return (
    <button className="submit-button" disabled={pending} type="submit">
      {pending ? "Running..." : "Run DSS"}
    </button>
  );
}
