var oTable;
var filtroActivo = '1';

function lista(estatus = 1){
  url_ = sessionStorage.pathWs+"/api/Portal/UsuariosCON"
  let params = {}
  if(sessionStorage.Rol == 1){
    params = {"Estatus":estatus}
  }
  else{
    params = {"Estatus":estatus, "Cuenta_Id": sessionStorage.COWBY}
  }
  
  $.ajax({
    url: url_,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(params),
    beforeSend: function(a){
            $('html, body').animate({scrollTop: 0}, 'slow');
         },
    success: function(data){
          let listado_ =[]
          for (row in data.Respuesta){
            if(sessionStorage.Rol != 1 && data.Respuesta[row].Rol_ID == 1){
              continue
            }
            const ID = data.Respuesta[row].Id_Usuario
            const NombreUsuario = data.Respuesta[row].NombreUsuario.trim()
            const Cuenta = data.Respuesta[row].Cuenta.trim()
            const Rol = data.Respuesta[row].Rol.trim()
            const NombreCuenta = data.Respuesta[row].NombreCuenta == null ? 'N/A': data.Respuesta[row].NombreCuenta.trim()
            const Token = data.Respuesta[row].Token == null ? 'N/A': data.Respuesta[row].Token.trim()
            const Estatus = data.Respuesta[row].Estatus == 1 ? 'Activo': 'Inactivo'
            
            const opciones = `<a href='configuracion_edita_usuarios.html?idcf=${ID}' title='Editar' class='fa-stack fa-lg'><i class='fa fa-edit fa-stack-1x'></i></a>`
            listado_.push([ID,NombreUsuario,Cuenta,Rol,NombreCuenta,Token,Estatus, opciones])
            
          }
          muestraTabla(listado_)
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
    lista(1);
  }
  else{
    filtroActivo = "0";
    lista(0);
  }
}


$(document).ready(function() {
  respValida = validar()
  if (respValida){
    lista(1)    
  }  
} );



