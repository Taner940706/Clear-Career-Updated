import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteOfferById, getOfferById, getTotalOfferCount, didUserOffered, offerClear } from '../api/data.js';

const detailsTamplate = (offer, isOwner, onDelete, isLoggedIn, totalOfferCount, onClickOffered, didUserOffer) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${offer.imageUrl}" alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span
                  >${offer.description}</span
                >
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >${offer.requirements}</span
                >
              </div>
            </div>
            <p>Applications: <strong id="applications">${totalOfferCount}</strong></p>

            <!--Edit and Delete are only for creator-->
            ${isOwner ? html`<div id="action-buttons">
              <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>` : ''}
              <div id="action-buttons">

              <!--Bonus - Only for logged-in users ( not authors )-->
              ${(() => {
                if (didUserOffer == 0) {
                    if (isLoggedIn && !isOwner) {
                        return html`<a href="javascript:void(0)" @click=${onClickOffered} id="apply-btn">Apply</a>`
                    }
                }
            })()}
            </div>
          </div>
        </section>`;

export async function detailsPage(ctx) {
    const offerId = ctx.params.id;
    const offer = await getOfferById(offerId);
    const user = ctx.user;

    let userId;
    let totalOfferCount;
    let didUserOffer;

    if (user != null) {
        userId = user._id
        didUserOffer = await didUserOffered(offerId, userId);
        
    }

    const isOwner = user && offer._ownerId == user._id;
    const isLoggedIn = user !== undefined;

    totalOfferCount = await getTotalOfferCount(offerId);
    ctx.render(detailsTamplate(offer, isOwner, onDelete, isLoggedIn, totalOfferCount, onClickOffered, didUserOffer));

    async function onClickOffered() {
        const applications = {
            offerId,
        }
        await offerClear(applications);

        totalOfferCount = await getTotalOfferCount(offerId);
        didUserOffer = await didUserOffered(offerId, userId);
        ctx.render(detailsTamplate(offer, isOwner, onDelete, isLoggedIn, totalOfferCount, onClickOffered, didUserOffered));
    }

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteOfferById(offerId);
            ctx.page.redirect('/');
        }
    }
}