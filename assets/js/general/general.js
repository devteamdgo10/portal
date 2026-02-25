/*
Creado por RICARDO MARTINEZ

Ver 
1.100 RMJ   01dic21 Adición encode
*/
function div_noty(Obj){
  const tipo = (Obj && Obj.tipo ? String(Obj.tipo).toLowerCase() : 'info');
  const texto = Obj && Obj.texto ? Obj.texto : '';
  const tipoMap = {
    success: 'success',
    warning: 'warning',
    error: 'danger',
    danger: 'danger',
    info: 'info',
    atencion: 'warning'
  };
  const bsType = tipoMap[tipo] || 'info';

  let host = document.getElementById('global-toast-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'global-toast-host';
    host.className = 'toast-container position-fixed top-0 end-0 p-3';
    host.style.zIndex = '1080';
    document.body.appendChild(host);
  }

  const toastNode = document.createElement('div');
  toastNode.className = `toast align-items-center text-bg-${bsType} border-0`;
  toastNode.setAttribute('role', 'alert');
  toastNode.setAttribute('aria-live', 'assertive');
  toastNode.setAttribute('aria-atomic', 'true');
  toastNode.innerHTML = `<div class="d-flex"><div class="toast-body">${texto}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>`;

  host.appendChild(toastNode);
  if (window.bootstrap && window.bootstrap.Toast) {
    const toast = new bootstrap.Toast(toastNode, { delay: 2500 });
    toastNode.addEventListener('hidden.bs.toast', () => toastNode.remove());
    toast.show();
  } else {
    alert(texto);
    toastNode.remove();
  }

}

function ObtieneAPIKey(){
  
    //console.log("Esperar ObtieneAPIKey:")
    let apikey = ''
  
    //realizar petición a servicio para crear folder por ajax async = false
    //IdDrive =  -1 //"IdDrive-"+Date.now()
    params= {'Empresa_Id':3, 'Usuario_Id':1}
    $.ajax({
            async : false, 
            data: JSON.stringify(params), 
            type: 'POST', 
            //crossDomain: true,
            dataType: "json", 
            url: `${pathWs}/api/General/ObtieneApikey`, 
            headers: {
              'Content-Type': 'application/json;  charset=utf-8',
            },
            beforeSend: function(a){
              //console.log("Params =>",params);
            },
            success: function (data) { 
                //console.log("Data apikey:", data)
                if (data.Table[0].ApiKey  !='' || data.Table[0].ApiKey != '-1'){
                    apikey = data.Table[0].ApiKey;
                    //console.log("==============  ApiKey: =>",apikey)
                }
            }, 
            error: function ( request, status, error) {  
                console.log("Error ObtieneAPIKey =>", request.responseText);
                apikey =  ''
            }
        });

    return apikey
}

function CrearFolderDrive(params){
  
    console.log("Esperar IdDrive v1")
    let IdDrive = 0

    let Api = ObtieneAPIKey()

    //realizar petición a servicio para crear folder por ajax async = false
    if (Api != ''){
        params['ApiKey'] = Api
        $.ajax({
                async : false, 
                data: JSON.stringify(params), 
                type: 'POST', 
                //crossDomain: true,
                dataType: "json", 
                url: `${pathWsRPA}/api/RPA/CrearFolder`, 
                headers: {
                  'Content-Type': 'application/json;  charset=utf-8',
                },
                beforeSend: function(a){
                  //console.log("CrearFolderDrive Params =>",params);
                },
                success: function (data) {
                    console.log("CrearFolderDrive:",data)
                    if (data.Id > 0 || data.Id != '0'){
                        IdDrive = data.Id;
                        //console.log("==============  data: =>",IdDrive)
                    }
                }, 
                error: function ( request, status, error) {  
                    console.log("Error CrearFolderDrive =>", request.responseText);
                    IdDrive =  -1
                }
            });
    }

    return IdDrive
}

function RenombrarDrive(params){
  
    console.log("Esperar RenombrarDrive v1")
    let resp = 0

    let Api = ObtieneAPIKey()

    //realizar petición a servicio para crear folder por ajax async = false
    if (Api != ''){
        params['ApiKey'] = Api
        $.ajax({
                async : false, 
                data: JSON.stringify(params), 
                type: 'POST', 
                //crossDomain: true,
                dataType: "json", 
                url: `${pathWsRPA}/api/RPA/RenombrarDrive`, 
                headers: {
                  'Content-Type': 'application/json;  charset=utf-8',
                },
                beforeSend: function(a){
                  //console.log("RenombrarDrive Params =>",params);
                },
                success: function (data) { 
                    //console.log("RenombrarDrive ====>>  data: =>",data,' >>>>> ',data.Error)
                    resp = data.Error
                }, 
                error: function ( request, status, error) {  
                    console.log("Error RenombrarDrive =>", request.responseText);
                    resp =  -1
                }
            });
    }

    return resp
}

function divRespuesta(Obj){
	const id = Obj.id == 'undefined' ? 'message' : Obj.id;
	const tipo = Obj.tipo == 'undefined' ? 'info' : Obj.tipo;
	const mensaje = Obj.mensaje
	const btnTexto1 = Obj.btnTexto1;
	const pathBtn1 = Obj.pathBtn1;
	const btnTexto2 = Obj.btnTexto2;
	const pathBtn2 = Obj.pathBtn2;

	$("#"+id).html(`<div class="alert alert-${tipo} alert-dismissible" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <i class="icon fa fa-check"></i>
                    ${mensaje} <a class="btn btn-primary" href="${pathBtn1}" style="text-decoration:none;">${btnTexto1}</a> <a class="btn btn-primary" href="${pathBtn2}" style="text-decoration:none;">${btnTexto2}</a>
                </div>`);

}

function divRespuestaSimpleBtn(Obj){
    const id = Obj.id == 'undefined' ? 'message' : Obj.id;
    const tipo = Obj.tipo == 'undefined' ? 'info' : Obj.tipo;
    const mensaje = Obj.mensaje
    const btnTexto1 = Obj.btnTexto1;
    const pathBtn1 = Obj.pathBtn1;

    $("#"+id).html(`<div class="alert alert-${tipo} alert-dismissible" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <i class="icon fa fa-check"></i>
                    ${mensaje} <a class="btn btn-primary" href="${pathBtn1}" style="text-decoration:none;">${btnTexto1}</a> 
                </div>`);

}

function footer(){
	//<!-- To the right -->
    $("#footer").html (`<div class="pull-right hidden-xs">
      V.1.000
    </div>
    <!-- Default to the left -->
    <strong>Copyright &copy; 2020 <a href="#"></a>.</strong> All rights reserved.`);
}


function generateToken() {
	const min = 15;
	const max = 40;
	const longitud = Math.floor(Math.random() * (max - min)) + min;
    var chars = '#@abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
    var token = '';
    for(var i = 0; i < longitud; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}


function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

function CheckSession() {
    const Token = sessionStorage.getItem('_TOKEN')
    const timestamp = new Date() / 1000 | 0;
    if (Token){
        //console.log("Existe token: ")
        $.ajax({ 
            data: {Token: Token , Key: timestamp}, 
            type: 'get', 
            //crossDomain: true,
            dataType: "json", 
            url: `${pathWs}/api/General/GetApiSesion`, 
            beforeSend: function(a){
              
              //console.log("Params =>",{Token: Token , Key: timestamp});
            },
            success: function (data) { 
                if (data.Table.length == 0){
                    window.location="index.html";
                }
            }, 
            error: function (data) {  
                console.log("Error =>", data);
            }
        });

    }else{
        console.log("Redirección")
        window.location="index.html";
    }

}

function ObtieneRaiz(path) {
    url_ = path+"/api/General/ObtieneDriveRaiz"
    resultDrive = {Parent:'', ParentDev:''};
    $.ajax({
        async: false,
        url: url_,
        type: 'POsT',
        beforeSend: function(a){
               $('html, body').animate({scrollTop: 0}, 'slow');
               //console.log("Path: ",url_)
             },
        success: function(data){
              let listado_ =[]
              //const variablesObj = JSON.parse(data.m_StringValue)
              for (i in data.Table){
                resultDrive['Parent'] = data.Table[i].IdDrive
                resultDrive['ParentDev'] = data.Table[i].IdDriveDev
              }

             },
        error: function(a,b,c){
              console.log('Error: '+a+'\n'+b+'\n'+c);
              div_noty({tipo:'warning', texto:"Falla en comunicación"})
             }
    });
    return resultDrive;

}

function encodeBase64(data ) {
    if (typeof btoa === "function") {
        return btoa(data);
    } else if (typeof Buffer === "function") {
        return Buffer.from(data, "utf-8").toString("base64");
    } else {
        throw new Error("Failed to determine the platform specific encoder");
    }
}

function decodeBase64(data) {
    if (typeof atob === "function") {
        return atob(data);
    } else if (typeof Buffer === "function") {
        return Buffer.from(data, "base64").toString("utf-8");
    } else {
        throw new Error("Failed to determine the platform specific decoder");
    }
}

function cadena() {
  let cadena = ''
    $.ajax({
        async: false,
        type: "GET",
        url: "assets/include/rpa_k.json",
        dataType : "json",
        contentType: 'application/json; charset=UTF-8',
        beforeSend: function(a){
        },
        success: function(data)
        {
            //console.log("Todo Ok =>",data.string);
            string = data.string
            if (typeof atob === "function") {
                cadena =atob(string);
                return cadena; 
            } else if (typeof Buffer === "function") {
                cadena = Buffer.from(string, "base64").toString("utf-8");
                return cadena
            } else {
                throw new Error("Falla al obtener string");
            }

        },
        error: function(xhr, status){
            //console.log('Error: ',xhr);
            //console.log('Estatus: ',status);
            //div_noty({tipo:'warning', texto:"Falla en comunicación"})
        }
    });
    //console.log("Termina =>", cadena)
    return cadena
}


function validar(){
  let flagPermiso = 0;

  const currenPathName = window.location.pathname;
  const Menu = JSON.parse( sessionStorage.getItem('listaMenu') ); 
  //console.log("Esto es lo que tiene ==>>>",Menu)
  for(var k in Menu) {
    //console.log(`Menu[${k}] => `,Menu[k])
    //console.log("currenPathName =>", currenPathName.search(Menu[k][0]))
    if (currenPathName.search(Menu[k][0]) >0){
      flagPermiso = 1;
      break;
    }
  }
  if (flagPermiso == 0){
    //console.log("=======>>>>>>>>>> Mostrar página no permitida")
    window.location.href = 'login.html'
  }

  return flagPermiso
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
  
    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });
  
    return indexed_array;
  }

CheckSession();
footer();
