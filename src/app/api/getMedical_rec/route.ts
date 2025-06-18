import { NextResponse } from "next/server";
import { getMedicalRec } from "~/server/queries";

export async function GET() {
  try {
    const medicalRecords = await getMedicalRec();
    return NextResponse.json(medicalRecords);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
