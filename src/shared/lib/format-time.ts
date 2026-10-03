const formatter = new Intl.DateTimeFormat('ru-RU', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

export const formatTime = (timestampMs: number | undefined) => {
  if (!timestampMs) {
    return '';
  }
  return formatter.format(new Date(timestampMs));
}
