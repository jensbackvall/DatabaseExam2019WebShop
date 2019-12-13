
CREATE TABLE TUser_audits(
    nChangeId INT IDENTITY PRIMARY KEY,
    nUserId INT NOT NULL,
    cUsername VARCHAR(16) NOT NULL,
    cPassword VARCHAR(16) NOT NULL,
    cName VARCHAR(255) NOT NULL,
    cSurname VARCHAR(255) NOT NULL,
    cAddress VARCHAR(100) NOT NULL,
    nCityId SMALLINT FOREIGN KEY REFERENCES TCity(nCityId) NOT NULL,
    cPhoneNumber VARCHAR(8) NOT NULL,
	cEmail VARCHAR(320) NOT NULL,
	nTotalPurchase MONEY NOT NULL DEFAULT (0),
	bIsActive BIT NOT NULL,
	updated_at DATETIME NOT NULL,
	operation CHAR(3) NOT NULL,
    CHECK(operation = 'INS' or operation='DEL')
);


	
CREATE TRIGGER DataBaseExam2019.trg_TUser_audits
ON TUser
AFTER INSERT, DELETE
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO TUser_audits(
	nUserId,
    cUsername,
    cPassword,
    cName,
    cSurname,
    cAddress,
    nCityId,
    cPhoneNumber,
	cEmail,
	nTotalPurchase,
	bIsActive,
	updated_at DATETIME NOT NULL,
	operation
	)
	SELECT
	i.nUserId,
	cUsername,
    cPassword,
    cName,
    cSurname,
    cAddress,
    nCityId,
    cPhoneNumber,
	cEmail,
	i.nTotalPurchase,
	bIsActive,
	GETDATE(),
    'INS'
	FROM
	inserted i
	UNION ALL
	SELECT
	d.nUserId,
	cUsername,
    cPassword,
    cName,
    cSurname,
    cAddress,
    nCityId,
    cPhoneNumber,
	cEmail,
	d.nTotalPurchase,
	bIsActive,
	GETDATE(),
    'DEL'
	FROM
	deleted d;
END