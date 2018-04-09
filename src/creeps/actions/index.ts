import { ActionType } from '../../enums/action';
import { HarvestAction } from './harvest';
import { UpgradeAction } from './upgrade';
import { FuelAction } from './fuel';
import { BuildAction } from './build';
import { RepairAction } from './repair';

const Harvest = new HarvestAction();
const Upgrade = new UpgradeAction();
const Fuel = new FuelAction();
const Build = new BuildAction();
const Repair = new RepairAction();
const Actions: Actions = {
	[ActionType.harvest]: Harvest,
	[ActionType.upgrade]: Upgrade,
	[ActionType.fuel]: Fuel,
	[ActionType.build]: Build,
	[ActionType.repair]: Repair,
};
export { Actions };
