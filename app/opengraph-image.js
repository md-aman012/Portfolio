import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030303",
          fontFamily: "system-ui, sans-serif",
          color: "#F1EEE8",
          padding: 80,
        }}
      >
        <p
          style={{
            fontSize: 14,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#FF8C59",
            marginBottom: 24,
          }}
        >
          Md Aman · Full-Stack Developer
        </p>
        <h1 style={{ fontSize: 72, fontWeight: 400, margin: 0, textAlign: "center" }}>
          {profile.name}
        </h1>
        <p style={{ fontSize: 24, marginTop: 24, color: "#AAA9A4" }}>
          NIT Patna · B.Tech CSE
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}