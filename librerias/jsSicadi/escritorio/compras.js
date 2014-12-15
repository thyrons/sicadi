Ext.define('MyDesktop.compras', {
    extend: 'Ext.ux.desktop.Module',    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.tip.QuickTipManager',
        'Ext.toolbar.Paging',
        'Ext.form.*'
    ],
    productosBodega: function(src) {
        var desktop = this.app.getDesktop();           
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones(); 
        Ext.define('ServiceList2', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_sustento', type: 'int'},
                {name: 'tipo_sustento', type: 'string'}
            ]
        }); 
        Ext.define('ServiceList3', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_comprobante', type: 'int'},
                {name: 'tipo_comprobante', type: 'string'}
            ]
        }); 
        var store1 = ['Cédula','Ruc','Pasaporte']; 
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
                url: '../servidor/general/cargar_comprobante.php'
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
                url: '../servidor/general/cargar_sustento.php'
            }
        });  

        var  items=[{
            xtype: 'tabpanel',
            plain: true,
            activeTab: 0,
            autoHeight: true,
            deferredRender: false,    
            items: [{
                layout: 'form',
                title: 'Detalles de la factura',
                autoHeight: true,
                bodyStyle: 'background:#DFE8F6;', //or if you set it to none, you will see through it.                
                defaults: {
                    anchor: '95%',
                    msgTarget: 'side'
                },
                items: [{
                    xtype: 'fieldset',
                    title: 'Datos Principales',
                    collapsible: true,
                    layout: 'anchor',

                    defaults: {
                        anchor: '100%'
                    },
                    items: [{
                        layout: 'column',
                        bodyStyle: 'border-bottom:none;',
                        items:[{
                            columnWidth: .33,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                            items:[{
                                xtype: 'textfield',
                                name: 'operIngresoCompra',
                                hidden: true,
                                value: 'add'
                            },{
                                xtype: 'textfield',
                                name: 'idFacturaCompraC',
                                hidden: true,
                                value: 'add'    
                            },{                            
                                xtype: 'textfield',
                                fieldLabel: '* Comprobante Nro.',                                                                                           
                                labelPad:2,           
                                labelWidth: 150,                                                                
                                name:'comprobanteNroC', 
                                allowBlank:false,    
                                anchor:"100%",   
                                readOnly:true,
                                value:id_cabCompras(),                                
                            },{                            
                                xtype: 'textfield',
                                fieldLabel: '* Orden de compra Nro.',                                                                                           
                                labelPad:2,           
                                labelWidth: 140,                                                                
                                name:'ordenCompraNroC', 
                                allowBlank:false,    
                                anchor:"100%",                                   
                            },]
                        },{                         
                            columnWidth: .33,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                            items:[{
                                xtype: 'textfield',
                                fieldLabel: '* Sección',                                                                                           
                                labelPad:2,           
                                labelWidth: 130,                                                                  
                                name:'seccionC', 
                                allowBlank:false,    
                                anchor:"100%",   
                                readOnly:true,
                                value:id_seccion(),                                      
                            },{                            
                                xtype: 'textfield',
                                fieldLabel: '* Hora',                                                                                           
                                labelPad:2,           
                                labelWidth: 130,                                                                
                                name:'horaC',
                                id:'horaC', 
                                allowBlank:false,    
                                anchor:"100%",   
                                readOnly:true,
                                value:horaActual(),                                
                            },
                            ]                           
                        },{                            
                            columnWidth: .34,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                            items:[{
                                fieldLabel: '* Fecha',
                                labelWidth: 130,                   
                                name: 'fechaCabCompraC',                    
                                id:'fechaCabCompraC',                                            
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                submitFormat: 'Y-m-d',
                                allowBlank: false, 
                                value: new Date(),                                  
                            },
                            {
                                xtype: "radiogroup",
                                fieldLabel: "* Devolución de Iva",
                                labelWidth: 130,   
                                id: "devIva",
                                defaults: {
                                    xtype: "radio",
                                    name: "devIvaC"
                                },
                                items: [
                                {
                                    boxLabel: "Si",
                                    inputValue: "si",
                                },
                                {
                                    boxLabel: "No",
                                    inputValue: "no",
                                     checked: true,
                                },                                
                                ]                            
                            },
                            ]                        
                        },]
                    },{                        
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border-top:none;border-bottom:none;',
                        items:[{
                            xtype: 'combo',
                            fieldLabel: '* Identifique el tipo de sustento tributario que le corresponde a esta transacción',                                                                                           
                            labelPad:2,           
                            labelWidth: 450,                                                                
                            name:'tipoTransaccionC', 
                            id:'tipoTransaccionC',                             
                            anchor:"100%", 
                            autoSelect: false,
                            allowBlank: false,
                            editable: false,
                            triggerAction: 'all',
                            typeAhead: true,                    
                            enableKeyEvents: true,
                            queryMode: 'local',
                            store: store2,
                            displayField: 'tipo_sustento',
                            valueField: 'id_sustento',
                            msgTarget: 'side',     
                        }]                                 
                    },{
                        layout: 'column',
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border-top:none;border-bottom:none;',
                        items:[{
                            columnWidth: .25,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/; border:none;',
                            items:[{ 
                                xtype: 'combo',
                                fieldLabel: '* Proveedor',
                                labelWidth: 80,
                                id: 'tipoProveedorC',
                                name: 'tipoProveedorC',
                                autoSelect: false,
                                allowBlank: false,
                                editable: false,
                                triggerAction: 'all',
                                typeAhead: true,
                                anchor: '100%',
                                enableKeyEvents: true,
                                queryMode: 'local',          
                                store: store1,
                                displayField: 'descripcion',
                                valueField: 'codigo',
                                msgTarget: 'side',

                            }]
                        },{
                            columnWidth: .35,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                xtype: 'textfield',
                                fieldLabel: '* Número de identificación',                                                                                           
                                labelPad:2,           
                                labelWidth: 160,                                                                
                                name:'nroIdentificacionC', 
                                id:'nroIdentificacionC', 
                                
                                anchor:"100%",
                                enableKeyEvents: true,
                                listeners: {                                                            
                                    specialkey: function(field, e){
                                        if (e.getKey() == e.ENTER || e.getKey() === e.TAB ) {                                            
                                            cargaProv(Ext.getCmp("tipoProveedorC").getValue(),Ext.getCmp("nroIdentificacionC").getValue());

                                        }
                                    }
                                }    
                            }]
                        },{
                            columnWidth: .05,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/; padding-left:10px;border:none;',
                            items:[{
                                fieldLabel: '* Buscar',                            
                                text:'....',
                                xtype:'button',  
                                id:'botonBuscarC',                          
                                name:'botonBuscarC',
                                handler: function() {
                                    ventanaProveedores1();                    
                                }
                            }]
                        },{
                            columnWidth: .35,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/; border:none;',
                            items:[{
                                fieldLabel: 'Nombre Proveedor',                            
                                xtype: 'textfield',
                                name: 'nomProveedorC',
                                id: 'nomProveedorC',
                                anchor: '100%',
                                readOnly:true,
                                msgTarget: 'side',                                                
                                hideLabel: true,
                                allowBlank:true,          
                            }]
                        }]
                    },{
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border-top:none;border-bottom:none;',
                        items:[{ 
                            xtype: 'combo',
                            fieldLabel: '* Tipo de comprobante',                                                                                           
                            labelPad:2,           
                            labelWidth: 140,                                                                
                            name:'tipoComprobanteC', 
                            id:'tipoComprobanteC',                             
                            anchor:"100%", 
                            autoSelect: false,
                            allowBlank: false,
                            editable: false,
                            triggerAction: 'all',
                            typeAhead: true,                    
                            enableKeyEvents: true,
                            queryMode: 'local',
                            store: store3,
                            displayField: 'tipo_comprobante',
                            valueField: 'id_comprobante',
                            msgTarget: 'side',                      
                        }] 
                    },{
                        layout: 'column',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border-top:none;border-bottom:none;',
                        items:[{
                            columnWidth: .30,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                fieldLabel: '* Fecha de Resgistro',
                                labelWidth: 130,                   
                                name: 'fechaRegistroC',                    
                                id:'fechaRegistroC',                                            
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                submitFormat: 'Y-m-d',
                                allowBlank: false, 
                                value: new Date(),   
                            }]
                        },{
                            columnWidth: .35,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                fieldLabel: '* Fecha de Resgistro',
                                labelWidth: 130,                   
                                name: 'fechaEmisionC',                    
                                id:'fechaEmisionC',                                            
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                submitFormat: 'Y-m-d',
                                allowBlank: false, 
                                value: new Date(),   
                            }]    
                        },{
                            columnWidth: .35,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                fieldLabel: '* Fecha de Resgistro',
                                labelWidth: 130,                   
                                name: 'fechaCaducidadC',                    
                                id:'fechaCaducidadC',                                            
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                submitFormat: 'Y-m-d',
                                allowBlank: false, 
                                value: new Date(),     
                            }]
                        },]    
                    },{
                        layout: 'column',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border-top:none;border-bottom:none;',
                        items:[{
                            columnWidth: .22,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                fieldLabel: '* Nro de serie y secuencial',                            
                                labelWidth:150,
                                xtype: 'textfield',
                                name: 'nroSerieC',
                                id:'nroSerieC',
                                anchor: '100%',                                                                                                                                            
                                allowBlank:true,
                                vtype: 'soloNumero',  
                                enforceMaxLength:true,
                                minLength:3,                                
                                maxLength:3,                                            
                            },]
                        },{
                            columnWidth: .07,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                fieldLabel: '-', 
                                labelWidth:5,                                                           
                                xtype: 'textfield',
                                name: 'nroSerieC1',
                                labelSeparator: '',
                                id:'nroSerieC1',
                                enforceMaxLength:true,
                                minLength:3,                                
                                maxLength:3,
                                anchor: '100%',                                                                                                                                                
                                allowBlank:true,
                                vtype: 'soloNumero',  
                            },]    
                        },{
                            columnWidth: .13,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                fieldLabel: '-', 
                                labelWidth:5,                                                           
                                xtype: 'textfield',
                                name: 'secuencialC',
                                id:'secuencialC',
                                labelSeparator: '',                                
                                anchor: '100%',                                                                
                                allowBlank:true,
                                vtype: 'soloNumero',  
                                enforceMaxLength:true,
                                minLength:9,                                
                                maxLength:9, 
                                enableKeyEvents: true,
                                listeners: {                                                            
                                    specialkey: function(field, e){
                                        if (e.getKey() == e.ENTER || e.getKey() === e.TAB ) {                                                                         
                                            var total=completarCeros(jQuery("input[name='secuencialC']").val());                                       
                                            Ext.getCmp('secuencialC').setValue(total+jQuery("input[name='secuencialC']").val());
                                            Ext.getCmp('nroAutorizacionC').focus(false,500);    

                                        }
                                    }
                                }                    
                            }]
                        },{
                            columnWidth: .30,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                fieldLabel: '* Nro de Autorización',
                                labelWidth: 140,
                                xtype: 'textfield',
                                name: 'nroAutorizacionC',
                                id: 'nroAutorizacionC',
                                anchor: '100%',
                                allowBlank: true,
                                msgTarget: 'side',
                                vtype: 'soloNumero',
                            }]
                        },{                       
                            columnWidth: .28,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                fieldLabel: '* Fecha de Cancelación',
                                labelWidth: 150,                   
                                name: 'fechaCancelacionC',                    
                                id:'fechaCancelacionC',                                            
                                xtype: 'datefield',
                                format: 'Y-m-d',
                                submitFormat: 'Y-m-d',
                                allowBlank: true,                                     
                                listeners:{
                                    focus: function(){
                                        this.onTriggerClick();                        
                                    }
                                }                           
                            }]                        
                        },]                        
                    },{
                        layout: 'column',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border-top:none;border-bottom:none;',
                        items:[{
                            columnWidth: .33,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{ 
                                fieldLabel: '* Nro de Líneas',
                                labelWidth: 130,
                                xtype: 'textfield',
                                name: 'nroLineasC',
                                id: 'nroLineasC',
                                anchor: '100%',                                
                                msgTarget: 'side',
                                vtype: 'soloNumero',
                                readOnly:true,
                            }]
                        },{                           
                            columnWidth: .33,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{ 
                                fieldLabel: '* Nro de Items',
                                labelWidth: 130,
                                xtype: 'textfield',
                                name: 'mroItemsC',
                                id: 'mroItemsC',
                                anchor: '100%',
                                                              
                                vtype: 'soloNumero',
                                readOnly:true,                                
                            }]                       
                        },{                            
                            columnWidth: .34,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                fieldLabel: '* Asiento Contable Nro.',
                                labelWidth: 160,
                                xtype: 'textfield',
                                name: 'asientoC',
                                id: 'asientoC',
                                anchor: '100%',
                                
                                readOnly:true,                              
                                vtype: 'soloNumero'
                            }]                        
                        }]   
                    },{
                        layout: 'column',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border-top:none;',
                        items:[{ 
                            columnWidth: .60,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                fieldLabel: '&nbsp;&nbsp;&nbsp;Observaciones',
                                labelWidth:130,
                                name: 'observacionesC',
                                anchor: '100%',
                                allowBlank:true,
                                msgTarget: 'side',
                                x: 15,
                                y: 105,
                                height: 180,
                                xtype: 'textarea'
                            }]
                        },{
                            columnWidth: .39,
                            layout: 'form',                
                            bodyStyle: '/*background:#DFE8F6*/;padding-left:5px;border:none;',
                            items:[{
                                fieldLabel: 'Subtotal',
                                xtype: 'textfield',
                                name: 'subtotalC',
                                anchor: '100%',
                                allowBlank: true,                               
                                readOnly:true,                                                                
                            },{
                                fieldLabel: 'Descuento %',
                                xtype: 'textfield',
                                name: 'descuentoC',
                                anchor: '100%',
                                allowBlank: true,                               
                                readOnly:true,                                                                
                            },{
                                fieldLabel: 'Subt - Desc',
                                xtype: 'textfield',
                                name: 'subDescC',
                                anchor: '100%',
                                allowBlank: true,                               
                                readOnly:true,                                                                
                            },{
                                layout: 'column',                
                                bodyStyle: '/*background:#DFE8F6*/;border:none;',
                                items:[{
                                    columnWidth: .22,
                                    layout: 'form',                
                                    bodyStyle: '/*background:#DFE8F6*/;border:none;',
                                    items:[{
                                        fieldLabel: 'Iva',
                                        xtype: 'textfield',
                                        name: 'ivaBaseC',
                                        anchor: '100%',  
                                        labelWidth:30,                                                                     
                                        readOnly:true, 
                                        value:ivaBase(),     
                                    },]

                                },{
                                    columnWidth: .075,
                                    layout: 'form',                
                                    bodyStyle: '/*background:#DFE8F6*/;border:none;',
                                    items:[{
                                        fieldLabel: '%',                            
                                        text:'%',
                                        xtype:'label',                                           
                                    }]
                                },{                                    
                                    columnWidth: .71,
                                    layout: 'form',                
                                    bodyStyle: '/*background:#DFE8F6*/;border:none;',
                                    items:[{
                                        fieldLabel: 'Iva',
                                        xtype: 'textfield',
                                        name: 'ivaC',
                                        anchor: '100%',                                                                       
                                        readOnly:true, 
                                        hideLabel: true,                                              
                                    }]                              
                                }]                                                                                          
                            },{
                                fieldLabel: 'Otros 1',
                                xtype: 'textfield',
                                name: 'otros1C',
                                anchor: '100%',
                                allowBlank: true,                               
                                readOnly:true,                                                                
                            },{
                                fieldLabel: 'Otros 2',
                                xtype: 'textfield',
                                name: 'otros2C',
                                anchor: '100%',
                                allowBlank: true,                               
                                readOnly:true,                                                                
                            },{
                                fieldLabel: 'Total',
                                xtype: 'textfield',
                                name: 'totalC',
                                anchor: '100%',
                                allowBlank: true,                               
                                readOnly:true,                                                                
                            }]                        
                        }]
                    }]
                },]
            },{
                layout: 'form',
                title: 'Detalles de la factura',
                autoHeight: true,
                bodyStyle: 'background:#DFE8F6;', //or if you set it to none, you will see through it.                
                defaults: {
                    anchor: '95%',
                    msgTarget: 'side'
                },    
            },{
                layout: 'form',
                title: 'Formas de Pago',
                autoHeight: true,
                bodyStyle: 'background:#DFE8F6;', //or if you set it to none, you will see through it.                
                defaults: {
                    anchor: '95%',
                    msgTarget: 'side'
                },    
            },{
                layout: 'form',
                title: 'Información de retenciones',
                autoHeight: true,
                bodyStyle: 'background:#DFE8F6;', //or if you set it to none, you will see through it.                
                defaults: {
                    anchor: '95%',
                    msgTarget: 'side'
                },    
            },{
                layout: 'form',
                title: 'Reembolsos',
                autoHeight: true,
                bodyStyle: 'background:#DFE8F6;', //or if you set it to none, you will see through it.                
                defaults: {
                    anchor: '95%',
                    msgTarget: 'side'
                },    
            },]            
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
        ];           
        var frmCompra = new Ext.FormPanel({            
            url: '../servidor/productos/productos.php',
            frame: true,
            monitorValid: true,
            items: items,
           buttons: boton
        });
        var win = desktop.getWindow('compra' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'compra' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 1000,
                //height:600,
                resizable: false,
                plain: true,
                border: false,
                items: [frmCompra],

            });
        }
        win.show(); 
        return win;      
    },
});
    /////////modificacion y busqueda de ventanas////////
    function ventanaProveedores1() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Proveedores', 
            html: '<table id="tablaProveedores1" style="font-size:12px;"></table><div id="pgTablaProveedores1"></div>'
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
    function enviarDatosProveedor1(id) {
        var tabla = jQuery('#tablaProveedores1').jqGrid('getRowData', id);        
        Ext.getCmp("tipoProveedorC").setValue(tabla.tipo_documento);                                                              
        jQuery("input[name='nroIdentificacionC']").val(tabla.ci_ruc_pass);
        jQuery("input[name='nomProveedorC']").val(tabla.empresa_proveedor);
        Ext.WindowManager.getActive().close();

    }
    jQuery(function() {
        var width = 630;
        jQuery("#tablaProveedores1").jqGrid({
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
            pager: '#pgTablaProveedores1',
            sortname: 'id_proveedor',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarDatosProveedor1(rowid);                   
            }
        });      
        jQuery("#tablaProveedores1").jqGrid('hideCol', "id_proveedor");
        jQuery("#tablaProveedores1").jqGrid('hideCol', "estado_proveedor");    
        jQuery("#tablaProveedores1").jqGrid('hideCol', "id_tipo_cliente");    
        jQuery("#tablaProveedores1").jqGrid('hideCol', "id_forma_pago");    
        jQuery("#tablaProveedores1").jqGrid('navGrid', '#pgTablaProveedores1',
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
 


 
    


