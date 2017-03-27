angular.module('AD.constants', [])
    .constant("API", {
        "ENDPOINT": "http://localhost/api/company/"
    })
    .config(function($mdThemingProvider) {
        var customMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'f1f1f1'
        });
        $mdThemingProvider.definePalette('custom', customMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('custom', {
                'default': '500',
                'hue-1': '50'
            })
            .accentPalette('pink');
        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey')
    });
