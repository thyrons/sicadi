function nombreCompleto() {
    var nombreCompleto = '';
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/usuario/funciones.php",
        data: "tryLog=true&funcion=1",
        cache: false,
        success: function(ex) {
            nombreCompleto = ex;
            //jQuery('#txtTipoUsuario').attr("placeholder", ex);
        }
    });
    return nombreCompleto;
}
function id_cliente() {    
    var id;
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/general/id_cliente.php",        
        cache: false,
        success: function(ex) {
            id = ex;            
        }
    });
    return id;    
}
function id_comprobante() {    
    var id;
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/general/id_comprobante.php",        
        cache: false,
        success: function(ex) {
            id = ex;            
        }
    });
    return id;    
}
function id_proveedor() {    
    var id;
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/general/id_proveedor.php",        
        cache: false,
        success: function(ex) {
            id = ex;            
        }
    });
    return id;    
}
function id_empresa() {    
    var id;
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/general/id_empresa.php",        
        cache: false,
        success: function(ex) {
            id = ex;            
        }
    });
    return id;    
}
function id_sustento() {    
    var id;
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/general/id_sustento.php",        
        cache: false,
        success: function(ex) {
            id = ex;            
        }
    });
    return id;    
}
function id_cabCompras(){
    var id;
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/general/id_cabCompras.php",        
        cache: false,
        success: function(ex) {
            id = ex;            
        }
    });
    return id;       
}
function id_seccion(){
    var id;
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/general/id_seccion.php",        
        cache: false,
        success: function(ex) {
            id = ex;            
        }
    });
    return id;       
}
function cedula(valor){
    var ci = valor;
    var resp=0;
    var pares = 0;
    var impares = 0;
    var cont = 0;
    var total = 0;
    var residuo = 0;
    if(valor!='2222222222'){
        if(valor.substr(0,2)>0 && valor.substr(0,2)<=26){
            for (var i = 0; i < 9; i++) {
                if (i % 2 == 0) {
                    if (parseInt(ci.charAt(i)) * 2 > 9) {
                        cont = (parseInt(ci.charAt(i)) * 2) - 9;
                    }
                    else {
                        cont = (parseInt(ci.charAt(i)) * 2);
                    }
                    impares = impares + cont;
                }
                else {
                    pares = pares + parseInt(ci.charAt(i));
                }
            }
            total = pares + impares;
            if (total % 10 == 0) {
            }
            else {
                residuo = total % 10;
                residuo = 10 - residuo;
                if (parseInt(ci.charAt(9)) == residuo) {
                    resp=0;
                }
                else {
                    resp=1;
                }
            }
        }
        else{
            resp=2;
        }
    }
    else{
        resp=2;
    }
    return resp;
}
function ruc(valor){
    var ruc = valor;
    var resp=0;
    ruc=valor.substr(10,13);
    if(ruc=='001'){
        resp=0;
    }
    else{
        resp=1;
    }
    
    return resp;
}
function horaActual(){ 
  
    var cad="";
    var hora=new Date();
    var hours=hora.getHours();
    var minutes=hora.getMinutes();
    var seconds=hora.getSeconds();
    var dn="AM";
    if (hours>11){
        dn="PM";
        hours=hours-12;
    }    
    if (hours==0)
        hours=12;
    if (minutes<=9)
        minutes="0"+minutes;
    if (seconds<=9)
        seconds="0"+seconds;
    cad= hours+':'+minutes+':'+seconds+' '+dn;
    jQuery("input[name=horaC]").val(cad);    
    setTimeout("horaActual(" + hours + "," + minutes + "," + seconds + "," + "'" + dn + "'" + ",'hora')", 1000);
    
}
function cargaProv(documento,nro){
    var id;
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/general/cargaProv.php", 
        data: "documento="+documento+"&nro="+nro,     
        cache: false,
        success: function(ex) {
            id = ex;  
            
        }
    });
    //return id;      
    if(id!="")  {
        jQuery("input[name=nomProveedorC]").val(id);        
    }
    else{
        //Ext.Msg.alert('Intenta de nuevo!','Este número de '+documento+' que indicaste no existe');        
        Ext.Msg.show({
            title:'Intenta de nuevo!',
            msg: 'Este número de '+documento+' que indicaste no existe ¿Desea abrir el buscador?',
            buttons: Ext.Msg.YESNO,
            fn: function (btn){
                if(btn=='yes'){     
                    ventanaProveedores1();         
                }
                else{
                    Ext.getCmp('nroIdentificacionC').focus(false,500);    
                }
            }
        });
        
    }
}
function completarCeros(valor){    
    var temp="";
    for(var i=valor.length;i<9;i++){
        temp=temp+"0";
    }
    return temp;
    
}
function nroItems(){
    var id;
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/general/nroItems.php",        
        cache: false,
        success: function(ex) {
            id = ex;            
        }
    });
    return id;        
}
function ivaBase(){
    var id;
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/general/ivaBase.php",        
        cache: false,
        success: function(ex) {
            id = ex;            
        }
    });
    return id;          
}