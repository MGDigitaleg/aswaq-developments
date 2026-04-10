import { corsHeaders } from '@supabase/supabase-js/cors'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const ZOKO_API_URL = 'https://chat.zoko.io/v2/message'
const BUSINESS_PHONE = '+201289311523'
const TEMPLATE_ID = 'welcome_message'

const BodySchema = z.object({
  phone: z.string()
    .min(8, 'Phone number too short')
    .max(20, 'Phone number too long')
    .regex(/^\+?\d{8,15}$/, 'Invalid phone number format'),
  name: z.string().max(100).optional(),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const ZOKO_API_KEY = Deno.env.get('ZOKO_API_KEY')
    if (!ZOKO_API_KEY) {
      throw new Error('ZOKO_API_KEY is not configured')
    }

    const body = await req.json()
    const parsed = BodySchema.safeParse(body)
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { phone, name } = parsed.data

    // Clean phone number - remove leading + for Zoko format
    const cleanPhone = phone.replace(/^\+/, '')

    const templateArgs = name ? [name] : []

    const zokoPayload: Record<string, unknown> = {
      channel: 'whatsapp',
      recipient: cleanPhone,
      type: 'template',
      templateId: TEMPLATE_ID,
    }

    if (templateArgs.length > 0) {
      zokoPayload.templateArgs = templateArgs
    }

    console.log('Sending Zoko template message to:', cleanPhone)

    const response = await fetch(ZOKO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': ZOKO_API_KEY,
      },
      body: JSON.stringify(zokoPayload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error(`Zoko API error [${response.status}]:`, JSON.stringify(data))
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to send message', details: data }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Zoko message sent successfully:', JSON.stringify(data))

    return new Response(
      JSON.stringify({ success: true, messageId: data.messageId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: unknown) {
    console.error('Error sending Zoko message:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
