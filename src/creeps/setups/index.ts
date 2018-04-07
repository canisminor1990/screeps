import { WorkerSetup } from './worker';

const Worker = new WorkerSetup();
const Setups = {
	[Worker.name]: Worker,
};
export { Setups };
