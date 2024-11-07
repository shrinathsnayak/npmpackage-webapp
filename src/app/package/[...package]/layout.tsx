import React from "react";
import PageLayout from "@/components/shared/PageLayout";
import Feedback from "@/components/shared/Feedback";

const layout = ({ children }: any) => {
  return (
    <PageLayout>
      {children}
      <Feedback />
    </PageLayout>
  );
};

export default layout;
