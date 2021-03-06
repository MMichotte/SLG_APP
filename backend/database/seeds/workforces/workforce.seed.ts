import { CreateWorkforceDTO } from '../../../src/modules/workforces/dto/create-workforce.dto';

export const WorkforceSeed: CreateWorkforceDTO[] = [
  {
    label: 'Tôlerie',
    priceHT: 60,
    priceTTC: 72.6
  },
  {
    label: 'Peinture',
    priceHT: 55,
    priceTTC: 66.55
  },
  {
    label: 'Mécanique',
    priceHT: 60,
    priceTTC: 72.6
  },
  {
    label: 'Usinage',
    priceHT: 65,
    priceTTC: 78.65
  },
  {
    label: 'Nettoyage',
    priceHT: 30,
    priceTTC: 36.3
  }
];