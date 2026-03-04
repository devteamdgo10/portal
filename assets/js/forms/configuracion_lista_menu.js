var oTable;
var filtroActivo = '1';

function lista(path, estatus = 1){

  $.ajax({
    url: path+"/api/Portal/MenusCON",
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({"Estatus": estatus}),
    beforeSend: function(a){
           $('html, body').animate({scrollTop: 0}, 'slow');
           $("#DivLoading").show();
         },
    success: function(data){
          
          let listado_sistemas =[]
          if (data.Respuesta.length > 0){
            for (row in data.Respuesta){
              opciones = `<a href='configuracion_edita_menu.html?idcf=${data.Respuesta[row].Id_Menu}' title='Editar' class='fa-stack fa-lg'><i class='fa fa-edit fa-stack-1x'></i></a>
                          <a title='Eliminar' href='#' onclick='Eliminar(${data.Respuesta[row].Id_Menu},\"${data.Respuesta[row].Id_Menu+' ' +data.Respuesta[row].Menu}\")' class='fa-stack fa-lg fa fa-trash-o'></a>`;
              Estatus = data.Respuesta[row].Estatus == 1 ? 'Activo':"Inactivo";
              listado_sistemas.push([ data.Respuesta[row].Id_Menu,
                                      data.Respuesta[row].Modulo.trim(), 
                                      data.Respuesta[row].Menu.trim(),
                                      data.Respuesta[row].Archivo.trim(),
                                      data.Respuesta[row].Icono.trim(), 
                                      data.Respuesta[row].Visible, 
                                      Estatus, opciones]);
            }
          }
          //console.log("Resultados =>",listado_empresas);
          muestraTabla(listado_sistemas)
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
    if ($.fn.DataTable.isDataTable('#example')) { $('#example').DataTable().destroy(); }
  }
  banTable = 1;
  //$.fn.dataTable.TableTools.defaults.aButtons = [ "xls","pdf" ];//[ "copy", "csv", "xls","pdf" ];
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
  var oTable = $('#example').DataTable({
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

  $('.dataTables_length select').addClass('form-control');
  $('#example_filter').append(`
  &emsp;
  <label class="control-label">Estatus:    
        <select name="Activo" class="form-control" id="filtroActivo" onchange="filtrarLista()">
            <option value="1" selected>Activo
            </option>
            <option value="0" >Inactivo
            </option>
        </select>   
    </label>                
  `);
  $('#filtroActivo').val(filtroActivo);      
}

function filtrarLista(){
  if($('#filtroActivo').val() === "1"){
    filtroActivo = "1";
    lista(sessionStorage.pathWs, 1);
  }
  else{
    filtroActivo = "0";
    lista(sessionStorage.pathWs, 0);
  }
}

function Eliminar(id,nombre){
  if (confirm('Eliminar ' + nombre+'  ?')) {
    $.ajax({
      url: sessionStorage.pathWs + "/api/Portal/MenusDEL",
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ Id_Menu: id}),
      beforeSend: function(a){
          },
      success: function (data) {   
        if(data.Respuesta > 0){
          div_noty({tipo:'success', texto:"Registro eliminado" + data.Respuesta})
          lista(sessionStorage.pathWs, 1)
        }else{
          div_noty({tipo:'warning', texto:"Error al eliminar" + data})
        }
        
      },
      error: function(a,b,c){
        console.log('Error: '+a+'\n'+b+'\n'+c);
        div_noty({tipo:'error', texto:c})
       }
    });
  }

}

$(document).ready(function() {

  respValida = validar()
  if (respValida){
    lista(sessionStorage.pathWs)
    console.log(sessionStorage.pathWs)
  }

} );



