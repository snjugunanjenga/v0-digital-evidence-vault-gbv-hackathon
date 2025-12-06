"use client";
import { Billing } from "@clerk/nextjs/app-beta";

const BillingPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Billing routing="path" path="/dashboard/settings/billing" />
    </div>
  );
};

export default BillingPage;