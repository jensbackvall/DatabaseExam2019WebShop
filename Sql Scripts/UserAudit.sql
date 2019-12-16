
CREATE TABLE TUser_audits(
	nChangeId INT IDENTITY PRIMARY KEY,
    Old_UserId INT, 
    New_UserId INT, 

	Old_Username VARCHAR(16),
    New_Username VARCHAR(16),
    Old_Password VARCHAR(16),
    New_Password VARCHAR(16),
    Old_Name VARCHAR(255),
    New_Name VARCHAR(255),
    Old_Surname VARCHAR(255),
	New_Surname VARCHAR(255),
    Old_Address VARCHAR(100),
	New_Address VARCHAR(100),
    Old_CityId SMALLINT FOREIGN KEY REFERENCES TCity(nCityId),
	New_CityId SMALLINT FOREIGN KEY REFERENCES TCity(nCityId),

    Old_PhoneNumber VARCHAR(8),
	New_PhoneNumber VARCHAR(8),
	
	Old_Email VARCHAR(320),
	New_Email VARCHAR(320),
	
	Old_TotalPurchase MONEY DEFAULT (0),
	New_TotalPurchase MONEY DEFAULT (0),
	
	Old_IsActive BIT,
	New_IsActive BIT,

	updated_at DATETIME,
	updated_by VARCHAR(128),
	updated_host VARCHAR(128),
	operation CHAR(1),
);

CREATE TRIGGER trg_TUser_audits
	ON dbo.TUser
	AFTER INSERT, DELETE, Update
AS
BEGIN
DECLARE @Type CHAR(1);
DECLARE @HostName VARCHAR(255);
DECLARE @Login VARCHAR(255);

IF EXISTS (SELECT * FROM inserted)
       IF EXISTS (SELECT * FROM deleted)
               SELECT @Type = 'U'
       ELSE
               SELECT @Type = 'I'
ELSE
       SELECT @Type = 'D'

CREATE TABLE #sp_who2 (SPID INT,Status VARCHAR(255),
      Login  VARCHAR(255),HostName  VARCHAR(255),
      BlkBy  VARCHAR(255),DBName  VARCHAR(255),
      Command VARCHAR(255),CPUTime INT,
      DiskIO INT,LastBatch VARCHAR(255),
      ProgramName VARCHAR(255),SPID2 INT,
      REQUESTID INT)
INSERT INTO #sp_who2 EXEC sp_who2
SELECT      TOP 1 @Login = Login, @HostName = HostName
FROM        #sp_who2
-- Add any filtering of the results here :
WHERE      HostName != '  .' AND DBName = 'DataBaseExam2019'


SET NOCOUNT ON;
	INSERT INTO TUser_audits(
	New_UserId,
	New_Username,
	New_Password,
	New_Name,
	New_Surname,
	New_Address,
	New_CityId,
	New_PhoneNumber,
	New_Email,
	New_TotalPurchase,
	New_IsActive,
	Old_UserId,
    Old_Username,
    Old_Password,
    Old_Name,
    Old_Surname,
    Old_Address,
    Old_CityId,
    Old_PhoneNumber,
	Old_Email,
	Old_TotalPurchase,
	Old_IsActive,
	updated_at,
	updated_by,
	updated_host,
	operation
	)

	SELECT
	i.nUserId,
	i.cUsername,
    i.cPassword,
    i.cName,
    i.cSurname,
    i.cAddress,
    i.nCityId,
    i.cPhoneNumber,
	i.cEmail,
	i.nTotalPurchase,
	i.bIsActive,
	d.nUserId,
	d.cUsername,
    d.cPassword,
    d.cName,
    d.cSurname,
    d.cAddress,
    d.nCityId,
    d.cPhoneNumber,
	d.cEmail,
	d.nTotalPurchase,
	d.bIsActive,
	GETDATE(),
	@Login,
	@HostName,
	@Type
	FROM
	inserted i
	FULL OUTER JOIN deleted d
	ON d.nUserId = d.nUserId
	 


END