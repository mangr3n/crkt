export const debugMessage = (label, message, value?) => {
  const _debugMsg = `DEBUG - ${label}, ${message}`;
  console.log(`${_debugMsg}:`, value);
};
