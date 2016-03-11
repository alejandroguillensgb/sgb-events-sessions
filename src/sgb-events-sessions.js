'use strict';

angular.module('sgb-events-sessions', ['megazord'])
    .controller('sgb-events-sessions-controller', ['$scope', '_router', '_screen', '_screenParams','appConstants','$ionicHistory', '$ionicScrollDelegate', '$timeout','$appLoader','lodash','_data',
    	function ($scope, _router, _screen, _screenParams, appConstants, $ionicHistory, $ionicScrollDelegate, $timeout, $appLoader, _, _data) {
        _screen.initialize($scope, _screenParams);

    	$scope.fullImagePath = appConstants.fullImagePath;
        $ionicHistory.clearHistory();
        $scope.sessions = _data.sessions; 
        $scope.filteredItems = angular.copy($scope.sessions); 
        
        $scope.filterItems = function(searchQuery){
            var search  = searchQuery.toLowerCase();
            var sessionList = []; 
            for (var i = 0; i < $scope.filteredItems.length; i++) {
                $scope.filteredItemsInside = _.filter($scope.sessions[i].rooms, function(item){
                     $scope.filteredItemsInsideD = _.filter(item.sessions, function(session){
                        return (session.title && session.title.toLowerCase().indexOf(search) != -1
                                 || (session.speaker && session.speaker.toLowerCase().indexOf(search) != -1));
                     });
                     sessionList[item.name] = $scope.filteredItemsInsideD;
                });
                for (var j = 0; j < $scope.filteredItems[i].rooms.length; j++){
                    $scope.filteredItems[i].rooms[j].sessions =  sessionList[$scope.filteredItems[i].rooms[j].name] ;
                }
            }
        };
        
        $scope.showDate = function(session){
            var show = false;
            for (var j = 0; j < session.rooms.length; j++){
                show = show || session.rooms[j].sessions.length > 0;
            }
            return show;
        }
        
        $scope.cancelSearch = function(){
            $scope.filteredItems = angular.copy($scope.sessions);
        };

        $scope.toTime = function(timeString){
            var timeTokens = timeString.split(':');
            return new Date(1970,0,1, timeTokens[0], timeTokens[1] );
        }

     	$scope.itemClickHandler = function(item){
			_router.fireEvent({
				name: 'goToSessionDetail', 
				params: {
					data: item
				}
			})
        };

    }]);