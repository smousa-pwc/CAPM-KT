sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
    function (Controller,
        ODataModel,
        Filter,
        FilterOperator,
        MessageToast) {
        "use strict";
        let file;
        let aData;
        let oModel;
    

        return Controller.extend("fiori.controller.Details", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter()
                oRouter.getRoute("DetailsApp").attachMatched(function(oEvent) {
                    this._attachMatched(oEvent.getParameter("arguments"))
                }, this);
            },
            _attachMatched: function (args) {
                alert("done")
                console.log(args)
            } 

        });

    })