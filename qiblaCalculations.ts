/**
 * Exact coordinates of the Holy Kaaba in Makkah
 */
const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Calculates the Qibla bearing angle (0° to 360° clockwise from True North)
 */
export function calculateQiblaDirection(latitude: number, longitude: number): number {
  const phiK = toRadians(KAABA_LAT);
  const lambdaK = toRadians(KAABA_LNG);
  const phi = toRadians(latitude);
  const lambda = toRadians(longitude);

  const deltaLambda = lambdaK - lambda;

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(deltaLambda);

  let qibla = toDegrees(Math.atan2(y, x));
  qibla = (qibla + 360) % 360;

  return Math.round(qibla * 10) / 10;
}

/**
 * Calculates distance to Kaaba in kilometers
 */
export function calculateDistanceToKaaba(latitude: number, longitude: number): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = toRadians(KAABA_LAT - latitude);
  const dLon = toRadians(KAABA_LNG - longitude);
  const lat1 = toRadians(latitude);
  const lat2 = toRadians(KAABA_LAT);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}
