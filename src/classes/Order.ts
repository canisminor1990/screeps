import { RoleType } from '../enums/role';
import { RolePriority } from '../enums/priority';

export class Order {
  public priority: RolePriority;
  public body: BodyPartConstant[];
  public memory: {
    role: RoleType;
    tier: number;
    target?: string;
    targets?: string[];
    route?: string[];
    boost?: string[];
    homeRoom?: string;
    token?: string;
  };
  public twinOrder?: Order;
}
