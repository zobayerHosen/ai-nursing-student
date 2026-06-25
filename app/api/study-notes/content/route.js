// import { NextResponse } from "next/server";

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const url = searchParams.get("url");

//   if (!url) {
//     return NextResponse.json(
//       { error: "Missing 'url' query parameter" },
//       { status: 400 }
//     );
//   }

//   // Validate URL to prevent SSRF attacks (e.g., file:///, ftp://)
//   try {
//     new URL(url);
//   } catch {
//     return NextResponse.json(
//       { error: "Invalid URL provided" },
//       { status: 400 }
//     );
//   }

//   try {
//     const response = await fetch(url, {
//       headers: {
//         "User-Agent": "Mozilla/5.0 (compatible; StemRN/1.0)",
//       },
//     });

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: `Failed to fetch content (${response.status})` },
//         { status: response.status }
//       );
//     }

//     const html = await response.text();

//     return new NextResponse(html, {
//       status: 200,
//       headers: {
//         "Content-Type": "text/html; charset=utf-8",
//         "Cache-Control": "public, max-age=3600, s-maxage=3600",
//       },
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: error.message || "Failed to fetch content" },
//       { status: 500 }
//     );
//   }
// }
