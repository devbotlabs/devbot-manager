let AdminConfig = {
    collections: {
        Posts: {},
        ComplexData: {},
        SimpleData: {},
        TimeData: {}
    },
    uiconfig: {
        showLabels: new ReactiveVar(true),
        dateFormat: 'DD.MM'
    },
    events: {
        redirectAfterLogin:function(){
            const REDIRECT_ROUTE = '/cadmin';
            Tracker.autorun((c)=>{
                let userId = Meteor.userId();
                if(userId) {
                     this.props.history.pushState(null,REDIRECT_ROUTE)
                    c.stop();
                }
            
            })
        },
        redirectAfterLogout:function(){
            const REDIRECT_ROUTE = '/login';
            Tracker.autorun((c)=>{
                let userId = Meteor.userId();
                if(!userId) {
                     this.props.history.pushState(null,REDIRECT_ROUTE)
                    c.stop();
                }
            
            })
        }
    }

}

module.exports = AdminConfig