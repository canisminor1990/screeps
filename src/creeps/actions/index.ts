import { HarvestAction } from './harvest';
import { UpgradeAction } from './upgrade';

const Harvest = new HarvestAction();
const Upgrade = new UpgradeAction();
const Actions = {
	[Harvest.name]: Harvest,
	[Upgrade.name]: Upgrade,
};
export { Actions };
