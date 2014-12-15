Ext.define('MyDesktop.menuCompras', {
    extend: 'MyDesktop.compras',
    init: function() {
        this.launcher = {
            text: 'Compras',
            iconCls: 'bogus',
            handler: function() {
                return false;
            },
            menu: {
                items: [      
                    {
                        text: 'Locales',
                        iconCls: 'bogus',
                        handler: function() {
                            return false;
                        },
                        menu: {
                            items: [
                                {
                                    text: 'Productos de Bodega (QS)',
                                    iconCls: 'bogus',
                                    handler: this.productosBodega,
                                    scope: this,
                                    windowId: 1,
                                },                                                                                        
                                {
                                    text: 'Liquidación en Compras y/o Bienes y Servicios',
                                    iconCls: 'bogus',
                                    handler: this.ventanaCategorias,
                                    scope: this,
                                    windowId: 2,
                                },                                                                                                                                                                                                                                              
                            ]
                        }
                    },
                    {
                        text: 'Devoluciones',
                        iconCls: 'bogus',
                        handler: this.ventanaFormasPago,
                        scope: this,
                        windowId: 3,
                    },                                
                ]
            }
        };
    }
});