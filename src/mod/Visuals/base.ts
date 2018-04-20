export class VisualsBase {
	vis: RoomVisual;
	public getColourByPercentage = (percentage: number, reverse?: boolean): string => {
		const value = reverse ? percentage : 1 - percentage;
		const hue = (value * 120).toString(10);
		return `hsl(${hue}, 100%, 50%)`;
	};
	private resourcesColor: obj = {
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
	public getResourceColour = (resourceType: string): string => {
		const colour = this.resourcesColor[resourceType];
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

		if (_.include([RESOURCE_UTRIUM_LEMERGITE, RESOURCE_ZYNTHIUM_KEANITE], resourceType)) compoundType = RESOURCE_OXYGEN;

		return this.resourcesColor[compoundType as string];
	};
	private randomColour = (): string => {
		let c = '#';
		while (c.length < 7)
			c += Math.random()
				.toString(16)
				.substr(-7)
				.substr(-1);
		return c;
	};
	public creepPathStyle = (creep: Creep): LineStyle => {
		Util.set(creep.data, 'pathColour', this.randomColour);
		return {
			width: 0.15,
			color: creep.data.pathColour,
			lineStyle: 'dashed',
		};
	};
}
