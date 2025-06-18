import { getPatient } from "~/server/queries";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const patient = await getPatient();
    return NextResponse.json(patient);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
}
