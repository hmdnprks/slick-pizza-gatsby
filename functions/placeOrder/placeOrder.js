const postmark = require('postmark');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your recent order for ${total}</h2>
    <p>Please wait for 30 minutes max</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>${total}</strong> due at pickup</p>
    <style>
        ul {
          list-style: none;
        }
    </style>
  </div>`;
}

const client = new postmark.ServerClient(process.env.MAIL_POSTMARK_ID);

async function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  // await wait(5000);
  const body = JSON.parse(event.body);
  if (body.nasiPadang) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Robot detected' }),
    };
  }
  // Validate the data
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `missing ${field} field` }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Why would your order nothing?` }),
    };
  }
  console.log('client :>> ', client);
  const info = await client.sendEmail({
    From: 'me@hamdan.id',
    To: body.email,
    Subject: `${body.name} - New Order!`,
    HtmlBody: generateOrderEmail({ order: body.order, total: body.total }),
    MessageStream: 'outbound',
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'Success' }),
  };
};
