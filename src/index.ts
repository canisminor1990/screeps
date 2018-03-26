import Config from './config';
import { ErrorMapper } from './utils';

export default ErrorMapper.wrapLoop(() => {
  try {
  } catch (e) {
    console.log(e.stack || e.message);
  }
});
