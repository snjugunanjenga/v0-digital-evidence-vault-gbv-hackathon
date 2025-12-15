"use client";
import { PricingTable } from "@clerk/nextjs";

const BillingPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <PricingTable />
    </div>
  );
};

export default BillingPage;