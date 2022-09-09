import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllOffers() {
    return await api.get(host + '/data/offers?sortBy=_createdOn%20desc');
}
export async function getRecentOffers() {
    return await api.get(host + '/data/offers?sortBy=_createdOn%20asc&distinct=applications');
}
export async function getMyOffers(userId) {
    return await api.get(host + `/data/offers?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
export async function createOffer(listing) {
    return await api.post(host + '/data/offers', listing);
}

export async function getOfferById(id) {
    return await api.get(host + `/data/offers/${id}`);
}
export async function editOfferById(id, listing) {
    return await api.put(host + `/data/offers/${id}`, listing);
}

export async function deleteOfferById(id) {
    return await api.del(host + `/data/offers/${id}`)
}

export async function offerClear(offerId) {
    return await api.post(host + `/data/applications`, offerId);
}
export async function getTotalOfferCount(offerId) {
    return await api.get(host + `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
}
export async function didUserOffered(offerId, userId){
    return await api.get(host + `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
export async function searchOffers(query){
    return api.get(host+'/data/offers?where=' + encodeURIComponent(`title LIKE "${query}"`))
}
