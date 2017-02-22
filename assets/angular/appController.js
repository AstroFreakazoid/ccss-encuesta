/**
 * Created by alego on 30/1/2017.
 */
angular.module('CCSSapp', [])
    .controller('mainCtrl', function($scope) {

        $scope.topics = 
            [
                {
                    id: 'q_1',
                    id_container: 'content3',
                    name: 'GERIATRIA',
                    questions: 
                    [
                        {
                            id: 'q1-1',
                            title:'DONDE VIVES',
                            answers:['GUNACASTE','LIMON','HEREDIA','GRECIA'],
                            options:['A','B','C','D'],
                            correctAnswer:3
                        },
                        {
                            id: 'q1-2',
                            title:'COMO ES EL MUNDO',
                            answers:['LINDO','LOCO','VERDE','TRISTE'],
                            options:['A','B','C','D'],
                            correctAnswer:3
                        },
                        {
                            id: 'q1-3',
                            title:'COMO ERES TU',
                            answers:['Es esto','Es quello','Es Amor','Es Ciencia'],
                            options:['A','B','C','D'],
                            correctAnswer:3
                        }
                    ]
                },
                {
                    id: 'q_2',
                    id_container: 'content2',
                    name: 'GERONTOLOGIA',
                    questions: 
                    [
                        {
                            id: 'q2-1',
                            title:'QUE ES GEREATRIA',
                            answers:['Cuando','DONDE','PORQUE','Es Ciencia'],
                            options:['A','B','C','D'],
                            correctAnswer:3
                        },
                        {
                            id: 'q2-2',
                            title:'QUE ES NATURALEZA',
                            answers:['Es esto','Es quello','Es Amor','Es Ciencia'],
                            options:['A','B','C','D'],
                            correctAnswer:3
                        },
                        {
                            id: 'q2-3',
                            title:'QUE ES  AGUA',
                            answers:['LIQUIDO','H2O','Es Amor','REFRESCANTE'],
                            options:['A','B','C','D'],
                            correctAnswer:3
                        }
                    ]    
                },
                {
                    id: 'q_3',
                    id_container: 'content3',
                    name: 'GERIATRIA',
                    questions: 
                    [
                        {
                            id: 'q3-1',
                            title:'DONDE VIVES',
                            answers:['GUNACASTE','LIMON','HEREDIA','GRECIA'],
                            options:['A','B','C','D'],
                            correctAnswer:3
                        },
                        {
                            id: 'q3-2',
                            title:'COMO ES EL MUNDO',
                            answers:['LINDO','LOCO','VERDE','TRISTE'],
                            correctAnswer:3
                        },
                        {
                            id: 'q3-3',
                            title:'COMO ERES TU',
                            answers:['Es esto','Es quello','Es Amor','Es Ciencia'],
                            options:['A','B','C','D'],
                            correctAnswer:3
                        }
                    ]
                },
            ];

    })
    .controller('managerCtrl', function($scope) {
            
        $scope.userAuth = {
            username: "MARVIN",
            password: "1723hjasd",
            mail: "marvin@astrofreakazoid.com"
        }

        $scope.invitado = {
            username: "invitado",
            password: "12345",
            mail: "marvin@astrofreakazoid.com"
        }

    });

