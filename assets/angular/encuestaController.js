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
            $scope.objectManegerTopic= $firebaseObject(ref.child('uses/admin/'+usernameAdmin+"/topics"));
          
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
        }

        $('#myModal').modal({backdrop: false});  
        $('#modalGracias').modal({backdrop: false});
        $('#myModal').modal('hide');
        $('#modalGracias').modal('hide');
        $('#modalSelectTema').modal({backdrop: false});

        var siBorrarTxt=false;
        $scope.enviarComment=function(){
               var refUserAdmin=ref.child('uses/admin/'+idUserAdmin);
               var valueTextArea;
               var bandera=true;
               refUserAdmincomments=ref.child('uses/admin/'+idUserAdmin+"/comments");
                refUserAdmin.child('comments').on("value", function(snapshot){
                    valueTextArea= $('#comment').val();
                    if(bandera){
                        comentarios=snapshot.val().comment+"\n User:"+localStorage.getItem("usernameInvited")+":  "+valueTextArea;
                        $scope.todosComentarios=comentarios;
                        bandera=false;
                    }
                }); 
                refUserAdmincomments.update({
                    comment: $scope.todosComentarios
                })
                if(siBorrarTxt){
                     $('#comment').val(" ");
                }
                siBorrarTxt=true;
        }
        var indexItem=0;
        $scope.setIndexItem = function(idTopic){
            indexItem++;
             console.log(indexItem);
            
        }
        $scope.seleccionarTema=function(idTopic){
            ref.child('uses/admin/'+usernameAdmin+"/topics/").orderByChild('key').on("child_added", function(snapshot)
            {
                ref.child('uses/admin/'+usernameAdmin+"/topics/"+ snapshot.key+"/visible").set(false);
            });
            ref.child('uses/admin/'+usernameAdmin+"/cantQuestionProgres/").set({
                        cantQuestion:0
            });
            ref.child('uses/admin/'+usernameAdmin+"/topics/"+idTopic+"/visible").set(true);
            indexItem=0;
            SiguienteIndexItem=0;
        }
         $scope.todosComentarios;
         $scope.inicializarComentario=function(){
            var comentarios;
            var refUserAdmin=ref.child('uses/admin/'+usernameAdmin);
            refUserAdmin.child('comments/comment').on("value", function(snapshot){
                comentarios=snapshot.val();
                $scope.todosComentarios=comentarios;
            }); 
        }
        $scope.hiddenModals=function(){
            var userNexQuestionRef=ref.child("/uses/admin/"+idUserAdmin+"/nexQuestion/nex/").on("value", function(snapshot){
               if(snapshot.val()){
                    $('#myModal').modal('hide');
                    $('#modalGracias').modal('hide');
                    ref.child("/uses/admin/"+idUserAdmin+"/nexQuestion/nex/").set(false);
               }
            }); 
        }
        var SiguienteIndexItem=0;
        $scope.siguienteSlide = function(){
            refUserAdmincomments=ref.child('uses/admin/'+usernameAdmin+"/comments");
            if(indexItem>=SiguienteIndexItem){
                 ref.child('uses/admin/'+usernameAdmin+"/cantQuestionProgres/").set({
                  cantQuestion:SiguienteIndexItem
                });
                ref.child("/uses/admin/"+usernameAdmin+"/nexQuestion/nex/").set(true);
                refUserAdmincomments.update({
                    comment: " "
                })
            }
             
            if((indexItem+1)==SiguienteIndexItem){
                ref.child('uses/admin/'+usernameAdmin+"/cantQuestionProgres/").set({
                    cantQuestion:SiguienteIndexItem
                });
                ref.child("/uses/admin/"+idUserAdmin+"/nexQuestion/nex/").set(true);
                refUserAdmincomments.update({
                    comment: " "
                })
            }
            SiguienteIndexItem++;
        }
        $scope.moverCarusel=function(){
           
            ref.child('uses/admin/'+idUserAdmin+"/cantQuestionProgres/cantQuestion/").on("value", function(snapshot){
                $("#myCarousel").carousel(snapshot.val()); 
            }); 
            ref.child('uses/admin/'+usernameAdmin+"/cantQuestionProgres/cantQuestion/").on("value", function(snapshot){
                $("#myCarousel").carousel(snapshot.val()); 
            }); 
        }

       
        setInterval(function() {
            $scope.$apply(function(){
                $scope.inicializarComentario();
                $scope.hiddenModals(); 
                $scope.moverCarusel();
            });
                
        }, 1000);
        
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

        
      
       $scope.direccionarFinEncuesta=function(){
            
          var ventana = window.self;
          ventana.opener = window.self;
          ventana.close();
           
       }
      $scope.imprimir=function(){
        var ficha1 = document.getElementById('paraimprimir1');
        var ficha2 = document.getElementById('paraimprimir2');
        var ventimp = window.open(' ', '_blank');
        ventimp.document.write( ficha1.innerHTML );
        ventimp.document.write( ficha2.innerHTML );
        ventimp.document.close();
        var js = ventimp.document.createElement("script");
        js.setAttribute("src", "../../assets/angular/encuestaController.js");
        ventimp.document.head.appendChild(js);
        ventimp.print( );
        ventimp.close();
     }
    

    });
    
   
   
  
}());


