INSERT INTO dbo.TRating
(
    nUserId,
    nProductId,
    nStar,
    cComment
)
VALUES
(   35,             -- nUserId - int
    3,             -- nProductId - int
    1,             -- nStar - tinyint
    'WORST BANANA EVER!'          -- cComment - text
    )



INSERT INTO dbo.TRating
(
    nUserId,
    nProductId,
    nStar,
    cComment
)
VALUES
(   5,             -- nUserId - int
    3,             -- nProductId - int
    5,             -- nStar - tinyint
    'It Was a Really good banana'          -- cComment - text
    )
INSERT INTO dbo.TRating
(
    nUserId,
    nProductId,
    nStar,
    cComment
)
VALUES
(   2,             -- nUserId - int
    3,             -- nProductId - int
    3,             -- nStar - tinyint
    'It Was a Average banana'          -- cComment - text
    )
INSERT INTO dbo.TRating
(
    nUserId,
    nProductId,
    nStar,
    cComment
)
VALUES
(   20,             -- nUserId - int
    3,             -- nProductId - int
    4,             -- nStar - tinyint
    'It Was a better than average banana'          -- cComment - text
    )


CREATE TRIGGER CreateRating
   ON  dbo.TRating
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN
	BEGIN TRANSACTION T1
	DECLARE @InsertedID int =  (Select i.nProductId FROM inserted i);

	Update TProduct
	SET nAverageRating = (Select avg(TRating.nStar) from TRating where nProductId = @InsertedID Group by nProductId)
	Where TProduct.nProductId = @InsertedID     
	COMMIT TRANSACTION T1
END
GO