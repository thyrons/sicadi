Ext.define('MyDesktop.menuIngreso', {
    extend: 'MyDesktop.ingreso',
    init: function() {
        this.launcher = {
            text: 'Ingresos',
            iconCls: 'bogus',
            handler: function() {
                return false;
            },
            menu: {
                items: [      
                    {
                        text: 'Generales',
                        iconCls: 'bogus',
                        handler: function() {
                            return false;
                        },
                        menu: {
                            items: [
                                {
                                    text: 'Marcas',
                                    iconCls: 'bogus',
                                    handler: this.ventanaMarcas,
                                    scope: this,
                                    windowId: 1
                                },                                                                                        
                                {
                                    text: 'Categorías',
                                    iconCls: 'bogus',
                                    handler: this.ventanaCategorias,
                                    scope: this,
                                    windowId: 2
                                },                                                                                                                         
                                {
                                    text: 'Procedencias',
                                    iconCls: 'bogus',
                                    handler: this.ventanaProcedencia,
                                    scope: this,
                                    windowId: 3
                                },  
                                {
                                    text: 'Familias',
                                    iconCls: 'bogus',
                                    handler: this.ventanaFamilia,                                        scope: this,
                                    windowId: 4
                                },                                                                                         
                                {
                                    text: 'Líneas',
                                    iconCls: 'bogus',
                                    handler: this.ventanaLineas,
                                    scope: this,
                                    windowId: 5
                                },                                                                                         
                            ]
                        }
                    },
                    {
                        text: 'Formas de Pago',
                        iconCls: 'bogus',
                        handler: this.ventanaFormasPago,
                        scope: this,
                        windowId: 6
                    },
                    {
                        text: 'Clientes',
                        iconCls: 'bogus',
                        handler: this.ventanaClientes,
                        scope: this,
                        windowId: 7
                    },
                    {
                        text: 'Proveedores',
                        iconCls: 'bogus',
                        handler: this.ventanaProveedores,
                        scope: this,
                        windowId: 8
                    },      
                    {
                        text: 'Empresas',
                        iconCls: 'bogus',
                        handler: this.ventanaEmpresa,
                        scope: this,
                        windowId: 9
                    },  
                    {
                        text: 'Ingreso Productos',
                        iconCls: 'bogus',
                        handler: this.ventanaProductos,
                        scope: this,
                        windowId: 9
                    },                       
                ]
            }
        };
    }
});