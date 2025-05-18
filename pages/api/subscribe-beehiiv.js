
export default async function handler(req, res) {
  const { email } = req.body;

  const response = await fetch('https://api.beehiiv.com/v2/publications/' + process.env.BEEHIIV_PUBLICATION_ID + '/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`
    },
    body: JSON.stringify({ email })
  });

  if (response.ok) {
    res.status(200).json({ message: 'Subscribed to Beehiiv' });
  } else {
    res.status(500).json({ error: 'Subscription failed' });
  }
}
