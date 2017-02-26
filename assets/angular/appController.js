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
        $scope.eliminarPregunta = function(idQuestion,idTopic)
        {   
            refUnTopic=topicsRef.child(idTopic);
            refPregunta=refUnTopic.child("/questions");
            refUnaPregunta=refPregunta.child(idQuestion);
            refUnaPregunta.remove(function(error) {
                alert(error ? "Uh oh!" : "Success!");
            });
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
        $scope.registrarAnswer = function(idTopic,idQuestion,idAnswer)
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
        $scope.eliminarAsnwer = function(idTopic,idQuestion,idAnswer)
        {  
            refUnTopic=topicsRef.child(idTopic);
            refPregunta=refUnTopic.child("/questions");
            refUnaPregunta=refPregunta.child(idQuestion);
            refRespuesta=refUnaPregunta.child("answers");
            refRespuesta.child(idAnswer).remove(function(error) {
                alert(error ? "Uh oh!" : "Success!");
            });
            

        }

        function guardarObject(obj){
            this.userInvietdObject=$firebaseObject(obj);
            $scope.objetoProfileUserInvited= this.userInvietdObject;
        }

        //============================================
        //Seccion de insercion de datos para los topic y questions
        var valueInputTema="";
        var valueInputPregunta="";
        var valueInputRespA="";
        var valueInputRespB="";
        var valueInputRespC="";
        var valueInputRespD="";
        var keyTopic;
       
        //Function en cargada de delegar el registro de tema o preguntas.
         $scope.registar = function(){
            
            if(valueInputTema = $("#tema").val()!="" && validarAnwer()){
                $scope.guardarTema();
                alert("El tema se registro con exito");
                limpiarText2();
                var $active = $('.wizard .nav-tabs li.2');
                $active.next().removeClass('disabled');
                prevTab($active);
                $( '.wizard .nav-tabs li.1' ).removeClass('disabled');
                $( '.wizard .nav-tabs li.2' ).addClass( "disabled" );
                $( '.wizard .nav-tabs li.3' ).addClass( "disabled" );
                $( '.wizard .nav-tabs li.4' ).addClass( "disabled" );
            }else{

                if( valueInputPregunta =$("#pregunta").val()!="" && validarAnwer()){
                    $scope.guardarPregunta();
                    alert("La pregunta se registro con exito");
                    limpiarText1(); 
                    var $active = $('.wizard .nav-tabs li.2');
                    $active.next().removeClass('disabled');
                    prevTab($active);
                    $( '.wizard .nav-tabs li.1' ).removeClass('disabled');
                    $( '.wizard .nav-tabs li.2' ).addClass( "disabled" );
                    $( '.wizard .nav-tabs li.3' ).addClass( "disabled" );
                    $( '.wizard .nav-tabs li.4' ).addClass( "disabled" );
                }
             }
                
          }

        //Function que guarda un tema registrado
        $scope.guardarTema = function()
        {   //Se obtienen los input txt con los datos del formulario de registrar tema y pregunta.
            valueInputTema = $("#tema").val();
            valueInputPregunta =$("#pregunta").val();
            valueInputRespA = $("#respA").val();
            valueInputRespB = $("#respB").val();
            valueInputRespC = $("#respC").val();
            valueInputRespD = $("#respD").val();
           const referenciaUserAdmin=firebase.database().ref().child('uses/admin/'+userAdmin);
           var refNewTopic=referenciaUserAdmin.child('topics');
           var newKey=referenciaUserAdmin.child('topics').push();
           //Se inserta el Json en la bd
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
           //Se inicia liza la varible que guardara la ultima key de un tema registrado .
           referenciaUserAdmin.child('topics').orderByKey().limitToLast(1).on("child_added", function(snapshot) {
              sobreEscribirKeyRef(snapshot.key);
            });
        }


        //Function que guarda una preguna registrada . 
        $scope.guardarPregunta = function()
        {   //Se obtienen los input txt con los datos del formulario de registrar tema y pregunta.
            valueInputPregunta =$("#pregunta").val();
            valueInputRespA = $("#respA").val();
            valueInputRespB = $("#respB").val();
            valueInputRespC = $("#respC").val();
            valueInputRespD = $("#respD").val();
            //Se obtienen las referencias para la insercion de la pregunta en la bd.
            const referenciaUserAdmin=firebase.database().ref().child('uses/admin/'+userAdmin);
            referenciaUserAdmin.child('topics').orderByKey().limitToLast(1).on("child_added", function(snapshot) {
            sobreEscribirKeyRef(snapshot.key);
            });   
            var refNewQuestion=userRef.child('topics/'+keyTopic+"/questions");
            //Se inserta el Json con la pregunta y sus respuestas.
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
        }

        $scope.registrarPregunta = function(idTopic)
        {   var idUltimaPregunta;
            //Se obtienen las referencias para la insercion de la pregunta en la bd.
            const referenciaUserAdmin=firebase.database().ref().child('uses/admin/'+userAdmin);
            referenciaUserAdmin.child('topics/'+idTopic+'/questions').orderByKey().limitToLast(1).on("child_added", function(snapshot) {
            idUltimaPregunta=snapshot.key;
            }); 
            
            var refNewQuestion=userRef.child('topics/'+idTopic+"/questions");
            //Se inserta el Json con la pregunta y sus respuestas.
            refNewQuestion.push().set(
           {  name:'pregunta'+idUltimaPregunta,
                    help:"isisisisis",
                    visible:false,
                    answers:[
                    {
                        name:'A'+idTopic,
                        porcentage:0,
                    },
                    {
                        name:'B'+idTopic,
                        porcentage:0,
                    },
                    {
                        name:'C'+idTopic,
                        porcentage:0,
                    },{
                        name:'D'+idTopic,
                        porcentage:0,
                    }],
            });
        }
        

        //Funtion que sobre escribe le valor de la variable que guarda la ultima key de un tema registrado.
        function sobreEscribirKeyRef(topicKey){keyTopic=topicKey;}
        //seccion para la gestin de modificacion de datos de un tema.

        //Esta functiones la que se encarga de modificar el nombre de un tema.
        $scope.modificarTopic = function(idTopic,idInput)
        {       
            valueInput = document.getElementById(idInput);
            refUnTopic=topicsRef.child(idTopic+"/name");
            refUnTopic.set(valueInput.value);
        }
        //Function encargada de eliminar un tema.
        $scope.eliminarTopic = function(idTopic)
        {       
           refUnTopic=topicsRef.child(idTopic);
           refUnTopic.remove(function(error) {
                alert(error ? "Uh oh!" : "Success!");
            });
         }     
    });
}());


//===================================================================
//Seccion de validacion de las preguntas y limpiesa de los texfil
//Function encargada de validar que los campos de las respuestas del modal de regitrar preguntas tengan campos validos.
function validarAnwer(){
    var siguiente=true;

    if ($('#respA').val() === ''|| $('#respA').val().indexOf(" ") == 0 ) {
       alertDGC('Ingrese la respuesta A');
       siguiente=false;
    }
    if ($('#respB').val() === ''|| $('#respB').val().indexOf(" ") == 0 ) {
       alertDGC('Ingrese la respuesta B');
       siguiente=false;
    } 
    if ($('#respC').val() === ''|| $('#respC').val().indexOf(" ") == 0 ) {
       alertDGC('Ingrese la respuesta C');
       siguiente=false;
    } 
    if ($('#respD').val() === ''|| $('#respD').val().indexOf(" ") == 0 ) {
       alertDGC('Ingrese la respuesta D');
       siguiente=false;
    }
 
    return siguiente;
};

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

//Funciones que mueven los tabuladore adelante o para atras. Los del modal de registrar pregunta.
function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}