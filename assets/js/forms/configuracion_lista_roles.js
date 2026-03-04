var oTable;
var filtroActivo = '1';

function lista(path, estatus = 1){

  $.ajax({
    url: path+"/api/Portal/RolesCON",
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({"Estatus": estatus}),
    beforeSend: function(a){
           $('html, body').animate({scrollTop: 0}, 'slow');
           $("#DivLoading").show()
         },
    success: function(data){
          
          let listado =[]
          if (data.Respuesta.length > 0){
            
            for (row in data.Respuesta){
             
              opciones = `<a href='configuracion_edita_rol.html?idcf=${data.Respuesta[row].Id_Rol}' title='Editar' class='fa-stack fa-lg'><i class='fa fa-edit fa-stack-1x'></i></a>`;        
              Estatus = data.Respuesta[row].Estatus == 1 ? 'Activo':"Inactivo";

              listado.push([data.Respuesta[row].Id_Rol,data.Respuesta[row].Rol.trim(),
                Estatus, opciones]);
            }
            //console.log("Resultados =>",listado_empresas);
            
          }
          $("#DivLoading").hide()
          muestraTabla(listado)

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
  $('.DTTT_button_xls').addClass('btn-alt');
  $('.DTTT_button_pdf').addClass('btn-alt');
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

$(document).ready(function() {
  respValida = validar()

  if (respValida){
    lista(sessionStorage.pathWs)
  }

} );
