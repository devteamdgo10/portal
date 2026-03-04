function obtiene(idcf){
  const pathservice = sessionStorage.pathWs+"/api/Portal/RolesCON"
  $.ajax({
    url: pathservice,
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    dataType: "json",
    type: 'POST',
    data: JSON.stringify({ Id_Rol: idcf }),
    beforeSend: function(a){
          $('html, body').animate({scrollTop: 0}, 'slow');
          //console.log("Path v2=>",pathservice);
          $("#DivLoading").show()

        },
    success: function(data){
          console.log("Respuesta listado=>",data)
          if (data.Respuesta.length > 0){
            for (row in data.Respuesta){
              document.getElementById("Id_Rol").value = data.Respuesta[row].Id_Rol;
              document.getElementById("Rol").value = data.Respuesta[row].Rol.trim();

              selectElement("Estatus",data.Respuesta[row].Estatus)
              document.getElementById("accion").value = 'act'
            }
          }
          $("#DivLoading").hide()
         },
    complete:function(){
      $("#DivLoading").hide();
    },
    error: function(xhr, status){
          //console.log('Error: ',xhr);
          //console.log('Estatus: ',status);
          div_noty({tipo:'warning', texto:"Falla en comunicación"})
        }
  });

}

  
function processUser(){
  const parameters = location.search.substring(1).split("&");

  const temp = parameters[0].split("=");
  let idcf = unescape(temp[1]);
  if (idcf !='undefined' && idcf > 0){
    obtiene(idcf)
  }
  $("#DivLoading").hide() 
}

$().ready(function(){
  respValida = validar()
  if (respValida){
    processUser();
  }

  $("#formT").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    const form = $(this);
    const accion = document.getElementById("accion").value;
    let tipo =   "POST";
    let url = '';
    let params = form.serializeArray();

    if (accion === 'alt'){
      //tipo =   "POST";
      url = sessionStorage.pathWs+"/api/Portal/RolesALT" //?"+form.serialize();
    }else{
      //tipo =   "PUT";
      url = sessionStorage.pathWs+"/api/Portal/RolesACT" //?"+form.serialize();
    } 

    
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
            //console.log("parameters =>",form.serialize())
          },
          success: function(data)
          {
            if (data.Respuesta > 0){
              const div_resp = {id:"message",tipo:'info',mensaje:"Registro Guardado", btnTexto1:"Regresar", pathBtn1:"configuracion_lista_rol.html", btnTexto2:"Nuevo",pathBtn2:"configuracion_edita_rol.html"}
              divRespuesta(div_resp);
              $( "#saveButton" ).remove();
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

  });/*submit*/
});/* ready */