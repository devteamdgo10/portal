var oTable;


function lista(path){
  url_ = path+"/api/MG/RolMenuCON"
  $.ajax({
    url: url_,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    beforeSend: function(a){
           $('html, body').animate({scrollTop: 0}, 'slow');
           //console.log("Path: ",url_)
           $("#DivLoading").show();
         },
    success: function(data){
          
          let listado_ =[]
          if (data.Respuesta.length > 0){
            for (row in data.Respuesta){
              //console.log("Row: ",row.Id_Empresa, '<=>',row.Empresa)
              //console.log(`${row}: ${data.Respuesta[row].Id_Empresa} ==>>`, data.Respuesta[row].Id_Empresa,data.Respuesta[row].Empresa.trim(),data.Respuesta[row].Fecha,data.Respuesta[row].Estatus);
              const Id_Relacion = data.Respuesta[row].Id_Relacion
              const Rol_ID = data.Respuesta[row].Rol_ID
              const Rol = data.Respuesta[row].Rol.trim()
              const Modulo = data.Respuesta[row].Modulo.trim()
              const Menu = data.Respuesta[row].Menu.trim()
              //const Estatus =  data.Respuesta[row].Estatus == 1 ? 'Activo':"Inactivo";
              //const FlagInmediato =  data.Respuesta[row].FlagInmediato == 1 ? 'Activo':"Inactivo";
              opciones = `<a href='configuracion_edita_rolMenu.html?idcf=${Rol_ID}' title='Editar' class='fa-stack fa-lg'><i class='fa fa-edit fa-stack-1x'></i></a>
                             <a title='Eliminar' href='#' onclick='EliminarRelacion(${Id_Relacion},\"${Menu}: ${Id_Relacion}\")' class='fa-stack fa-lg'><i class='fa fa-trash-o fa-stack-1x'></i></a>`;


              listado_.push([Id_Relacion,Rol, Modulo, Menu,  opciones]);
            }
            //console.log("Resultados =>",listado_empresas);
            muestraTabla(listado_)
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


function muestraTabla(datos){
  var banTable = 0;
            
  if (banTable){
    $("#example").dataTable().fnDestroy();
  }
  banTable = 1;
  //$.fn.dataTable.TableTools.defaults.aButtons = [ "xls","pdf" ];//[ "copy", "csv", "xls","pdf" ];
  if("es" == $('#lang').val()){
    records = "Todos";
    processing = "Procesando...";
    length = "Mostrar _MENU_ registros";
    zero = "No se encontraron resultados";
    empty = "Ningún dato disponible en la tabla";
    info = "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ encontrados";
    infoEmpty = "No hay registros";
    filtered = "(filtrado de un total de _MAX_ registros)";
    search = "Buscar:";
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
  var oTable = $('#example').dataTable( {
                                /*"sAjaxSource": "model/json-entidades.php", //+datos
                                "sAjaxDataProp": "Table",
                                "aoColumns": [
                                  { "mData": "Id_Empresa" },
                                  { "mData": "Empresa" },
                                  { "mData": "Estatus" },
                                  { "mData": "Fecha" }

                                ],*/
                                "aaData": datos,
                                "bDestroy": true,
                                
                                "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, records]],
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
  /*
  var oTableTools = new TableTools( oTable, {
    "sSwfPath": "assets/plugins/datatables/media/swf/copy_csv_xls_pdf.swf",
    "aButtons": [//"copy",
          //"csv",
          "xls","pdf"]
        } );
  $('#demo').before( oTableTools.dom.container );*/
  $('.DTTT_button_xls').addClass('btn-alt');
  $('.DTTT_button_pdf').addClass('btn-alt');

}

function EliminarRelacion(id,nombre){
  if (confirm('Eliminar ' + nombre+'  ?')) {
    let url =`${sessionStorage.pathWs}/api/MG/RolMenuDEL`;

      $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({'Id_Relacion':id}),
        beforeSend: function(a){
              $("#DivLoading").show();
            },
        success: function(data){
              $("#p_"+id).removeAttr("rel")
                div_noty({tipo:'success', texto:"Permiso eliminado"})
                lista(sessionStorage.pathWs)
            },
        complete:function(){
          $("#DivLoading").hide();
        },
        error: function(xhr, status){
              console.log('Error: ',xhr);
              //console.log('Estatus: ',status);
              div_noty({tipo:'warning', texto:"Falla en comunicación"})
            }
      });
  }

}

$(document).ready(function() {

  respValida = validar()
  if (respValida){
    lista(sessionStorage.pathWs)
  }

} );



