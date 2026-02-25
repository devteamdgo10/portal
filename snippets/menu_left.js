$().ready(function(){

  //listModulos = []
  listaMenu = []

  function ConstruyeMenu() {
    const Token = sessionStorage.getItem('_TOKEN')
    const timestamp = new Date() / 1000 | 0;
    

    if (Token){
        //console.log("Existe token: ")
        $.ajax({ 
            async : false,
            data: {Token: Token , Key: timestamp, Visible: 1}, 
            type: 'POST', 
            //crossDomain: true,
            dataType: "json", 
            url: `${pathWs}/api/General/ObtieneMenu`, 
            beforeSend: function(a){
              $("#DivLoading").show();
              //console.log("Params =>",{Token: Token , Key: timestamp});
              sessionStorage.setItem('listaMenu',0)
            },
            success: function (data) { 
                //console.log("Datos de menú:", data)
                if (data.Table.length <= 0){
                    window.location="index.html";
                }else{
                  const DatosMenu = data['Table']
                  let IdModulo = 0
                  let pv = 1 
                  strHtml = ""
                  for(var k in DatosMenu) {
                    if (pv){
                      pv = 0
                      IdModulo = DatosMenu[k].Id_Modulo
                      strHtml += `<li id="Mod_${IdModulo}" class="treeview">
                                  <a href="#">
                                    <i class="${DatosMenu[k].IconoModulo}"></i> 
                                    <span>${DatosMenu[k].Modulo}</span>
                                    <span class="pull-right-container">
                                      <i class="fa fa-angle-left pull-right"></i>
                                    </span>
                                  </a>
                                  <ul class="treeview-menu">`
                    }

                    if (DatosMenu[k].Id_Modulo == IdModulo){
                      //console.log("DatosMenu[k].IconoModulo=>",DatosMenu[k].IconoModulo)
                    }else{
                      strHtml += `</ul></li>` //<!-- Cierre treeview -->`
                      IdModulo = DatosMenu[k].Id_Modulo
                      strHtml += `<li id="Mod_${IdModulo}" class="treeview">
                                  <a href="#">
                                    <i class="${DatosMenu[k].IconoModulo}"></i> <span>${DatosMenu[k].Modulo}</span>
                                    <span class="pull-right-container">
                                      <i class="fa fa-angle-left pull-right"></i>
                                    </span>
                                  </a>
                                  <ul class="treeview-menu">`
                    }

                    strHtml += `<li id="${DatosMenu[k].Archivo.substr(0, DatosMenu[k].Archivo.length-5)}" parent=${IdModulo}><a href="${DatosMenu[k].Archivo}"><i class="${DatosMenu[k].IconoArchivo}"></i> <span>${DatosMenu[k].Descripcion}</span></a></li>`
                    listaMenu.push([DatosMenu[k].Archivo, DatosMenu[k].IconoArchivo, DatosMenu[k].Descripcion])
                  }
                  if (strHtml.substr(strHtml.length-5, strHtml.length-4) != '</li>' ){
                    strHtml += `</ul></li>` //<!-- Cierre treeview -->`  
                  }
                  sessionStorage.setItem('listaMenu', JSON.stringify(listaMenu));
                  sessionStorage.setItem('Rol', DatosMenu[k].Id_Rol);
                  document.getElementById('menu_left').innerHTML =strHtml
                }
            }, 
            error: function (data) {  
                console.log("Error =>", data);
            }
        });

    }else{
        //console.log("Redirección")
        window.location="index.html";
    }
  }

  ConstruyeMenu()
/*
    document.getElementById('menu_leftw').innerHTML =  
      `<li class="header">Menú</li>
        <li <!--class="active"-->><a href="d001_dashboard.html"><i class="fa fa-map-o"></i> <span>Dashboard</span></a></li>
        <!-- Administración Drive Raiz y petición para generar carpetas drive y acceso-->
        <li class="treeview">
          <a href="#">
            <i class="fa fa-cloud"></i> <span>Drive Raíz</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="d011_lista_raizdrive.html"><i class="fa fa-cloud-upload"></i> <span>Raiz Drive</span></a></li>
          </ul>
        </li>
        
        <!-- Administración Empresas, sistemas, módulos y Acceso -->
        <li class="treeview">
          <a href="#">
            <i class="fa fa-circle-o"></i> <span>Empresas, Sistemas y Mod</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="e008_lista_empresas.html"><i class="fa fa-industry"></i> <span>Empresas</span></a></li>
            <li><a href="s002_lista_sistemas.html"><i class="fa fa-wrench"></i> <span>Sistemas</span></a></li>
            <li><a href="m001_lista_modulos.html"><i class="fa fa-cubes"></i> <span>Módulos</span></a></li>
            <li><a href="a001_lista_accesoDrive.html"><i class="fa fa-folder-open-o"></i> <span>Acceso</span></a></li>
          </ul>
        </li>

        <!-- Menú para PROXIES-->
        <!--li class="treeview">
          <a href="#">
            <i class="fa fa-sitemap"></i> <span>Proxies</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="p011_lista_proxies.html"><i class="fa  fa-shield"></i> <span>Proxies</span></a></li>
          </ul>
          <ul class="treeview-menu">
            <li><a href="p011_lista_EmpresaProxies.html"><i class="fa fa-plug"></i> <span>Empresa-Proxies</span></a></li>
          </ul>
        </li-->

        <!-- Menú para CORREOS-->
        <li class="treeview">
          <a href="#">
            <i class="fa fa-envelope"></i> <span>Correos</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="c011_lista_correos.html"><i class="fa fa-envelope-o"></i> <span>Correos</span></a></li>
          </ul>
          <ul class="treeview-menu">
            <li><a href="p011_lista_CorreoPermisos.html"><i class="fa fa-envelope-square"></i> <span>Permisos-Correo</span></a></li>
          </ul>
        </li>
        <li><a href="e001_lista_servicios.html"><i class="fa  fa-server"></i> <span>Servicios</span></a></li>
        <li><a href="e001_lista_proveedores.html"><i class="fa  fa-truck"></i> <span>Proveedores</span></a></li>


        <!--li><a href="e008_lista_empresas.html"><i class="fa fa-industry"></i> <span>Empresas</span></a></li-->
        <li><a href="e001_lista_apis.html"><i class="fa fa-key"></i> <span>Apis</span></a></li>

        <li><a href="c001_lista_clientes.html"><i class="fa fa-user"></i> <span>Clientes</span></a></li>
        <li><a href="p001_lista_permisos.html"><i class="fa fa-lock"></i> <span>Permisos</span></a></li>
        <li><a href="b001_lista_stsbusqueda.html"><i class="fa fa-binoculars"></i> <span>Cat.Estatus Búsqueda</span></a></li>
        <li><a href="s001_lista_stssolicitud.html"><i class="fa fa-list-alt"></i> <span>Cat.Estatus Solicitud</span></a></li>
        <li><a href="e002_lista_endpoints.html"><i class="fa fa-external-link"></i> <span>Endpoints</span></a></li>
        <!--li class="treeview">
          <a href="#">
            <i class="fa fa-table"></i> <span>Tables</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="tables/simple.html"><i class="fa fa-circle-o"></i> Simple tables</a></li>
            <li><a href="tables/data.html"><i class="fa fa-circle-o"></i> Data tables</a></li>
          </ul>
        </li>
        <li>
          <a href="calendar.html">
            <i class="fa fa-calendar"></i> <span>Calendar</span>
            <span class="pull-right-container">
              <small class="label pull-right bg-red">3</small>
              <small class="label pull-right bg-blue">17</small>
            </span>
          </a>
        </li>
        <li>
          <a href="mailbox/mailbox.html">
            <i class="fa fa-envelope"></i> <span>Mailbox</span>
            <span class="pull-right-container">
              <small class="label pull-right bg-yellow">12</small>
              <small class="label pull-right bg-green">16</small>
              <small class="label pull-right bg-red">5</small>
            </span>
          </a>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-folder"></i> <span>Examples</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="examples/invoice.html"><i class="fa fa-circle-o"></i> Invoice</a></li>
            <li><a href="examples/profile.html"><i class="fa fa-circle-o"></i> Profile</a></li>
            <li><a href="examples/login.html"><i class="fa fa-circle-o"></i> Login</a></li>
            <li><a href="examples/register.html"><i class="fa fa-circle-o"></i> Register</a></li>
            <li><a href="examples/lockscreen.html"><i class="fa fa-circle-o"></i> Lockscreen</a></li>
            <li><a href="examples/404.html"><i class="fa fa-circle-o"></i> 404 Error</a></li>
            <li><a href="examples/500.html"><i class="fa fa-circle-o"></i> 500 Error</a></li>
            <li><a href="examples/blank.html"><i class="fa fa-circle-o"></i> Blank Page</a></li>
            <li><a href="examples/pace.html"><i class="fa fa-circle-o"></i> Pace Page</a></li>
          </ul>
        </li-->

        <li><a href="b001_lista_callback.html"><i class="fa fa-history"></i> <span>Callback</span></a></li>
        <li><a href="m001_lista_metodos.html"><i class="fa fa-compass"></i> <span>Métodos</span></a></li>
        <li><a href="v001_lista_variables.html"><i class="fa fa-wrench"></i> <span>Variables</span></a></li>
        <li><a href="p001_lista_parametros.html"><i class="fa fa-cubes"></i> <span>Parámetros</span></a></li>
        <li><a href="v002_lista_validarUrl.html"><i class="fa fa-tripadvisor"></i> <span>ValidarURL</span></a></li>
        <li><a href="t001_lista_telAlarma.html"><i class="fa fa-whatsapp"></i> <span>Teléfonos Alarma </span></a></li>
        <li><a href="u001_lista_usuarios.html"><i class="fa fa-users"></i> <span>Usuarios Sistema</span></a></li>
        `;
*/
});