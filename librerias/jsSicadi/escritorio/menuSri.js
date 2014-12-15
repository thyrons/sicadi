Ext.define('MyDesktop.menuSri', {
    extend: 'MyDesktop.sri',
    init: function() {
        this.launcher = {
            text: 'Información SRI',
            iconCls: 'bogus',
            handler: function() {
                return false;
            },
            menu: {
                items: [      
                    {                       
                        text: 'Sustento Tributario',
                        iconCls: 'bogus',
                        handler: this.ventanaSustento,
                        scope: this,
                        windowId: 1
                    },
                    {
                        text: 'Tipo Comprobante',
                        iconCls: 'bogus',
                        handler: this.ventanaComprobante,
                        scope: this,
                        windowId: 2
                    },                                   
                ]
            }
        };
    }
});