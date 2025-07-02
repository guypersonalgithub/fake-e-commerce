type ErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) {
    return null;
  }

  return <div className="text-[red] text-sm">{error}</div>;
};

