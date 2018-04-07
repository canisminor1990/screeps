import { HarvestAction } from './harvest';

const Harvest = new HarvestAction();
const Actions = {
	[Harvest.name]: Harvest,
};
export { Actions };
