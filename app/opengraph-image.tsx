import { ImageResponse } from "next/og";

export const alt = "Terço Fiel com áudio, latim e arte sacra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f1e7d3",
          color: "#312619",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "78px 88px",
          width: "100%",
        }}
      >

        
        <div style={{ display: "flex", flexDirection: "column", width: 820 }}>
          <span
            style={{
              color: "#a6853b",
              fontSize: 25,
              letterSpacing: 7,
              textTransform: "uppercase",
            }}
          >
            Terço Fiel, conta por conta
          </span>
          <span style={{ fontFamily: "serif", fontSize: 88, marginTop: 24 }}>
            Terço Fiel
          </span>
          <span
            style={{
              color: "#5a4b37",
              fontFamily: "serif",
              fontSize: 34,
              lineHeight: 1.35,
              marginTop: 20,
            }}
          >
            Áudio, latim e uma experiência acessível.
          </span>
        </div>
        <div
          style={{
            alignItems: "center",
            border: "3px solid #a6853b",
            borderRadius: 90,
            color: "#5e1d2e",
            display: "flex",
            fontFamily: "serif",
            fontSize: 94,
            height: 180,
            justifyContent: "center",
            width: 180,
          }}
        >
          †
        </div>
      </div>
    ),
    size,
  );
}
