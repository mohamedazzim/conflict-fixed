import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const pathname = '/' + (params.slug?.join('/') || '')
  const searchParams = request.nextUrl.search
  
  try {
    const backendUrl = `http://localhost:8000${pathname}${searchParams}`
    const headers = new Headers()
    
    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers.set('authorization', authHeader)
    }
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers,
    })
    
    const contentType = response.headers.get('content-type')
    
    // Handle binary responses (like PDF downloads)
    if (contentType?.includes('application/pdf') || contentType?.includes('application/octet-stream')) {
      const blob = await response.blob()
      const responseHeaders = new Headers()
      
      // Copy relevant headers from backend response
      const contentDisposition = response.headers.get('content-disposition')
      if (contentDisposition) {
        responseHeaders.set('content-disposition', contentDisposition)
      }
      responseHeaders.set('content-type', contentType)
      
      return new NextResponse(blob, {
        status: response.status,
        headers: responseHeaders,
      })
    }
    
    // Handle JSON responses
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const pathname = '/' + (params.slug?.join('/') || '')
  const searchParams = request.nextUrl.search
  
  try {
    const backendUrl = `http://localhost:8000${pathname}${searchParams}`
    const headers = new Headers()
    
    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      headers.set('authorization', authHeader)
    }
    
    const contentType = request.headers.get('content-type')
    if (contentType) {
      headers.set('content-type', contentType)
    }
    
    const body = await request.text()
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers,
      body: body || undefined,
    })
    
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
