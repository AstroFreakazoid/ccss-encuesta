function myFunction() {
    return "Write something clever here...";
}
(function() {
    const usernameAdmin=localStorage.getItem("username");
    const userInvited=localStorage.getItem("usernameInvited");
    var idUserAdmin;
    var refUserAdmin;
    var app = angular.module('myApp',['firebase']);
    //Se inicialializa firebase.
   var config = {
    apiKey: "AIzaSyAkkKRqtp_2xY8qIeSuzJnTHIlKdDuQqis",
    authDomain: "congresocrgeriatria2017.firebaseapp.com",
    databaseURL: "https://congresocrgeriatria2017.firebaseio.com",
    storageBucket: "congresocrgeriatria2017.appspot.com",
    messagingSenderId: "207357275337"
  };
  firebase.initializeApp(config);
   
    app.controller('encuestaCtrl', function($scope,$firebaseObject,$firebaseArray) {
        $scope.title = "BIENVENIDO";
        $scope.comment = "Encuesta Virtual";
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
                        comentarios=snapshot.val().comment+"\n "+localStorage.getItem("usernameInvited")+":  "+valueTextArea;
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
        $scope.seleccionarTema=function(idTopic){
            idTopicSelect=idTopic;
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
            graph.setData([{y: 'Respuesta 1', a:  0},
                            {y: 'Respuesta 2', a: 0},
                            {y: 'Respuesta 3', a: 0},
                            {y: 'Respuesta 4', a: 0}
                          ]);
        }

        var listIdQuestionsPorcentAnswers=[]
        $scope.cargarPorcentGraf=function(){
            listIdQuestionsPorcentAnswers=[];
            var listIdQuestions=[];
            var i=0;
            ref.child('uses/admin/'+usernameAdmin+"/topics/"+idTopicSelect+"/questions").on("child_added", function(snapshot) 
            {//Se obtiene la lista de usuarios exixtentes en la bd.
                listIdQuestions[i]=snapshot.key;
                i++;  
            });
            for(i=0;i<listIdQuestions.length;i++){
                 ref.child('uses/admin/'+usernameAdmin+"/topics/"+idTopicSelect+"/questions/"+listIdQuestions[i]+"/answers").on("value", function(snapshot){
                    var listPorcent=[];
                    for(j=0;j<snapshot.val().length;j++){
                        ref.child('uses/admin/'+usernameAdmin+"/topics/"+idTopicSelect+"/questions/"+listIdQuestions[i]+"/answers/"+j+"/porcentage").on("value", function(snapshot){
                            //console.log(snapshot.val());
                            listPorcent[j]=snapshot.val();
                            //console.log( listPorcent[j]);
                        });    
                    }
                    //console.log( listPorcent);
                    listIdQuestionsPorcentAnswers.push(listPorcent);
                   //console.log( listIdQuestionsPorcentAnswers);
                });
            }
        }
         setInterval(function() {
            $scope.$apply(function(){ 
                $scope.cargarPorcentGraf();
                $scope.moverCarusel();
                ref.child('uses/admin/'+usernameAdmin+"/cantQuestionProgres/cantQuestion/").on("value", function(snapshot){
                if(snapshot.val()>0 && listIdQuestionsPorcentAnswers.length!=0 && (indexItem)>=snapshot.val()){
                    
                    $scope.valor1= listIdQuestionsPorcentAnswers[(snapshot.val()-1)][0];
                    $scope.valor2= listIdQuestionsPorcentAnswers[(snapshot.val()-1)][1];
                    $scope.valor3= listIdQuestionsPorcentAnswers[(snapshot.val()-1)][2];
                    $scope.valor4= listIdQuestionsPorcentAnswers[(snapshot.val()-1)][3];
                    graph.setData([ {y: 'Answer 1', a:  $scope.valor1},
                                    {y: 'Answer 2', a:  $scope.valor2},
                                    {y: 'Answer 3', a:  $scope.valor3},
                                    {y: 'Answer 4', a:  $scope.valor4}
                                ]);
                }
            });
            });
                
        }, 500);
        $scope.siguienteGrafico=function(){
           
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
                $scope.siguienteGrafico();
            }
             
            if((indexItem+1)==SiguienteIndexItem){
                ref.child('uses/admin/'+usernameAdmin+"/cantQuestionProgres/").set({
                    cantQuestion:SiguienteIndexItem
                });
                ref.child("/uses/admin/"+idUserAdmin+"/nexQuestion/nex/").set(true);
                refUserAdmincomments.update({
                    comment: " "
                })
                 graph.setData([{y: 'Answer 1', a:  0},
                            {y: 'Answer 2', a: 0},
                            {y: 'Answer 3', a: 0},
                            {y: 'Answer 4', a: 0}
                          ]);
            }
            
        }


         var graph = Morris.Bar({
            //Diagrama de Barra para la muestra de estadistica  de las preguntas.
            element: 'bar-example',
            data: [
                {y: 'Answer 1', a:  $scope.valor1},
                {y: 'Answer 2', a:  $scope.valor2},
                {y: 'Answer 3', a:  $scope.valor3},
                {y: 'Answer 4', a:  $scope.valor4}
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
                // if(snapshot.val()>0 && listIdQuestionsPorcentAnswers.length!=0 && (indexItem)>=snapshot.val()){
                //     $scope.valor1= listIdQuestionsPorcentAnswers[(snapshot.val()-1)][0];
                //     $scope.valor2= listIdQuestionsPorcentAnswers[(snapshot.val()-1)][1];
                //     $scope.valor3= listIdQuestionsPorcentAnswers[(snapshot.val()-1)][2];
                //     $scope.valor4= listIdQuestionsPorcentAnswers[(snapshot.val()-1)][3];

                //      graph.setData([ {y: 'Respuesta 1', a:  $scope.valor1},
                //                      {y: 'Respuesta 2', a:  $scope.valor2},
                //                      {y: 'Respuesta 3', a:  $scope.valor3},
                //                      {y: 'Respuesta 4', a:  $scope.valor4}
                //                   ]);
                // }
            });

        }
    
       
        setInterval(function() {
            $scope.$apply(function(){
                $scope.inicializarComentario();
                $scope.hiddenModals(); 
            });
                
        },200);
        
       
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

