export default (room) => {
	const resources = room.find(FIND_DROPPED_RESOURCES)
	return {
		resources: resources,
		energy   : _.filter(resources, resource => resource.resourceType == RESOURCE_ENERGY)
	}
}