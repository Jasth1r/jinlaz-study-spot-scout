-- Parameter values: @neighborhood (NVARCHAR(100)), @minWifi (INT)
SELECT name, neighborhood, wifi_rating AS wifi, noise_level AS noise,
       seating, open_hours AS hours
FROM dbo.study_spots
WHERE (@neighborhood = N'' OR neighborhood = @neighborhood)
  AND wifi_rating >= @minWifi
ORDER BY wifi_rating DESC, name;
