import { ImageResponse } from "next/og";

export const alt = "PeoplesHR tools: admin cost check, HR health check and payroll guides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0d1b3e", color: "#fff", padding: 72 }}>
        <div style={{ display: "flex", fontSize: 36, fontWeight: 800 }}>
          Peoples<span style={{ color: "#93c5fd" }}>HR</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>Work out what to fix in HR, before you talk to anyone.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#dbeafe" }}>Admin cost check · HR operations health check · Payroll guides</div>
        </div>
      </div>
    ),
    size,
  );
}
