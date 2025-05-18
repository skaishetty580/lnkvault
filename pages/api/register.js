
import { createClient } from '@supabase/supabase-js'
import sgMail from '@sendgrid/mail'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, website, links } = req.body
  const { data: user } = await supabase.auth.admin.createUser({ email, email_confirm: true })
  const userId = user?.user?.id

  for (let url of links) {
    if (url.trim()) {
      await supabase.from('affiliate_links').insert({ user_id: userId, url })
    }
  }

  await sgMail.send({
    to: email,
    from: 'your@domain.com',
    subject: 'Welcome to LinkVault AI!',
    html: `<strong>You're in! We've registered your links and will send weekly reports.</strong>`
  })

  res.status(200).json({ message: 'User registered' })
}
