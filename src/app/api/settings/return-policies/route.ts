// import { NextResponse } from "next/server";
// import { getReturnPolicies } from "@/api/settings.api";

// export async function GET() {
//   try {
//     const data = await getReturnPolicies();

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Return policies error:", error);

//     return NextResponse.json(
//       { message: "Failed to fetch return policies" },
//       { status: 500 }
//     );
//   }
// }