import { useState } from "react";

function useLoading() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startLoading = () => {
    setLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const setErrorState = (err) => {
    setError(err);
    setLoading(false);
  };

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
  };
}

export default useLoading;