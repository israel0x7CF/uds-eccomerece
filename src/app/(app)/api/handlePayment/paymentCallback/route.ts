import { NextResponse } from "next/server"
// import {crypto} from 'crypto'
export async function POST(req: Request) {
    const hash = crypto
    .("sha256", process.env.CHAPPA_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");
    const payload= await req.json()
    console.log(payload)
    return NextResponse.json({status:200})
}