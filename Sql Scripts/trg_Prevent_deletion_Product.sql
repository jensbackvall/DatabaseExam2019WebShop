CREATE OR ALTER TRIGGER trg_Prevent_deletion_Product
ON dbo.TProduct
FOR DELETE
AS
BEGIN
	DECLARE @ProductId INT = (SELECT nProductId FROM Deleted)
	DECLARE @PurchaseCount INT = (SELECT COUNT(*) FROM dbo.TProduct
		INNER JOIN dbo.TInVoiceLine
		ON dbo.TProduct.nProductId = dbo.TInVoiceLine.nProductId
		WHERE dbo.TProduct.nProductId = @ProductId);

	IF(@PurchaseCount > 0)
		RAISERROR('Records can not be deleted, as TProduct have purchased Item', 10,1)
		ROLLBACK TRAN
		RETURN
END

