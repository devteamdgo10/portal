$().ready(function(){
    document.getElementById('menu_user').innerHTML =  
      `<!-- Menu Toggle Button -->
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <!-- The user image in the navbar-->
            <img src="dist/img/user.png" class="user-image" alt="User Image">
            <!-- hidden-xs hides the username on small devices so only the image appears. -->
            <span class="hidden-xs">${sessionStorage.getItem("Nombre")}</span>
          </a>
          <ul class="dropdown-menu">
            <!-- The user image in the menu -->
            <li class="user-header">
              <img src="dist/img/user.png" class="img-circle" alt="User Image">

              <p>
                <!--Alexander Pierce - Web Developer -->
                ${sessionStorage.getItem("Nombre")} - ${sessionStorage.getItem("RolStr")}
              </p>
            </li>

            <!-- Menu Footer-->
            <li class="user-footer">
              <!--div class="pull-left">
                <a href="#" class="btn btn-default btn-flat">Profile</a>
              </div-->
              <div class="pull-right">
                <a href="#" class="btn btn-default btn-flat" id="closeSession">Sign out</a>
              </div>
            </li>
          </ul>
          
        `;

        $("#closeSession").on('click', function(){
          let Token = sessionStorage.getItem("_TOKEN")
          let Parametros = JSON.stringify({"Token": Token})
          $.ajax({ 
            type: 'POST', 
            //crossDomain: true,
            //dataType: "json", 
            contentType: 'application/json',
            Params : Parametros,
            url: `${sessionStorage.pathWs}/api/Portal/SesionesDEL`, 
            beforeSend: function(a){
              console.log("Params =>",sessionStorage.getItem("_TOKEN"));
              //sessionStorage.clear();
            },
            success: function (data) {              
              //sessionStorage.clear(); 
              window.location="index.html";
            }, 
            error: function (data) {  
                console.log("Error =>", data);
                window.location="index.html";
            }
          });

        })
        /*
        let PathName = window.location.pathname;
        PathName = PathName.replace('.html','')
        const link = PathName.split('/')
        const numModulo = $("#"+link[link.length-1]).attr('parent')
        $("#Mod_"+numModulo).addClass('active'); //.trigger('click')//
        $("#"+link[link.length-1]).addClass('active');
        */
});
          