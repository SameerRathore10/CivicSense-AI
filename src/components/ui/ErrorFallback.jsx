export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-stone-950 p-4 text-stone-100">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-900/30 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-stone-400">
          An unexpected error occurred. Please try again or contact support if
          the problem persists.
        </p>
        <pre className="max-h-32 w-full overflow-auto rounded bg-stone-900 p-4 text-left text-sm text-red-400">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="rounded-md bg-green-600 px-6 py-2 font-medium text-white transition hover:bg-green-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
};
