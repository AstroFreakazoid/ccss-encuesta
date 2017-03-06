/**
 * Created by alego on 27/2/2017.
 */
var app = angular.module('myApp', []);
app.controller('encuestaCtrl', function($scope) {

    $scope.title = "BIENVENIDO";
    $scope.comment = "Encuesta Virtual";

    $scope.topics= [
        {
            id: 'topic1',
            name: "Topic 1",
            visible: false,
            help: 'help text',
            preguntas: [
                {
                    id: 'topic1-preg1',
                    name: 'pregunta 1',
                    visible: false,
                    options: [
                        {
                            id: 'topic1-preg1-option1',
                            ref: 'topic1-preg1-tab1',
                            text: 'lorem text',
                            keyword: 'star'
                        },
                        {
                            id: 'topic1-preg1-option2',
                            ref: 'topic1-preg1-tab2',
                            text: 'lorem text',
                            keyword: 'medicina'
                        },
                        {
                            id: 'topic1-preg1-option3',
                            ref: 'topic1-preg1-tab3',
                            text: 'lorem text',
                            keyword: 'oftalmology'
                        }
                        ,
                        {
                            id: 'topic1-preg1-option4',
                            ref: 'topic1-preg1-tab4',
                            text: 'lorem text',
                            keyword: 'technology'
                        }
                    ]
                },
                {
                    id: 'topic1-preg2',
                    name: 'pregunta 2',
                    visible: false,
                    options: [
                        {
                            id: 'topic1-preg2-option1',
                            ref: 'topic1-preg2-tab1',
                            text: 'lorem text',
                            keyword: 'technology'
                        },
                        {
                            id: 'topic1-preg2-option2',
                            ref: 'topic1-preg2-tab2',
                            text: 'lorem text',
                            keyword: 'technology'
                        },
                        {
                            id: 'topic1-preg2-option3',
                            ref: 'topic1-preg2-tab3',
                            text: 'lorem text',
                            keyword: 'technology'
                        }
                    ]
                }
            ]
        }
    ]


});