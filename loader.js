define(['game','bootState','loadState','initialState','menuState','configurationState','controlesState','controlesState2','controlesState3','tutorialStage','caveStage','dungeonStage','grassStage','bossStage','grassStage','selectLevelState','sobreNosotrosState'],
function(Game,bootState,loadState,initialState,menuState,configurationState,controlesState,controlesState2,controlesState3,tutorialStage,caveStage,dungeonStage,grassStage,bossStage,grassStage,selectLevelState,sobreNosotrosState) {
    return {
        start: function () {    
            // Add all the states
            Game.state.add('bootState', new bootState());
            Game.state.add('loadState', new loadState());
            Game.state.add('initialState', new initialState());
            Game.state.add('menuState', new menuState());
            Game.state.add('configurationState', new configurationState());
            Game.state.add('selectLevelState', new selectLevelState());
            Game.state.add('controlesState', new controlesState());
            Game.state.add('controlesState2', new controlesState2());
            Game.state.add('controlesState3', new controlesState3());
            Game.state.add('sobreNosotrosState', new sobreNosotrosState());
            Game.state.add('tutorialStage', new tutorialStage());
            Game.state.add('caveStage', new caveStage());
            Game.state.add('dungeonStage', new dungeonStage());
            Game.state.add('bossStage', new bossStage());
            Game.state.add('grassStage', new grassStage());
            // Start the 'boot' state
            Game.state.start('bootState');         
        }
    }
});





