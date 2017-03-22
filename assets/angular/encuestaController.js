function myFunction() {
    return "Write something clever here...";
}
(function() {
    const usernameAdmin=localStorage.getItem("username");//Se obtiene el nombre del usuario administrador que esta almacenado en el local storage.
    const userInvited=localStorage.getItem("usernameInvited");//Se obtiene el nombre del usuario invitado que esta almacenado en el local storage.
    var idUserAdmin;//Se declara la variable que almacenara el nombre de la dependencia del ususario invitado.(Nombre de usuario administrador).
    var refUserAdmin;//Se declara la variable que almacenra la referencia al usuario administrador.
    var app = angular.module('myApp',['firebase']);//Se declara la varible y se iniciaciliza como un modulo angular y se le inyecta  firebase.
    firebase.initializeApp(config);//Se inicialializa firebase.
    app.controller('encuestaCtrl', function($scope,$firebaseObject,$firebaseArray) {//Se crear el controler y se le inyecta $scope,$firebaseObject y $firebaseArray.
        $scope.title = "BIENVENIDO";
        $scope.comment = "Encuesta Virtual";
        const ref=firebase.database().ref();//Se inicializa la constante ref con la ruta a la bd firebase.
        var refUserInvited=ref.child('uses/invited/'+userInvited);//Se inicializa la vacariable con la ruta a usuario invitado.
        var nameInvited;//Se declara la variable que que almacenara el nombre del usuario invitado. 
        refUserInvited.child("profile").child("name").on("value", function(snapshot){ //Se obtiene el nombre del usuario invitado.
            nameInvited=snapshot.val();//Se inicializa la variable con el nombre del ususario invitado.
        });
        refUserInvited.child('profile/dependence').on("value", function(snapshot){//Se obtiene la dependencia del usuario invitado.
            
            idUserAdmin=snapshot.val();//Se inicializa la veriable con la dependencia del usuario invitado
            refUserAdminTopics=ref.child('uses/admin/'+idUserAdmin+"/topics");//Se obtienes los temas del usuario administrador.
            $scope.objectTopic= $firebaseObject(refUserAdminTopics);//Se crea un objeto que contiene los temas y las preguntas y las posibles respuestas,Este objeto sera usado por los invitados
            $scope.objectManegerTopic= $firebaseObject(ref.child('uses/admin/'+usernameAdmin+"/topics"));//Se crea un objeto que contiene los temas y las preguntas y las posibles respuestas, este objeto sera usado por el administrador
          
        })

        $scope.incrementarPorcentage=function(idTopic,idQuestion,idAnswer){//Function que incrementa el porcentage de votos de una posible respuesta .
               var porcent;//Se declara la variable que almacenara la acumulación de el porcentage de votos de una posible respuesta.
               refUserAdminTopics=ref.child('uses/admin/'+idUserAdmin+"/topics");//Se obtienes los temas del usuario administrador.
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
                    if(bandera && $('#comment').val()!=" "){ 
                        comentarios=snapshot.val().comment+"\n"+nameInvited+":  "+valueTextArea;
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
        }

        var idTopicSelect;
        var listIdQuestions=[];
        $scope.seleccionarTema=function(idTopic){
            idTopicSelect=idTopic;
            var i=0;
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
            indexGrafi=0;
            $scope.cargarPorcentGraf();
            graph.setData([
                {y: 'Respuesta 1', a: 0},
                {y: 'Respuesta 2', a: 0},
                {y: 'Respuesta 3', a: 0},
                {y: 'Respuesta 4', a: 0}
            ]);

            ref.child('uses/admin/'+usernameAdmin+"/topics/"+idTopicSelect+"/questions").on("child_added", function(snapshot) 
                {
                    listIdQuestions[i]=snapshot.key;
                    i++;  
            });
        }
        setInterval(function() {
            $scope.$apply(function(){
                $scope.cargarPorcentGraf();
            });
                
        },200);
        setInterval(function() {
            $scope.$apply(function(){
                $scope.moverCarusel();
            });
                
        },2000);
        setInterval(function() {
                $scope.$apply(function(){ 
                    ref.child('uses/admin/'+usernameAdmin+"/cantQuestionProgres/cantQuestion/").on("value", function(snapshot){
                        if(snapshot.val()>0 && listIdQuestionsPorcentAnswers.length!=0 ){
                            graph.setData([ 
                                {y: 'Answer 1', a:  listIdQuestionsPorcentAnswers[0]},
                                {y: 'Answer 2', a:  listIdQuestionsPorcentAnswers[1]},
                                {y: 'Answer 3', a:  listIdQuestionsPorcentAnswers[2]},
                                {y: 'Answer 4', a:  listIdQuestionsPorcentAnswers[3]}
                            ]);
                        }
                    });
                });
                    
         }, 500);
         

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
            SiguienteIndexItem++;
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
                 graph.setData([
                    {y: 'Answer 1', a: 0},
                    {y: 'Answer 2', a: 0},
                    {y: 'Answer 3', a: 0},
                    {y: 'Answer 4', a: 0}
                ]);
            }
       }
        $scope.cargarPorcentGraf=function(){
            listIdQuestionsPorcentAnswers=[];
            if(listIdQuestions.length!=0){
                ref.child('uses/admin/'+usernameAdmin+"/cantQuestionProgres/cantQuestion/").on("value", function(snapshot){
                    if(snapshot.val()<=(indexItem)&& snapshot.val()>0){
                        ref.child('uses/admin/'+usernameAdmin+"/topics/"+idTopicSelect+"/questions/"+listIdQuestions[(snapshot.val()-1)]+"/answers").on("value", function(snapshot){
                            if(snapshot.val()!=null){
                                for(j=0;j<snapshot.val().length;j++){
                                    listIdQuestionsPorcentAnswers[j]=snapshot.val()[j].porcentage;
                                }
                            }
                        });
                    }
                }); 
            }
        }

         var graph = Morris.Bar({
            //Diagrama de Barra para la muestra de estadistica  de las preguntas.
            element: 'bar-example',
            data: [
                {y: 'Answer 1', a: 0},
                {y: 'Answer 2', a: 0},
                {y: 'Answer 3', a: 0},
                {y: 'Answer 4', a: 0}
            ],
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Personas', 'Conversions']
         });

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
            });
       },1000);
        setInterval(function() {
            $scope.$apply(function(){
                $scope.hiddenModals(); 
            });
        },300);
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

