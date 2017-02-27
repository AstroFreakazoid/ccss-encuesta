//Se inicializa el usuario con los datos del local storage.
const userAdmin=localStorage.getItem("username");
//Se inicializa el usuario.
(function() {
//Inicializar Firebase
  //Se inicialializa firebase.
    var config = {
        apiKey: "AIzaSyCmI3gN4jJR-TV7FaiGhUkhvxOdtdP2sco",
        authDomain: "encuesta-5a920.firebaseapp.com",
        databaseURL: "https://encuesta-5a920.firebaseio.com",
        storageBucket: "encuesta-5a920.appspot.com",
        messagingSenderId: "843177083745"
  };
  firebase.initializeApp(config);

   //Modulo  angular.
   angular
    .module('appModuleOne',['firebase'])
    //Controler Angular.
    .controller('MyCtrl',function($scope,$firebaseObject,$firebaseArray){   
      var imageUrl="";//Variable que almacenara url del la foto del perfil de usuario.
     //Se crea la referencia a la bd.
      const ref=firebase.database().ref();
      //Se obtiene el elemento file.
      var fileButton=document.getElementById('imgProfile');
      var uploader=document.getElementById('uploader');
      //Funtion que cargara el archivo al storage de firebase.
      fileButton.addEventListener('change', function(e) {
        //Se obtiene el archivo.
        var file=e.target.files[0];
        //Se crea la referencia al storage de firebase.
        var storageRef= firebase.storage().ref('imgs').child(file.name);
        //Se guarda el archivo en el storage de firebase
        var task=storageRef.put(file);
        //Se corre el proceso de descragar del archivo y carga del archivo
        task.on('state_changed',
          function progress(snapshot){
            var percentage= (snapshot.bytesTransferred / snapshot.totalBytes )*100;//Se obtienen los porcentages de cargadel file.
              var valor=""+percentage+"%";//Se guarda el porcentage en prceso como una cadena de caracteres.
              uploader.style.width=valor;//Se modifica el el width del div que simula progreso en la vista.
              
            if (percentage==100){//Cuando la carga del file llegue a su 100% entra por el if;

              storageRef.getDownloadURL().then(function(url) {//Se obtiene la direccion del archivo subido al local stoarge de firebase.
                imageUrl=url;//Se guarda la ruta en esta variable.
                uploader.style.width="0%";//Se pone en cero % el width del div que simula el´processo de carga del file en lavista
                //Se carga el avatar con la imagen file .
                $(".avatarRegistrar").css({
                    "background-image": 'url('+imageUrl+')'
                });
              }).catch(function(error) {
                   alert(error.message);
              });
            }
          },
          function error(err){},
          function complete(){}
        );
      });

    // Obtener elementos
  
    var emailRegis = document.getElementById('email');
    var passwordRegis = document.getElementById('password');
    var nameUserRegis = document.getElementById('nameUser');
    var userExistente;
    $scope.registrarUser = function()//Function que registra a un usuario.
    { userExistente=false;//Variable booleana que sirve parasaber si ya existe el usuario
      var nameUser="null";//Varisable que almacenara el correo electronico si . y @
      nameUser=$scope.formatearNameUser(emailRegis.value);//Se llama a la function que formatea el correo electronico.
      ref.child("/uses/admin").orderByChild("profile/username/").on("child_added", function(snapshot) {//Se obtiene la lista de usuarios exixtentes en la bd.
          
            if(snapshot.key===nameUser){//Se compara .
                userExistente=true;//Si ya existe el usuario se cambia el valor s true
              }
          
      });

      if(userExistente==false & nameUser.length>0)//Se valida que no exista el usuario y que el nombre de usuario tenga suficiente caracteres.
      { if($scope.valiadar())//Se invoca a la function valida la cual me retornara un booleano, esta funtion valiada que todo este bien con los datos ingresados por el usuario a la hora de su registro.
        { localStorage.setItem("username", nameUser);// Todo bien ya se puede guardar el usuario en el local storage para percistencia.
          $('#btnaLogin').removeClass("hidden");//Se remueve la clase que oculta el boton de iniciar secion.
          $('#btnaLogin').addClass("show");//Se agrega la clase que mostrara el boton de iniciar secion
          var userRef=ref.child("/uses/admin/"+nameUser+"/profile");//Se crea los Json para crear la estructura de arbol donde el Usuario -
          userRef.set({//almacenara sus datos como topics,perfil y respuesta .
                  commentary:"null",//Json del perfil
                  invitedname:"null",
                  name:nameUserRegis.value,
                  password:passwordRegis.value,
                  rol:"admin",
                  username:emailRegis.value,
                  imgname:imageUrl
          });
         
          var refNewTopic=ref.child("/uses/admin/"+nameUser+"/topics");//Se crea la ruta para el Json de los topics
           //Se inserta el Json en la bd
           refNewTopic.push().set(
           {
                name: 'Tema',//Se crea el Jason de los topics
                visible: false,
                questions: 
                [{  name:'Pregunta',
                    help:"isisisisis",
                    visible:false,
                    answers:[
                    {
                        name:'RespA',
                        porcentage:0,
                    },
                    {
                        name:'RespB',
                        porcentage:0,
                    },
                    {
                        name:'RespC',
                        porcentage:0,
                    },{
                        name:'RespD',
                        porcentage:0,
                    }],
                 },
                ],
            });
        }
      }else{
        if(nameUser.length==0){
          alert("Ingrese un correo electronico");
        }else{
          
          alert("Correo electronico ya existe en el sistema");
        }
        
      }

    }

    $scope.formatearNameUser = function( nameUser)//Funtion responsable de formatear el correo electronicom para conventirlo en el nombre de usuario del sistema(id).
    { 
       var formatName="";//Variable que lamacenara le correo ya formateado
       var chart; //Variable que guardara cada caracter sacado del correo electronico del usuario
       for(var i=0;i<nameUser.length;i++){//Bucle que recorre cada letra o caracter del corro electronico.
          chart = nameUser.charAt(i);//Se guarda un caracter.
          if(chart==="."||chart==="@"||chart===" "){//Se valida . @ y espacios
            
          }else{
            formatName=(formatName+chart);//Se concatenan los caracteres validos para el formateo del correo
          }
       }
       return formatName;//Se retorna la cadena de caracteres ya formateada.
    }
    $scope.valiadar = function()//Function que valida que los datos que el usuario ingreso esta correctos.
    { var todoBien=true;//Variable que guardara el resultado binario (true=bien,false=mal).
      var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;//Exprecion de patrones para la validacion del correo electronico.

       if($('#nameUser').val().indexOf(" ") == 0||$('#nameUser').val()==" "){
        alert("Debe Ingresar su nombre y apellidos");
        todoBien=false;
        return todoBien;
      }

      if($('#email').val().indexOf(" ") == 0){
        alert("Debe Ingresar un Correo Electronico");
        todoBien=false;
        return todoBien;
      }
      
      if($('#password').val().indexOf(" ") == 0){
        alert("Debe Ingresar una contraseña");
        todoBien=false;
        return todoBien;
      }
      if($('#password').val().length<6){
        alert("Debe Ingresar una contraseña con mas de 6 caracteres");
        todoBien=false;
        return todoBien;
      }

      if (emailRegex.test($('#email').val())) {
          
      }else{
        alert("Debe Ingresar uncorreo valido");
        todoBien=false;
        return todoBien;
      }
      
      if(imageUrl.length==0){
        alert("Debe Ingresar una foto de perfil");
        todoBien=false;
        return todoBien;
      }
      return todoBien;
    }
    var txtEmail = document.getElementById('loginEmail');
    var txtPassword = document.getElementById('loginPassword');
    var correoFormateado="null";//Varisable que almacenara el correo electronico si . y @
    $scope.login = function(){
      correoFormateado=$scope.formatearNameUser(txtEmail.value);//Se llama a la function que formatea el correo electronico.
      ref.child("/uses/admin").orderByChild("profile/username/").on("child_added", function(snapshot) 
      {//Se obtiene la lista de usuarios exixtentes en la bd.
        if(snapshot.key===correoFormateado)
        {//Se comparan los nombres de los corros 
            ref.child("/uses/admin/"+correoFormateado+"/profile/password").on("value", function(snapshot) 
            {
                if(txtPassword.value==snapshot.val())
                {
                  localStorage.setItem("username",correoFormateado);
                  location.href = "manager.html";
                }else{
                  alert("Contraseña no valida");
                }
            });
        }
      });
    }


  });
}());



