using { sales.db as sales } from '../db/sales_orders';
@path: 'sap/opu/odata/sap/API_SALES_ORDER'
service Sales_service {

    entity OrderSet as projection on sales.sales_orders;

}