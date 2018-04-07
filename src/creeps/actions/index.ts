import { HarvestAction } from './harvest';
import { UpgradeAction } from './upgrade';
import { FuelAction } from './fuel';
import { BuildAction } from './build';

const Harvest = new HarvestAction();
const Upgrade = new UpgradeAction();
const Fuel = new FuelAction();
const Build = new BuildAction();
const Actions = {
	[Harvest.name]: Harvest,
	[Upgrade.name]: Upgrade,
	[Fuel.name]: Fuel,
	[Build.name]: Build,
};
export { Actions };
