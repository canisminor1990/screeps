import { WorkerBehavior } from './worker';

const Worker = new WorkerBehavior();
const Behaviours = {
	[Worker.name]: Worker,
};
export { Behaviours };
