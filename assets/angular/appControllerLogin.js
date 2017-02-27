//Se inicializa el usuario.
const userAdmin='mar90jesusgmailcom';
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
        var task=storageRef.put(file);

        task.on('state_changed',
          function progress(snapshot){
            var percentage= (snapshot.bytesTransferred / snapshot.totalBytes )*100;
              var valor=""+percentage+"%";
              uploader.style.width=valor;
              
            if (percentage==100){

              storageRef.getDownloadURL().then(function(url) {
                imageUrl=url;
                uploader.style.width="0%";
                //show avatar
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
    var txtEmail = document.getElementById('loginEmail');
    var txtPassword = document.getElementById('loginPassword');
    var emailRegis = document.getElementById('email');
    var passwordRegis = document.getElementById('password');
    var nameUserRegis = document.getElementById('nameUser');
    var btnLogin = document.getElementById('btnLogin');
    var btnRegistrar = document.getElementById('btnRegistrar');
    var userExistente;
    var listUserName=[];
    $scope.registrarUser = function()
    { userExistente=false;
      var nameUser="null";
      nameUser=$scope.formatearNameUser(emailRegis.value);
      ref.child("/uses/admin").orderByChild("profile/username/").on("child_added", function(snapshot) {
          
           listUserName=snapshot.key;
           for(var i=0;i<listUserName.length;i++){
              if(listUserName===nameUser){
                userExistente=true;
              }
           }
      });

      if(userExistente==false & nameUser.length>0)
      { if($scope.valiadar())
        { localStorage.setItem("username", nameUser);
          $('#btnaLogin').removeClass("hidden");
          $('#btnaLogin').addClass("show");
          var userRef=ref.child("/uses/admin/"+nameUser+"/profile");
          userRef.set({
                  commentary:"null",
                  invitedname:"null",
                  name:nameUserRegis.value,
                  password:passwordRegis.value,
                  rol:"admin",
                  username:emailRegis.value,
                  imgname:imageUrl
          });
         
          var refNewTopic=ref.child("/uses/admin/"+nameUser+"/topics");
           //Se inserta el Json en la bd
           refNewTopic.push().set(
           {
                name: 'Tema',
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

    $scope.formatearNameUser = function( nameUser)
    { 
       var formatName="";
       var chart; 
       for(var i=0;i<nameUser.length;i++){
          chart = nameUser.charAt(i);
          if(chart==="."||chart==="@"||chart===" "){
            
          }else{
            formatName=(formatName+chart);
          }
       }
       return formatName;
    }
    $scope.valiadar = function()
    { var todoBien=true;
      var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

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

  });

    
}());



