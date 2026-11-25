IF OBJECT_ID('dbo.study_spots', 'U') IS NOT NULL DROP TABLE dbo.study_spots;

CREATE TABLE dbo.study_spots (
  spot_id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(120) NOT NULL,
  neighborhood NVARCHAR(100) NOT NULL,
  wifi_rating INT NOT NULL CHECK (wifi_rating BETWEEN 1 AND 5),
  noise_level NVARCHAR(40) NOT NULL,
  seating NVARCHAR(40) NOT NULL,
  open_hours NVARCHAR(80) NOT NULL
);
