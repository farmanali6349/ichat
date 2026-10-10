export const formateMessageDate = (date) => {
  return new Date(date).toLocaleDateString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};
