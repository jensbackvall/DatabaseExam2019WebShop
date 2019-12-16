CREATE OR ALTER PROC buyProducts
    @CreditCardId int,
	@TotalPrice money,
	@Vat money,
	@jsonProducts NVARCHAR(MAX)
AS
BEGIN
	BEGIN TRANSACTION PurchaseStart
		DECLARE @UserId INT;
		SELECT @UserId = nUserId FROM TCreditCard WHERE nCreditCardId = @CreditCardId;
		-- This table will only contain 1 ID, from the invoice we insert below
		DECLARE @ID table (ID int);
		-- Insert dummy Tinvoice to get ID to build invoicelines from
		INSERT INTO TInvoice 
		(dInvoiceDate, nTotalPrice,nVAT, nCreditCardId, nUserId) 
		OUTPUT inserted.nInvoiceId into @ID 
		VALUES (GETDATE(),@TotalPrice,@VAT,@CreditCardId,@UserId);
		DECLARE @InvoiceId INT = (SELECT * FROM @ID);

		INSERT INTO TInVoiceLine ([nInvoiceId],[nProductId],[nQuantity],[nUnitPrice]) 
		SELECT @InvoiceId,[nProductId],[nQuantity],[nUnitPrice] FROM OPENJSON(@jsonProducts)
		WITH ( 
		nProductId int N'strict $."productId"',
		nQuantity int N'strict $."quantity"',
		nUnitPrice int N'strict $."unitPrice"'
		)
		DECLARE @StockCheck INT = (SELECT COUNT(*)
		FROM dbo.TProduct
		WHERE dbo.TProduct.nStock < 0)

		IF (@StockCheck != 0)
			ROLLBACK;
	COMMIT TRANSACTION PurchaseStart
END