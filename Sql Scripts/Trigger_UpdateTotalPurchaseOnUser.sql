-- On Updating TUser.TotalPurchase
-- When an invoice is created, a trigger will update the nTotalPurchse on the relevant User

CREATE TRIGGER UpdateTotalPurchaseOnUser
   ON  dbo.TInvoice
   AFTER UPDATE
AS 
BEGIN
DECLARE @InsertedID INT;
DECLARE @TotalPrice INT;
	SELECT @InsertedID = i.nUserId FROM inserted i 
	SELECT @TotalPrice = i.nTotalPrice FROM inserted i

    UPDATE TUser SET TUser.nTotalPurchase = TUser.nTotalPurchase + @TotalPrice
	WHERE TUser.nUserId = @InsertedID
END

GO

