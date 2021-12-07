
CREATE TABLE Passenger(
	passengerID   VARCHAR(6)    NOT NULL ,
	passengerType VARCHAR(10)	NOT NULL	DEFAULT "Adult"	 CHECK (passengerType IN ('Adult', 'Student', 'Child', 'Senior' )),
	CONSTRAINT pk_passengerID PRIMARY KEY (passengerID)
);

CREATE TABLE Line(
	lineColor VARCHAR(10)	NOT NULL	CHECK (lineColor IN ('red', 'orange', 'blue', 'green', 'yellow')),
	CONSTRAINT pk_lineColor PRIMARY KEY (lineColor)
);

CREATE TABLE Train(
	trainNo INT    NOT NULL,
	isPetFriendly VARCHAR(3)	NOT NULL	DEFAULT "yes" CHECK(isPetFriendly IN('yes','no')),
	isAccessible VARCHAR(3)	NOT NULL	DEFAULT "yes" CHECK(isAccessible IN('yes','no')),
	lineColor VARCHAR(10)    NOT NULL,
	CONSTRAINT pk_trainNo  PRIMARY KEY (trainNo),
	CONSTRAINT fk_lineColor  FOREIGN KEY (lineColor) REFERENCES Line(lineColor)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Trip(
	trainNo INT  NOT NULL,
	passengerId VARCHAR(6),
	tripTime TIME	NOT NULL,
	CONSTRAINT CompKey_ID_Trip PRIMARY KEY (trainNo,passengerId,tripTime),
 	CONSTRAINT fk_trainNo FOREIGN KEY (trainNo) REFERENCES Train(trainNo)
		ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_passengerId FOREIGN KEY (passengerId) REFERENCES   Passenger(passengerID)
		ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE Ticket(
	ticketID VARCHAR(9)	NOT NULL,
	activationDate DATE	NOT NULL,
	expiryDate DATE	NOT NULL,
	purchasedBy VARCHAR(6) NOT NULL,
	CONSTRAINT pk_ticketID  PRIMARY KEY (ticketID),
    CONSTRAINT fk_purchasedBy FOREIGN KEY (purchasedBy) REFERENCES Passenger(passengerID)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Station(
	stationNo INT      NOT NULL,
	stationName VARCHAR(100)	NOT NULL,
	streetNum INT	NOT NULL,
	streetName VARCHAR(100)	NOT NULL,
	CONSTRAINT pk_stationNo PRIMARY KEY (stationNo)
);

CREATE TABLE Stop(
	lineCol VARCHAR(10)	NOT NULL, 
	stationNo INT		NOT NULL,
	arrivalTime TIME	NOT NULL,
	departureTime TIME	NOT NULL,
    CONSTRAINT Compkey_ID_Stop PRIMARY KEY(lineCol, stationNo, arrivalTime, departureTime),
	CONSTRAINT fk_lineCol FOREIGN KEY(lineCol) REFERENCES Line(lineColor)
		ON DELETE NO ACTION ON UPDATE CASCADE,
	CONSTRAINT fk_stationNo FOREIGN KEY(stationNo) REFERENCES Station(stationNo)
		ON DELETE CASCADE ON UPDATE CASCADE
);


