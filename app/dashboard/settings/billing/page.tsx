'use client';

// import { Billing } from '@clerk/nextjs'; // Assuming a future Clerk Billing component
import { useAuth } from '@clerk/nextjs';

function BillingPageContent() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className="text-center py-8">Loading billing information...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Your Subscription</h1>
      
      {/* 
        =======================================================================
        Clerk Billing Integration Placeholder
        =======================================================================
        
        Clerk is expected to release a pre-built billing component. 
        Once available, you would uncomment and use it like this:

        <Billing.Portal>
          <Billing.Subscription />
          <Billing.Invoices />
        </Billing.Portal>

        This would handle the entire UI for subscription management.
        For now, we are showing a placeholder message.
        =======================================================================
      */}

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Subscription Management Coming Soon</h2>
        <p className="text-gray-600 dark:text-gray-400">
          We are currently integrating a seamless billing management portal. Please check back later.
        </p>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return <BillingPageContent />;
}
