import { emoji, action, colorType, targetFormat, targetMaker } from "../../_util"
import {moveTo} from '../'
export default (creep, targetRaw, opt = true) => {
	if (!opt) return;

	let target;
	target = targetFormat(targetRaw)

	console.log(111)
	targetMaker(creep, target, 'harvest')
	if (action(creep, target, creep.harvest(target), emoji.harvest, colorType.yellow)) return true;
}