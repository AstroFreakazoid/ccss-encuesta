/**
 * Created by alego on 27/2/2017.
 */
(function() {
    const usernameAdmin=localStorage.getItem("username");
    const userInvited=localStorage.getItem("usernameInvited");
    var idUserAdmin;
    var refUserAdmin;
    var app = angular.module('myApp',['firebase']);
    //Se inicialializa firebase.
    var config = {
            apiKey: "AIzaSyCmI3gN4jJR-TV7FaiGhUkhvxOdtdP2sco",
            authDomain: "encuesta-5a920.firebaseapp.com",
            databaseURL: "https://encuesta-5a920.firebaseio.com",
            storageBucket: "encuesta-5a920.appspot.com",
            messagingSenderId: "843177083745"
    };
    firebase.initializeApp(config);
   
    app.controller('encuestaCtrl', function($scope,$firebaseObject,$firebaseArray) {
        $scope.title = "BIENVENIDO";
        $scope.comment = "Encuesta Virtual";
        $scope.listTopic=[];
        $scope.list;
        const ref=firebase.database().ref();
        var refUserInvited=ref.child('uses/invited/'+userInvited);
        refUserInvited.child('profile/dependence').on("value", function(snapshot){
            idUserAdmin=snapshot.val();
            refUserAdminTopics=ref.child('uses/admin/'+idUserAdmin+"/topics");
            $scope.objectTopic= $firebaseObject(refUserAdminTopics);
              
        })
        $scope.incrementarPorcentage=function(idTopic,idQuestion,idAnswer){
               var porcent;
               refUserAdminTopics=ref.child('uses/admin/'+idUserAdmin+"/topics");
               refUserAdminTopicQuestionAswer=refUserAdminTopics.child(idTopic+"/questions/"+idQuestion+"/answers/"+idAnswer);
               refUserAdminTopicQuestionAswer.child('porcentage').on("value", function(snapshot){
                    porcent= snapshot.val();
                })
                porcent=porcent+1;
                refUserAdminTopicQuestionAswer.update({
                    porcentage:porcent
                });
                $('#myModal').modal('show');
                console.log(porcent);
        }
       
        
        $scope.enviarComment=function(){
               var refUserAdmin=ref.child('uses/admin/'+idUserAdmin);
               var valueTextArea;
               var comentarios=" ";
               var bandera=true;
               refUserAdmincomments=ref.child('uses/admin/'+idUserAdmin+"/comments");
                refUserAdmin.child('comments').on("value", function(snapshot){
                    valueTextArea= $('#comment').val();
                    if(bandera){
                        comentarios=snapshot.val().comment+"\n"+valueTextArea;
                        bandera=false;
                        $scope.todosComentarios=comentarios;
                    }
                  
                }); 
                if(comentarios!=" "){
                    refUserAdmincomments.update({
                        comment:comentarios
                    })
                    
                }
               
        }
        $scope.todosComentarios;

        setInterval(function() {
            $scope.$apply(function(){
                $scope.inicializarComentario();
            });
            
        }, 1000);
        $scope.inicializarComentario=function(){
           var comentarios;
           var refUserAdmin=ref.child('uses/admin/'+usernameAdmin);
            refUserAdmin.child('comments/comment').on("value", function(snapshot){
                    comentarios=snapshot.val();
                    $scope.todosComentarios=comentarios;
            }); 
           
             console.log($scope.todosComentarios);
        }
       
       
        Morris.Bar({
           //Diagrama de Barra para la muestra de estadistica  de las preguntas.
            element: 'bar-example',
            data: [
                {y: 'Respuesta 1', a: 100},
                {y: 'Respuesta 2', a: 200},
                {y: 'Respuesta 3', a: 50},
                {y: 'Respuesta 4', a: 75}
            ],
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Personas', 'Conversions']
       });

         $scope.ocultarModals=function(){
              $('#myModal').modal('hide');
        }

    });
   
  
}());


