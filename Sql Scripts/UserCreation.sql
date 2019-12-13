CREATE LOGIN AdamAdmin   
    WITH PASSWORD = 'Password123';  
CREATE USER AdamAdmin FOR LOGIN AdamAdmin   
    WITH DEFAULT_SCHEMA = db_ddladmin;  
GO  
CREATE LOGIN ReaderOnly   
    WITH PASSWORD = 'Password123';  
CREATE USER ReaderOnly FOR LOGIN ReaderOnly   
    WITH DEFAULT_SCHEMA = db_datareader;  
GO  

CREATE LOGIN Restricted  
    WITH PASSWORD = 'Password123'; 
CREATE USER Restricted FOR LOGIN Restricted   
    WITH DEFAULT_SCHEMA = db_datareader;  
	DENY SELECT ON dbo.TInVoiceLine TO Restricted;
	DENY SELECT ON dbo.TInvoice TO Restricted;
GO  
