USE DataBaseExam2019
CREATE LOGIN AdamAdmin   
    WITH PASSWORD = 'Password123';  
CREATE USER AdamAdmin FOR LOGIN AdamAdmin   
GO  
CREATE LOGIN ReaderOnly   
    WITH PASSWORD = 'Password123';  
CREATE USER ReaderOnly FOR LOGIN ReaderOnly   
GO  

CREATE LOGIN Restricted  
    WITH PASSWORD = 'Password123'; 
CREATE USER Restricted FOR LOGIN Restricted   
GO 

GRANT CONTROL ON DATABASE ::DatabaseExam2019 TO AdamAdmin
GO
ALTER ROLE db_datareader ADD MEMBER Restricted
GO
ALTER ROLE db_datareader ADD MEMBER ReaderOnly
GO

DENY SELECT ON DataBaseExam2019.dbo.TCreditCard TO Restricted