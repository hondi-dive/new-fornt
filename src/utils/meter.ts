export function pixelsToMeters(zoomLevel: number, pixels: number | undefined) {
  const zoomToMeters: { [key: number]: number } = {
    1: 20,
    2: 30,
    3: 50,
    4: 100,
    5: 250,
    6: 500,
    7: 1000,
    8: 2000,
    9: 4000,
    10: 8000,
    11: 16000,
    12: 32000,
    13: 64000,
    14: 128000,
  };

  const conversionRatio = zoomToMeters[zoomLevel];
  if (conversionRatio !== undefined && pixels) {
    const meters = (pixels / 62) * conversionRatio;
    return meters;
  } else {
    return null;
  }
}
