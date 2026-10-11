export const generateReceipt = () => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.floor(10000 + Math.random() * 90000);
  return `GS-${dateStr}-${randomStr}`;
};
