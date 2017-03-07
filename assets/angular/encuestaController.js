/**
 * Created by alego on 27/2/2017.
 */
(function() {
    const userInvited=localStorage.getItem("username");
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
    });
   
  
}());


