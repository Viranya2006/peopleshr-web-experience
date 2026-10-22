import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "PeoplesHR tools: admin cost check, HR health check and payroll guides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // A PNG copy of the logo, because the image renderer doesn't reliably read WebP.
  const logo = await readFile(join(process.cwd(), "public/peopleshr-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fff" }}>
        <div style={{ display: "flex", padding: "56px 72px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain img */}
          <img src={logoSrc} width={250} height={47} alt="" />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "#0d1b3e", color: "#fff", margin: "48px 0 0", padding: "0 72px 64px" }}>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.05, maxWidth: 960 }}>Work out what to fix in HR, before you talk to anyone.</div>
          <div style={{ marginTop: 26, fontSize: 30, color: "#dbeafe" }}>Admin cost check · HR operations health check · Payroll guides</div>
        </div>
      </div>
    ),
    size,
  );
}
