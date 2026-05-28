import { cities } from "@/data/cities";
import { NextRequest, NextResponse } from "next/server";

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export async function GET(req: NextRequest) {
  const lat = parseFloat(req.headers.get("x-vercel-ip-latitude") ?? "0");
  const lng = parseFloat(req.headers.get("x-vercel-ip-longitude") ?? "0");

  if (!lat || !lng) {
    return NextResponse.json({
      suggested: "sao-paulo",
      name: "São Paulo",
      detected: false,
    });
  }

  const nearest = cities.reduce(
    (closest, city) => {
      const dist = haversine(lat, lng, city.lat, city.lng);
      return dist < closest.dist ? { city, dist } : closest;
    },
    { city: cities[0], dist: Infinity }
  );

  return NextResponse.json({
    suggested: nearest.city.slug,
    name: nearest.city.name,
    distance: Math.round(nearest.dist),
    detected: true,
  });
}
