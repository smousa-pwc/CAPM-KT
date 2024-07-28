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
        let khara;

        return Controller.extend("fiori.controller.App", {
            onInit: function () {

            },
            onFileChange: function (oEvent) {
                file = oEvent.getParameters("files").files[0];
            },
            onUploadPress: function () {
                var oFileUploader = this.byId("fileUploader");
                if (file && window.FileReader) {
                    var oReader = new FileReader();
                    oReader.onload = function (e) {
                        var sCSV = e.target.result;
                        var aLines = sCSV.split("\n");
                        var aHeaders = aLines[0].split(",");
                        aData = aLines.slice(1).map(function (sLine) {
                            var aValues = sLine.split(",");
                            var oEntry = {};
                            aHeaders.forEach(function (sHeader, i) {
                                oEntry[sHeader] = aValues[i] ;
                            });
                            return oEntry;
                        });
                        aData.pop();
                        console.log(aData);
                        // JSON.stringify(aData);
                    }
                    oReader.readAsText(file);
                } else {
                    MessageToast.show("Please select a valid CSV file.");
                }
            }, onLoadData: function () {
                // var oModel = new ODataModel({
                //     serviceUrl: "/odata/v4/sap/opu/odata/sap/API_SALES_ORDER/",
                //     synchronizationMode: "None" 
                // });
                oModel = this.getOwnerComponent().getModel();
                this.getView().setModel(oModel);
                var oTable = this.byId("myTable");
                oTable.setModel(oModel);
                oTable.bindItems({
                    path: '/OrderSet',
                    template: new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({ text: "{salesDocument}" }),
                            new sap.m.Text({ text: "{NetValue}" }),
                            new sap.m.Text({ text: "{Currency}" }),
                            new sap.m.Text({ text: "{Customer}" })
                        ]
                    })
                });
                var aFilters = [
                    new Filter("salesDocument", FilterOperator.EQ, "337"),
                ];
                var oBinding = oModel.bindList("/OrderSet", undefined, undefined, aFilters);
                oBinding.requestContexts().then(function (aContexts) {
                    var aData = aContexts.map(function (oContext) {
                        return oContext.getObject();
                    });
                    console.log("Filtered data received:", aData);
                }).catch(function (oError) {
                    console.error("Error fetching data:", oError);
                });
            },
            onPostCall: function(){
                var oPayload = {
                    salesDocument: "1766969",
                    Currency: "EGP",
                    NetValue: 122334.12
                    // Add more fields as required
                };
                oModel = this.getView().getModel();
                var oListBinding = oModel.bindList("/OrderSet");
                oListBinding.create(oPayload, {
                    success: function (oData, oResponse) {
                      console.log("POST request successful:", oResponse, oData);
                      sap.m.MessageToast.show("Data created successfully");
                    },
                    error: function (oError) {
                      console.error("POST request failed:", oError);
                      sap.m.MessageToast.show("Error creating data");
                    }
                  })
                ;
            }
        }

        );
    });
