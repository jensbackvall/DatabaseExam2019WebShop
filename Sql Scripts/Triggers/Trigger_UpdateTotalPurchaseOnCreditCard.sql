-- On Updating TCreditCard.TotalPurchase
-- When an invoice is created, a trigger will update the nTotalPurchse on the relevant credit card


CREATE TRIGGER UpdateTotalPurchaseOnCreditCard
   ON  dbo.TInvoice
   AFTER UPDATE
AS 
BEGIN
DECLARE @InsertedUserID INT;
DECLARE @InsertedCreditID INT;
DECLARE @TotalPrice INT;
	SELECT @InsertedUserID = i.nUserId FROM inserted i 
	SELECT @InsertedCreditID = i.nCreditCardID FROM inserted i
	SELECT @TotalPrice = i.nTotalPrice FROM inserted i

    UPDATE TCreditCard SET TCreditCard.nTotalPurchase = TCreditCard.nTotalPurchase + @TotalPrice
	WHERE TCreditCard.nCreditCardId = @InsertedCreditID AND TCreditCard.nUserId = @InsertedUserID
END

GO