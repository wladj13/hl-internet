import { NextResponse } from 'next/server'

  export async function GET() {
    try {
      const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
        next: { revalidate: 3600 }
      })
      const data = await res.json()
      return NextResponse.json({ rate: data.promedio, updated: data.fechaActualizacion })
    } catch {
      return NextResponse.json({ rate: null }, { status: 500 })
    }
  }
