import { HarvestAction } from './harvest';
import { UpgradeAction } from './upgrade';
import { FuelAction } from './fuel';

const Harvest = new HarvestAction();
const Upgrade = new UpgradeAction();
const Fuel = new FuelAction();
const Actions = {
	[Harvest.name]: Harvest,
	[Upgrade.name]: Upgrade,
	[Fuel.name]: Fuel,
};
export { Actions };
