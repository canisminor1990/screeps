const mod = new Creep.Behaviour('safeGen');
module.exports = mod;
mod.actions = function(creep) {
    return [
        Creep.action.safeGen,
        Creep.action.recycling,
    ];
};
