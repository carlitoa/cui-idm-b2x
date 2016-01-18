angular.module('app')
.config(['$translateProvider','$locationProvider','$stateProvider','$urlRouterProvider',
    '$injector','localStorageServiceProvider','$cuiIconProvider',
function($translateProvider,$locationProvider,$stateProvider,$urlRouterProvider,
    $injector,localStorageServiceProvider,$cuiIconProvider){
    localStorageServiceProvider.setPrefix('cui');
    $stateProvider
        .state('base',{
            url: '/',
            templateUrl: 'assets/angular-templates/home.html',
            controller: 'baseCtrl as base'
        })
        .state('users',{
            url: '/users',
            templateUrl: 'assets/angular-templates/users/users.html'
        })
        .state('users.search',{
            url: '/',
            templateUrl: 'assets/angular-templates/users/users.search.html',
            controller: 'usersSearchCtrl as usersSearch'
        })
        .state('users.edit',{
            url: '/edit/:id',
            templateUrl: 'assets/angular-templates/users/users.edit.html',
            controller: 'usersEditCtrl as usersEdit'
        })
        .state('users.invitations',{
            url: '/invitations',
            templateUrl: 'assets/angular-templates/users/users.invitations.search.html',
            controller: 'usersInvitationsCtrl as usersInvitations'
        })
        .state('users.invitations.view',{
            url: '/view',
            templateUrl: 'assets/angular-templates/users/users.invitations.view.html',
            controller: 'userInvitationsViewCtrl as usersInvitationsView'
        })
        .state('users.invite',{
            url: '/invite',
            templateUrl: 'assets/angular-templates/users/users.invite.html',
            controller: 'usersInviteCtrl as usersInvite'
        })
        .state('users.register',{
            url: '/register?id&code',
            templateUrl: 'assets/angular-templates/users/users.register.html',
            controller: 'usersRegisterCtrl as usersRegister'
        })
        .state('users.walkupRegistration',{
            url: '/walkupRegistration',
            templateUrl:'assets/angular-templates/users/users.walkup.html',
            controller: 'usersWalkupCtrl as usersWalkup'
        })
        .state('users.activate',{
            url: '/activate/:id',
            templateUrl: 'assets/angular-templates/users/users.activate.html',
            controller: 'usersActivateCtrl as usersActivate'
        })
        .state('sysAdmin',{
            url: '/sysAdmin',
            templateUrl: 'assets/angular-templates/sysAdmin/sysAdmin.html',
        })
        .state('sysAdmin.account',{
            url: '/sysAdmin/account/',
            templateUrl: 'assets/angular-templates/sysAdmin/sysAdmin.account.html',
            controller: 'sysAdminAccountCtrl as sysAdminAccount'
        })
        .state('welcome',{
            url: '/welcome',
            templateUrl: 'assets/angular-templates/welcome/welcome.html'
        })
        .state('welcome.screen',{
            url: '/welcome',
            templateUrl: 'assets/angular-templates/welcome/welcome.screen.html',
            controller: 'welcomeCtrl as welcome'
        })
        .state('tlo',{
            url: '/tlo',
            templateUrl: 'assets/angular-templates/topLevelOrg/topLevelOrg.html'
        })
        .state('tlo.registration',{
            url: '/registration',
            templateUrl: 'assets/angular-templates/topLevelOrg/topLevelOrg.registration/topLevelOrg.registration.html',
            controller: 'tloCtrl as newTLO'
        })
        .state('division',{
            url: '/division',
            templateUrl: 'assets/angular-templates/division/division.html'
        })
        .state('division.registration',{
            url: '/registration',
            templateUrl: 'assets/angular-templates/division/division.registration/division.registration.html',
            controller: 'divisionCtrl as newDivision'
        });
    // $locationProvider.html5Mode(true);
    
    //fixes infinite digest loop with ui-router
    $urlRouterProvider.otherwise( function($injector) {
      var $state = $injector.get("$state");
      $state.go('base');
    });

    
    //where the locales are being loaded from
    $translateProvider.useLoader('LocaleLoader',{
        url:'bower_components/cui-i18n/dist/cui-i18n/angular-translate/',
        prefix:'locale-',
        suffix:'.json'
    });
     
    $cuiIconProvider.iconSet('cui','bower_components/cui-icons/dist/icons/icons-out.svg',48,true);
}]);

angular.module('app')
.run(['LocaleService','$rootScope','$state','$http','$templateCache',
    function(LocaleService,$rootScope,$state,$http,$templateCache){
    //add more locales here
    LocaleService.setLocales('en_US','English (United States)');
    LocaleService.setLocales('pl_PL','Polish (Poland)');
    LocaleService.setLocales('zh_CN', 'Chinese (Simplified)');
    LocaleService.setLocales('pt_PT','Portuguese (Portugal)');

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $state.previous = {};
        $state.previous.name = fromState;
        $state.previous.params = fromParams;
    });

    var icons=['bower_components/cui-icons/dist/icons/icons-out.svg'];

    angular.forEach(icons,function(icon){
        $http.get(icon,{
            cache: $templateCache
        });
    });
}]);

