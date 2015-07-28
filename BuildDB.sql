IF OBJECT_ID('CurrentEvent_Attendee', 'U') 
	IS NOT NULL DROP TABLE CurrentEvent_Attendee;
GO
IF OBJECT_ID('CurrentEvent', 'U') 
	IS NOT NULL DROP TABLE CurrentEvent;
GO
IF OBJECT_ID('Attendee', 'U') 
	IS NOT NULL DROP TABLE Attendee;
GO

CREATE TABLE CurrentEvent(
	ID          INT IDENTITY(9000,2) NOT NULL PRIMARY KEY,
	summary		VARCHAR(256),
	schedule    DATETIME,
	cost	    MONEY
);


INSERT INTO CurrentEvent VALUES('Swan Lake', '2015-04-11 19:00:00.000', 25.0);
INSERT INTO CurrentEvent VALUES('Battle of the Drones', '2015-05-10 19:00:00.000', 25.0);
INSERT INTO CurrentEvent VALUES('Vancouver Symphony Orchestra', '2015-10-01 19:00:00.000', 25.0);
go

CREATE TABLE Attendee (
	ID				INT PRIMARY KEY IDENTITY(12000,3) NOT NULL,
	eventID			INT,
	purchaseDate	DATETIME,
	firstname		VARCHAR(32),
	lastname		VARCHAR(32),
	email			VARCHAR(128),
	sessionID		VARCHAR(128),
	transactionID	VARCHAR(128),
	totalTickets	INT,
	amount			MONEY,
	paymentStatus	VARCHAR(20),
);

CREATE TABLE CurrentEvent_Attendee (
	currentEventID	INT,
	attendeeID	INT,
	PRIMARY KEY (currentEventID, attendeeID),
	FOREIGN KEY (currentEventID) REFERENCES CurrentEvent(ID),
	FOREIGN KEY (attendeeID) REFERENCES Attendee(ID)
);


select * from CurrentEvent;
select * from Attendee;
select * from CurrentEvent_Attendee;
