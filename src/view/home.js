import { html } from '../../node_modules/lit-html/lit-html.js';
import { getRecentOffers } from '../api/data.js';

const homeTamplate = (offer) => html`<section id="dashboard">

<section id="home">
          <img
            src="./images/pngkey.com-hunting-png-6697165-removebg-preview.png"
            alt="home"
          />
          <h2>Searching for a job?</h2>
          <h3>The right place for a new career start!</h3>
        </section>

${offer.length == 0 ? html`<h2>No result.</h2>` : offer.map(c => html`
<h3>Last Added Job</h3>
<div class="offer">
  <img src="${c.imageUrl}" alt="${c.imageUrl}" />
  <p>
    <strong>Title: </strong
    ><span class="title">${c.title}</span>
  </p>
  <p><strong>Salary:</strong><span class="salary">${c.salary}</span></p>
  <a class="details-btn" href="/details/${c._id}">Details</a>
</div>`)}
</section>`;

export async function homePage(ctx) {
  const offer = await getRecentOffers();
  ctx.render(homeTamplate(offer));
}