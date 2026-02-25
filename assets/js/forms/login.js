function mensaje_resp(tipo, msg) {
    $("#message").html(`<div class="alert alert-${tipo}"><a href="#" class="close" data-dismiss="alert">&times;</a><strong> ${msg}</strong></div>`);
}

function direccion(datos){
    sessionStorage.setItem("_TOKEN", datos.Table1[0].Token);
    sessionStorage.setItem("Nombre", datos.Table2[0].Nombre);
    sessionStorage.setItem("RolStr", e.Table2[0].Rol);

    window.location="main.html"
}

function generateToken(n) {
    var chars = '#@abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
    var token = '';
    for(var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

$(function () { 

	sessionStorage.removeItem("_TOKEN");
	sessionStorage.clear();
	$("#nombreu, #contrasenia").keypress(function (e) { 
		if (e.which == 13) { $("#loginButton").trigger("click"); 
		} 
	}); 
	$('#loginButton').click(function () { 
		if ($("#nombreu").val().trim() ==='' || $("#contrasenia").val().trim() ==='') {
			mensaje_resp("warning",'Error datos incorrectos')

			return
		}
		$("#Token").val(generateToken(40));

		const Password = document.getElementById("contrasenia").value;
		var passhash = CryptoJS.MD5(Password).toString();
		document.getElementById("contrasenia").value = passhash;

		let formData = $("#box-login").serialize(); 
		

		if('en' == $("#lang").val()){ 
			$("#loginButton").html('<i class="fa fa-clock-o"></i> Loading...'); 
		} else { 
			$("#loginButton").html('<i class="fa fa-clock-o"></i> Cargando...'); 
		}
		const timestamp = new Date() / 1000 | 0; 

		formData +=`&Expira=${timestamp+TimeOutMain}`;
		$.ajax({ 
			data: formData, 
			type: 'get', 
			dataType: "json", 
			url: `${pathWs}/api/General/GetApiUsuarioLogin`, 
		    beforeSend: function(a){
	          
	        },
			success: function (data) { 
				if (data.Table[0].Token == 0){
					$("#box-login").trigger("reset");
					mensaje_resp("danger",'Error con las credenciales');
				}else{
					mensaje_resp("success",'Usuario registrado');
					direccion(data);
				}
				
				$('html, body').animate({scrollTop: 0}, 'slow'); 
				 
				$("#loginButton").html('Entrar'); 
				
			}, 
			error: function (data) {  
				console.log("Error =>", data);
			}
		});

	}); 
 
});
