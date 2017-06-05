var app = angular.module('ticketApp',[])
app.controller('loginCtrl',function ($scope) {
    $scope.username = '';
    $scope.password = '';
    $scope.authenticate = function (user,pass) {
        if ($scope.username == 'user' && $scope.password == 'user123'){
            location.href = '../public/main.html';
        }
        else {
            document.getElementById('authFailed').innerHTML = "<b>Invalid username or password</b>";
        }
    }

});

app.controller('mainCtrl', function ($scope,$http) {


    $http({
        method: 'GET',
        url: '/data'
    }).then(function successCallback(response) {
        $scope.seats = response.data;

    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });



    $scope.count = 0;
    $scope.seatNumber = [];
    $scope.myValue = true;
    $scope.seatConfirm = false;
    $scope.payConfirm = false;
    $scope.seatId =  [];

    // $scope.buildSeatMap = function () {
    //     for(i=1;i<=40;i++){
    //         var seat = {
    //             number: i,
    //             reserved: false
    //         }
    //         $scope.seats.push(seat);
    //
    //     }
    //     $scope.seats[5].reserved = true;
    // }

    // $scope.buildSeatMap();
    $scope.addSeat = function (x) {

        x.selected = !x.selected;
        if(!x.selected == false && x.reserved == false){
            $scope.count += 1;
            $scope.seatNumber.push(x.id);
            $scope.seatId.push(x._id);

        }
        if(!x.selected &&  x.reserved == false){
            $scope.count -= 1;
            var index =  $scope.seatNumber.indexOf(x.id);
            $scope.seatNumber.splice(index,1);
            var idIndex = $scope.seatId.indexOf(x._id);
            $scope.seatId.splice(idIndex,1);

        }



    }


    $scope.checkSeatSelected = function () {
        if($scope.seatNumber.length == 0){
            return true;
        }
        return false;
    }

    $scope.proceed = function () {
        $scope.myValue = false;
        $scope.seatConfirm = true;

    }

    $scope.payment = function () {
        $scope.payConfirm = true;
        $scope.seatConfirm = false;
        for(i=0;i<$scope.seatId.length;i++){

            $http.put('/booked/'+$scope.seatId[i],$scope.seatNumber).then(function (response) {


            },function (err) {
                console.log(err);
            });
        }



    }
});
