//Se inicializa el usuario.
const userAdmin='mar90jesusgmailcom';
//Se inicializa el usuario.
(function(){
    //Se inicialializa firebase.
    var config = {
        apiKey: "AIzaSyCmI3gN4jJR-TV7FaiGhUkhvxOdtdP2sco",
        authDomain: "encuesta-5a920.firebaseapp.com",
        databaseURL: "https://encuesta-5a920.firebaseio.com",
        storageBucket: "encuesta-5a920.appspot.com",
        messagingSenderId: "843177083745"
  };
  firebase.initializeApp(config);

  //Se inicialializa firebase.

  //Se crean el modulo y los controller.
    angular
    .module('myApp',['firebase'])

    .controller('MyCtrl',function($scope,$firebaseObject,$firebaseArray){
        //Se declara la variable del usuario invitado.
        $scope.userinvited='null';
        //Se crea una referencia a la informacion extra relacionada a la pagina mananger.
        const referenciaInformation=firebase.database().ref().child('information/infoMananger/questionsrgistr');
        //Se crea un objeto con la funcion$firebaseObject();
        this.objectInform=$firebaseObject(referenciaInformation);
        //Se crea una referencia a la informacion relacionda con un administrados.
        const referenciaUserAdmin=firebase.database().ref().child('uses/admin');
        //Se crea la rferencia a los datos del usuario administrados.
        const userRef=referenciaUserAdmin.child(userAdmin);
        const profileRef=userRef.child('profile');
        //Se crea un objeto con la funcion$firebaseObject();.
        this.UserAdmidObject=$firebaseObject(profileRef);
        //Se obtiene la referencia al nombre del usuario invitado .
        userinvitedRef=profileRef.child('invitedname');
        //Se declara la variable que guardara la referencia a los datos del invitado.
        var referenciaUserInvited;

        //Se obtienen el nombre del invitado pormedio del snapshot.
        userinvitedRef.on('value', function(snapshot) {
          //Se crea un objeto invitado. Por medio de la referncia se trae el Json.
          referenciaUserInvited=firebase.database().ref().child('uses/invited/'+snapshot.val()+"/profile");
          //Se llama la fucntion guardar objeto para poder sacar los datos 
          guardarObject(referenciaUserInvited);

          //Se valida si existe  invitado sino para ocultar el boton de registrar invitado.
          if(snapshot.val()!='null'){
             $('#btnRegistrarInvitado').addClass("hidden");//Se oculta el boton
             $('#btnDatosInvitado').removeClass("hidden");//Remueve la clase que oculta el boto.
            $('#btnDatosInvitado').addClass("show");//Agrega una clase que hace el boton visible.
          }
         if(snapshot.val()==='null'){
            $('#btnDatosInvitado').addClass("hidden");//Remueve la clase que oculta el boto.
            $('#btnRegistrarInvitado').removeClass("hidden");//Agrega la clase que oculta el boto.
            $('#btnRegistrarInvitado').addClass("show");//Agrega una clase que hace el boton visible.
          }
        });
     
        //Se crea un array con datos quemados. Es el array avecedario.
        $scope.obtion= [{id:'A'},{id:'B'},{id:'C'},{id:'D'},{id:'E'},{id:'F'},{id:'G'},{id:'H'},{id:'I'},
        {id:'J'},{id:'K'},{id:'L'},{id:'M'},{id:'N'},{id:'Ñ'},{id:'O'},{id:'P'},
        {id:'Q'},{id:'R'},{id:'S'},{id:'T'},{id:'U'},{id:'V'},{id:'W'},{id:'X'},{id:'Y'},{id:'Z'}];
        //Seccion para la extracion de los datos de los temas.
        const topicsRef=userRef.child('topics');
        //Se crea un objeto topics. Por medio de la referncia se trae el Json.
        this.topicObject=$firebaseObject(topicsRef);
        //Seccion para la gestion de los datos de los temas
        //Se declaran la variables que almacenaran las referencias.
        var refUnaPregunta;
        var refUnaRespuesta;
        var refUnTopic;
        var refPregunta;
        var refRespuesta;
        var valueInput;
        //Function que modificara el valor de una pregunta.
        $scope.modificarPregunta = function(idInput,idQuestion,idTopic)
        {  
            valueInput = document.getElementById(idInput);
            refUnTopic=topicsRef.child(idTopic);
            refPregunta=refUnTopic.child("/questions");
            refUnaPregunta=refPregunta.child(idQuestion+"/name");
            if(valueInput.value!=""){
                refUnaPregunta.set(valueInput.value);
            }else{
                alert("No puede modificar la respuesta con vacio, puede eliminarla si lo desea");
            }
        }
        //Function que eliminara una pregunata.
        $scope.eliminarPregunta = function(idQuestion)
        {  
            refUnaPregunta=refPregunta.child(idQuestion);
            refUnaPregunta.remove();
        }
        //Function que modificara el valor de una respuesta.
        $scope.modificarAnswer = function(idTopic,idQuestion,idAnswer,idInput)
        {  
            valueInput = document.getElementById(idInput);
            refUnTopic=topicsRef.child(idTopic);
            refPregunta=refUnTopic.child("/questions");
            refUnaPregunta=refPregunta.child(idQuestion);
            refRespuesta=refUnaPregunta.child("answers");
            refUnaRespuesta=refRespuesta.child(idAnswer+"/name");
            refUnaRespuesta.set(valueInput.value);
           
        }
        //Function que registrara una nueva respuesta a una pregunta.
        $scope.registrar = function(idTopic,idQuestion,idAnswer)
        {  
            refUnTopic=topicsRef.child(idTopic);
            refPregunta=refUnTopic.child("/questions");
            refUnaPregunta=refPregunta.child(idQuestion);
            refRespuesta=refUnaPregunta.child("answers");
            refRespuesta.push().set({
                name: idAnswer,
                porcentage: 0,
            });
           
        }
        //Function que eliminara una respuesta de una pregunta.
        $scope.eliminar = function(idTopic,idQuestion,idAnswer)
        {  
            refUnTopic=topicsRef.child(idTopic);
            refPregunta=refUnTopic.child("/questions");
            refUnaPregunta=refPregunta.child(idQuestion);
            refRespuesta=refUnaPregunta.child("answers");
            refUnaRespuesta=refRespuesta.child(idAnswer);
            refUnaRespuesta.remove();
        }

        function guardarObject(obj){
            this.userInvietdObject=$firebaseObject(obj);
            $scope.objetoProfileUserInvited= this.userInvietdObject;
        }

        //Seccion de insercion de datos para los topic y questions
        var valueInputTema="";
        var valueInputPregunta="";
        var valueInputRespA="";
        var valueInputRespB="";
        var valueInputRespC="";
        var valueInputRespD="";
        var keyTopic;
        
        $scope.guardarTema = function()
        {   
            valueInputTema = $("#tema").val();
            valueInputPregunta =$("#pregunta").val();
            valueInputRespA = $("#respA").val();
            valueInputRespB = $("#respB").val();
            valueInputRespC = $("#respC").val();
            valueInputRespD = $("#respD").val();
           const referenciaUserAdmin=firebase.database().ref().child('uses/admin/'+userAdmin);
           var refNewTopic=referenciaUserAdmin.child('topics');
           var newKey=referenciaUserAdmin.child('topics').push();
           refNewTopic.push().set(
           {
                name: valueInputTema,
                visible: false,
                questions: 
                [{  name:valueInputPregunta,
                    help:"isisisisis",
                    visible:false,
                    answers:[
                    {
                        name:valueInputRespA,
                        porcentage:0,
                    },
                    {
                        name:valueInputRespB,
                        porcentage:0,
                    },
                    {
                        name:valueInputRespC,
                        porcentage:0,
                    },{
                        name:valueInputRespD,
                        porcentage:0,
                    }],
                 },
                ],
            });
           referenciaUserAdmin.child('topics').limitToLast(2).on("child_added", function(snapshot) {
              sobreEscribirKeyRef(snapshot.key);
            });
           alert("El tema se rigistro con exito");
           limpiarText2();
        }
        
        $scope.guardarPregunta = function()
        {   
            valueInputPregunta =$("#pregunta").val();
            valueInputRespA = $("#respA").val();
            valueInputRespB = $("#respB").val();
            valueInputRespC = $("#respC").val();
            valueInputRespD = $("#respD").val();

            const referenciaUserAdmin=firebase.database().ref().child('uses/admin/'+userAdmin);
            referenciaUserAdmin.child('topics').limitToLast(2).on("child_added", function(snapshot) {
            sobreEscribirKeyRef(snapshot.key);
            });   
            var refNewQuestion=userRef.child('topics/'+keyTopic+"/questions");
            refNewQuestion.push().set(
           {  name:valueInputPregunta,
                    help:"isisisisis",
                    visible:false,
                    answers:[
                    {
                        name:valueInputRespA,
                        porcentage:0,
                    },
                    {
                        name:valueInputRespB,
                        porcentage:0,
                    },
                    {
                        name:valueInputRespC,
                        porcentage:0,
                    },{
                        name:valueInputRespD,
                        porcentage:0,
                    }],
            });
            alert("La pregunta se rigistro con exito");
            limpiarText1();
        }
        function sobreEscribirKeyRef(topicKey){keyTopic=topicKey;}
              
    });
    


}());

//ESTA FUNCION LIMPIA LOS INPUT TEXT DE LAS PREGUNTAS Y RESPUESTAS
function limpiarText1(){
    $('#pregunta').val("");
    $('#respA').val("");
    $('#respB').val("");
    $('#respC').val("");
    $('#respD').val("");
}
//ESTA FUNCION LIMPIA LOS INPUT TEXT DEL TEMA,DE LAS PREGUNTAS Y RESPUESTAS
function limpiarText2(){
    $('#tema').val("");
    $('#pregunta').val("");
    $('#respA').val("");
    $('#respB').val("");
    $('#respC').val("");
    $('#respD').val("");
}