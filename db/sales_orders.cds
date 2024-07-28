namespace sales.db;

entity sales_orders
{
    key salesDocument : String(10);
    NetValue : Decimal(15,2) not null;
    Currency : String(5);
    Customer : String(10);
}