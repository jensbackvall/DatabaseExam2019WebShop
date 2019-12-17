CREATE TABLE TCard_audits(
	nChangeId INT IDENTITY PRIMARY KEY,
    nCreditCardId INT,

	Old_CardNumber VARCHAR(16),
	New_CardNumber VARCHAR(16),

	Old_CardHolder VARCHAR(100),
	New_CardHolder VARCHAR(100),

	Old_ExpiringDate VARCHAR(4),
	New_ExpiringDate VARCHAR(4),

	Old_CCV VARCHAR(3),
	New_CCV VARCHAR(3),

	Old_TotalPurchase MONEY,
	New_TotalPurchase MONEY,

	Old_UserId INT,
	New_UserId INT,

	updated_at DATETIME,
	updated_by NVARCHAR(256),
	updated_by_id VARBINARY(85),
	updated_host  NVARCHAR(128),
	updated_host_id CHAR(8),
	operation CHAR(1),
);

CREATE TRIGGER trg_TCreditCard_audits
	ON dbo.TCreditCard
	AFTER INSERT, DELETE, Update
AS
BEGIN
DECLARE @Type CHAR(1);
DECLARE @updated_by NVARCHAR(256) = SUSER_SNAME();
DECLARE @updated_by_id VARBINARY(85) = SUSER_SID();

DECLARE @updated_host NVARCHAR(128) = HOST_NAME();
DECLARE @updated_host_id CHAR(8) = HOST_ID();

IF EXISTS (SELECT * FROM inserted)
       IF EXISTS (SELECT * FROM deleted)
               SELECT @Type = 'U'
       ELSE
               SELECT @Type = 'I'
ELSE
       SELECT @Type = 'D'


SET NOCOUNT ON;
	INSERT INTO TCard_audits(
	nCreditCardId,
	New_CardNumber,
	New_CardHolder,
	New_ExpiringDate,
	New_CCV,
	New_TotalPurchase,
	New_UserId,
    Old_CardNumber,
    Old_CardHolder,
    Old_ExpiringDate,
    Old_CCV,
    Old_TotalPurchase,
    Old_UserId,
	updated_at,
	updated_by,
	updated_by_id,
	updated_host,
	updated_host_id,
	operation
	)

	SELECT
	i.nCreditCardId,
	i.cCardNumber,
    i.cCardHolder,
    i.cExpiringDate,
    i.cCCV,
    i.nTotalPurchase,
    i.nUserId,
	d.cCardNumber,
    d.cCardHolder,
    d.cExpiringDate,
    d.cCCV,
    d.nTotalPurchase,
    d.nUserId,
	GETDATE(),
	@updated_by,
	@updated_by_id,
	@updated_host,
	@updated_host_id,
	@Type
	FROM
	inserted i
	FULL OUTER JOIN deleted d
	ON d.nUserId = d.nUserId
	 


END