SELECT raw_land_use.full_stname, raw_crime.address, raw_land_use.use14_label 
FROM raw_land_use
LEFT JOIN raw_crime 
ON raw_crime.address = CONCAT(CAST(raw_land_use.stnumber AS VARCHAR), ' ', raw_land_use.full_stname)
AND (raw_land_use.use14_label = 'Light industrial' OR raw_land_use.use14_label = 'Heavy Industrial' OR raw_land_use.use14_label = 'Community Commercial' OR raw_land_use.use14_label = 'Heavy Commercial' OR raw_land_use.use14_label = 'Place of Worship' OR raw_land_use.use14_label = 'Office')
AND raw_land_use.state = 'IN' AND raw_land_use.city = 'INDIANAPOLIS'