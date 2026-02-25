function llenaCombo(idcf,combo,idCampo,descCampo,data){
	if (data.length > 0) {
		$(`#${combo}`).html('')
		$(`#${combo}`).append(`<option value="">Seleccionar</option>`);
		for (row in data) {
			const Id = data[row][idCampo];
			const desc = data[row][descCampo].trim()
			$(`#${combo}`).append(`<option value="${Id}">${desc}</option>`);			
		}
		if (idcf > 0) {
			$(`#${combo}`).val(idcf);
		}				
	}
}

function showLoading(str = "") {
	$('#parrafoLoading').html(""); 
	str = str + `
		<span class="dot">.</span>
		<span class="dot">.</span>
		<span class="dot">.</span>
	`;
	$('#parrafoLoading').html(str); 
	$('.loading-overlay').fadeIn();
}
  
// Ocultar div de cargando
function hideLoading() {
	$('.loading-overlay').fadeOut();
}

//Acciones por pantalla
function getMenuAcciones(Usuario_Id=0, Pantalla=""){
	return new Promise((resolve, reject) => {
		try{
			$.ajax({
				url: pathWs+"/api/General/ObtieneMenuAcciones",
				type: 'POST',
				data:{Id_Usuario: Usuario_Id, Pantalla:Pantalla }, // Your JSON data
				beforeSend: function(a){
		
					 },
				success: function(data){			  			
					  if (data.Table.length > 0){
						resolve(data.Table)				
					  }
					  else{
						resolve(false)
					  }
					 },
				error: function(a,b,c){
					  console.log('Error: '+a+'\n'+b+'\n'+c);
					  div_noty({tipo:'warning', texto:"Falla en comunicación"})
					 },
				complete:function(){
				  //console.log("finally")
				  $("#DivLoading").hide();
				}
			  });
		}
		catch(err){
			reject(err,{})
		}
	});	
}

function htmlFilename(rutaAbsoluta){
	var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
	var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
	return rutaRelativa;  
}