import { html } from '../../node_modules/lit-html/lit-html.js';
import {searchOffers, getAllOffers } from '../api/data.js';

const searchTamplate = (offer, onSearch, params = '') => html`<section id="dashboard">

<form @submit=${onSearch}>
<div class="wrap">
<div class="search">
    <input type="text" name="search" class="searchTerm" value=${params}>
    <input type="submit" value="Search" class="searchButton">
    </div>
    </div>
<br>
</form>
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


export async function searchPage(ctx){
  let params = ctx.querystring.split('=')[1];
  let offer = []

  if(params){
    offer = await searchOffers(decodeURIComponent(params));
  } else{
    offer = await getAllOffers();
  }
  ctx.render(searchTamplate(offer, onSearch, params));

  function onSearch(event){
      event.preventDefault();
      let formData = new FormData(event.target);
      let search = formData.get('search');

      if(search){
          ctx.page.redirect('/search?query=' + encodeURIComponent(search));
      }
      else{
        ctx.page.redirect('/search');
      }
  }
}