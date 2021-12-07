SELECT trainNo
FROM Train t
WHERE EXISTS (SELECT *
		      FROM Stop s
		      WHERE t.lineColor= s.lineCol AND s.StationNo = 3);

SELECT DISTINCT st.stationNo, st.stationName, s.lineCol
FROM Stop s, Station st
WHERE lineCol = red
AND s.stationNo = st.stationNo

SELECT t.*, COUNT(*) AS noOfTrips
FROM Train t, Trip tr
WHERE  t.trainNo = tr.trainNo AND (isPetFriendly = 'yes' OR isAccessible = 'yes')
GROUP BY trainNo 
ORDER BY noOfTrips DESC

SELECT streetNo, streetName
FROM Station 
Where stationName = Station Sauvé

UPDATE Ticket
SET expiryDate = DATE(‘2022-10-15’)
WHERE purchasedBy = 000001

INSERT INTO Ticket
VALUES (‘000002’, CURRENT_DATE(), CURRENT_DATE(), + INTERVAL 5 month, 2022-01-15)


