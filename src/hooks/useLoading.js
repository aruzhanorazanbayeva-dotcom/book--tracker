import { useState, useCallback } from "react";

function useLoading() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Оборачиваем каждую функцию в useCallback с пустым массивом зависимостей [].
  // Теперь ссылки на эти функции будут стабильными и не будут пересоздаваться при рендерах.
  const startLoading = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const setErrorState = useCallback((err) => {
    setError(err);
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
  };
}

export default useLoading;