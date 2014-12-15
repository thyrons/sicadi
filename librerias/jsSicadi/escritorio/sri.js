Ext.define('MyDesktop.sri', {
    extend: 'Ext.ux.desktop.Module',    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.tip.QuickTipManager',
        'Ext.toolbar.Paging',
        'Ext.form.*'
    ],
    ////ventana sustento////
    ventanaSustento: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        var anio_actual=(new Date).getFullYear();  
        validaciones1.cargarValidaciones();        
        var items=[
            {
                xtype: 'textfield',
                name: 'operIngresoSustento',
                hidden: true,
                value: 'add'
            },            
            {                                               
                fieldLabel:'Código',                                                 
                labelPad:2,           
                labelWidth: 150,                                               
                name:'codigoSustento', 
                id:'codigoSustento', 
                value:id_sustento(),
                allowBlank:true,    
                anchor:"100% 30%",                   
                vtype: 'soloNumero',
                msgTarget: 'side', 
                readOnly:true,               
            },
            {
                fieldLabel:'Tipo Sustento',                                                 
                labelPad:2,           
                labelWidth: 150,                                                  
                name:'tipoSustento', 
                id:'tipoSustento', 
                allowBlank:false,    
                anchor:"100% 30%",                                   
                msgTarget: 'side'                
            },
            {
                fieldLabel:'Tipo Comprobante',                                                 
                labelPad:2,           
                labelWidth: 150,                                                  
                name:'codigoTipoComprobante', 
                id:'codigoTipoComprobante', 
                allowBlank:false,    
                anchor:"100% 30%",                                   
                msgTarget: 'side'                
            },
            ];           
            var boton=[            
            {
                text: 'Guardar',                
                formBind: true,               
                iconCls: 'add', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().submit({
                        method: 'POST',
                        waitTitle: 'Conectando',
                        waitMsg: 'Enviando datos...',
                        success: function() {                           
                            formulario.getForm().reset();
                            var textfield=Ext.getCmp('codigoSustento');                            
                            textfield.setValue(id_sustento());
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();                                
                                
                            }
                            else
                            {
                                Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
                                formulario.getForm().reset();
                            }
                        }
                    });
                }                       
            },
            {
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().reset();
                }
            },           
            {
                text:'Cancelar',
                iconCls: 'cancel',                
                cls:'x-btn-blue',
                handler: function() {
                    win.close();
                }
            },
            {
                text: 'Buscar',
                iconCls: 'search',               
                cls:'x-btn-blue',
                handler: function() {
                    ventanaBuscarSustento();                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                       
            url: '../servidor/sustento/sustento.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });     
        var win = desktop.getWindow('sustento' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'sustento' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 430,
                resizable: false,
                maximizable: false,
                plain: true,
                border: false,
                items: [formulario],
                bbar: [{
                    xtype: 'tbtext',
                    text: ' ©    2013 - PyS Systems - Sicadi'
                }],
            });
        }
        win.show();
        return win;
    },
    ///ventana comprobante///
    ventanaComprobante:function (src){
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();        
        var items=[
            {
                xtype: 'textfield',
                name: 'operIngresoComprobante',
                hidden: true,
                value: 'add'
            },            
            {                                               
                fieldLabel:'Código',                                                 
                labelPad:2,           
                labelWidth: 150,                                               
                name:'codigoComprobante', 
                id:'codigoComprobante', 
                value:id_comprobante(),
                allowBlank:true,    
                anchor:"100% 30%",                   
                vtype: 'soloNumero',
                msgTarget: 'side', 
                readOnly:true,               
            },
            {
                fieldLabel:'Tipo Comprobante',                                                 
                labelPad:2,           
                labelWidth: 150,                                                  
                name:'tipoComprobante', 
                id:'tipoComprobante', 
                allowBlank:false,    
                anchor:"100% 30%",                                   
                msgTarget: 'side', 
                enableKeyEvents: true,
                listeners:{
                    blur:function(f,e){                                           
                        Ext.Ajax.request({
                            url: '../servidor/comprobante/funciones.php',
                            params: {
                                codigo: Ext.getCmp('tipoComprobante').getValue(),                                
                                tipo:jQuery("input[name='operIngresoComprobante']").val(),
                                id:jQuery("input[name='codigoComprobante']").val(),
                            },  
                            success: function(response){                                            
                                var text = response.responseText;
                                if(text==0){
                                    Ext.Msg.alert('Intenta de nuevo!','Error este tipo de comprobante ya existe');
                                    jQuery("input[name='tipoComprobante']").val("");
                                    jQuery("input[name='tipoComprobante']").focus();
                                }
                            }
                        });    
                    }                                        
                },            
            },
            {
                 xtype: 'textfield',
                fieldLabel:'Código Secu. Tra.',                                                 
                labelPad:2,           
                labelWidth: 150,                                                  
                name:'codigoSecu', 
                id:'codigoSecu', 
                allowBlank:false,    
                anchor:"100% 30%",                                   
                msgTarget: 'side'                
            },
            {
                fieldLabel:'Fecha vigencia',                                                 
                labelPad:2,           
                labelWidth: 150,                                                  
                name:'fechaVigencia', 
                id:'fechaVigencia', 
                allowBlank:false,    
                anchor:"100% 30%",                                   
                msgTarget: 'side',   
                xtype: 'datefield',
                format: 'd-m-Y',
                submitFormat: 'd-m-Y',                
                value: new Date(),              
            },
            {
                xtype: 'textfield',
                fieldLabel:'Sustento Tributario',                                                 
                labelPad:2,           
                labelWidth: 150,                                                  
                name:'sustentoComprobante', 
                id:'sustentoComprobante', 
                allowBlank:false,    
                anchor:"100% 30%",                                   
                msgTarget: 'side',                
            },
        ];           
        var boton=[            
            {
                text: 'Guardar',                
                formBind: true,               
                iconCls: 'add', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().submit({
                        method: 'POST',
                        waitTitle: 'Conectando',
                        waitMsg: 'Enviando datos...',
                        success: function() {                           
                            formulario.getForm().reset();
                            var textfield=Ext.getCmp('codigoComprobante');                            
                            textfield.setValue(id_comprobante());
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();                                
                                
                            }
                            else
                            {
                                Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
                                formulario.getForm().reset();
                            }
                        }
                    });
                }                       
            },
            {
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().reset();
                }
            },           
            {
                text:'Cancelar',
                iconCls: 'cancel',                
                cls:'x-btn-blue',
                handler: function() {
                    win.close();
                }
            },
            {
                text: 'Buscar',
                iconCls: 'search',               
                cls:'x-btn-blue',
                handler: function() {
                    ventanaBuscarComprobante();                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                       
            url: '../servidor/comprobante/comprobante.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });     
        var win = desktop.getWindow('comprobante' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'comprobante' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 430,
                resizable: false,
                maximizable: false,
                plain: true,
                border: false,
                items: [formulario],
                bbar: [{
                    xtype: 'tbtext',
                    text: ' ©    2013 - PyS Systems - Sicadi'
                }],
            });
        }
        win.show();
        return win;    
    },
});
/////////modificacion y busqueda de ventanas////////
function ventanaBuscarSustento(){

    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Sustento Tributario', 
            html: '<table id="tablaSustento" style="font-size:12px;"></table><div id="pgTablaSustento"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 650,
            height: 280,
            closable: true,
            resizable: false,
            plain: true,
            border: false,
            draggable:false,
            modal: true,
            items: [formulario]
        });
        win.show();
    });   
    jQuery(function() {
        var width = 630;
        jQuery("#tablaSustento").jqGrid({
            url: '../servidor/sustento/sustento_xml.php',
            datatype: "xml",
            editurl: "../servidor/sustento/sustento.php",
            width: width,
            colNames: ['Código', 'Tipo sustento','Tipo Comprobante'],
            colModel: [
                {
                    name:'id_sustento',index:'id_sustento',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'tipo_sustento',index:'tipo_sustento',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'cod_tipo_comprobante',index:'cod_tipo_comprobante',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaSustento',
            sortname: 'id_sustento',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: true,               
            ondblClickRow: function(rowid) {
                jQuery(this).jqGrid('editGridRow', rowid, {
                    recreateForm: true, closeAfterEdit: true,  reloadAfterSubmit: true, closeOnEscape: true,
                    bottominfo: "Los campos marcados con (*) son obligatorios", width: 400, checkOnSubmit: false,
                    afterSubmit: function(response) {
                    //console.log(response),                          
                        if (response.responseText == "1") {
                            return [false, "Error este nombre ya existe ingrese otro"];
                            $("#tipo_sustento").val("");
                            $("#tipo_sustento").focus();
                        }                        
                        if (response.responseText == "0") {
                            Ext.Msg.alert('Advertencia!', 'Datos Modificados');             
                            return true;
                        }
                    }
                });
            }
        });                 
        jQuery("#tablaSustento").jqGrid('navGrid', '#pgTablaSustento',
        {
            add: false,
            edit: true,
            del: false
        },
        {         
            recreateForm: true, closeAfterEdit: true,  reloadAfterSubmit: true, closeOnEscape: true,
            bottominfo: "Los campos marcados con (*) son obligatorios", width: 400, checkOnSubmit: false,                 
            afterSubmit: function(response) {
            //console.log(response),
                if (response.responseText == "1") {
                    return [false, "Error este nombre ya existe ingrese otro"];
                    $("#tipo_sustento").val("");
                    $("#tipo_sustento").focus();
                }           
                if (response.responseText == "0") {  
                    Ext.Msg.alert('Advertencia!', 'Datos Modificados');                          
                    return true;
                }
            }
        },
        {},
        {}, // del options
        {
            zIndex: 29012
        } // search options
        );
    });

    }
    ////////ventana comprobante/////
function ventanaBuscarComprobante(){

    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Tipos de comprobantes', 
            html: '<table id="tablaComprobante" style="font-size:12px;"></table><div id="pgTablaComprobante"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 650,
            height: 280,
            closable: true,
            resizable: false,
            plain: true,
            border: false,
            draggable:false,
            modal: true,
            items: [formulario]
        });
        win.show();
    });  
    function enviarDatosComprobante(id) {
            var tabla = jQuery('#tablaComprobante').jqGrid('getRowData', id);        
            jQuery("input[name='operIngresoComprobante']").val('edit');            
            Ext.getCmp('codigoComprobante').setValue(tabla.id_comprobante);
            Ext.getCmp('tipoComprobante').setValue(tabla.tipo_comprobante);
            Ext.getCmp('codigoSecu').setValue(tabla.cod_sec_tra);
            jQuery("input[name='fechaVigencia']").val(tabla.fecha_vigencia)
            Ext.getCmp('sustentoComprobante').setValue(tabla.sustento_tributario);            
            Ext.WindowManager.getActive().close();
        } 
    jQuery(function() {
        var width = 630;
        jQuery("#tablaComprobante").jqGrid({
            url: '../servidor/comprobante/comprobante_xml.php',
            datatype: "xml",
            editurl: "../servidor/comprobante/comprobante.php",
            width: width,
            colNames: ['Código', 'Tipo Comprobante','Cod. Secu. Tran.','Fecha vigencia','Sustento Tributario'],
            colModel: [
                {
                    name:'id_comprobante',index:'id_comprobante',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'tipo_comprobante',index:'tipo_comprobante',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'cod_sec_tra',index:'cod_sec_tra',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'fecha_vigencia',index:'fecha_vigencia',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'sustento_tributario',index:'sustento_tributario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaComprobante',
            sortname: 'id_comprobante',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: true,               
            ondblClickRow: function(rowid) {               
                enviarDatosComprobante(rowid);                   
            }
        });                 
        jQuery("#tablaComprobante").jqGrid('navGrid', '#pgTablaComprobante',
        {
            add: false,
            edit: false,
            del: false
        },       

        {},
        {}, // del options
        {
            zIndex: 29012
        } // search options
        );
    });

    }
    
    

