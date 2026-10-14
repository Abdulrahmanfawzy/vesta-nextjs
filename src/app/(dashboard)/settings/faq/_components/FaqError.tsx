
import { AlertCircle, RefreshCw } from "lucide-react";


const FaqError = () => {
  return (
    <div className="flex min-h-64 w-full flex-col items-center justify-center rounded-xl border border-dashed border-app-neutral-light px-6 py-10 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-red-50">
        <AlertCircle className="size-6 text-app-error" />
      </div>

      <h3 className="text-lg font-semibold text-app-primary">
        Failed to load FAQs
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-app-neutral-dark-60">
        Something went wrong while loading the frequently asked questions.
        Please try again.
      </p>

      
    </div>
  );
};

export default FaqError;
