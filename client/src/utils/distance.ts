// client/src/utils/distance.ts
import { Branch } from "@shared/schema";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // ← Set in .env

interface DistanceResult {
  distanceKm: number;
  durationMins: number;
  fee: number;
  error?: string;
}

const FEE_TIERS = [
  { maxKm: 5, fee: 1500 },
  { maxKm: 10, fee: 2500 },
  { maxKm: 20, fee: 3500 },
  { maxKm: Infinity, fee: 5000 },
] as const;

export async function calculateDeliveryFee(
  branch: Branch,
  address: string
): Promise<DistanceResult> {
  if (!GOOGLE_API_KEY) {
    return { distanceKm: 0, durationMins: 0, fee: 1500, error: "API key missing" };
  }

  const geocoder = new google.maps.Geocoder();
  const distanceService = new google.maps.DistanceMatrixService();

  try {
    // 1. Geocode customer address
    const geoResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results?.[0]) resolve(results);
        else reject(new Error("Address not found"));
      });
    });

    const destination = geoResult[0].geometry.location;

    // 2. Calculate distance from branch
    const matrixResult = await new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
      distanceService.getDistanceMatrix(
        {
          origins: [new google.maps.LatLng(branch.lat, branch.lng)],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK" && response?.rows[0]?.elements[0]?.status === "OK") {
            resolve(response);
          } else {
            reject(new Error("Distance calculation failed"));
          }
        }
      );
    });

    const element = matrixResult.rows[0].elements[0];
    const distanceMeters = element.distance.value;
    const distanceKm = Number((distanceMeters / 1000).toFixed(1));
    const durationMins = Math.round(element.duration.value / 60);

    // 3. Determine fee
    const tier = FEE_TIERS.find(t => distanceKm <= t.maxKm) || FEE_TIERS[FEE_TIERS.length - 1];
    const fee = tier.fee;

    return { distanceKm, durationMins, fee };
  } catch (err: any) {
    console.error("Delivery calc error:", err);
    return { distanceKm: 0, durationMins: 0, fee: 1500, error: err.message };
  }
}
