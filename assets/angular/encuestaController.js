/**
 * Created by alego on 27/2/2017.
 */
var app = angular.module('myApp', []);
app.controller('encuestaCtrl', function($scope) {

    $scope.title = "BIENVENIDO";
    $scope.comment = "Encuesta Virtual";

    $scope.items = [
        {
            title: "pregunta uno",
            ans: [
                {
                    id: "p1-a1",
                }
            ]
        },
        {
            title: "pregunta dos",
            ans: [
                {
                    id: "p2-a1",
                },
                {
                    id: "p2-a2",
                }
            ]
        },
        {
            title: "pregunta tres",
            ans: [
                {
                    id: "p3-a1",
                },
                {
                    id: "p3-a2",
                },
                {
                    id: "p3-a3",
                }
            ]
        },
        {
            title: "pregunta cuatro",
            ans: [
                {
                    id: "p4-a1",
                },
                {
                    id: "p4-a2",
                },
                {
                    id: "p4-a3",
                },
                {
                    id: "p4-a4",
                }
            ]
        }
    ]


});