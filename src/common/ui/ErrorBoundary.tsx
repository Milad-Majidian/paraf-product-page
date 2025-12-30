// src/common/components/ErrorBoundary.tsx
"use client";
import { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from "react-error-boundary";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/elements/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  level?: "page" | "section" | "component";
}

/**
 * Default fallback UI for caught errors
 * Shows error message with retry/home options
 */
function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-100 p-8 space-y-4">
      <div className="flex flex-col items-center space-y-3 text-center max-w-md">
        <div className="rounded-full bg-red-50 p-4">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900">
          Something went wrong
        </h2>
        
        <p className="text-gray-600">
          {error?.message || "An unexpected error occurred"}
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 p-4 bg-gray-50 rounded-lg text-left w-full">
            <summary className="cursor-pointer text-sm font-semibold text-gray-700">
              Error Details (dev only)
            </summary>
            <pre className="mt-2 text-xs text-red-600 overflow-auto">
              {error?.stack}
            </pre>
          </details>
        )}
      </div>

      <div className="flex gap-3">
        <Button onClick={resetErrorBoundary} variant="default">
          Try Again
        </Button>
        <Button onClick={() => router.push('/')} variant="outline">
          Go Home
        </Button>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children, fallback, onReset }: ErrorBoundaryProps) {
  if (fallback !== undefined) {
    return (
      <ReactErrorBoundary fallback={fallback} onReset={onReset}>
        {children}
      </ReactErrorBoundary>
    );
  }

  return (
    <ReactErrorBoundary FallbackComponent={FallbackComponent} onReset={onReset}>
      {children}
    </ReactErrorBoundary>
  );
}
