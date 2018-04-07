interface RclSetup {
	fixedBody: BodySetup;
	multiBody: BodySetup;
	minMulti: number;
	maxMulti: number;
	maxCount: number;
}

interface Rcl {
	[type: number]: RclSetup;
}

interface BodySetup {
	[type: string]: number;
}
