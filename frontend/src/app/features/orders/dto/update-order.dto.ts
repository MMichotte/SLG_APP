import { EOrderStatus } from '../enums/order-status.enum';
import { CreateOrderDTO } from './create-order.dto';

export class UpdateOrderDTO extends CreateOrderDTO {
  status?: EOrderStatus;
}
