Ext.define('MyDesktop.ingreso', {
    extend: 'Ext.ux.desktop.Module',    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.tip.QuickTipManager',
        'Ext.toolbar.Paging',
        'Ext.form.*'
    ],
    ////ventana categorias////
    ventanaCategorias: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();        
        var items=[
            {
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idCategorias',
                hidden: true,                
            },
            {                                               
                fieldLabel:'Nombre Categoría',                                                 
                labelPad:2,           
                labelWidth: 150,                  
                minLength:3,                
                name:'nomCategoria', 
                allowBlank:false,    
                anchor:"100% 30%",                   
                vtype: 'soloLetra',
                msgTarget: 'side'                
            }];           
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
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();
                                $("input[name='nomCategoria']").focus();
                                
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
                    ventanaBuscarCategoria();                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                       
            url: '../servidor/categorias/categorias.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });     
        var win = desktop.getWindow('categorias' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'categorias' + src.windowId,
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
    /////ventana lineas////
    ventanaLineas: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();        
        var items=[
            {
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idLinea',
                hidden: true,                
            },
            {                                               
                fieldLabel:'Nombre Línea',                                                 
                labelPad:2,           
                labelWidth: 150,                  
                minLength:3,                
                name:'nomLinea', 
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'                
            }];          
            var boton=[            
            {
                text: 'Guardar', 
                iconCls: 'add', 
                cls:'x-btn-blue',               
                formBind: true,
                handler: function() {
                    formulario.getForm().submit({
                        method: 'POST',
                        waitTitle: 'Conectando',
                        waitMsg: 'Enviando datos...',
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();
                                $("input[name='nomLinea']").focus();
                                
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
                text: 'Cancelar',
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
                    ventanaBuscarLinea();
                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                     
            url: '../servidor/lineas/lineas.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('lineas' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'lineas' + src.windowId,
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
    /////////ventana Marcas//////////
    ventanaMarcas: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();        
        var items=[
            {
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idMarca',
                hidden: true,                
            },
            {                                               
                fieldLabel:'Nombre Marca',                                                 
                labelPad:2,           
                labelWidth: 150,                  
                minLength:3,                
                name:'nomMarca', 
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'                
            }];            
            var boton=[            
            {
                text: 'Guardar',                
                iconCls: 'add', 
                cls:'x-btn-blue',
                formBind: true,
                handler: function() {
                    formulario.getForm().submit({
                        method: 'POST',
                        waitTitle: 'Conectando',
                        waitMsg: 'Enviando datos...',
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();
                                $("input[name='nomMarca']").focus();
                                
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
                text: 'Cancelar',
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
                    ventanaBuscarMarca();
                    
                }
            },
        ];        
        var formulario = new Ext.FormPanel({                     
            url: '../servidor/marcas/marcas.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('marcas' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'marcas' + src.windowId,
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
    /////////ventana Familia//////////
    ventanaFamilia: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();        
        var items=[
            {
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idFamilia',
                hidden: true,                
            },
            {                                               
                fieldLabel:'Nombre Familia',                                                 
                labelPad:2,           
                labelWidth: 150,                  
                minLength:3,                
                name:'nomFamilia', 
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'                
            }];            
            var boton=[            
            {
                text: 'Guardar',   
                iconCls: 'add', 
                cls:'x-btn-blue',             
                formBind: true,
                handler: function() {
                    formulario.getForm().submit({
                        method: 'POST',
                        waitTitle: 'Conectando',
                        waitMsg: 'Enviando datos...',
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();
                                $("input[name='nomFamilia']").focus();
                                
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
                text: 'Cancelar',
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
                    ventanaBuscarFamilias();
                    
                }
            },
        ];        
        var formulario = new Ext.FormPanel({                     
            url: '../servidor/familias/familias.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('familia' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'familia' + src.windowId,
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
    /////////ventana formas de pago//////////
    ventanaFormasPago: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();        
        var items=[
            {
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idFormaPago',
                hidden: true,                
            },
            {                                               
                fieldLabel:'Código',                                                                                                                
                labelPad:2,           
                labelWidth: 100,                  
                minLength:1,                
                name:'codForma', 
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'                
            },{                                               
                fieldLabel:'Detalle ',                                                            
                labelPad:2,                   
                labelWidth: 100,                  
                minLength:3,                
                name:'nomForma', 
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'                
            }];            
            var boton=[            
            {
                text: 'Guardar', 
                iconCls: 'add', 
                cls:'x-btn-blue',               
                formBind: true,
                handler: function() {
                    formulario.getForm().submit({
                        method: 'POST',
                        waitTitle: 'Conectando',
                        waitMsg: 'Enviando datos...',
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();
                                $("input[name='codForma']").focus();
                                
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
                text: 'Cancelar',
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
                    ventanaBuscarForma();
                    
                }
            },
        ];        
        var formulario = new Ext.FormPanel({                     
            url: '../servidor/formas_pago/formas_pago.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('formas_pago' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'formas_pago' + src.windowId,
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
/////////////ventana de Procedencias/////////
    ventanaProcedencia: function(src) {
    	var desktop = this.app.getDesktop();   
    	var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();    	
		var items=[
			{
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idProcedencia',
                hidden: true,                
            },
			{                                               
                fieldLabel:'Nombre Procedencia',                                                 
                labelPad:2,           
                labelWidth: 150,                  
                minLength:3,                
                name:'nomProcedencia', 
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'                
            }];           
            var boton=[            
            {
                text: 'Guardar',
                iconCls: 'add', 
                cls:'x-btn-blue',                
                formBind: true,
                handler: function() {
                    formulario.getForm().submit({
                        method: 'POST',
                        waitTitle: 'Conectando',
                        waitMsg: 'Enviando datos...',
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                        	{
                            	obj = Ext.decode(action.response.responseText);
                            	Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                            	formulario.getForm().reset();
                            	$("input[name='nomProcedencia']").focus();
                             	
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
                text: 'Cancelar',
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
                    ventanaBuscarProcedencia();                    
                }
            },
       	];        
    	var formulario = new Ext.FormPanel({                     
            url: '../servidor/procedencias/procedencias.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });    	
    	var win = desktop.getWindow('procedencias' + src.windowId);
        if (!win) {
           	var win = desktop.createWindow({
                id: 'procedencias' + src.windowId,
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
    /////ventana clientes////
    ventanaClientes: function(src) {
        var idCliente=id_cliente();
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();            
        var store = ['Cédula','Ruc','Pasaporte'];
        var store2= {
            fields: ['codigo', 'descripcion'],
            data: [
                { "codigo": "1", "descripcion": "Activo" },
                { "codigo": "0", "descripcion": "Pasivo" },                
            ]
        };
        Ext.define('ServiceList1', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_tipo_cliente', type: 'int'},
                {name: 'nombre_tipo_cliente', type: 'string'}
            ]
        });
         var store1 = Ext.create('Ext.data.Store', {
            model: 'ServiceList1',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaTipoCliente.php'
            }
        });        
        var items = [{ 
            layout: 'column',                         
            title:'Datos principales',
            items:[{
                columnWidth: .50,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                    xtype: 'textfield',
                    name: 'operIngresoCliente',
                    hidden: true,
                    value: 'add'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'idIngresoCliente',
                    name: 'idIngresoCliente',
                    hidden: true
                },{
                    xtype: 'combo',
                    fieldLabel: '* Tipo Documento',
                    labelWidth: 130,
                    id: 'tipoDocumentoIngresoCliente',
                    name: 'tipoDocumentoIngresoCliente',
                    autoSelect: false,
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    anchor: '100%',
                    enableKeyEvents: true,
                    queryMode: 'local',          
                    store: store,
                    displayField: 'descripcion',
                    valueField: 'codigo',
                    msgTarget: 'side',
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            //console.log(newValue);
                            if(newValue==='Cédula'){                                                        
                                jQuery("input[name='ruc_ced_pass_cliente']").attr("maxlength", 10);
                                jQuery("input[name='ruc_ced_pass_cliente']").val("");
                                jQuery("input[name='ruc_ced_pass_cliente']").focus();
                                //Ext.getCmp('ruc_ced_pass_cliente').getEl().dom.setAttribute('maxLength','5');
                                var textfield=Ext.getCmp('ruc_ced_pass_cliente');
                                textfield.minLength = 10;
                                textfield.inputEl.dom.minLength =10;
                                textfield.maxLength = 10;
                                textfield.inputEl.dom.maxLength =10;
                                //Ext.getCmp('ruc_ced_pass_cliente').inputEl.dom.maxLength= 6;
                                //console.log(Ext.getCmp('ruc_ced_pass_cliente'));
                                        
                            }
                            if(newValue=='Ruc'){                                                        
                                jQuery("input[name='ruc_ced_pass_cliente']").attr("maxlength", 13);
                                jQuery("input[name='ruc_ced_pass_cliente']").val("");
                                jQuery("input[name='ruc_ced_pass_cliente']").focus();
                                var textfield=Ext.getCmp('ruc_ced_pass_cliente');
                                textfield.minLength = 13;
                                textfield.inputEl.dom.minLength =13;
                                textfield.maxLength = 13;
                                textfield.inputEl.dom.maxLength =13;
                               
                            }
                            if(newValue=='Pasaporte'){                                                        
                                jQuery("input[name='ruc_ced_pass_cliente']").attr("maxlength", 30);
                                jQuery("input[name='ruc_ced_pass_cliente']").val("");
                                jQuery("input[name='ruc_ced_pass_cliente']").focus();
                                var textfield=Ext.getCmp('ruc_ced_pass_cliente');
                                textfield.minLength = 5;
                                textfield.inputEl.dom.minLength =5;
                                textfield.maxLength = 30;
                                textfield.inputEl.dom.maxLength =30;                             
                                //console.log(textfield)
                            }
                        },
                        scope: this
                    },
                },{
                    fieldLabel: '* Nombres Completos',
                    labelWidth: 130,
                    xtype: 'textfield',
                    name: 'nombreCompletoIngresoCliente',
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Profesión',
                    labelWidth: 130,
                    xtype: 'textfield',
                    name: 'profesionCliente',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                }, ]                
            },
            {
                columnWidth: .50,                
                layout: 'form', 
                bodyStyle: '/*background:#DFE8F6*/; padding-left:10px; border:none;margin-top:2px',
                items:[{                
                    fieldLabel: '* RUC / CI /PASS',
                    labelWidth: 130,
                    xtype: 'textfield',                            
                    name: 'ruc_ced_pass_cliente',
                    id:'ruc_ced_pass_cliente',
                    anchor: '100%',
                    allowBlank: false,                
                    enforceMaxLength: true,
                    maxLength:0,
                    minLength:0,
                    enableKeyEvents: true,
                    msgTarget: 'side',       
                    //vtype: 'soloNumero',
                    listeners: {                    
                        'keyup':function(f,e){
                            if(Ext.getCmp('tipoDocumentoIngresoCliente').getValue()=='Cédula'){
                                if(Ext.getCmp('ruc_ced_pass_cliente').getValue().length==10){                                    
                                    var resp=cedula(Ext.getCmp('ruc_ced_pass_cliente').getValue());
                                    if(resp==0){
                                        Ext.Ajax.request({
                                            url: '../servidor/clientes/funciones.php',
                                            params: {
                                                codigo: Ext.getCmp('ruc_ced_pass_cliente').getValue(),
                                                campo: 'Cédula',
                                                tipo:jQuery("input[name='operIngresoCliente']").val(),
                                                id:jQuery("input[name='codigoCliente']").val(),
                                            },
                                            success: function(response){                                            
                                                var text = response.responseText;
                                                if(text==0){
                                                    Ext.Msg.alert('Intenta de nuevo!','Error esta cédula ya existe');
                                                    jQuery("input[name='ruc_ced_pass_cliente']").val("");
                                                    jQuery("input[name='ruc_ced_pass_cliente']").focus();
                                                }
                                            }
                                        });
                                    }
                                    else{
                                        if(resp==1){
                                            Ext.Msg.alert('Intenta de nuevo!','Error esta cédula es inválida');
                                            jQuery("input[name='ruc_ced_pass_cliente']").val("");
                                            jQuery("input[name='ruc_ced_pass_cliente']").focus();
                                        }
                                        else{
                                            if(resp==2){
                                                Ext.Msg.alert('Intenta de nuevo!','Error esta cédula es inválida no pertenece a Ecuador');
                                                jQuery("input[name='ruc_ced_pass_cliente']").val("");
                                                jQuery("input[name='ruc_ced_pass_cliente']").focus();
                                            }
                                        }
                                    }
                                }                                    
                            }
                            else{
                                if(Ext.getCmp('tipoDocumentoIngresoCliente').getValue()=='Ruc'){
                                    if(Ext.getCmp('ruc_ced_pass_cliente').getValue().length==13){  
                                        var resp=ruc(Ext.getCmp('ruc_ced_pass_cliente').getValue());                                  
                                        if(resp==1){
                                            Ext.Msg.alert('Intenta de nuevo!',"Error este ruc no es válido");
                                            jQuery("input[name='ruc_ced_pass_cliente']").val("");
                                            jQuery("input[name='ruc_ced_pass_cliente']").focus();
                                        }
                                        else{
                                            if(resp==0){
                                                Ext.Ajax.request({
                                                    url: '../servidor/clientes/funciones.php',
                                                    params: {
                                                        codigo: Ext.getCmp('ruc_ced_pass_cliente').getValue(),
                                                        campo: 'Ruc',
                                                        tipo:jQuery("input[name='operIngresoCliente']").val(),
                                                        id:jQuery("input[name='codigoCliente']").val(),
                                                    },  
                                                    success: function(response){                                            
                                                        var text = response.responseText;
                                                        if(text==0){
                                                            Ext.Msg.alert('Intenta de nuevo!','Error este ruc ya existe');
                                                            jQuery("input[name='ruc_ced_pass_cliente']").val("");
                                                            jQuery("input[name='ruc_ced_pass_cliente']").focus();
                                                        }
                                                    }
                                                });   
                                            }
                                        }
                                    }
                               }                            
                            }
                        },
                        blur:function(f,e){                   
                            if(Ext.getCmp('tipoDocumentoIngresoCliente').getValue()=='Pasaporte'){
                                Ext.Ajax.request({
                                    url: '../servidor/clientes/funciones.php',
                                    params: {
                                        codigo: Ext.getCmp('ruc_ced_pass_cliente').getValue(),
                                         campo: 'Pasaporte',
                                         tipo:jQuery("input[name='operIngresoCliente']").val(),
                                         id:jQuery("input[name='codigoCliente']").val(),
                                    },  
                                    success: function(response){                                            
                                        var text = response.responseText;
                                        if(text==0){
                                            Ext.Msg.alert('Intenta de nuevo!','Error este pasaporte ya existe');
                                            jQuery("input[name='ruc_ced_pass_cliente']").val("");
                                            jQuery("input[name='ruc_ced_pass_cliente']").focus();
                                        }
                                    }
                                });    
                            }                    
                        }
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: '*  Tipo de Cliente',
                    labelWidth: 130,
                    id: 'tipoCliente',
                    name: 'tipoCliente',
                    autoSelect: false,
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    anchor: '100%',
                    enableKeyEvents: true,
                    queryMode: 'local',
                    store: store1,
                    displayField: 'nombre_tipo_cliente',
                    valueField: 'id_tipo_cliente',
                    msgTarget: 'side'
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Código',
                    labelWidth: 130,
                    labelStyle:'color:red',
                    xtype: 'textfield',
                    name: 'codigoCliente',
                    id:'codigoCliente',
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',                    
                    readOnly:true,
                    value:idCliente,
                }, ]
            }]            
        },{
            title:'Datos Informativos',
            layout: 'column',       
            items:[{
                columnWidth: .33,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                    fieldLabel: '* Dirección',
                    xtype: 'textfield',
                    name: 'direccionCliente',
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                },
                {
                    fieldLabel: '&nbsp;&nbsp;&nbsp;País',
                    xtype: 'textfield',
                    name: 'paisCliente',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                },
                {
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Referencias',
                    name: 'referenciasCliente',
                    anchor: '100%',
                    allowBlank:true,
                    msgTarget: 'side',
                    x: 5,
                    y: 65,
                    xtype: 'textarea'
                },]
            },
            {
                columnWidth: .33,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                    fieldLabel: '* Teléfono 1',
                    xtype: 'textfield',
                    name: 'telefono1Cliente',
                    anchor: '100%',
                    allowBlank: false,                    
                    msgTarget: 'side',
                    vtype: 'soloNumero',
                    minLength:9,
                    maxLength:20,
                },
                {
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Ciudad',
                    xtype: 'textfield',
                    name: 'ciudadCliente',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                },{
                    xtype: 'combo',
                    fieldLabel: '* Estado',
                    id: 'estadoCliente',
                    name: 'estadoCliente',
                    autoSelect: false,
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    anchor: '100%',
                    enableKeyEvents: true,
                    queryMode: 'local',
                    store: store2,
                    displayField: 'descripcion',
                    valueField: 'codigo',
                    msgTarget: 'side',
                    value:'1',
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Cupo Crédito',
                    xtype: 'textfield',
                    name: 'cupoCreditoCliente',
                    anchor: '100%',
                    allowBlank: false,
                    value:0,
                    msgTarget: 'side',
                    vtype: 'soloDecimales'
                },]  
            },
            {
                columnWidth: .33,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Teléfono 2',
                    xtype: 'textfield',
                    name: 'telefono2Cliente',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloNumero',
                    minLength:9,
                    maxLength:20,
                },
                {
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Email',
                    xtype: 'textfield',
                    name: 'emailCliente',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'email'
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Es Mayorista',
                    name: 'mayominoCliente',
                    id: 'mayominoCliente',
                    uncheckedValue: false,
                    inputValue: true
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Saldo Crédito',
                    xtype: 'textfield',
                    name: 'saldoCreditoCliente',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    readOnly:true,
                    value:0,
                    vtype: 'soloDecimales'
                },]  
            }]                      
        }];        
        var boton=[            
            {
                text: 'Guardar',
                iconCls: 'add', 
                cls:'x-btn-blue',                
                formBind: true,
                handler: function() {                    
                    if(parseInt(jQuery("input[name='cupoCreditoCliente']").val()) < parseInt(jQuery("input[name='saldoCreditoCliente']").val())){
                        Ext.Msg.alert('Advertencia!','Error el cupo debe ser mayor o igual al saldo')
                        jQuery("input[name='cupoCreditoCliente']").val("");
                        jQuery("input[name='cupoCreditoCliente']").focus();
                    }
                    else{
                        frmCliente.getForm().submit({
                            method: 'POST',
                            waitTitle: 'Conectando',
                            waitMsg: 'Enviando datos...',
                            success: function() {                           
                                frmCliente.getForm().reset();
                                var textfield=Ext.getCmp('codigoCliente');
                                textfield.setValue(id_cliente());
                                Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                                jQuery("input[name='operIngresoCliente']").val('add');
                            },
                            failure: function(form, action) {
                                if (action.failureType === 'server')
                                {
                                    obj = Ext.decode(action.response.responseText);
                                    Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                    frmCliente.getForm().reset();                                                                   
                                }
                                else
                                {
                                    Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
                                    frmCliente.getForm().reset();
                                }
                            }
                        });
                    }
                }                       
            },
            {
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    frmCliente.getForm().reset();
                }
            },           
            {
                text: 'Cancelar',
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
                    ventanaClientes();                    
                }
            },
        ];                              
        var frmCliente = new Ext.FormPanel({
            labelWidth: 80,
            url: '../servidor/clientes/clientes.php',
            frame: true,
            //defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        }); 
        var win = desktop.getWindow('cliente' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'cliente' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 800,
                resizable: false,
                draggable:true,
                plain: true,
                border: false,
                items: [frmCliente],
                bbar: [{
                    xtype: 'tbtext',
                    text: ' ©    2013 - PyS Systems - Sicadi'
                }],
            });
        }
        win.show();
        return win;
    },
    ventanaProveedores: function(src) {
        var idProveedores=id_proveedor();
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();           
        var store = ['Cédula','Ruc','Pasaporte'];
        var store2= {
            fields: ['codigo', 'descripcion'],
            data: [
                { "codigo": "1", "descripcion": "Activo" },
                { "codigo": "0", "descripcion": "Pasivo" },                
            ]
        };
        Ext.define('ServiceList1', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_tipo_cliente', type: 'int'},
                {name: 'nombre_tipo_cliente', type: 'string'}
            ]
        });
        Ext.define('ServiceList3', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_formas_pagos', type: 'int'},
                {name: 'nombre_forma', type: 'string'}
            ]
        });
        var store1 = Ext.create('Ext.data.Store', {
            model: 'ServiceList1',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaTipoCliente.php'
            }
        });         
        var store3 = Ext.create('Ext.data.Store', {
            model: 'ServiceList3',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaFormaPago.php'
            }
        });         
        var items = [{ 
            layout: 'column',                         
            title:'Datos Informativos',
            items:[{
                columnWidth: .50,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                    xtype: 'textfield',
                    name: 'operIngresoProveedores',
                    hidden: true,
                    value: 'add'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'idIngresoProveedores',
                    name: 'idIngresoProveedores',
                    hidden: true
                },{
                    xtype: 'combo',
                    fieldLabel: '* Tipo Documento',
                    labelWidth: 140,
                    id: 'tipoDocumentoIngresoProveedor',
                    name: 'tipoDocumentoIngresoProveedor',
                    autoSelect: false,
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    anchor: '100%',
                    enableKeyEvents: true,
                    queryMode: 'local',          
                    store: store,
                    displayField: 'descripcion',
                    valueField: 'codigo',
                    msgTarget: 'side',
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            //console.log(newValue);
                            if(newValue==='Cédula'){                                                        
                                jQuery("input[name='ruc_ced_pass_proveedor']").attr("maxlength", 10);
                                jQuery("input[name='ruc_ced_pass_proveedor']").val("");
                                jQuery("input[name='ruc_ced_pass_proveedor']").focus();                                
                                var textfield=Ext.getCmp('ruc_ced_pass_proveedor');
                                textfield.minLength = 10;
                                textfield.inputEl.dom.minLength =10;
                                textfield.maxLength = 10;
                                textfield.inputEl.dom.maxLength =10;                               
                            }
                            if(newValue=='Ruc'){                                                        
                                jQuery("input[name='ruc_ced_pass_proveedor']").attr("maxlength", 13);
                                jQuery("input[name='ruc_ced_pass_proveedor']").val("");
                                jQuery("input[name='ruc_ced_pass_proveedor']").focus();
                                var textfield=Ext.getCmp('ruc_ced_pass_proveedor');
                                textfield.minLength = 13;
                                textfield.inputEl.dom.minLength =13;
                                textfield.maxLength = 13;
                                textfield.inputEl.dom.maxLength =13;                               
                            }
                            if(newValue=='Pasaporte'){                                                        
                                jQuery("input[name='ruc_ced_pass_proveedor']").attr("maxlength", 30);
                                jQuery("input[name='ruc_ced_pass_proveedor']").val("");
                                jQuery("input[name='ruc_ced_pass_proveedor']").focus();
                                var textfield=Ext.getCmp('ruc_ced_pass_proveedor');
                                textfield.minLength = 5;
                                textfield.inputEl.dom.minLength =5;
                                textfield.maxLength = 30;
                                textfield.inputEl.dom.maxLength =30;                             
                            }
                        },
                        scope: this
                    },
                },{                
                    fieldLabel: '* Empresa',
                    labelWidth: 140,
                    xtype: 'textfield',                            
                    name: 'empresaProveedor',
                    id:'empresaProveedor',
                    anchor: '100%',
                    allowBlank: false,                                                        
                    minLength:3,                    
                    msgTarget: 'side',                           
                },
                {
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Representante Legal',
                    labelWidth: 140,
                    xtype: 'textfield',
                    name: 'representanteLegal',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Visitador',
                    labelWidth: 140,
                    xtype: 'textfield',
                    name: 'visitadorProveedor',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Dirección',
                    labelWidth: 140,
                    xtype: 'textfield',
                    name: 'direccionProveedor',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Teléfono 1',
                    labelWidth: 140,
                    xtype: 'textfield',
                    name: 'telefono1Proveedor',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloNumero'
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Teléfono 2',
                    labelWidth: 140,
                    xtype: 'textfield',
                    name: 'telefono2Proveedor',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloNumero'
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Fax',
                    labelWidth: 140,
                    xtype: 'textfield',
                    name: 'faxProveedor',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloNumero'
                },
                {
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Observaciones',
                    labelWidth: 140,
                    name:'observacionesProveedor',
                    anchor: '100%',
                    allowBlank:true,
                    msgTarget: 'side',
                    x: 5,
                    y: 65,
                    xtype: 'textarea'
                },]                
            },
            {
                columnWidth: .50,                
                layout: 'form', 
                bodyStyle: '/*background:#DFE8F6*/; padding-left:10px; border:none;margin-top:2px',
                items:[{                
                    fieldLabel: '* RUC / CI /PASS',
                    labelWidth: 140,
                    xtype: 'textfield',                            
                    name: 'ruc_ced_pass_proveedor',
                    id:'ruc_ced_pass_proveedor',
                    anchor: '100%',
                    allowBlank: false,                
                    enforceMaxLength: true,
                    maxLength:0,
                    minLength:0,
                    enableKeyEvents: true,
                    msgTarget: 'side',                                            
                    listeners:{
                        'keyup':function(f,e){
                            if(Ext.getCmp('tipoDocumentoIngresoProveedor').getValue()=='Cédula'){
                                if(Ext.getCmp('ruc_ced_pass_proveedor').getValue().length==10){                                    
                                    var resp=cedula(Ext.getCmp('ruc_ced_pass_proveedor').getValue());
                                    if(resp==0){
                                        Ext.Ajax.request({
                                            url: '../servidor/proveedor/funciones.php',
                                            params: {
                                                codigo: Ext.getCmp('ruc_ced_pass_proveedor').getValue(),
                                                campo: 'Cédula',
                                                tipo:jQuery("input[name='operIngresoProveedores']").val(),
                                                id:jQuery("input[name='codigoProveedor']").val(),
                                            },
                                            success: function(response){                                            
                                                var text = response.responseText;
                                                if(text==0){
                                                    Ext.Msg.alert('Intenta de nuevo!','Error esta cédula ya existe');
                                                    jQuery("input[name='ruc_ced_pass_proveedor']").val("");
                                                    jQuery("input[name='ruc_ced_pass_proveedor']").focus();
                                                }
                                            }
                                        });
                                    }
                                    else{
                                        if(resp==1){
                                            Ext.Msg.alert('Intenta de nuevo!','Error esta cédula es inválida');
                                            jQuery("input[name='ruc_ced_pass_proveedor']").val("");
                                            jQuery("input[name='ruc_ced_pass_proveedor']").focus();
                                        }
                                        else{
                                            if(resp==2){
                                                Ext.Msg.alert('Intenta de nuevo!','Error esta cédula es inválida no pertenece a Ecuador');
                                                jQuery("input[name='ruc_ced_pass_proveedor']").val("");
                                                jQuery("input[name='ruc_ced_pass_proveedor']").focus();
                                            }
                                        }
                                    }
                                }                                    
                            }
                            else{
                                if(Ext.getCmp('tipoDocumentoIngresoProveedor').getValue()=='Ruc'){
                                    if(Ext.getCmp('ruc_ced_pass_proveedor').getValue().length==13){  
                                        var resp=ruc(Ext.getCmp('ruc_ced_pass_proveedor').getValue());                                  
                                        if(resp==1){
                                            Ext.Msg.alert('Intenta de nuevo!',"Error este ruc no es válido");
                                            jQuery("input[name='ruc_ced_pass_proveedor']").val("");
                                            jQuery("input[name='ruc_ced_pass_proveedor']").focus();
                                        }
                                        else{
                                            if(resp==0){
                                                Ext.Ajax.request({
                                                    url: '../servidor/proveedor/funciones.php',
                                                    params: {
                                                        codigo: Ext.getCmp('ruc_ced_pass_proveedor').getValue(),
                                                        campo: 'Ruc',
                                                        tipo:jQuery("input[name='operIngresoProveedores']").val(),
                                                        id:jQuery("input[name='codigoProveedor']").val(),
                                                    },  
                                                    success: function(response){                                            
                                                        var text = response.responseText;
                                                        if(text==0){
                                                            Ext.Msg.alert('Intenta de nuevo!','Error este ruc ya existe');
                                                            jQuery("input[name='ruc_ced_pass_proveedor']").val("");
                                                            jQuery("input[name='ruc_ced_pass_proveedor']").focus();
                                                        }
                                                    }
                                                });   
                                            }
                                        }
                                    }
                               }                            
                            }
                        },
                        blur:function(f,e){                   
                            if(Ext.getCmp('tipoDocumentoIngresoProveedor').getValue()=='Pasaporte'){
                                Ext.Ajax.request({
                                    url: '../servidor/proveedor/funciones.php',
                                    params: {
                                        codigo: Ext.getCmp('ruc_ced_pass_proveedor').getValue(),
                                         campo: 'Pasaporte',
                                         tipo:jQuery("input[name='operIngresoProveedores']").val(),
                                         id:jQuery("input[name='codigoProveedor']").val(),
                                    },  
                                    success: function(response){                                            
                                        var text = response.responseText;
                                        if(text==0){
                                            Ext.Msg.alert('Intenta de nuevo!','Error este pasaporte ya existe');
                                            jQuery("input[name='ruc_ced_pass_proveedor']").val("");
                                            jQuery("input[name='ruc_ced_pass_proveedor']").focus();
                                        }
                                    }
                                });    
                            }                    
                        }                    
                    }
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;País',
                    labelWidth: 140,
                    xtype: 'textfield',
                    name: 'paisProveedor',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Ciudad',
                    labelWidth: 140,
                    xtype: 'textfield',
                    name: 'ciudadProveedor',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Email',
                    labelWidth: 140,
                    xtype: 'textfield',
                    name: 'emailProveedor',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'email'
                },
                {
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Código',
                    labelWidth: 140,
                    labelStyle:'color:red',
                    xtype: 'textfield',
                    name: 'codigoProveedor',
                    id:'codigoProveedor',
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',                    
                    readOnly:true,                    
                    value:id_proveedor(),
                },{
                    xtype: 'combo',
                    fieldLabel: '*  Tipo de Proveedor',
                    labelWidth: 140,
                    id: 'tipoProveedor',
                    name: 'tipoProveedor',
                    autoSelect: false,
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    anchor: '100%',
                    enableKeyEvents: true,
                    queryMode: 'local',
                    store: store1,
                    displayField: 'nombre_tipo_cliente',
                    valueField: 'id_tipo_cliente',
                    msgTarget: 'side'
                },{
                    xtype: 'combo',
                    labelWidth: 140,
                    fieldLabel: '* Estado',
                    id: 'estadoProveedor',
                    name: 'estadoProveedor',
                    autoSelect: false,
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    anchor: '100%',
                    enableKeyEvents: true,
                    queryMode: 'local',
                    store: store2,
                    displayField: 'descripcion',
                    valueField: 'codigo',
                    msgTarget: 'side',
                    value:'1',
                },{
                    xtype: 'combo',
                    fieldLabel: '*  Forma pago preferida',
                    labelWidth: 140,
                    id: 'formaPagoProveedor',
                    name: 'formaPagoProveedor',
                    autoSelect: false,
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    anchor: '100%',
                    enableKeyEvents: true,
                    queryMode: 'local',
                    store: store3,
                    displayField: 'nombre_forma',
                    valueField: 'id_formas_pagos',
                    msgTarget: 'side',
                },{
                    xtype: 'checkbox',
                    labelWidth: 140,
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Proveedor Principal',
                    name: 'proveedorPrincipal',
                    id: 'proveedorPrincipal',
                    uncheckedValue: false,
                    inputValue: true
                },]
            }]            
        }];        
        var boton=[            
            {
                text: 'Guardar',
                iconCls: 'add', 
                cls:'x-btn-blue',                
                formBind: true,
                handler: function() {                                        
                    frmProveedor.getForm().submit({
                        method: 'POST',
                        waitTitle: 'Conectando',
                        waitMsg: 'Enviando datos...',
                        success: function() {                           
                            frmProveedor.getForm().reset();
                            var textfield=Ext.getCmp('codigoProveedor');                                
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');                                
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                frmProveedor.getForm().reset();                                                                   
                            }
                            else
                            {
                                Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
                                frmProveedor.getForm().reset();
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
                    frmProveedor.getForm().reset();
                }
            },           
            {
                text: 'Cancelar',
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
                    ventanaProveedores();                    
                }
            },
        ];   
        var frmProveedor = new Ext.FormPanel({
            labelWidth: 80,
            url: '../servidor/proveedor/proveedor.php',
            frame: true,
            //defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        }); 
        var win = desktop.getWindow('proveedor' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'proveedor' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 800,
                resizable: false,
                draggable:true,
                plain: true,
                border: false,
                items: [frmProveedor],
                bbar: [{
                    xtype: 'tbtext',
                    text: ' ©    2013 - PyS Systems - Sicadi'
                }],
            });
        }
        win.show();
        return win;
    },
    ventanaEmpresa: function(src) {        
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();   
        var anio_actual=(new Date).getFullYear();         
        Ext.define('ServiceList3', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_modo_costeo', type: 'int'},
                {name: 'nombre_modo', type: 'string'}
            ]
        });                        
        var store2= {
            fields: ['codigo', 'descripcion'],
            data: [
                { "codigo": "1", "descripcion": "Activo" },
                { "codigo": "0", "descripcion": "Pasivo" },                
            ]
        };
        var store3 = Ext.create('Ext.data.Store', {
            model: 'ServiceList3',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaModo_costeo.php'
            }
        });

        var items = [{ 
            layout: 'column',                         
            title:'Datos principales',
            items:[{
                columnWidth: .33,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                    xtype: 'textfield',
                    name: 'operIngresoEmpresa',
                    hidden: true,
                    value: 'add'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'idIngresoEmpresa',
                    name: 'idIngresoEmpresa',
                    hidden: true
                },{
                    fieldLabel: '* Código Empresa',
                    labelWidth: 160,
                    labelStyle:'color:red',
                    xtype: 'textfield',
                    name: 'codigoEmpresa',
                    id:'codigoEmpresa',
                    value:id_empresa(),
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',                    
                    readOnly:true,                                        
                },{
                    xtype: 'textfield',
                    fieldLabel: '* RUC Empresa',
                    labelWidth: 160,                                       
                    name: 'rucEmpresa',
                    id:'rucEmpresa',
                    anchor: '100%',
                    maxLength:13,
                    minLength:13,
                    allowBlank: false,
                    enableKeyEvents: true,
                    msgTarget: 'side',
                    vtype:'soloNumero',  
                    listeners:{
                        'keyup':function(f,e){                      
                            if(Ext.getCmp('rucEmpresa').getValue().length==13){  
                                var resp=ruc(Ext.getCmp('rucEmpresa').getValue());                                
                                if(resp==1){
                                    Ext.Msg.alert('Intenta de nuevo!',"Error este ruc no es válido");
                                    jQuery("input[name='rucEmpresa']").val("");
                                    jQuery("input[name='rucEmpresa']").focus();
                                }
                                else{
                                    if(resp==0){
                                        Ext.Ajax.request({
                                            url: '../servidor/empresa/funciones.php',
                                            params: {
                                                codigo: Ext.getCmp('rucEmpresa').getValue(),
                                                tipo:jQuery("input[name='operIngresoEmpresa']").val(),
                                                id:jQuery("input[name='codigoEmpresa']").val(),
                                            },  
                                            success: function(response){                                            
                                                var text = response.responseText;
                                                if(text==0){
                                                    Ext.Msg.alert('Intenta de nuevo!','Error este ruc ya existe');
                                                    jQuery("input[name='rucEmpresa']").val("");
                                                    jQuery("input[name='rucEmpresa']").focus();
                                                }
                                            }
                                        });   
                                    }
                                }
                            }
                        }                            
                    },                                                                         
                },{
                    fieldLabel: '* Dirección',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'direccionEmpresa',                    
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',                    
                },{
                    fieldLabel: '* Teléfono',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'telefonoEmpresa',                                                     
                    anchor: '100%',
                    minLength:9,
                    allowBlank: false,
                    msgTarget: 'side',                    
                    vtype:'soloNumero',                    
                }, {
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Fax',
                    labelWidth: 160,
                    xtype: 'textfield',
                    name: 'faxEmpresa',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloNumero'
                },{
                    fieldLabel: '* Contador',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'contadorEmpresa',                    
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',
                    vtype:'soloLetra',                    
                },{
                    fieldLabel: '* País',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'paisEmpresa',                                                     
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',                    
                    vtype:'soloLetra',                    
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Provincia',
                    labelWidth: 160,
                    xtype: 'textfield',
                    name: 'provinciaEmpresa',
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                },{
                     fieldLabel: '&nbsp;&nbsp;&nbsp;Ciudad',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'ciudadEmpresa',                                                     
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',                    
                    vtype:'soloLetra',                    
                },      
            ]                
            },
            {
                columnWidth: .33,                
                layout: 'form', 
                bodyStyle: '/*background:#DFE8F6*/; padding-left:10px; border:none;margin-top:2px',
                items:[{
                    fieldLabel: '* Autorización SRI',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'autorizacionSri',                    
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',
                    enforceMaxLength: true,
                    maxLength:10,
                    minLength:10,       
                    vtype:'soloNumero',           
                },{
                    fieldLabel: '* Correo Electrónico',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'emailEmpresa',                    
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',                     
                    vtype: 'email'
                },{
                    xtype: 'combo',
                    fieldLabel: '* Estado',
                    id: 'estadoEmpresa',
                    name: 'estadoEmpresa',
                    autoSelect: false,
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    anchor: '100%',
                    enableKeyEvents: true,
                    queryMode: 'local',
                    store: store2,
                    displayField: 'descripcion',
                    valueField: 'codigo',
                    msgTarget: 'side',
                    value:'1',
                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Asesor Legal',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'asesorLegal',                    
                    anchor: '100%',
                    allowBlank: true,
                    msgTarget: 'side',                     
                    vtype: 'soloLetra'
                },{
                    fieldLabel: '* Representante Legal',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'representanteLegalEmpresa',                                                     
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',                    
                    vtype:'soloLetra',                                    
                },
                {
                    fieldLabel: '* CI Representante Legal',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'ciRepresentanteLegal',                    
                    id: 'ciRepresentanteLegal',                    
                    anchor: '100%',
                    allowBlank: false,                    
                    enforceMaxLength: true,
                    maxLength:10,
                    minLength:10,                 
                    enableKeyEvents:true,
                    msgTarget: 'side',                      
                    vtype: 'soloNumero',
                    listeners:{
                        keyup:function(f,e){
                            if(Ext.getCmp('ciRepresentanteLegal').getValue().length==10){
                                var resp=cedula(Ext.getCmp('ciRepresentanteLegal').getValue());                                   
                                if(resp==1){
                                    Ext.Msg.alert('Intenta de nuevo!','Error esta cédula es inválida');
                                    jQuery("input[name='ciRepresentanteLegal']").val("");
                                    jQuery("input[name='ciRepresentanteLegal']").focus();
                                }
                            }
                            

                        }
                    }                    
                },{
                    fieldLabel: '* Modo Costeo',                    
                    xtype: 'combo',                    
                    id: 'modoCosteo',
                    name: 'modoCosteo',
                    autoSelect: false,
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    anchor: '100%',
                    enableKeyEvents: true,
                    queryMode: 'local',
                    store: store3,
                    displayField: 'nombre_modo',
                    valueField: 'id_modo_costeo',
                    msgTarget: 'side',                                   
                },
                {
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Comentario',
                    labelWidth: 160,
                    name:'comentarioEmpresa',
                    anchor: '100%',
                    allowBlank:true,
                    msgTarget: 'side',
                    x: 2,
                    y: 30,
                    xtype: 'textarea'
                },
                ]
            },{

                columnWidth: .33,                
                layout: 'form', 
                bodyStyle: '/*background:#DFE8F6*/; padding-left:10px; border:none;margin-top:2px',
                items:[{
                    fieldLabel: '* Inicio Factura pre.',
                    labelWidth: 160,                    
                    xtype: 'numberfield',
                    name: 'inicioFacturaPre',                                       
                    id: 'inicioFacturaPre',  
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',  
                    minValue: 1,                    
                    step:1,
                    value:'1',                    
                    vtype: 'soloNumero',
                }, {
                    fieldLabel: '* Número Items en FV.',
                    labelWidth: 160,                    
                    xtype: 'numberfield',
                    name: 'numeroItemsFv',                                       
                    id: 'numeroItemsFv',  
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side', 
                    minValue: 1,                    
                    step:1,
                    value:'1',                    
                    vtype: 'soloNumero',
                },{
                    fieldLabel: '* Nombre Empresa',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'nombreEmpresa',                                         
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side', 
                    allowBlank: false,                                      
                },{
                    xtype: 'numberfield',  
                    fieldLabel: '* Iva',
                    labelWidth: 160,                                        
                    minValue: 0,                    
                    step:1,
                    value:'0',
                    name: 'ivaEmpresa', 
                    id: 'ivaEmpresa',                                                     
                    anchor: '100%',                        
                    allowBlank: true,
                    vtype:'soloNumero',
                    
                },{
                    xtype: 'numberfield',        
                    fieldLabel: '* Año Contable',
                    labelWidth: 160,
                    minValue: 1980,
                    value:anio_actual,
                    anchor: '100%' ,                         
                    name: 'añoContable', 
                    id: 'añoContable', 
                    vtype:'soloNumero',   
                    allowBlank: false,                                    
                },{
                    fieldLabel: '* Ruc Contador',
                    labelWidth: 160,                    
                    xtype: 'textfield',
                    name: 'rucContador',                                                     
                    id: 'rucContador',                                                     
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',  
                    enforceMaxLength: true,
                    maxLength:13,
                    minLength:13,                 
                    enableKeyEvents:true,                  
                    vtype:'soloNumero', 
                    listeners:{
                        keyup:function(f,e){
                            if(Ext.getCmp('rucContador').getValue().length==13){
                                var resp=ruc(Ext.getCmp('rucContador').getValue());                                   
                                if(resp==1){
                                    Ext.Msg.alert('Intenta de nuevo!','Error este nro. de ruc es inválido');
                                    jQuery("input[name='rucContador']").val("");
                                    jQuery("input[name='rucContador']").focus();
                                }
                            }
                            

                        }
                    }

                },{
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Descripción',
                    labelWidth: 160,
                    name:'descripcionEmpresa',
                    anchor: '100%',
                    allowBlank:true,
                    msgTarget: 'side',
                    x: 5,
                    y: 30,
                    xtype: 'textarea'
                },
                ]
            
            }]            
        },{
            title:'Datos SRI',
            layout: 'column',       
            items:[{
                columnWidth: .50,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                    //fieldLabel: '* Establecimiento y punto de emisión C.',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Establecimiento y punto de emisión C',
                    labelWidth: 250,                    
                    xtype: 'textfield',
                    name: 'EstablecimientoPuntoEmisionC',                                                     
                    anchor: '100%',
                    //allowBlank: false,
                    allowBlank: true,
                    msgTarget: 'side',                    
                    vtype:'soloNumero',      

                },{
                    //fieldLabel: '* Establecimiento y punto de emisión V.',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Establecimiento y punto de emisión V.',
                    labelWidth: 250,                    
                    xtype: 'textfield',
                    name: 'EstablecimientoPuntoEmisionV',                                                     
                    anchor: '100%',
                    //allowBlank: false,
                    allowBlank: true,
                    msgTarget: 'side',                    
                    vtype:'soloNumero',      

                },{
                    //fieldLabel: '* Establecimiento y punto de emisión R.C',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Establecimiento y punto de emisión R.C',                    
                    labelWidth: 250,                    
                    xtype: 'textfield',
                    name: 'EstablecimientoPuntoEmisionRC',                                                     
                    anchor: '100%',
                    //allowBlank: false,
                    allowBlank: true,
                    msgTarget: 'side',                    
                    vtype:'soloNumero',      

                },{
                    //fieldLabel: '* Establecimiento y punto de emisión PF',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Establecimiento y punto de emisión PF',                    
                    labelWidth: 250,                    
                    xtype: 'textfield',
                    name: 'EstablecimientoPuntoEmisionPF',                                                     
                    anchor: '100%',
                    //allowBlank: false,
                    allowBlank: true,
                    msgTarget: 'side',                    
                    vtype:'soloNumero',      

                },]
            },
            {
                columnWidth: .49,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                    //fieldLabel: '* Nro. Autorización C',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Nro. Autorización C',
                    labelWidth: 250,                    
                    xtype: 'textfield',
                    name: 'nroAutorizacionC',                                                     
                    anchor: '100%',
                    //allowBlank: false,
                    allowBlank: true,
                    msgTarget: 'side',                    
                    vtype:'soloNumero',
                },
                {
                    //fieldLabel: '* Nro. Autorización V',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Nro. Autorización V',
                    labelWidth: 250,                    
                    xtype: 'textfield',
                    name: 'nroAutorizacionV',                                                     
                    anchor: '100%',
                    //allowBlank: false,
                    allowBlank: true,
                    msgTarget: 'side',                    
                    vtype:'soloNumero',   

                },{
                    //fieldLabel: '* Nro. Autorización R.C',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Nro. Autorización R.C',
                    labelWidth: 250,                    
                    xtype: 'textfield',
                    name: 'nroAutorizacionRC',                                                     
                    anchor: '100%',
                    allowBlank: true,
                    //allowBlank: false,
                    msgTarget: 'side',                    
                    vtype:'soloNumero',   
                },{
                    //fieldLabel: '* Nro. Autorización PF',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Nro. Autorización PF',
                    labelWidth: 250,                    
                    xtype: 'textfield',
                    name: 'nroAutorizacionPF',                                                     
                    anchor: '100%',
                    //allowBlank: false,
                    allowBlank: true,
                    msgTarget: 'side',                    
                    vtype:'soloNumero',   
                },]  
            },
            ]                      
        }];        
        var boton=[            
            {
                text: 'Guardar',
                iconCls: 'add', 
                cls:'x-btn-blue',                
                formBind: true,
                handler: function() {                                        
                    frmEmpresa.getForm().submit({
                        method: 'POST',
                        waitTitle: 'Conectando',
                        waitMsg: 'Enviando datos...',
                        success: function() {                           
                            frmEmpresa.getForm().reset();
                            var textfield=Ext.getCmp('codigoEmpresa');
                            var textfield1=Ext.getCmp('añoContable');
                            textfield.setValue(id_empresa());
                            textfield1.setValue(anio_actual);
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                            jQuery("input[name='operIngresoEmpresa']").val('add');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                frmEmpresa.getForm().reset();                                                                   
                            }
                            else
                            {
                                Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
                                frmEmpresa.getForm().reset();
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
                    frmEmpresa.getForm().reset();
                }
            },           
            {
                text: 'Cancelar',
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
                    ventanaBuscarEmpresa();                    
                }
            },
        ];                              
        var frmEmpresa = new Ext.FormPanel({
            labelWidth: 80,
            url: '../servidor/empresa/empresa.php',
            frame: true,
            //defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        }); 
        var win = desktop.getWindow('empresa' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'empresa' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 1200,
                resizable: false,
                draggable:true,
                plain: true,
                border: false,
                items: [frmEmpresa],
                bbar: [{
                    xtype: 'tbtext',
                    text: ' ©    2013 - PyS Systems - Sicadi'
                }],
            });
        }
        win.show();
        return win;
    
    },
    ventanaProductos: function(src) {        
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();
        Ext.define('ServiceList', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_proveedor', type: 'int'},
                {name: 'empresa_proveedor', type: 'string'}
            ]
        });  
        Ext.define('ServiceList1', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_familia', type: 'int'},
                {name: 'nombre_familia', type: 'string'}
            ]
        });  
        Ext.define('ServiceList2', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_marca', type: 'int'},
                {name: 'nombre_marca', type: 'string'}
            ]
        });  
        Ext.define('ServiceList3', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_linea', type: 'int'},
                {name: 'nombre_linea', type: 'string'}
            ]
        });  
        Ext.define('ServiceList4', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_categoria', type: 'int'},
                {name: 'nombre_categoria', type: 'string'}
            ]
        });  
        Ext.define('ServiceList5', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_procedencia', type: 'int'},
                {name: 'nombre_procedencia', type: 'string'}
            ]
        }); 
        var store6= {
            fields: ['codigo', 'descripcion'],
            data: [
                { "codigo": "0", "descripcion": "Bienes" },
                { "codigo": "1", "descripcion": "Servicios" },                
                { "codigo": "2", "descripcion": "Consumo" },                
            ]
        };         
        var store = Ext.create('Ext.data.Store', {
            model: 'ServiceList',
            autoLoad: true,
            scope:this,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                scope:this,
                type: 'ajax',
                url: '../servidor/general/cargaProveedor.php'
            }
        });
        var store1 = Ext.create('Ext.data.Store', {
            model: 'ServiceList1',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaFamilia.php'
            }
        });
        var store2 = Ext.create('Ext.data.Store', {
            model: 'ServiceList2',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaMarca.php'
            }
        });
        var store3 = Ext.create('Ext.data.Store', {
            model: 'ServiceList3',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaLinea.php'
            }
        });
        var store4 = Ext.create('Ext.data.Store', {
            model: 'ServiceList4',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaCategoria.php'
            }
        });
        var store5 = Ext.create('Ext.data.Store', {
            model: 'ServiceList5',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaProcedencia.php'
            }
        });
        var items = [
        {   
            xtype: 'tabpanel',
            plain: true,
            activeTab: 0,
            autoHeight: true,
            deferredRender: false,
            items: [{
                layout: 'form',
                title: 'Detalles del Producto',
                autoHeight: true,
                bodyStyle: 'background:#DFE8F6;', //or if you set it to none, you will see through it.                
                defaults: {
                    anchor: '95%',
                    msgTarget: 'side'
                },
                items: [{
                    layout: 'column',                                     
                    items:[{
                        columnWidth: .50,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                        items:[{
                            xtype: 'textfield',
                            name: 'operIngresoProducto',
                            hidden: true,
                            value: 'add'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'idIngresoProducto',
                            name: 'idIngresoProducto',
                            hidden: true
                        },
                        {
                            fieldLabel: '* Código',
                            labelWidth: 160,                    
                            xtype: 'textfield',
                            name: 'codigoProducto', 
                            id:'codigoProducto',                           
                            allowBlank: false,
                            enableKeyEvents:true,
                            listeners:{
                                keyup:function (){
                                    jQuery("input[name='codigoBarrasProducto']").val(jQuery("input[name='codigoProducto']").val());
                                },
                                blur:function(f,e){                                                       
                                    Ext.Ajax.request({
                                        url: '../servidor/productos/funciones.php',
                                        params: {
                                            codigo: Ext.getCmp('codigoProducto').getValue(),                                            
                                            funcion: "1", 
                                            oper:jQuery("input[name='operIngresoProducto']").val(),                                                             
                                        },  
                                        success: function(response){                                            
                                            var text = response.responseText;
                                            if(text==0){
                                                Ext.Msg.alert('Intenta de nuevo!','Error este pasaporte ya existe');                                                   
                                                jQuery("input[name='codigoProducto']").val("");                                                          
                                            }
                                        }
                                    });                                                        
                                },       
                            },
                        },
                        {
                            fieldLabel: '* Código de barras',
                            labelWidth: 160,                    
                            xtype: 'textfield',
                            name: 'codigoBarrasProducto', 
                            id: 'codigoBarrasProducto',                                                   
                            allowBlank: false,        
                            //vtype:'soloNumero', 
                            enableKeyEvents:true,
                            listeners:{
                                blur:function(f,e){                                                       
                                    Ext.Ajax.request({
                                        url: '../servidor/productos/funciones.php',
                                        params: {
                                            codigo: Ext.getCmp('codigoBarrasProducto').getValue(),                                            
                                            funcion: "2", 
                                            oper:jQuery("input[name='operIngresoProducto']").val(),                                                             
                                        },  
                                        success: function(response){                                            
                                            var text = response.responseText;
                                            if(text==0){
                                                Ext.Msg.alert('Intenta de nuevo!','Error este código ya existe');                                                   
                                                jQuery("input[name='codigoBarrasProducto']").val("");                                                            
                                            }
                                        }
                                    });                                                        
                                },             
                            },                   
                        },
                        {
                            fieldLabel: '* Descripción',
                            labelWidth: 160,                    
                            xtype: 'textfield',
                            name: 'descripcionProducto',                                                     
                            allowBlank: false,          
                        },
                        {
                            fieldLabel: '* Precio de costo',
                            labelWidth: 160,                    
                            xtype: 'textfield',
                            name: 'precioCosto',                                                     
                            anchor: '100%',
                            allowBlank: false,
                            vtype:'soloNumero'      
                        },
                        {
                            layout: 'column',
                            bodyStyle: '/*background:#DFE8F6*/; border:none;',
                            items:[{
                                columnWidth: .53,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; border:none;',
                                items:[{
                                    fieldLabel: '* % Utilidad Min.',                                               
                                    labelWidth: 160,    
                                    xtype: 'textfield',
                                    name: 'utilidadMinorista',                                                     
                                    anchor: '100%',                                
                                    allowBlank: false, 
                                    vtype:'soloNumero'            
                                },{
                                    fieldLabel: '* % Utilidad May.',                                               
                                    labelWidth: 160,    
                                    xtype: 'textfield',
                                    name: 'utilidadMayorista',                                                     
                                    anchor: '100%',                                
                                    allowBlank: false,
                                    vtype:'soloNumero'             
                                },{
                                    fieldLabel: '* % Descuento Min.',                                               
                                    labelWidth: 160,    
                                    xtype: 'textfield',
                                    name: 'descuentoMinorista',                                                     
                                    anchor: '100%',                                
                                    allowBlank: false,  
                                    vtype:'soloNumero'             
                                },]
                            },{
                                columnWidth: .47,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; border:none;',
                                items:[{
                                    fieldLabel: '&nbsp;* PVP sin IVA Min.',                                               
                                    labelWidth: 130,    
                                    xtype: 'textfield',
                                    name: 'pvpSinIvaMin',                                                     
                                    anchor: '100%',                                
                                    allowBlank: false,  
                                    vtype:'soloNumero'           
                                },{
                                    fieldLabel: '&nbsp;* PVP sin IVA May.',                                               
                                    labelWidth: 130,    
                                    xtype: 'textfield',
                                    name: 'pvpSinIvaMay',                                                     
                                    anchor: '100%',                                
                                    allowBlank: false,  
                                    vtype:'soloNumero'           
                                },{
                                    fieldLabel: '&nbsp;* % Descuento May.',                                               
                                    labelWidth: 130,    
                                    xtype: 'textfield',
                                    name: 'descuentoMayorista',                                                     
                                    anchor: '100%',                                
                                    allowBlank: false,
                                    vtype:'soloNumero'      
                                }]                      
                            },]            
                        },
                        {
                            fieldLabel: '* Últ. fecha de compra',
                            labelWidth: 160,                   
                            name: 'ultimaFechaCompra',                    
                            id:'ultimaFechaCompra',                                            
                            xtype: 'datefield',
                            //format: 'd-m-Y',
                            //submitFormat: 'd-m-Y',
                            format: 'Y-m-d',
                            submitFormat: 'Y-m-d',
                            allowBlank: false, 
                            value: new Date(),                                                  
                        },{
                            layout: 'column',
                            bodyStyle: '/*background:#DFE8F6*/; border:none;',
                            items:[{
                                columnWidth: .53,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; border:none;',
                                items:[{
                                    fieldLabel: '* Stock Máximo.',                                               
                                    labelWidth: 160,    
                                    xtype: 'textfield',
                                    name: 'stockMaximo',                                                     
                                    anchor: '100%',                                
                                    allowBlank: false, 
                                    vtype:'soloNumero'            
                                },{
                                    fieldLabel: '* Stock Promedio',                                               
                                    labelWidth: 160,    
                                    xtype: 'textfield',
                                    name: 'stockPromedio',                                                     
                                    anchor: '100%',                                
                                    allowBlank: false,
                                    vtype:'soloNumero'               
                                },]
                            },{
                                columnWidth: .47,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; border:none;',
                                items:[{
                                    fieldLabel: '&nbsp;* Stock Mínimo.',                                               
                                    labelWidth: 130,    
                                    xtype: 'textfield',
                                    name: 'stockMinimo',                                                     
                                    anchor: '100%',                                
                                    allowBlank: false, 
                                    vtype:'soloNumero'      
                                },]                      
                            },]            
                        },{
                            fieldLabel: '&nbsp;&nbsp;&nbsp;Ubicación 1',
                            labelWidth: 160,                    
                            xtype: 'textfield',
                            name: 'ubicacion1',                    
                            anchor: '100%',
                            allowBlank: true,
                            msgTarget: 'side',                                            
                        },{
                            fieldLabel: '&nbsp;&nbsp;&nbsp;Ubicación 2',
                            labelWidth: 160,                    
                            xtype: 'textfield',
                            name: 'ubicacion2',                    
                            anchor: '100%',
                            allowBlank: true,
                            msgTarget: 'side',                                            
                        },{
                            xtype: 'combo',
                            fieldLabel: '*  Proveedor',
                            labelWidth: 140,
                            id: 'proveedorProducto',
                            name: 'proveedorProducto',
                            autoSelect: false,
                            allowBlank: false,
                            editable: false,
                            triggerAction: 'all',
                            typeAhead: true,
                            anchor: '100%',
                            enableKeyEvents: true,
                            queryMode: 'local',
                            store: store,
                            displayField: 'empresa_proveedor',
                            valueField: 'id_proveedor',
                            msgTarget: 'side', 
                            emptyText: '--Seleccione un proveedor--',                                                   

                        },]                
                    },
                    {
                        columnWidth: .49,                
                        layout: 'form', 
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:10px; border:none;margin-top:2px',
                        items:[{          
                            layout: 'column',
                            bodyStyle: '/*background:#DFE8F6*/; border:none;',
                            items:[{
                                columnWidth: .53,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; border:none;',
                                items:[{
                                    xtype: 'checkbox',
                                    labelWidth: 160,
                                    fieldLabel: '&nbsp;&nbsp;&nbsp;Iva',
                                    name: 'ivaProducto',
                                    id: 'ivaProducto',
                                    uncheckedValue: false,
                                    inputValue: true,               
                                },{
                                    xtype: 'checkbox',
                                    labelWidth: 160,
                                    fieldLabel: '&nbsp;&nbsp;&nbsp;Es inventariable',
                                    name: 'esInventariable',
                                    id: 'esInventariable',
                                    uncheckedValue: false,
                                    inputValue: true,                                  
                                },{
                                    xtype: 'checkbox',
                                    labelWidth: 160,
                                    fieldLabel: '&nbsp;&nbsp;&nbsp;Controla Stock',
                                    name: 'controlaStock',
                                    id: 'controlaStock',
                                    uncheckedValue: false,
                                    inputValue: true, 
                                },{
                                    xtype: 'checkbox',
                                    labelWidth: 160,
                                    fieldLabel: '&nbsp;&nbsp;&nbsp;Es Insumo',
                                    name: 'esInsumo',
                                    id: 'esInsumo',
                                    uncheckedValue: false,
                                    inputValue: true
                                },]
                            },{
                                columnWidth: .47,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; border:none;',
                                items:[{
                                    xtype: 'checkbox',
                                    labelWidth: 140,
                                    fieldLabel: '&nbsp;&nbsp;&nbsp;Unidad',
                                    name: 'unidad',
                                    id: 'unidad',
                                    uncheckedValue: false,
                                    inputValue: true
                                },{
                                    xtype: 'checkbox',
                                    labelWidth: 140,
                                    fieldLabel: '&nbsp;&nbsp;&nbsp;Es de servicio',
                                    name: 'esDeServicio',
                                    id: 'esDeServicio',
                                    uncheckedValue: false,
                                    inputValue: true
                                },{
                                    xtype: 'checkbox',
                                    labelWidth: 140,
                                    fieldLabel: '&nbsp;&nbsp;&nbsp;No vendible',
                                    name: 'noVendible',
                                    id: 'noVendible',
                                    uncheckedValue: false,
                                    inputValue: true
                                }]                      
                            },]                           
                        },{                   
                            xtype: 'combo',
                            fieldLabel: '&nbsp;&nbsp;&nbsp;Familia',
                            labelWidth: 140,
                            id: 'familiaProducto',
                            name: 'familiaProducto',
                            autoSelect: false,
                            allowBlank: true,
                            editable: false,
                            triggerAction: 'all',
                            typeAhead: true,
                            anchor: '100%',
                            enableKeyEvents: true,
                            queryMode: 'local',
                            store: store1,
                            displayField: 'nombre_familia',
                            valueField: 'id_familia',
                            msgTarget: 'side',                                                                                                                  
                        }, 
                        {
                            xtype: 'combo',
                            fieldLabel: '&nbsp;&nbsp;&nbsp;Marca',
                            labelWidth: 140,
                            id: 'marcaProducto',
                            name: 'marcaProducto',
                            autoSelect: false,
                            allowBlank: true,
                            editable: false,
                            triggerAction: 'all',
                            typeAhead: true,
                            anchor: '100%',
                            enableKeyEvents: true,
                            queryMode: 'local',
                            store: store2,
                            displayField: 'nombre_marca',
                            valueField: 'id_marca',
                            msgTarget: 'side',                                              
                        }, 
                        {                       
                            xtype: 'combo',
                            fieldLabel: '&nbsp;&nbsp;&nbsp;Línea',
                            labelWidth: 140,
                            id: 'lineaProducto',
                            name: 'lineaProducto',
                            autoSelect: false,
                            allowBlank: true,
                            editable: false,
                            triggerAction: 'all',
                            typeAhead: true,
                            anchor: '100%',
                            enableKeyEvents: true,
                            queryMode: 'local',
                            store: store3,
                            displayField: 'nombre_linea',
                            valueField: 'id_linea',
                            msgTarget: 'side',                                                 
                        }, 
                        {                     
                            xtype: 'combo',
                            fieldLabel: '&nbsp;&nbsp;&nbsp;Categoría',
                            labelWidth: 140,
                            id: 'categoriaProducto',
                            name: 'categoriaProducto',
                            autoSelect: false,
                            allowBlank: true,
                            editable: false,
                            triggerAction: 'all',
                            typeAhead: true,
                            anchor: '100%',
                            enableKeyEvents: true,
                            queryMode: 'local',
                            store: store4,
                            displayField: 'nombre_categoria',
                            valueField: 'id_categoria',
                            msgTarget: 'side',                                               
                        },{                      
                            xtype: 'combo',
                            fieldLabel: '&nbsp;&nbsp;&nbsp;Procedencia',
                            labelWidth: 140,
                            id: 'procedenciaProducto',
                            name: 'procedenciaProducto',
                            autoSelect: false,
                            allowBlank: true,
                            editable: false,
                            triggerAction: 'all',
                            typeAhead: true,
                            anchor: '100%',
                            enableKeyEvents: true,
                            queryMode: 'local',
                            store: store5,
                            displayField: 'nombre_procedencia',
                            valueField: 'id_procedencia',
                            msgTarget: 'side',                                          
                        }, 
                        {
                            fieldLabel: '&nbsp;&nbsp;&nbsp;TipoProducto',
                            labelWidth: 160,                    
                            xtype: 'combo',     
                            name: 'tipoProducto',                    
                            id: 'tipoProducto',                    
                            anchor: '100%',            
                            autoSelect: false,
                            allowBlank: true,
                            editable: false,
                            triggerAction: 'all',
                            typeAhead: true,
                            anchor: '100%',
                            enableKeyEvents: true,
                            queryMode: 'local',
                            store: store6,
                            displayField: 'descripcion',
                            valueField: 'codigo',
                            msgTarget: 'side',
                            value:'1',                                          
                        },{
                            fieldLabel: '* Fecha creación',
                            labelWidth: 160,                   
                            name: 'fechaCreacion',                    
                            id:'fechaCreacion',                                            
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            submitFormat: 'Y-m-d',
                            allowBlank: false, 
                            value: new Date(),                                                  
                        },{
                            fieldLabel: '&nbsp;&nbsp;&nbsp;Aplicación',
                            labelWidth: 160,
                            name:'aplicacionProducto',
                            anchor: '100%',
                            allowBlank:true,
                            msgTarget: 'side',
                            x: 5,
                            y: 30,
                            xtype: 'textarea'
                        }]
                    }]                    
                }]                                            
            },
            {
                layout: 'form',
                title: 'Cuentas Contables',
                bodyStyle: 'background:#DFE8F6; padding:10px;',                        
                //height: 545,                        
                defaults: {
                    anchor: '95%',
                    msgTarget: 'side'
                },                
                items: [{
                    layout: 'column',  
                    height:150,
                    items:[{
                    columnWidth: .20,
                        layout: 'form',                         
                        labelWidth: 200,
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:10px; border:none;margin-top:2px',
                        items:[
                        {                            
                            fieldLabel: '* Ventas',                            
                            text:'* Ventas:',
                            xtype:'label',   
                            labelWidth: 200,
                            style: 'line-height:22px;',
                        },
                        {                            
                            fieldLabel: '* Inventarios / servicios',                            
                            text:'* Inventarios / servicios:',
                            xtype:'label',   
                            labelWidth: 200, 
                            style: 'line-height:22px;',                           
                        },
                        {                            
                            fieldLabel: '* Costos',                            
                            text:'* Costos:',
                            xtype:'label',   
                            labelWidth: 200,
                            style: 'line-height:23px;',
                        },
                        {                            
                            fieldLabel: '* Descuento ventas',                            
                            text:'* Descuento ventas:',
                            xtype:'label',   
                            labelWidth: 200,
                            style: 'line-height:23px;',
                        },
                        {                            
                            fieldLabel: '* Devolución ventas',                            
                            text:'* Devolución ventas:',
                            xtype:'label',   
                            labelWidth: 200,
                            style: 'line-height:25px;',
                        },]                
                    },
                    {
                        columnWidth: .05,                
                        layout: 'form', 
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:10px; border:none;margin-top:2px',
                        items:[{
                            fieldLabel: '* Ventas',                            
                            text:'....',
                            xtype:'button',  
                            id:'botonVentas',                         
                            name:'botonVentas',
                            
                        },{
                            fieldLabel: '* Inventario / servicios',
                            text:'....',
                            xtype:'button',  
                            id:'botonInventario',                         
                            name:'botonInventario',
                            style: 'margin-top:2px',                            
                        },{
                            fieldLabel: '* Costos',                            
                            text:'....',
                            xtype:'button',  
                            id:'botonCostos',                         
                            name:'botonCostos',
                            style: 'margin-top:2px',                            
                        },{
                            fieldLabel: '* Descuento ventas',                            
                            text:'....',
                            xtype:'button',  
                            id:'botonDescuento',                         
                            name:'botonDescuento',
                            style: 'margin-top:2px',                            
                        },{
                            fieldLabel: '* Devolución ventas',                            
                            text:'....',
                            xtype:'button',  
                            id:'botonDevolucion',                         
                            name:'botonDevolucion',
                            style: 'margin-top:2px',                            
                        }, ]
                    },{
                        columnWidth: .25,                
                        layout: 'form', 
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:10px; border:none;margin-top:2px',
                        items:[{
                            fieldLabel: 'Venta Mercadería',                            
                            xtype: 'textfield',
                            name: 'ventaMercaderia',
                            id:'ventaMercaderia',
                            anchor: '100%',
                            readOnly:true,
                            msgTarget: 'side',                                                
                            hideLabel: true,
                            allowBlank:true,
                            flex: 1,                 
                        },{ 
                            fieldLabel: 'Inventario Productos Terminados',
                            xtype: 'textfield',
                            name: 'inventarioProductos',
                            id:'inventarioProductos',
                            anchor: '100%',
                            readOnly:true,
                            msgTarget: 'side',                    
                            hideLabel: true,
                            allowBlank:true,
                            flex: 1,                   
                        },{
                            fieldLabel: 'Costos',                           
                            xtype: 'textfield',
                            name: 'costosInventario',
                            id:'costosInventario',
                            anchor: '100%',
                            allowBlank: false,
                            readOnly:true,
                            msgTarget: 'side',                    
                            hideLabel: true,
                            allowBlank:true,
                            flex: 1,
                        },{
                            fieldLabel: 'Descuento Ventas',                          
                            xtype: 'textfield',
                            name: 'descuentoVentas',
                            id:'descuentoVentas',
                            anchor: '100%',
                            readOnly:true,
                            msgTarget: 'side',                    
                            hideLabel: true,
                            allowBlank:true,
                            flex: 1,                   
                        },{
                            fieldLabel: 'Devolución ventas',                         
                            xtype: 'textfield',
                            name: 'devolucionVentas',
                            id:'devolucionVentas',
                            anchor: '100%',                            
                            msgTarget: 'side',  
                            allowBlank:true,                  
                            readOnly:true,
                            hideLabel: true,
                            flex: 1,                   
                        }, ]
                       
                    },{                        
                        columnWidth: .30,                                       
                        layout: 'form', 
                         autoHeight: true,                        
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:10px; border:none;margin-top:2px',
                        items:[{
                            xtype: 'label',
                            forId: 'ventasId',
                            text: 'Ventas Mercadería',                            
                            style: 'line-height:22px;',
                            
                        },{
                            xtype: 'label',
                            forId: 'inventarioId',
                            text: 'Inventario Productos Terminados',
                            style: 'line-height:22px;',
                        },{
                            xtype: 'label',
                            forId: 'costosId',
                            text: 'Costos de Ventas Mercaderías',
                            style: 'line-height:23px;',
                        },{
                            xtype: 'label',
                            forId: 'descuentoId',
                            text: '(-) Descuentos en ventas',
                            style: 'line-height:23px;',
                        },{
                            xtype: 'label',
                            forId: 'devolucionId',
                            text: '(-) Devolución en ventas',                            
                            style: 'line-height:25px;',                           
                        }, ]                    
                    }]                        
                }]
            }]   
        }];
        var boton=[            
            {
                text: 'Guardar',
                iconCls: 'add', 
                cls:'x-btn-blue',                
                formBind: true,
                handler: function() {                                        
                    frmProductos.getForm().submit({
                        method: 'POST',
                        waitTitle: 'Conectando',
                        waitMsg: 'Enviando datos...',
                        success: function() {                           
                            frmProductos.getForm().reset();                            
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                            jQuery("input[name='operIngresoEmpresa']").val('add');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                frmProductos.getForm().reset();                                                                   
                            }
                            else
                            {
                                Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
                                frmProductos.getForm().reset();
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
                    frmProductos.getForm().reset();
                }
            },           
            {
                text: 'Cancelar',
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
                    ventanaBuscarProducto();                    
                }
            },
        ];           
        var frmProductos = new Ext.FormPanel({            
            url: '../servidor/productos/productos.php',
            frame: true,
            monitorValid: true,
            items: items,
            buttons: boton
        });
        var win = desktop.getWindow('producto' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'producto' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 900,
                //height:600,
                resizable: false,
                plain: true,
                border: false,
                items: [frmProductos],

            });
        }
        win.show(); 
        return win;     
    },
});
    /////////modificacion y busqueda de ventanas////////
    /////////////buscar productos//   
    function ventanaBuscarProducto(){
        Ext.onReady(function() {
            Ext.QuickTips.init();
            var formulario = new Ext.FormPanel({
                labelWidth: 80,
                frame: true,
                defaultType: 'textfield',
                monitorValid: true,
                title:'Lista de Productos', 
                html: '<table id="tablaProductos" style="font-size:12px;"></table><div id="pgTablaProductos"></div>'
            });
            var win = new Ext.Window({
                layout: 'fit',
                width: 650,
                height: 270,
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
        function enviarDatosProductos(id) {
            var tabla = jQuery('#tablaProductos').jqGrid('getRowData', id);        
            jQuery("input[name='operIngresoProducto']").val('edit');
            jQuery("input[name='idIngresoProducto']").val(tabla.id_producto);
            jQuery("input[name='codigoProducto']").val(tabla.codigo_producto);
            jQuery("input[name='codigoBarrasProducto']").val(tabla.codigo_barras);
            jQuery("input[name='descripcionProducto']").val(tabla.descripcion);
            jQuery("input[name='precioCosto']").val(tabla.ult_precio_costo);
            jQuery("input[name='utilidadMinorista']").val(tabla.utilidad_minorista);
            jQuery("input[name='utilidadMayorista']").val(tabla.utilidad_mayorista);
            jQuery("input[name='descuentoMinorista']").val(tabla.descuento_minorista);
            jQuery("input[name='pvpSinIvaMin']").val(tabla.pvp_sin_iva_minorista);
            jQuery("input[name='pvpSinIvaMay']").val(tabla.pvp_sin_iva_may);
            jQuery("input[name='descuentoMayorista']").val(tabla.descuento_mayorista);
            jQuery("input[name='ultimaFechaCompra']").val(tabla.ult_fecha_compra);
            jQuery("input[name='stockMaximo']").val(tabla.stock_maximo);
            jQuery("input[name='stockPromedio']").val(tabla.stock_intermedio);
            jQuery("input[name='stockMinimo']").val(tabla.stock_minimo);
            jQuery("input[name='ubicacion1']").val(tabla.ubicacion1);
            jQuery("input[name='ubicacion2']").val(tabla.ubicacion2); 
            Ext.getCmp("proveedorProducto").setValue(parseInt(tabla.productos_id_proveedor));                       
            if(tabla.id_familia!=''){
                Ext.getCmp("familiaProducto").setValue(parseInt(tabla.id_familia));                       
            }
            if(tabla.id_marca!=''){
                Ext.getCmp("marcaProducto").setValue(parseInt(tabla.id_marca));                       
            }
            if(tabla.id_linea!=''){
                Ext.getCmp("lineaProducto").setValue(parseInt(tabla.id_linea));                       
            }
            if(tabla.id_categoria!=''){
                Ext.getCmp("categoriaProducto").setValue(parseInt(tabla.id_categoria));                       
            }
            if(tabla.id_procedencia!=''){
                Ext.getCmp("procedenciaProducto").setValue(parseInt(tabla.id_procedencia));                       
            }
            if (tabla.iva === 'false')
                Ext.getCmp('ivaProducto').setValue(false);
            else
                Ext.getCmp('ivaProducto').setValue(true);
            if (tabla.unidad === 'false')
                Ext.getCmp('unidad').setValue(false);
            else
                Ext.getCmp('unidad').setValue(true);
            if (tabla.es_inventariable === 'false')
                Ext.getCmp('esInventariable').setValue(false);
            else
                Ext.getCmp('esInventariable').setValue(true);
            if (tabla.es_de_servicio === 'false')
                Ext.getCmp('esDeServicio').setValue(false);
            else
                Ext.getCmp('esDeServicio').setValue(true);
            if (tabla.controla_stock === 'false')
                Ext.getCmp('controlaStock').setValue(false);
            else
                Ext.getCmp('controlaStock').setValue(true);
            if (tabla.no_vendible === 'false')
                Ext.getCmp('noVendible').setValue(false);
            else
                Ext.getCmp('noVendible').setValue(true);
            if (tabla.es_insumo === 'false')
                Ext.getCmp('esInsumo').setValue(false);
            else
                Ext.getCmp('esInsumo').setValue(true);
            jQuery("input[name='codigoBarrasProducto']").val(tabla.codigo_barras);
            jQuery("input[name='codigoBarrasProducto']").val(tabla.codigo_barras);
            jQuery("input[name='codigoBarrasProducto']").val(tabla.codigo_barras);
            jQuery("input[name='codigoBarrasProducto']").val(tabla.codigo_barras);
            jQuery("input[name='codigoBarrasProducto']").val(tabla.codigo_barras);
            Ext.getCmp('tipoProducto').setValue(tabla.tipo_producto);            
            jQuery("input[name='fechaCreacion']").val(tabla.fecha_creacion);
            jQuery("textarea[name='aplicacionProducto']").val(tabla.aplicacion);
            Ext.WindowManager.getActive().close();
        }
        jQuery(function() {
            var width = 630;
            jQuery("#tablaProductos").jqGrid({
                url: '../servidor/productos/productos_xml.php',
                datatype: "xml",
                width: width,
                colNames: ['idProducto','Código Producto','Código de barras','Descripción','Precio Costo','% Utilidad Minorista','% Utilidad Mayorista','% Descuento Min.','PVP sin IVA Min.','PVP sin IVA May.','Descuento May.','Ult. fecha compra','Stock Máximo','Stock Intermedio','Stock Mínimo','Ubicación 1','Ubicación 2','idProveedor','Proveedor','IVA','Unidad','Es inventariable','Es de servicio','Controla Stock','No Vendible','Es insumo','idFamilia','Familia','idMarca','Marca','idLinea','Línea','idCategoria','Categoría','idProcedencia','Procedencia','Tipo Producto','Fecha creación','Aplicación','Ventas','Inventario / Servicios','Costos','Descuento ventas','Devolución ventas'],
                colModel: [
                {
                    name:'id_producto',index:'id_producto',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'codigo_producto',index:'codigo_producto',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'codigo_barras',index:'codigo_barras',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'descripcion',index:'descripcion',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ult_precio_costo',index:'ult_precio_costo',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'utilidad_minorista',index:'utilidad_minorista',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                 
                {
                    name:'utilidad_mayorista',index:'utilidad_mayorista',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                 
                {
                    name:'descuento_minorista',index:'descuento_minorista',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'pvp_sin_iva_minorista',index:'pvp_sin_iva_minorista',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                
                {
                    name:'pvp_sin_iva_may',index:'pvp_sin_iva_may',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'descuento_mayorista',index:'descuento_mayorista',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ult_fecha_compra',index:'ult_fecha_compra',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'stock_maximo',index:'stock_maximo',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'stock_intermedio',index:'stock_intermedio',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                                                                         
                {
                    name:'stock_minimo',index:'stock_minimo',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ubicacion1',index:'ubicacion1',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'ubicacion2',index:'ubicacion2',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },  
                {
                    name:'productos_id_proveedor',index:'productos_id_proveedor',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'empresa_proveedor',index:'empresa_proveedor',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                
                {
                    name:'iva',index:'iva',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'unidad',index:'unidad',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'es_inventariable',index:'es_inventariable',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                
                {
                    name:'es_de_servicio',index:'es_de_servicio',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'controla_stock',index:'controla_stock',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'no_vendible',index:'no_vendible',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'es_insumo',index:'es_insumo',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'id_familia',index:'id_familia',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nombre_familia',index:'nombre_familia',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'id_marca',index:'id_marca',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nombre_marca',index:'nombre_marca',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'id_linea',index:'id_linea',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nombre_linea',index:'nombre_linea',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'id_categoria',index:'id_categoria',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nombre_categoria',index:'nombre_categoria',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'id_procedencia',index:'id_procedencia',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nombre_procedencia',index:'nombre_procedencia',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'tipo_producto',index:'tipo_producto',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'fecha_creacion',index:'fecha_creacion',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'aplicacion',index:'aplicacion',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'cuenta_ventas',index:'cuenta_ventas',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'cuenta_inventario_servicios',index:'cuenta_inventario_servicios',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'cuenta_costos',index:'cuenta_costos',editable:true,align:'center', search:false,frozen:false,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'cuenta_descuentos',index:'cuenta_descuentos',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'cuenta_devoluciones',index:'cuenta_devoluciones',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },

                                                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaProductos',
            sortname: 'id_producto',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarDatosProductos(rowid);                   
            }
        });  
        jQuery("#tablaProductos").jqGrid('hideCol', "id_producto");            
        jQuery("#tablaProductos").jqGrid('hideCol', "id_familia");            
        jQuery("#tablaProductos").jqGrid('hideCol', "id_marca");            
        jQuery("#tablaProductos").jqGrid('hideCol', "id_linea");            
        jQuery("#tablaProductos").jqGrid('hideCol', "id_procedencia");            
        jQuery("#tablaProductos").jqGrid('hideCol', "id_categoria");            
        jQuery("#tablaProductos").jqGrid('hideCol', "productos.id_proveedor");            
        jQuery("#tablaProductos").jqGrid('hideCol', "tipo_producto");            
        jQuery("#tablaProductos").jqGrid('navGrid', '#pgTablaProductos',
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
    function ventanaBuscarEmpresa(){
        Ext.onReady(function() {
            Ext.QuickTips.init();
            var formulario = new Ext.FormPanel({
                labelWidth: 80,
                frame: true,
                defaultType: 'textfield',
                monitorValid: true,
                title:'Lista de Empresas', 
                html: '<table id="tablaEmpresa" style="font-size:12px;"></table><div id="pgTablaEmpresa"></div>'
            });
            var win = new Ext.Window({
                layout: 'fit',
                width: 650,
                height: 270,
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
        function enviarDatosEmpresa(id) {
            var tabla = jQuery('#tablaEmpresa').jqGrid('getRowData', id);        
            jQuery("input[name='operIngresoEmpresa']").val('edit');
            jQuery("input[name='codigoEmpresa']").val(tabla.id_empresa);
            jQuery("input[name='rucEmpresa']").val(tabla.ruc_empresa);
            jQuery("input[name='direccionEmpresa']").val(tabla.direccion_empresa);            
            jQuery('input[name="telefonoEmpresa"]').val(tabla.telefono_empresa);      
            jQuery('input[name="faxEmpresa"]').val(tabla.fax_empresa);      
            jQuery("input[name='contadorEmpresa']").val(tabla.contador_empresa);
            jQuery("input[name='paisEmpresa']").val(tabla.pais_empresa);        
            jQuery('input[name="provinciaEmpresa"]').val(tabla.provincia_empresa);        
            jQuery("input[name='ciudadEmpresa']").val(tabla.ciudad_empresa);
            jQuery("input[name='autorizacionSri']").val(tabla.autorizacion_sri);
            jQuery("input[name='emailEmpresa']").val(tabla.email_empresa);            
            Ext.getCmp('estadoEmpresa').setValue(tabla.estado_empresa);            
            jQuery("input[name='asesorLegal']").val(tabla.asesor_legal);
            jQuery("input[name='representanteLegalEmpresa']").val(tabla.representante_legal);
            jQuery("input[name='ciRepresentanteLegal']").val(tabla.ci_representante_legal);
            
            //jQuery("input[name='modoCosteo']").val(tabla.nombre_modo);
            Ext.getCmp('modoCosteo').setValue(parseInt(tabla.id_modo_de_costeo));
            jQuery("textarea[name='comentarioEmpresa']").val(tabla.comentario_empresa);                
            //jQuery("input[name='inicioFacturaPre']").val(tabla.inicio_factura_pre);                
            Ext.getCmp('inicioFacturaPre').setValue(parseInt(tabla.inicio_factura_pre));
            //jQuery("input[name='numeroItemsFv']").val(tabla.nro_items_fv);                
            Ext.getCmp('numeroItemsFv').setValue(parseInt(tabla.nro_items_fv));
            jQuery("input[name='nombreEmpresa']").val(tabla.nombre_empresa);                
            Ext.getCmp('ivaEmpresa').setValue(parseInt(tabla.iva_empresa));
            //jQuery("input[name='ivaEmpresa']").val(tabla.iva_empresa);                
           // jQuery("input[name='añoContable']").val(tabla.anio_contable);                
            Ext.getCmp('añoContable').setValue(parseInt(tabla.anio_contable));
            jQuery("input[name='rucContador']").val(tabla.ruc_contador);                
            jQuery("textarea[name='descripcionEmpresa']").val(tabla.descripcion_empresa);                
            jQuery("input[name='EstablecimientoPuntoEmisionC']").val(tabla.establecimiento_p_emision_c);                
            jQuery("input[name='EstablecimientoPuntoEmisionV']").val(tabla.establecimiento_p_emision_v);                
            jQuery("input[name='EstablecimientoPuntoEmisionRC']").val(tabla.establecimiento_p_emision_rc);                
            jQuery("input[name='EstablecimientoPuntoEmisionPF']").val(tabla.establecimiento_p_emision_pf);                
            jQuery("input[name='nroAutorizacionC']").val(tabla.nro_autorizacion_c);                
            jQuery("input[name='nroAutorizacionV']").val(tabla.nro_autorizacion_v);                
            jQuery("input[name='nroAutorizacionRC']").val(tabla.nro_autorizacion_rc);                
            jQuery("input[name='nroAutorizacionPF']").val(tabla.nro_autorizacion_pf);                
            Ext.WindowManager.getActive().close();
        }
        jQuery(function() {
            var width = 630;
            jQuery("#tablaEmpresa").jqGrid({
                url: '../servidor/empresa/empresa_xml.php',
                datatype: "xml",
                width: width,
                colNames: ['Id','Nombre Empresa',
                'Ruc Empresa','Dirección','Teléfono',
                'Fax','Ruc Contador','Contador','Email',
                'Estado','País','Provincia','Ciudad',
                'Autorización Sri','Asesor Legal','CI representante legal',
                'Representante Legal','id_modo_costeo',
                'Modo Costeo','Descripción','Comentario',
                'Inicio de Factura','Nro. Items en la factura',
                'Iva Empresa','Año Contable','Establecimiento y punto de emisión C.',
                'Nro. Autorización C.','Establecimiento y punto de emisión V.',
                'Nro. Autorización V.','Establecimiento y punto de emisión R.C',
                'Nro. Autorización R.C','Establecimiento y punto de emisión PF.',
                'Nro. Autorización PF'],
                colModel: [
                {
                    name:'id_empresa',index:'id_empresa',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'nombre_empresa',index:'nombre_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ruc_empresa',index:'ruc_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'direccion_empresa',index:'direccion_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'telefono_empresa',index:'telefono_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'fax_empresa',index:'fax_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                 
                {
                    name:'ruc_contador',index:'ruc_contador',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                 
                {
                    name:'contador_empresa',index:'contador_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'email_empresa',index:'email_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                
                {
                    name:'estado_empresa',index:'estado_empresa',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'pais_empresa',index:'pais_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'provincia_empresa',index:'provincia_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'ciudad_empresa',index:'ciudad_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'autorizacion_sri',index:'autorizacion_sri',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                                                                         
                {
                    name:'asesor_legal',index:'asesor_legal',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ci_representante_legal',index:'ci_representante_legal',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'representante_legal',index:'representante_legal',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },  
                {
                    name:'id_modo_de_costeo',index:'id_modo_de_costeo',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nombre_modo',index:'nombre_modo',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'descripcion_empresa',index:'descripcion_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'comentario_empresa',index:'comentario_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'inicio_factura_pre',index:'inicio_factura_pre',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nro_items_fv',index:'nro_items_fv',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'iva_empresa',index:'iva_empresa',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'anio_contable',index:'anio_contable',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'establecimiento_p_emision_c',index:'establecimiento_p_emision_c',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nro_autorizacion_c',index:'nro_autorizacion_c',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'establecimiento_p_emision_v',index:'establecimiento_p_emision_v',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nro_autorizacion_v',index:'nro_autorizacion_v',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'establecimiento_p_emision_rc',index:'establecimiento_p_emision_rc',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nro_autorizacion_rc',index:'nro_autorizacion_rc',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'establecimiento_p_emision_pf',index:'establecimiento_p_emision_rc',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nro_autorizacion_pf',index:'nro_autorizacion_rc',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },

                                                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaEmpresa',
            sortname: 'id_empresa',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarDatosEmpresa(rowid);                   
            }
        });      
        jQuery("#tablaEmpresa").jqGrid('hideCol', "id_empresa");
        jQuery("#tablaEmpresa").jqGrid('hideCol', "id_modo_de_costeo");            
        jQuery("#tablaEmpresa").jqGrid('hideCol', "estadoe_empresa");            
        jQuery("#tablaEmpresa").jqGrid('navGrid', '#pgTablaEmpresa',
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
    function ventanaBuscarMarca() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Marcas', 
            html: '<table id="tablaMarca" style="font-size:11px;"></table><div id="pgTablaMarca"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 650,
            height: 280,
            closable: true,
            resizable: false,
            draggable: false,
            plain: true,
            border: false,
            modal: true,
            items: [formulario]
        });
        win.show();
    });   
    jQuery(function() {
        var width = 630;
        jQuery("#tablaMarca").jqGrid({
            url: '../servidor/marcas/marcas_xml.php',
            datatype: "xml",
            editurl: "../servidor/marcas/marcas.php",
            width: width,
            colNames: ['Código', 'Nombre Marca'],
            colModel: [
                {
                    name:'id_marca',index:'id_marca',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },
                {
                    name:'nombre_marca',index:'nombre_marca',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaMarca',
            sortname: 'id_marca',
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
                            $("#nombre_marca").val("");
                            $("#nombre_marca").focus();
                        }                        
                        if (response.responseText == "0") {
                            Ext.Msg.alert('Advertencia!', 'Datos Modificados');             
                            return true;
                        }
                    }
                });
            }
        });                 
        jQuery("#tablaMarca").jqGrid('navGrid', '#pgTablaMarca',
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
                    $("#nombre_marca").val("");
                    $("#nombre_marca").focus();
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
/////////////buscar categorias//    
    function ventanaBuscarCategoria() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,           
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Categorías', 
            html: '<table id="tablaCategoria" style="font-size:11px;"></table><div id="pgTablaCategoria"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 650,
            height: 280,
            closable: true,
            resizable: false,
            plain: true,
            border: false,
            modal: true,
            items: [formulario]
        });
        win.show();
    });   
    jQuery(function() {
        var width = 630;
        jQuery("#tablaCategoria").jqGrid({
            url: '../servidor/categorias/categorias_xml.php',
            datatype: "xml",
            editurl: "../servidor/categorias/categorias.php",
            width: width,
            colNames: ['Código', 'Nombre Categoría'],
            colModel: [
                {
                    name:'id_categoria',index:'id_categoria',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },
                {
                    name:'nombre_categoria',index:'nombre_categoria',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaCategoria',
            sortname: 'id_categoria',
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
                            $("#nombre_categoria").val("");
                            $("#nombre_categoria").focus();
                        }                        
                        if (response.responseText == "0") {
                            Ext.Msg.alert('Advertencia!', 'Datos Modificados');             
                            return true;
                        }
                    }
                });
            }
        });                 
        jQuery("#tablaCategoria").jqGrid('navGrid', '#pgTablaCategoria',
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
                    $("#nombre_categoria").val("");
                    $("#nombre_categoria").focus();
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
/////////////buscar procedencias//    
    function ventanaBuscarProcedencia() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Procedencias', 
            html: '<table id="tablaProcedencia" style="font-size:11px;"></table><div id="pgTablaProcedencia"></div>'
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
        jQuery("#tablaProcedencia").jqGrid({
            url: '../servidor/procedencias/procedencias_xml.php',
            datatype: "xml",
            editurl: "../servidor/procedencias/procedencias.php",
            width: width,
            colNames: ['Código', 'Nombre Procedencia'],
            colModel: [
                {
                    name:'id_procedencia',index:'id_procedencia',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },
                {
                    name:'nombre_procedencia',index:'nombre_procedencia',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaProcedencia',
            sortname: 'id_procedencia',
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
                            $("#nombre_procedencia").val("");
                            $("#nombre_procedencia").focus();
                        }                        
                        if (response.responseText == "0") {
                            Ext.Msg.alert('Advertencia!', 'Datos Modificados');             
                            return true;
                        }
                    }
                });
            }
        });                 
        jQuery("#tablaProcedencia").jqGrid('navGrid', '#pgTablaProcedencia',
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
                    $("#nombre_procedencia").val("");
                    $("#nombre_procedencia").focus();
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
/////////////buscar familias//    
    function ventanaBuscarFamilias() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Familias', 
            html: '<table id="tablaFamilia" style="font-size:11px;"></table><div id="pgTablaFamilia"></div>'
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
        jQuery("#tablaFamilia").jqGrid({
            url: '../servidor/familias/familias_xml.php',
            datatype: "xml",
            editurl: "../servidor/familias/familias.php",
            width: width,
            colNames: ['Código', 'Nombre Familia'],
            colModel: [
                {
                    name:'id_familia',index:'id_familia',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },
                {
                    name:'nombre_familia',index:'nombre_familia',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaFamilia',
            sortname: 'id_familia',
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
                            $("#nombre_familia").val("");
                            $("#nombre_familia").focus();
                        }                        
                        if (response.responseText == "0") {
                            Ext.Msg.alert('Advertencia!', 'Datos Modificados');             
                            return true;
                        }
                    }
                });
            }
        });                 
        jQuery("#tablaFamilia").jqGrid('navGrid', '#pgTablaFamilia',
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
                    $("#nombre_familia").val("");
                    $("#nombre_familia").focus();
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
/////////////buscar linea//    
    function ventanaBuscarLinea() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Líneas', 
            html: '<table id="tablaLinea" style="font-size:12px;"></table><div id="pgTablaLinea"></div>'
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
        jQuery("#tablaLinea").jqGrid({
            url: '../servidor/lineas/lineas_xml.php',
            datatype: "xml",
            editurl: "../servidor/lineas/lineas.php",
            width: width,
            colNames: ['Id', 'Nombre Línea'],
            colModel: [
                {
                    name:'id_linea',index:'id_linea',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'nombre_linea',index:'nombre_linea',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaLinea',
            sortname: 'id_linea',
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
                            $("#nombre_linea").val("");
                            $("#nombre_linea").focus();
                        }                        
                        if (response.responseText == "0") {
                            Ext.Msg.alert('Advertencia!', 'Datos Modificados');             
                            return true;
                        }
                    }
                });
            }
        });                 
        jQuery("#tablaLinea").jqGrid('navGrid', '#pgTablaLinea',
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
                    $("#nombre_linea").val("");
                    $("#nombre_linea").focus();
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
/////////////buscar forma pago//    
    function ventanaBuscarForma() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista Formas de pago', 
            html: '<table id="tablaForma" style="font-size:12px;"></table><div id="pgTablaForma"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 650,
            height: 270,
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
        jQuery("#tablaForma").jqGrid({
            url: '../servidor/formas_pago/formas_pago_xml.php',
            datatype: "xml",
            editurl: "../servidor/formas_pago/formas_pago.php",
            width: width,
            colNames: ['Id','Código', 'Forma Pago'],
            colModel: [
                {
                    name:'id_formas_pagos',index:'id_formas_pagos',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'codigo',index:'codigo',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'nombre_forma',index:'nombre_forma',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaForma',
            sortname: 'id_formas_pagos',
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
                        if (response.responseText == "2") {
                            return [false, "Error este código ya existe ingrese otro"];
                            $("#codigo").val("");
                            $("#codigo").focus();
                        } 
                        if (response.responseText == "1") {
                            return [false, "Error este nombre ya existe ingrese otro"];
                            $("#nombre_forma").val("");
                            $("#nombre_forma").focus();
                        }                        
                        if (response.responseText == "0") {
                            Ext.Msg.alert('Advertencia!', 'Datos Modificados');             
                            return true;
                        }
                    }
                });
            }
        });                 
        jQuery("#tablaForma").jqGrid('navGrid', '#pgTablaForma',
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
                if (response.responseText == "2") {
                    return [false, "Error este código ya existe ingrese otro"];
                    $("#codigo").val("");
                    $("#codigo").focus();
                } 
                if (response.responseText == "1") {
                    return [false, "Error este nombre ya existe ingrese otro"];
                    $("#nombre_forma").val("");
                    $("#nombre_forma").focus();
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
/*****busqueda Ventana Cliente******/
function ventanaClientes() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Clientes', 
            html: '<table id="tablaCliente" style="font-size:12px;"></table><div id="pgTablaCliente"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 650,
            height: 270,
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
    function enviarDatosCliente(id) {
        var tabla = jQuery('#tablaCliente').jqGrid('getRowData', id);        
        //jQuery("input[name='ruc_ced_pass_cliente']").focus();
        jQuery("input[name='operIngresoCliente']").val('edit');
        jQuery("input[name='idIngresoCliente']").val(tabla.id_cliente);
        if (tabla.mayorista === 'false')
            Ext.getCmp('mayominoCliente').setValue(false);
        else
            Ext.getCmp('mayominoCliente').setValue(true);       
        Ext.getCmp('tipoDocumentoIngresoCliente').setValue(tabla.documento); 
        jQuery("input[name='ruc_ced_pass_cliente']").val(tabla.ci_ruc_pass);
        jQuery("input[name='nombreCompletoIngresoCliente']").val(tabla.nombres_cliente);
        Ext.getCmp('tipoCliente').setValue(parseInt(tabla.id_tipo_cliente));
        //jQuery('input[name="tipoCliente"]').val(tabla.nombre_tipo_cliente);
        //jQuery("input[name='tipoCliente']").val(tabla.id_tipo_cliente);
        jQuery("input[name='profesionCliente']").val(tabla.profesionCliente);
        jQuery("input[name='codigoCliente']").val(tabla.id_cliente);
        jQuery("input[name='direccionCliente']").val(tabla.direccion_cliente);
        jQuery("input[name='paisCliente']").val(tabla.pais_cliente);
        jQuery("textarea[name='referenciasCliente']").val(tabla.referencias_cliente);
        jQuery("input[name='telefono1Cliente']").val(tabla.telefono1_cliente);
        jQuery("input[name='ciudadCliente']").val(tabla.ciudad_cliente);
        Ext.getCmp('estadoCliente').setValue(tabla.estadoCliente);
        jQuery("input[name='cupoCreditoCliente']").val(tabla.cupo_credito);
        jQuery("input[name='telefono2Cliente']").val(tabla.telefono2_cliente);
        jQuery("input[name='emailCliente']").val(tabla.correo_cliente);
        jQuery("input[name='saldoCreditoCliente']").val(tabla.saldo_credito);
        Ext.WindowManager.getActive().close();

    }
    jQuery(function() {
        var width = 630;
        jQuery("#tablaCliente").jqGrid({
            url: '../servidor/clientes/clientes_xml.php',
            datatype: "xml",
            //editurl: "../servidor/formas_pago/formas_pago.php",
            width: width,
            colNames: ['Id','Documento','Nro. Documento','Nombres Completos','idTipoCliente','Tipo Cliente','Dirección','País','Ciudad','Correo','Teléfono1','Teléfono2','Profesión','Referencias','Es Mayorista','Cupo Crédito','Saldo Crédito','estado'],
            colModel: [
                {
                    name:'id_cliente',index:'id_cliente',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'documento',index:'documento',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ci_ruc_pass',index:'ci_ruc_pass',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'nombres_cliente',index:'nombres_cliente',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'id_tipo_cliente',index:'id_tipo_cliente',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'nombre_tipo_cliente',index:'nombre_tipo_cliente',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'direccion_cliente',index:'direccion_cliente',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'pais_cliente',index:'pais_cliente',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ciudad_cliente',index:'ciudad_cliente',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'correo_cliente',index:'correo_cliente',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'telefono1_cliente',index:'telefono1_cliente',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'telefono2_cliente',index:'telefono2_cliente',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'profesionCliente',index:'profesionCliente',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'referencias_cliente',index:'referencias_cliente',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'mayorista',index:'mayorista',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'cupo_credito',index:'cupo_credito',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'saldo_credito',index:'saldo_credito',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                                              
                {
                    name:'estadoCliente',index:'estadoCliente',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaCliente',
            sortname: 'id_cliente',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarDatosCliente(rowid);                   
            }
        });      
        jQuery("#tablaCliente").jqGrid('hideCol', "id_cliente");
        jQuery("#tablaCliente").jqGrid('hideCol', "estadoCliente");    
        jQuery("#tablaCliente").jqGrid('hideCol', "id_tipo_cliente");    
        jQuery("#tablaCliente").jqGrid('navGrid', '#pgTablaCliente',
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
/*****busqueda ventana proveedores******/
function ventanaProveedores() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Proveedores', 
            html: '<table id="tablaProveedores" style="font-size:12px;"></table><div id="pgTablaProveedores"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 650,
            height: 270,
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
    function enviarDatosProveedor(id) {
        var tabla = jQuery('#tablaProveedores').jqGrid('getRowData', id);        
        //jQuery("input[name='ruc_ced_pass_cliente']").focus();
        jQuery("input[name='operIngresoProveedores']").val('edit');
        jQuery("input[name='idIngresoProveedores']").val(tabla.id_proveedor);
        jQuery("input[name='codigoProveedor']").val(tabla.id_proveedor);
        if (tabla.proveedor_principal === 'false')
            Ext.getCmp('proveedorPrincipal').setValue(false);
        else
            Ext.getCmp('proveedorPrincipal').setValue(true); 
        //jQuery('input[name="tipoProveedor"]').val(tabla.nombre_tipo_cliente);      
        Ext.getCmp('tipoProveedor').setValue(parseInt(tabla.id_tipo_cliente)); 
        //jQuery('input[name="formaPagoProveedor"]').val(tabla.nombre_forma);      
        Ext.getCmp('formaPagoProveedor').setValue(parseInt(tabla.id_forma_pago)); 
        Ext.getCmp('tipoDocumentoIngresoProveedor').setValue(tabla.tipo_documento); 
        jQuery("input[name='ruc_ced_pass_proveedor']").val(tabla.ci_ruc_pass);
        jQuery("input[name='empresaProveedor']").val(tabla.empresa_proveedor);        
        jQuery('input[name="representanteLegal"]').val(tabla.representante_legal);        
        jQuery("input[name='visitadorProveedor']").val(tabla.visitador);
        jQuery("input[name='direccionProveedor']").val(tabla.direccion_proveedor);
        jQuery("input[name='telefono1Proveedor']").val(tabla.telefono1_proveedor);
        jQuery("input[name='telefono2Proveedor']").val(tabla.telefono2_proveedor);
        jQuery("input[name='faxProveedor']").val(tabla.fax_proveedor);
        jQuery("input[name='paisProveedor']").val(tabla.pais_proveedor);
        jQuery("input[name='ciudadProveedor']").val(tabla.ciudad_proveedor);
        Ext.getCmp('estadoProveedor').setValue(tabla.estado_proveedor);
        jQuery("textarea[name='observacionesProveedor']").val(tabla.observaciones_proveedor);
        jQuery("input[name='emailProveedor']").val(tabla.email_proveedor);                
        Ext.WindowManager.getActive().close();

    }
    jQuery(function() {
        var width = 630;
        jQuery("#tablaProveedores").jqGrid({
            url: '../servidor/proveedor/proveedor_xml.php',
            datatype: "xml",
            //editurl: "../servidor/formas_pago/formas_pago.php",
            width: width,
            colNames: ['Id','Documento','Nro. Documento','Empresa Proveedor','Representante Legal','Visitador','Dirección','Teléfono1','Teléfono2','Fax','País','Ciudad','Estado','Observaciones','Email','Proveedor Principal','id_tipo_cliente','Tipo Proveedor','id_forma_pago','Forma Pago Preferida'],
            colModel: [
                {
                    name:'id_proveedor',index:'id_proveedor',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'tipo_documento',index:'tipo_documento',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ci_ruc_pass',index:'ci_ruc_pass',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'empresa_proveedor',index:'empresa_proveedor',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'representante_legal',index:'representante_legal',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'visitador',index:'visitador',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                 
                {
                    name:'direccion_proveedor',index:'direccion_proveedor',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                 
                {
                    name:'telefono1_proveedor',index:'telefono1_proveedor',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'telefono2_proveedor',index:'telefono2_proveedor',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'fax_proveedor',index:'fax_proveedor',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'pais_proveedor',index:'pais_proveedor',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ciudad_proveedor',index:'ciudad_proveedor',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'estado_proveedor',index:'estado_proveedor',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'observaciones_proveedor',index:'observaciones_proveedor',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'email_proveedor',index:'email_proveedor',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },  
                {
                    name:'proveedor_principal',index:'proveedor_principal',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                                                        
                {
                    name:'id_tipo_cliente',index:'id_tipo_cliente',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'nombre_tipo_cliente',index:'nombre_tipo_cliente',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'id_forma_pago',index:'id_forma_pago',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },  
                {
                    name:'nombre_forma',index:'nombre_forma',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                                                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaProveedores',
            sortname: 'id_proveedor',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarDatosProveedor(rowid);                   
            }
        });      
        jQuery("#tablaProveedores").jqGrid('hideCol', "id_proveedor");
        jQuery("#tablaProveedores").jqGrid('hideCol', "estado_proveedor");    
        jQuery("#tablaProveedores").jqGrid('hideCol', "id_tipo_cliente");    
        jQuery("#tablaProveedores").jqGrid('hideCol', "id_forma_pago");    
        jQuery("#tablaProveedores").jqGrid('navGrid', '#pgTablaProveedores',
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
 
    


