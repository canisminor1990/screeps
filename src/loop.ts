// import Config from './config';
import { ErrorMapper } from './utils';
import { RoomsMemory } from './rooms';

export default ErrorMapper.wrapLoop(() => {
  try {
    RoomsMemory.init();
  } catch (e) {
    console.log(e.stack || e.message);
  }
});
