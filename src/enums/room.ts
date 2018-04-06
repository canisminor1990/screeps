export enum RoomStatus {
	restart = 0,
	normal = 1,
	expansion = 2,
	defend = 3,
}

export enum RoomType {
	// home base
	home = 0,
	bootstrap = 1,

	// remote
	remoteCanMine = 10,
	remoteReservedByOther = 11,
	remoteKeeperLair = 12,
	remoteCenter = 13,

	// other player
	ownByHostile = 20,
	ownByFriend = 21,

	// public area
	public = 100,
}

export enum RoomLevel {
	/**
	 * - rcl 1
	 */
	rcl1 = 10,

	/**
	 * - 到达 rcl 2
	 */
	rcl2Ready = 20,

	/**
	 * - extensions x5,  container x1
	 * - 只建造澡泽路 sources / controller
	 * - 开始 remote mining.
	 */
	rcl2Expansion = 21,

	/**
	 * - reach rcl 3
	 */
	rcl3Ready = 30,

	/**
	 * - extensions x5, tower x1
	 * - 建造道路 sources / controller / remoteRoom
	 * - container x2(sources) 开始使用 miners / haulers
	 * - container x1(controller) 开始使用 upgrader
	 */
	rcl3Expansion = 31,
}
