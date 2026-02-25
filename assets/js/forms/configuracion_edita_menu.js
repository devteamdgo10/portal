
$(".chkbox").change(function(){
  if(this.checked){
    this.value = 1  
  }else{
    this.value = 0
  }
});

function obtiene(idcf){
  $.ajax({
    url: sessionStorage.pathWs+"/api/MG/MenusCON",
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    dataType: "json",
    type: 'POST',
    data: JSON.stringify({ Id_Menu: idcf }),
    beforeSend: function(a){
          $('html, body').animate({scrollTop: 0}, 'slow');
          //console.log("Path =>",pathservice);
          $("#DivLoading").show();
        },
    success: function(data){
          //console.log("Respuesta listado=>",data)
          if (data.Respuesta.length > 0){
            for (row in data.Respuesta){
              //console.log(`${row}: ${data.Respuesta[row].Id_Empresa} ==>>`, data.Respuesta[row].Id_Empresa,data.Respuesta[row].Empresa.trim(),data.Respuesta[row].Fecha,data.Respuesta[row].Estatus);
              document.getElementById("Id_Menu").value = data.Respuesta[row].Id_Menu;
              document.getElementById("Descripcion").value = data.Respuesta[row].Menu.trim();
              document.getElementById("Archivo").value = data.Respuesta[row].Archivo.trim();
              document.getElementById("Icono").value = data.Respuesta[row].Icono.trim();
              document.getElementById("Visible").value = data.Respuesta[row].Visible;
              selectElement("Estatus",data.Respuesta[row].Estatus)
              document.getElementById("accion").value = 'act'
              if (data.Respuesta[row].Modulo_ID != null ) {
                obtieneModulo(data.Respuesta[row].Modulo_ID)
              }
              if (data.Respuesta[row].Visible ==1 ){
                $('#Visible').prop('checked', true)
                $('#Visible').val('1')
              }
            }
          }

         },
    error: function(xhr, status){
          //console.log('Error: ',xhr);
          //console.log('Estatus: ',status);
          div_noty({tipo:'warning', texto:"Falla en comunicación"})
        },
    complete:function(){
      $("#DivLoading").hide();
    }
  });

}


function obtieneModulo(idcf){
  params = { "Estatus": 1 };
  /*if (idcf>0){
    params['Id_Modulo'] = idcf;
  }*/
  const pathservice = sessionStorage.pathWs+"/api/MG/ModulosCON"
  $.ajax({
    url: pathservice,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(params), 
    beforeSend: function(a){
          $('html, body').animate({scrollTop: 0}, 'slow');
          //console.log("Path =>",pathservice);
          $("#DivLoading").show()
        },
    success: function(data){
          //console.log("Respuesta edita=>",data)
          $('#Modulo_ID').html('')
          if (data.Respuesta.length > 0){
            $('#Modulo_ID').append(`<option value="">Seleccionar</option>`);
            for (row in data.Respuesta){
               if (data.Respuesta[row].Estatus == 1){
                $('#Modulo_ID').append(`<option value="${data.Respuesta[row].Id_Modulo}">${data.Respuesta[row].Modulo.trim()}</option>`);
              }
              if (idcf > 0 ){
                $('#Modulo_ID').val(idcf)
              }
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
  
function processUser(){
  const parameters = location.search.substring(1).split("&");

  const temp = parameters[0].split("=");
  let idcf = unescape(temp[1]);
  if (idcf !='undefined' && idcf > 0){
    //console.log(temp, " datos: ",idcf)
    obtiene(idcf)
    //ObtieneVariable()
  }else{
    obtieneModulo()
  }
  
  //temp = parameters[1].split("=");
  //p = unescape(temp[1]);
  //document.getElementById("log").innerHTML = l;
  
}


$().ready(function(){
  $("#DivLoading").show();
  respValida = validar()
  if (respValida){
    processUser();
  }

  $("#form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    const form = $(this);
    const accion = document.getElementById("accion").value;
    let tipo =   "POST";
    let url = '';
    let params = form.serializeArray();

    if (accion === 'alt'){
      
      url = sessionStorage.pathWs+"/api/MG/MenusALT"; //?"+form.serialize();
    }else{
      url = sessionStorage.pathWs+"/api/MG/MenusACT"; //?"+form.serialize();
    } 

    var VisibleObj = params.find(function(item){
      return item.name === "Visible"
    })
    if (VisibleObj) {
      console.log("Visible" + $("#Visible").val());
    } else {
      params.push({'name':'Visible', 'value':$("#Visible").val()});
    }
  
    console.log("Accion:", accion, tipo, url);
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
            $('html, body').animate({scrollTop: 0}, 'slow');
            $("#DivLoading").show();
          },
          success: function(data)
          {
            if (data.Respuesta > 0){
              const div_resp = {id:"message",tipo:'info',mensaje:"Registro Guardado", btnTexto1:"Regresar", pathBtn1:"configuracion_lista_menu.html", btnTexto2:"Nuevo",pathBtn2:"configuracion_edita_menu.html"}
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
          },
          complete:function(){
            //console.log("finally")
            $("#DivLoading").hide();
          }
        });

  });/*submit*/
});/* ready */