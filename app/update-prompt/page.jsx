import React, { Suspense } from "react";
import EditPrompt from "./edit-prompt";

const Edit = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
};

export default Edit;
