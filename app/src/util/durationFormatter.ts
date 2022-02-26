const durationFormatter = (duration_ms: number) => {
  const m = Math.floor(duration_ms / 60000);
  const s = Math.floor((duration_ms % 60000) / 1000);
  return `${m}:${s}`;
};
export default durationFormatter;
