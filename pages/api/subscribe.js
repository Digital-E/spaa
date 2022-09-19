const { MAILCHIMP_AUTH: secret } = process.env;


export default async (req, res) => {
  let audienceId = "";

  try {
    const response = await fetch(
      `https://us13.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      // `https://us13.api.mailchimp.com/3.0/lists/${listId}/segments/${segmentId}/members`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `api_key ${secret}`, // REFER TO THE VARIABLE HERE
        },
        body: JSON.stringify({
          FNAME: req.body.name,
          email_address: req.body.email,
          status: "subscribed",
        }),
      }
    )
    .then((response) => response.json())
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(400).json(data);
    })
  } catch {}
};
