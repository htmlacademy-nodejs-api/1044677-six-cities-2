import { Offer, User, Location, City, HousingType } from '../types/index.js';

function parseUser(user: string): User {
  const [name, email, avatarPath, ,isPro] = user.split(';');
  return {
    name,
    email,
    avatarPath,
    isPro: isPro === 'Pro'
  };
}

function parseLocation(location: string): Location {
  const [lat, lng] = location.split(';');
  return {
    latitude: Number(lat),
    longitude: Number(lng)
  };
}

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    date,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    user,
    location
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    postDate: new Date(date),
    city: city as City,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number(rating),
    type: type as HousingType,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    goods: goods.split(';'),
    user: parseUser(user),
    location: parseLocation(location)
  };
}
