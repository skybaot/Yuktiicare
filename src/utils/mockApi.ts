
// This file simulates API responses with realistic delays

/**
 * Simulates an API call with a delay
 */
export const simulateApiCall = async <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

/**
 * Simulates fetching data with pagination
 */
export const getPaginatedData = <T>(
  data: T[],
  page: number,
  pageSize: number
): { data: T[]; totalPages: number; totalItems: number } => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    totalPages: Math.ceil(data.length / pageSize),
    totalItems: data.length
  };
};
