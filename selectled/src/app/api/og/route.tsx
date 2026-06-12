import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Select LED";
  const city = searchParams.get("city") ?? "São Paulo";
  const type = searchParams.get("type") ?? "default";

  const subtitle =
    type === "blog"
      ? "Blog Select LED"
      : type === "city"
      ? `Locação de Painéis de LED em ${city}`
      : "Locação e Venda de Painéis de LED para Eventos";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Red gradient glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(255,0,0,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Header: logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 1 }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#FF0000",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontSize: "14px", fontWeight: 900 }}>SL</span>
          </div>
          <span style={{ color: "white", fontSize: "20px", fontWeight: 700 }}>Select LED</span>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 1 }}>
          {type === "city" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  background: "rgba(255,0,0,0.15)",
                  border: "1px solid rgba(255,0,0,0.3)",
                  borderRadius: "100px",
                  padding: "6px 14px",
                  color: "#FF0000",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {city}
              </div>
            </div>
          )}
          <h1
            style={{
              color: "white",
              fontSize: title.length > 60 ? "42px" : "54px",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              marginBottom: "16px",
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>
          <p style={{ color: "#A1A1A6", fontSize: "22px", margin: 0 }}>{subtitle}</p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
            borderTop: "1px solid #2C2C2E",
            paddingTop: "24px",
          }}
        >
          <span style={{ color: "#6E6E73", fontSize: "16px" }}>selectled.com.br</span>
          <div
            style={{
              background: "#FF0000",
              color: "white",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            Solicitar Orçamento
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
