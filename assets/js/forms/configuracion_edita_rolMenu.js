
function muestraTabla(IdTabla,datos){
  var banTable = 0;
            
  if (banTable){
    if ($.fn.DataTable.isDataTable('#example')) { $('#example').DataTable().destroy(); }
  }
  banTable = 1;
  if("es" == $('#lang').val()){
    records = "Todos";
    processing = "Procesando...";
    length = "Mostrar _MENU_ registros";
    zero = "No se encontraron resultados";
    empty = "NingÃºn dato disponible en la tabla";
    info = "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ encontrados";
    infoEmpty = "No hay registros";
    filtered = "(filtrado de un total de _MAX_ registros)";
    search = "Buscar:";
    load = "Cargando...";
    first = "Primero";
    last = "Ãšltimo";
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
    search = "Search:";
    load = "Loading...";
    first = "First";
    last = "Last";
    next = "Next";
    previous = "Previous";
    sortAsc = "Click to sort ascending";
    sortDesc = "Click to sort descending";
    all = "All";
  }
  var oTable = $('#'+IdTabla).DataTable({
                                "aaData": datos,
                                "bDestroy": true,
                                "aLengthMenu": [[-1], [records]],
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
  //$('.dataTables_filter input').addClass('form-control').attr('placeholder', 'Search...');
  $('.dataTables_length select').addClass('form-control');
  $('.DTTT_button_xls').addClass('btn-alt');
  $('.DTTT_button_pdf').addClass('btn-alt');
}

function Ver(id){
  if($("#p_"+id).prop('checked')) {
        altaRolMenu($("#p_"+id).val())        
    } else {
      let url =`${sessionStorage.pathWs}/api/Portal/RolMenuDEL`;
      params = {'Id_Relacion':$("#p_"+id).attr("rel")} 
      $.ajax({
        url: url,
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        dataType: "json",
        type: 'POST',
        data: JSON.stringify(params),
        beforeSend: function(a){
              $("#DivLoading").show();
            },
        success: function(data){
          if (data.Respuesta[0].Id_Relacion > 0){
            $("#p_"+id).removeAttr("rel")
            div_noty({tipo:'success', texto:"Permiso eliminado"})
          }else{
            div_noty({tipo:'warning', texto:"Error al elimnar permiso"})
          }
            },
        complete:function(){
          $("#DivLoading").hide();
        },
        error: function(xhr, status){
              console.log('Error: ',xhr);
              //console.log('Estatus: ',status);
              div_noty({tipo:'warning', texto:"Falla en comunicaciÃ³n"})
            }
      });
    }

}

function obtieneRolMenu(id){
  const pathservice = sessionStorage.pathWs+"/api/Portal/RolMenuCON"
  $.ajax({
    url: pathservice,
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    dataType: "json",
    type: 'POST',
    data: JSON.stringify({ Rol_ID: id }),
    beforeSend: function(a){
          $('html, body').animate({scrollTop: 0}, 'slow');
          //console.log("Path =>",pathservice);
          $("#DivLoading").show();
        },
    success: function(data){
          //console.log("Respuesta listado=>",data)
          if (data.Respuesta.length > 0){
            for (row in data.Respuesta){
                $('#p_'+data.Respuesta[row].Menu_ID).prop('checked', true).attr("rel",data.Respuesta[row].Id_Relacion ) //.attr("onclick",`Ver(${Id_Relacion})`);
            }
            $("#Rol_ID").val(id);
          }

         },
    complete:function(){
      $("#DivLoading").hide();
    },
    error: function(xhr, status){
          //console.log('Error: ',xhr);
          //console.log('Estatus: ',status);
          div_noty({tipo:'warning', texto:"Falla en comunicaciÃ³n"})
        }
  });

}

function obtieneRol(idcf){
  const pathservice = sessionStorage.pathWs+"/api/Portal/RolesCON"
  $.ajax({
    url: pathservice,
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    dataType: "json",
    type: 'POST',
    data: JSON.stringify({}),
    beforeSend: function(a){
          $('html, body').animate({scrollTop: 0}, 'slow');
          //console.log("Path =>",pathservice);
          $("#DivLoading").show();
        },
    success: function(data){
          console.log("Respuesta listado=>", data.Respuesta.length) //data)
          $('#Rol_ID').html('')
          $('#Rol_ID').append(`<option value="">Seleccionar</option>`);
          if (data.Respuesta.length > 0){
            console.log("Dentro del for")

            for (row in data.Respuesta){
              const Id_Rol = data.Respuesta[row].Id_Rol
              const Rol = data.Respuesta[row].Rol.trim()
              if (1 == data.Respuesta[row].Estatus){
                $('#Rol_ID').append(`<option value="${Id_Rol}">${Rol}</option>`);
              }
            }
            if(idcf>0){
              console.log("obtieneRol Seleccionar rol =>",idcf)
              $('#Rol_ID').val(idcf).trigger('change'); 
            }
          }
         },
    complete:function(){
      $("#DivLoading").hide();
    },
    error: function(xhr, status){
          div_noty({tipo:'warning', texto:"Falla en comunicaciÃ³n"})
        }
  });

}

function altaRolMenu(IdMenu){
  const Rol_ID = document.getElementById("Rol_ID").value;
  let url =`${sessionStorage.pathWs}/api/Portal/RolMenuALT`; 
      
  params = {'Rol_ID':Rol_ID, 'Menu_ID':IdMenu}


  $.ajax({
    url: url,
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    dataType: "json",
    type: 'POST',
    data: JSON.stringify(params),
    beforeSend: function(a){
          $("#DivLoading").show();
        },
    success: function(data){

          if (data.Respuesta > 0){
            div_noty({tipo:'success', texto:"Permiso Agregado"})
            $("#p_"+IdMenu).attr("rel", data.Respuesta)
          }else{
            div_noty({tipo:'warning', texto:"Error al registrar permiso"})
          }

        },
    complete:function(){
      $("#DivLoading").hide();
    },
    error: function(xhr, status){
          console.log('Error: ',xhr);
          div_noty({tipo:'warning', texto:"Falla en comunicaciÃ³n"})
        }
  });
}

function obtieneMenu(){
  $.ajax({
    async:false,
    url: sessionStorage.pathWs+"/api/Portal/MenusCON",
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    dataType: "json",
    type: 'POST',
    data: JSON.stringify({}),
    beforeSend: function(a){
           $('html, body').animate({scrollTop: 0}, 'slow');
           $("#DivLoading").show();
         },
    success: function(data){
          
          let listado_menu =[]
          if (data.Respuesta.length > 0){
            for (row in data.Respuesta){
              checkbox = `<input type="checkbox" id="p_${data.Respuesta[row].Id_Menu}" name="p_${data.Respuesta[row].Id_Menu}" value="${data.Respuesta[row].Id_Menu}" class="minimal" onclick="Ver(${data.Respuesta[row].Id_Menu})" attcheck = ""/>`
              Estatus = data.Respuesta[row].Estatus == 1 ? 'Activo':"Inactivo";
              listado_menu.push([data.Respuesta[row].Id_Menu,data.Respuesta[row].Modulo.trim(), data.Respuesta[row].Menu.trim(),checkbox]);
            }
          }
          muestraTabla('example',listado_menu)
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
    obtieneRol(idcf)
  }else{
    obtieneRol()
  }
  
}


$(document).ready(function(){
  $("#TablaMenu").hide();

  respValida = validar()
  console.log("respValida =>",respValida)
   processUser();
  

  $("#Rol_ID").change('change',function(){
    console.log("Hay cambio =",$(this).val());
    if (0 != $(this).val()){
      obtieneMenu()
      obtieneRolMenu($(this).val());
      $("#TablaMenu").show();
    }else{
      $("#TablaMenu").hide();
    }
    
  })

});/* ready */