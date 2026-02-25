
function ObtineModulo(params){
  $.ajax({
    url: sessionStorage.pathWs+"/api/MG/ModulosCON",
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    dataType: "json",
    type: 'POST',
    data: JSON.stringify(params),
    beforeSend: function(a){
           $('html, body').animate({scrollTop: 0}, 'slow');
           $("#DivLoading").show();
         },
    success: function(data){
          //console.log("Modulo =>",data) //.Respuesta[row])
          if (data.Respuesta.length > 0){
            for (row in data.Respuesta){
              document.getElementById('Id_Modulo').value = data.Respuesta[row].Id_Modulo
              document.getElementById('Modulo').value = data.Respuesta[row].Modulo
              selectElement("Estatus",data.Respuesta[row].Estatus)
              document.getElementById("accion").value = 'act'
            }
          }
         },
    complete:function(){
      $("#DivLoading").hide();
    },
    error: function(a,b,c){
          console.log('Error: '+a+'\n'+b+'\n'+c);
          div_noty({tipo:'warning', texto:c})
         }
  });


}

function processUser(){
  const parameters = location.search.substring(1).split("&");

  const temp = parameters[0].split("=");
  let idcf = unescape(temp[1]);
  if (idcf !='undefined' && idcf > 0){
    //console.log(temp, " datos: ",idcf)
    //obtienesistemas(idcf)
    ObtineModulo({ 'Id_Modulo': idcf })
    
  }else{
    $("#DivLoading").hide();
  }
   
}

$().ready(function(){
  respValida = validar()
  if (respValida){
    processUser();
  }
  

  $("#form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    const form = $(this);
    let tipo =   "POST";
    let url = ''
    const accion = document.getElementById("accion").value;
    
    if (accion === 'alt'){
      
      url = sessionStorage.pathWs+"/api/MG/ModulosALT"
    }else{
      url = sessionStorage.pathWs+"/api/MG/ModulosACT"
    
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
            $('html, body').animate({scrollTop: 0}, 'slow');
            //console.log("Modulo parameters =>",params)
            $("#saveButton").html("Espere...").addClass("disabled")
            $("#DivLoading").show();
          },
          success: function(data)
          {
             //console.log("Todo Ok =>",data);
             if (data.Respuesta > 0){
              const div_resp = {id:"message",tipo:'info',mensaje:"Registro Guardado", btnTexto1:"Regresar", pathBtn1:"configuracion_lista_modulos.html", btnTexto2:"Nuevo",pathBtn2:"configuracion_edita_modulos.html"}
              divRespuesta(div_resp);
              $( "#saveButton" ).remove();
             }
             else{
              div_noty({tipo:'error', texto:"Falla en proceso: "+ data.Respuesta })
             }
            
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

  });/*submit*/

  
});/* ready */