import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout as apiLogout } from './api/api.js';
import { getUserData } from './utility.js';
import { loginPage, registerPage } from './view/auth.js';
import { homePage } from './view/home.js';
import { searchPage } from './view/search.js';
import { createPage } from './view/create.js';
import { detailsPage } from './view/details.js';
import { editPage } from './view/edit.js';
import { MyPage } from './view/profile.js';


const main = document.querySelector('#content');

setUserNav();

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/search', decorateContext, searchPage);
page('/profile', decorateContext, MyPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/create', decorateContext, createPage);


page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    ctx.user = getUserData();

    next();
}

function setUserNav() {
    const user = getUserData()
    if (user) {
      document.querySelectorAll('.user').forEach(x => x.style.display = 'inline');
      document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
      document.querySelector('#spn').textContent = `Welcome, ${user.email}`;
    } else {
      document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
      document.querySelectorAll('.guest').forEach(x => x.style.display = 'inline');
    }
  }
  
  async function onLogout() {
    await apiLogout();
    setUserNav()
    page.redirect('/');
  }