//Se inicializa el usuario
const userAdmin='mar90jesusgmailcom';
//Se inicializa el usuario
(function(){
    //Se inicialializa firebase
    var config = {
        apiKey: "AIzaSyCmI3gN4jJR-TV7FaiGhUkhvxOdtdP2sco",
        authDomain: "encuesta-5a920.firebaseapp.com",
        databaseURL: "https://encuesta-5a920.firebaseio.com",
        storageBucket: "encuesta-5a920.appspot.com",
        messagingSenderId: "843177083745"
  };
  firebase.initializeApp(config);

  //Se inicialializa firebase

  //Se crean el modulo y los controller
    angular
    .module('myApp',['firebase'])

    .controller('MyCtrl',function($scope,$firebaseObject){
        //Se declara la variable del usuario invitado
        $scope.userinvited='null';
        //Se crea una referencia a la informacion extra relacionada a la pagina mananger
        const referenciaInformation=firebase.database().ref().child('information/infoMananger/questionsrgistr');
        //Se crea un objeto con la funcion$firebaseObject();
        this.objectInform=$firebaseObject(referenciaInformation);
        //Se crea una referencia a la informacion relacionda con un administrados
        const referenciaUserAdmin=firebase.database().ref().child('uses/admin');
        //Se crea la rferencia a los datos del usuario administrados
        const userRef=referenciaUserAdmin.child(userAdmin);
        const profileRef=userRef.child('profile');
        //Se crea un objeto con la funcion$firebaseObject();
        this.UserAdmidObject=$firebaseObject(profileRef);
        //Se obtiene la referencia al nombre del usuario invitado 
        userinvitedRef=profileRef.child('invitedname');
        //Se declara la variable que guardara la referencia a los datos del invitado
        var referenciaUserInvited;
        //Se corre un intervalo de tiempo a segundo=10000ms. Para validar si hay invitado registrado 
        setInterval(function(){
            //Se ejecuta la function apply() para que este al tanto de culaquier cambio con el invitado
            $scope.$apply(function(){
                //Se obtienen el nombre del invitado pormedio del snapshot
                userinvitedRef.on('value', function(snapshot) {
                //Se crea un objeto invitado. Por medio de la referncia se trae el Json
                  referenciaUserInvited=firebase.database().ref().child('uses/invited/'+snapshot.val());
                  //Se valida si existe  invitado sino para ocultar el boton de registrar invitado
                  if(snapshot.val()!='null'){
                     this.UserInvietdObject=$firebaseObject(referenciaUserInvited);
                     $('#btnRegistrarInvitado').addClass("hidden");//Se oculta el boton
                     $('#btnDatosInvitado').removeClass("hidden");//Remueve la clase que oculta el boto
                    $('#btnDatosInvitado').addClass("show");//Agrega una clase que hace el boton visible
                  }
                 if(snapshot.val()==='null'){
                    $('#btnDatosInvitado').addClass("hidden");//Remueve la clase que oculta el boto
                    $('#btnRegistrarInvitado').removeClass("hidden");//Agrega la clase que oculta el boto
                    $('#btnRegistrarInvitado').addClass("show");//Agrega una clase que hace el boton visible
                  }
                });
            });
        },1000);
        //Se crea un array con datos quemados. Es el array avecedario.
        $scope.obtion= [{id:'A'},{id:'B'},{id:'C'},{id:'D'},{id:'E'},{id:'F'},{id:'G'},{id:'H'},{id:'I'},
        {id:'J'},{id:'K'},{id:'L'},{id:'M'},{id:'N'},{id:'Ñ'},{id:'O'},{id:'P'},
        {id:'Q'},{id:'R'},{id:'S'},{id:'T'},{id:'U'},{id:'V'},{id:'W'},{id:'X'},{id:'Y'},{id:'Z'}];
        //Seccion para la extracion de los datos de los temas.
        const topicsRef=userRef.child('topics');
        //Se crea un objeto topics. Por medio de la referncia se trae el Json
        this.topicObject=$firebaseObject(topicsRef);
              
    });

}());
