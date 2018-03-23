let mod = {};
mod.name = 'scheduler';
//In this example I prefered to hardcode the example process, but mod.register
//can be used with mod.registerProcess to avoid hardcoding.
mod.register = function(){
   
};

mod.execute = function(){
    _.forEach(Task.scheduler.processes, function(n,k){
        if(n.conditions()) n.run();
    });
};

mod.registerProcess = function(name, conditions, run){
    //look for process with existing name and overwrite if there
    const target = Task.scheduler.processes[name];
    if(target){
        Task.scheduler.processes[name].conditions=conditions;
        Task.scheduler.processes[name].run=run;
    } else {
        Task.scheduler.processes[name]={conditions:conditions, run:run};
    }
};

mod.unregisterProcess = function(name){
    const target = Task.scheduler.processes[name];
    if(target){
        delete Task.scheduler.processes[name];
    }
};

mod.forceRunProcess = function(name){
    let target = Task.scheduler.processes[name];
    if(target && target.conditions()){
        target.run();
    }
}

mod.processes = {
    'example':
    {
        conditions: function(){
            return false;
        },
        run: function(){
            console.log('Hello!');
        }
    },
};

module.exports = mod;
