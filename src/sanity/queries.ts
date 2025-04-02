export const BANKS_QUERY = `*[_type == "bank"]{ _id, name, description, image }`;

export const CURRENT_BONUSES_QUERY = `*[_type == "transferBonus" && 
  (!defined($today) || (startDate <= $today && endDate >= $today)) && 
  bank._ref in $bankIds] {
  _id,
  startDate,
  endDate,
  bonusRatio,
  "baseTransferRatio": bank->transferPartner[partner._ref == ^.partner._ref].transferRatio,
  "bankName": bank->name,
  "bankSlug": bank->slug.current,
  "bankImage": bank->image,
  "bankImageUrl": bank->image.asset->url,
  "partnerName": partner->name,
  "partnerType": partner->_type,
  "partnerSlug": partner->slug.current
}`;

export const ALL_ACTIVE_BONUSES_QUERY = `*[_type == "transferBonus" && 
  (!defined($today) || (startDate <= $today && endDate >= $today))] {
  _id,
  startDate,
  endDate,
  bonusRatio,
  "baseTransferRatio": bank->transferPartner[partner._ref == ^.partner._ref].transferRatio,
  "bankName": bank->name,
  "bankSlug": bank->slug.current,
  "bankImage": bank->image,
  "bankImageUrl": bank->image.asset->url,
  "partnerName": partner->name,
  "partnerType": partner->_type,
  "partnerSlug": partner->slug.current
}`;
