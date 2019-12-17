CREATE OR ALTER TRIGGER trg_Prevent_deletion_User
ON dbo.TUser
FOR DELETE
AS
BEGIN
	DECLARE @Totalpurchase money;
	SELECT @Totalpurchase = nTotalPurchase FROM deleted;
	IF(@Totalpurchase > 0)
		RAISERROR('Records can not be deleted, as user have purchased Item', 10,1)
		ROLLBACK TRAN
		RETURN
END

