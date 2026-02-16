const { INFOMANIAK_API_KEY: secret } = process.env;


export default async (req, res) => {

  let domain = 57647

  // console.log(req)

  try {
    const response = await fetch(
      `https://api.infomaniak.com/1/newsletters/${domain}/subscribers`,
      // `https://us13.api.mailchimp.com/3.0/lists/${listId}/segments/${segmentId}/members`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`, // REFER TO THE VARIABLE HERE
        },
        body: JSON.stringify({
          // "merge_fields":{
          //   FNAME: req.body.name
          // },
          // email_address: req.body.email,
          // status: "subscribed",
          fields: {
            name: req.body.name,
          },
          "email": req.body.email
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
