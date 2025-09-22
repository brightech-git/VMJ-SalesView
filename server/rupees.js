export const formatINR = (number) => {
  return Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(number || 0);
};

export const formatIN = (number) => {
  return Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3
  }).format(number || 0);
};