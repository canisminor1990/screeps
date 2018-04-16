export class VisualsBase {
	vis = new RoomVisual();
	resourcesColor = {
		[RESOURCE_ENERGY]: '#FFE56D',
		[RESOURCE_POWER]: '#FF0000',
		[RESOURCE_CATALYST]: '#FF7A7A',
		[RESOURCE_GHODIUM]: '#FFFFFF',
		[RESOURCE_HYDROGEN]: '#CCCCCC',
		[RESOURCE_KEANIUM]: '#9370FF',
		[RESOURCE_LEMERGIUM]: '#89F4A5',
		[RESOURCE_OXYGEN]: '#CCCCCC',
		[RESOURCE_UTRIUM]: '#88D6F7',
		[RESOURCE_ZYNTHIUM]: '#F2D28B',
	};

	getResourceColour = resourceType => {
		let colour = this.resourcesColor[resourceType];
		if (colour) return colour;

		let compoundType = [
			RESOURCE_UTRIUM,
			RESOURCE_LEMERGIUM,
			RESOURCE_KEANIUM,
			RESOURCE_ZYNTHIUM,
			RESOURCE_GHODIUM,
			RESOURCE_HYDROGEN,
			RESOURCE_OXYGEN,
		].find(type => resourceType.includes(type));
		return this.resourcesColor[compoundType];
	};
	getColourByPercentage = (percentage, reverse) => {
		const value = reverse ? percentage : 1 - percentage;
		const hue = (value * 120).toString(10);
		return `hsl(${hue}, 100%, 50%)`;
	};
}
