import { html } from '../../node_modules/lit-html/lit-html.js';
import {getMyOffers} from '../api/data.js';

const profileTamplate = (offer, params = '') => html`<section id="dashboard">
<h2>My Job Offers</h2>
${offer.length == 0 ? html`<h2>No result.</h2>` : offer.map(c => html`
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


export async function MyPage(ctx) {
  const user = ctx.user;
  let userId = user._id
  const offer = await getMyOffers(userId);
  console.log(offer);
  ctx.render(profileTamplate(offer));
}