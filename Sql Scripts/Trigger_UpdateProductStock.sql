-- On Updating TProduct.nStock
-- When an invoice is created, a trigger will update the nTotalPurchse on the relevant credit card


CREATE TRIGGER UpdateProductStock
   ON  dbo.TInvoiceLine
   AFTER INSERT
AS 
BEGIN
DECLARE @InsertedProductID INT;
DECLARE @InsertedCreditID INT;
DECLARE @Quantity INT;
	SELECT @InsertedProductID = i.nProductId FROM inserted i 
	SELECT @Quantity = i.nQuantity FROM inserted i

    UPDATE TProduct SET TProduct.nStock = TProduct.nStock - @Quantity
	WHERE TProduct.nProductId = @InsertedProductID 
END

GO