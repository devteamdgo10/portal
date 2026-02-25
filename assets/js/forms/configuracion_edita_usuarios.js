var Id_Usuario = 0;
let passwordOriginal

function listaPermisos(){ 
  return new Promise((resolve, reject) => {
    try {
      $.ajax({
        url: sessionStorage.pathWs + "/api/MG/CatTipoAccionesCON",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        beforeSend: function(a){
             },
        success: function(data){
              
              let listado_ =[]
              if (data.Respuesta.length > 0){
                for (row in data.Respuesta){
                  const Id_TipoAccion = data.Respuesta[row].Id_TipoAccion
                  const Tipo = data.Respuesta[row].Tipo
                  //const Estatus =  data.Table[row].Activo == 1 ? 'Activo':"Inactivo";
                  opciones = `<div style="text-align: center;"><input type="checkbox"  id="accion_${Id_TipoAccion}" name="accion_${Id_TipoAccion}" Id_TipoAccion="${Id_TipoAccion}" Id_PermisoUsuario="-1" class="minimal chkconfigs" attcheck = ""/></div>`
                              //checkbox = `<div style="text-align: center;"><input type="checkbox"  id="contacto_${Id_Contacto}" name="contacto_${Id_Contacto}" value="${Id_Contacto}" class="minimal chkcontactos" attcheck = ""/></div>`              
                  listado_.push([ Id_TipoAccion,
                                  Tipo,                                                                                        
                                  opciones]);
                }
              }
              muestraTabla(listado_, "example")
              resolve(true)
             },
        error: function(a,b,c){
              console.log('Error: '+a+'\n'+b+'\n'+c);
              div_noty({tipo:'warning', texto:"Falla en comunicación"})
              reject(false)
             },
        complete:function(){
          $("#DivLoading").hide();
        }
      });
      
    } catch (error) {
      console.log(error)
    }
  })        
}

function consultaPermisos() {
  return new Promise((resolve, reject) => {
    try {
      $.ajax({
        url: sessionStorage.pathWs + "/api/MG/PermisosUsuariosCON",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ Usuario_Id: Id_Usuario }), // Your JSON data
        beforeSend: function (a) {
    
          //$("#DivLoading").show();
        },
        success: function (data) {
    
          if (data.Respuesta.length > 0) {
    
            for (row in data.Respuesta) {
              const Id_PermisoUsuario = data.Respuesta[row].Id_PermisoUsuario
              const Accion_Id = data.Respuesta[row].Accion_Id
              const Usuario_Id = data.Respuesta[row].Usuario_Id
              $(`#accion_${Accion_Id}`).prop('checked', true)
              $(`#accion_${Accion_Id}`).attr('Id_PermisoUsuario', Id_PermisoUsuario)
            }
          }
          resolve(true)
        },
        error: function (a, b, c) {
          console.log('Error: ' + a + '\n' + b + '\n' + c);
          div_noty({ tipo: 'warning', texto: "Falla en comunicación" })
        },
        complete: function () {
          //console.log("finally")
          $("#DivLoading").hide();
        }
      });      
    } catch (error) {
      console.log(error)
    }
  })  
}

function genToken(){
  document.getElementById("Token").value = generateToken();
}

function muestraTabla(datos, tabla, busqueda = true) {
  var banTable = 0;

  if (banTable) {
    $(`#${tabla}`).dataTable().fnDestroy();
  }
  banTable = 1;

  if ("es" == $('#lang').val()) {
    records = "Todos";
    processing = "Procesando...";
    length = "Mostrar _MENU_ registros";
    zero = "No se encontraron resultados";
    empty = "Ningún dato disponible en la tabla";
    info = "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ encontrados";
    infoEmpty = "No hay registros";
    filtered = "(filtrado de un total de _MAX_ registros)";
    search = `<i class="fa fa-search" aria-hidden="true" style="margin-right:10px; margin-left:10px;"></i>`;
    load = "Cargando...";
    first = "Primero";
    last = "Último";
    next = "Anterior";
    previous = "Siguiente";
    sortAsc = "Presione para ordenar de forma ascendente";
    sortDesc = "Presione para ordenar de forma descendente";
    all = "Todos";
  } else {
    records = "All";
    processing = "Processing...";
    length = "Show _MENU_ results";
    zero = "There are no records to show";
    empty = "No data available on table";
    info = "Showing records from _START_ to _END_, obtained from a total of _TOTAL_ records";
    infoEmpty = "No records to show";
    filtered = "(filtered from a total of _MAX_ records)";
    search = `<i class="fa fa-search" aria-hidden="true" style="margin-right:10px; margin-left:10px;"></i>`;
    load = "Loading...";
    first = "First";
    last = "Last";
    next = "Next";
    previous = "Previous";
    sortAsc = "Click to sort ascending";
    sortDesc = "Click to sort descending";
    all = "All";
  }
  $(`#${tabla}`).dataTable({
    "dom": '<"pull-left"f><"pull-right"l>tip',
    "aaData": datos,
    "bDestroy": true,
    "aaData": datos,
    "searching": busqueda,
    "paging": false,
    "info": false,

    "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, records]],
    "bProcessing": true,
    "oLanguage": {
      "sProcessing": processing,
      "sLengthMenu": length,
      "sZeroRecords": zero,
      "sEmptyTable": empty,
      "sInfo": info,
      "sInfoEmpty": infoEmpty,
      "sInfoFiltered": filtered,
      "sInfoPostFix": "",
      "sSearch": search,
      "sUrl": "",
      "sInfoThousands": ",",
      "sLoadingRecords": load,
      "oPaginate": {
        "sFirst": first,
        "sLast": last,
        "sNext": next,
        "sPrevious": previous
      },
      "oAria": {
        "sSortAscending": sortAsc,
        "sSortDescending": sortDesc
      }
    },
  });
}

function obtieneRol(idr = 0){  
  const pathservice = sessionStorage.pathWs+"/api/MG/RolesCON"
  $.ajax({
    url: pathservice,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ Estatus: 1 }),
    beforeSend: function(a){
          $("#DivLoading").show()
        },
    success: function(data){
          //console.log("Respuesta edita=>",data)
          $('#Rol_Id').html('')
          if (data.Respuesta.length > 0){
            $('#Rol_Id').append(`<option value="">Seleccionar</option>`);
            for (row in data.Respuesta){
              if(sessionStorage.Rol != 1 && data.Respuesta[row].Id_Rol == 1){
                continue
              }
              $('#Rol_Id').append(`<option value="${data.Respuesta[row].Id_Rol}">${data.Respuesta[row].Rol.trim()}</option>`);            
            }
            if(idr > 0){
              $('#Rol_Id').val(idr)
            }
          }
          $("#DivLoading").hide()

         },
    error: function(xhr, status){
          //console.log('Error: ',xhr);
          //console.log('Estatus: ',status);
          div_noty({tipo:'warning', texto:"Falla en comunicación"})
        },
    complete:function(){
      //console.log("finally")
      $("#DivLoading").hide();
    }
  });

}

function obtieneCuenta(idc = null){  
  $.ajax({
    url:  sessionStorage.pathWs+"/api/MG/CuentasCON",
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({Activo: 1}),
    beforeSend: function(a){
          $("#DivLoading").show()
        },
    success: function(data){
          //console.log("Respuesta edita=>",data)
          $('#Cuenta_Id').html('')
          if (data.Respuesta.length > 0){
            $('#Cuenta_Id').append(`<option value="">Seleccionar</option>`);
            for (row in data.Respuesta){
              if(sessionStorage.Rol != 1 && sessionStorage.COWBY != data.Respuesta[row].Id_Cuenta){
                continue
              }
              $('#Cuenta_Id').append(`<option value="${data.Respuesta[row].Id_Cuenta}">${data.Respuesta[row].NombreCuenta.trim()}</option>`);            
            }
            if(idc > 0){
              $('#Cuenta_Id').val(idc)
            }
            if(sessionStorage.COWBY > 0 && idc == null){
              $('#Cuenta_Id').val(sessionStorage.COWBY)
            }
          }
          $("#DivLoading").hide()

         },
    error: function(xhr, status){
          //console.log('Error: ',xhr);
          //console.log('Estatus: ',status);
          div_noty({tipo:'warning', texto:"Falla en comunicación"})
        },
    complete:function(){
      //console.log("finally")
      $("#DivLoading").hide();
    }
  });

}

function listaUsuarios(id){
  return new Promise((resolve, reject) => {
    try {
      $.ajax({
          url:  sessionStorage.pathWs +"/api/MG/UsuariosCON",
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ Id_Usuario: id }), // Your JSON data
        beforeSend: function(a){

              $("#DivLoading").show();
            },
        success: function(data){
              //console.log("Respuesta listado=>",data)
              if (data.Respuesta.length > 0){                
                  document.getElementById('Id_Usuario').value = data.Respuesta[0].Id_Usuario
                  document.getElementById('NombreUsuario').value = data.Respuesta[0].NombreUsuario
                  document.getElementById('Cuenta').value = data.Respuesta[0].Cuenta
                  document.getElementById('Pwd').value = data.Respuesta[0].Pwd
                  document.getElementById('Pwd2').value = data.Respuesta[0].Pwd
                  passwordOriginal = data.Respuesta[0].Pwd
                  document.getElementById('Token').value = data.Respuesta[0].Token
                  obtieneCuenta(data.Respuesta[0].Cuenta_Id);
                  obtieneRol(data.Respuesta[0].Rol_ID);
                  document.getElementById("accion").value = 'act';
                  if(sessionStorage.Rol != 1){
                    $('#Cuenta_Id').attr('readonly', true);
                    $('#Rol_Id').attr('readonly', true);
                  }
              }
              resolve(true);
            },
        error: function(xhr, status){
              div_noty({tipo:'warning', texto:"Falla en comunicación"})
              reject(false)
            },
      });
    } catch (error) {
      console.log(error)
    }
  })  
}  

async function processUser(){
  const parameters = location.search.substring(1).split("&");
  const temp = parameters[0].split("=");
  Id_Usuario = unescape(temp[1]);    
  await listaPermisos() 
  if (Id_Usuario !='undefined' && Id_Usuario > 0){
    await listaUsuarios(Id_Usuario);  
    await consultaPermisos();                            
  }else{
    obtieneCuenta();
    obtieneRol();
    $("#DivLoading").hide();
  }
    
}

$(document).on('change',"input[type='checkbox']",function () {
  if(Id_Usuario <= 0 || Id_Usuario =='undefined'){
    div_noty({tipo:'warning', texto:"Se debe crear una cuenta, primero complete los campos y guarde"})
    $(this).prop('checked', false)
  }else{
    if($(this).prop('checked')){
      console.log("check = " + $(this).attr('Id_TipoAccion'));
      addPermiso($(this).attr('Id_TipoAccion'))
    }else{
      console.log("uncheck = " + $(this).attr('Id_TipoAccion'));
      deletePermiso($(this).attr('Id_PermisoUsuario'))
    }    
  }  
    
  
});

function deletePermiso(id){
  $.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },

    
    type: "POST",
    url: sessionStorage.pathWs +"/api/MG/PermisosUsuariosDEL",
    data: params =JSON.stringify({
      Id_PermisoUsuario:id
    }),      

    dataType: "json", 
    beforeSend: function(a){    
    },
    success: function(data)
    {
      if(data.Respuesta > 0){
        div_noty({tipo:'success', texto:"Result: "+data.Respuesta +" Configuracion eliminada"});
      }else{
        div_noty({tipo:'warning', texto:"Result: "+data.Respuesta +" El sp se ejecuto de manera anomala"})
      }     
    },
    error: function(xhr, status){
      div_noty({tipo:'warning', texto:"Falla en comunicación"})
    }
  });
}

function addPermiso(idaccion){
  $.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },    
    type: "POST",
    url: sessionStorage.pathWs +"/api/MG/PermisosUsuariosALT",
    data: params =JSON.stringify({
      Accion_Id:idaccion,
      Usuario_Id:Id_Usuario
    }),      

    dataType: "json", 
    beforeSend: function(a){
    
    },
    success: function(data)
    {
        //console.log("Todo Ok =>",data);
        if(data.Respuesta > 0){         
          div_noty({tipo:'success', texto:"Result: "+data.Respuesta +" Configuracion agregada"});
          $(`#accion_${idaccion}`).attr('Id_PermisoUsuario', data.Respuesta)
        }else{
          div_noty({tipo:'warning', texto:"Result: "+data.Respuesta +" El sp se ejecuto de manera anomala"})
        }     
    },
    error: function(xhr, status){
      //console.log('Error: ',xhr);
      //console.log('Estatus: ',status);
      div_noty({tipo:'warning', texto:"Falla en comunicación"})
    }
  });
}

$(document).ready(function(){
  
  respValida = validar()
  if (respValida){
    processUser();
  }
 
  $("#form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    if (document.getElementById("Pwd").value === document.getElementById("Pwd2").value){
      const form = $(this);
      let url = ''
      const accion = document.getElementById("accion").value;
      tipo =   "POST";

      const e = document.getElementById("Pwd").value;
      if (accion === 'alt'){
        //tipo =   "POST";
        url = sessionStorage.pathWs +"/api/MG/UsuariosALT";
        
        document.getElementById("Pwd").value = CryptoJS.MD5(e).toString();
        document.getElementById("Pwd2").value = document.getElementById("Pwd").value;
      }else{
        //tipo =   "PUT";

        if (passwordOriginal != e){
          document.getElementById("Pwd").value = CryptoJS.MD5(e).toString();
          document.getElementById("Pwd2").value = document.getElementById("Pwd").value;
        }

        url = sessionStorage.pathWs +"/Api/MG/UsuariosACT"
      } 
      params = form.serializeArray();  
      
      $.ajax({
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        type: tipo,
        url: url,
        dataType: "json",
        data: JSON.stringify(getArrayData(params)),
        beforeSend: function(a){
            //console.log(data);
        
        },
        success: function(data)
        {
          if (data.Respuesta > 0){
            let div_resp = {}
            Id_Usuario = data.Respuesta;

            if (accion === 'alt'){
              $("#saveButton").hide();
              div_resp = {id:"message",tipo:'info',mensaje:"Uusario Guardado", btnTexto1:"Regresar", pathBtn1:"HappyPortal_lista_usuarios.html", btnTexto2:"Nuevo",pathBtn2:"HappyPortal_edita_usuarios.html"}              
            }else{
              div_resp = {id:"message",tipo:'info',mensaje:"Cambios Guardados", btnTexto1:"Regresar", pathBtn1:"HappyPortal_lista_usuarios.html", btnTexto2:"Nuevo",pathBtn2:"HappyPortal_edita_usuarios.html"}
            }
            divRespuesta(div_resp);
          }
          else{
            div_noty({tipo:'error', texto:"Falla en proceso: "+ data.Respuesta })
          }
        },
        error: function(xhr, status){
          //console.log('Error: ',xhr);
          //console.log('Estatus: ',status);
          div_noty({tipo:'warning', texto:"Falla en comunicación"})
        }
      });
    }else{
      div_noty({tipo:'Atencion', texto:"La contraseña no coincide"})
    }

  });/*submit*/
});/* ready */