export default (room) => {
    const flags = room.find(FIND_FLAGS).sort((a,b) => a.secondaryColor - b.secondaryColor).sort((a,b) => a.color - b.color)
    return flags
}