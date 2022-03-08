const durationFormatter = (duration_ms: number) => {
  const m = Math.floor(duration_ms / 60000);
  const s = Math.floor((duration_ms % 60000) / 1000);
  if (s < 10) return `${m}:0${s}`;
  return `${m}:${s}`;
};
export default durationFormatter;
