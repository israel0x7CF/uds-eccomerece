import { Root } from "@/app/types/type";
import axios from "axios";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const {  amount,email, first_name, last_name, phone_number, tx_ref } = payload;
    const secret = process.env.NEXT_PUBLIC_CHAPPA_API_PRIVATE_KEY;
    const currency = "ETB"
    const callback_url = `${process.env.NEXT_PUBLIC_API_URL}handlePayment/paymentCallback`
    const options = {
      method: 'POST',
      url: 'https://api.chapa.co/v1/transaction/initialize',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      data: {
        amount,
        currency,
        email,
        first_name: first_name,
        last_name: last_name,
        tx_ref: tx_ref || uuidv4(),
        callback_url: callback_url || 'https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60',
        return_url: 'https://www.google.com/',
      },
    };

    const response = await axios.request<Root>(options);
    console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Payment initialization error:', {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data,
      });
    } else {
      console.error('Payment initialization error:', error);
    }
    return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 });
  }
}
