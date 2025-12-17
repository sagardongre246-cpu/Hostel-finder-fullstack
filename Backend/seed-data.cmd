@echo off
echo Seeding database with sample data...
echo.

REM Get admin token
curl -s -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@hostelfinder.com\",\"password\":\"Admin@123456\"}" > temp_token.json

REM Create hostel 1
curl -s -X POST http://localhost:5000/api/hostels -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmIzMzc1YjZjMDVmNTlkODdkNzlkMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0NDM4OTg5LCJleHAiOjE3NjUwNDM3ODl9.-hAw8A_j3evNLOBKbdtQetKNGmsNEZ9LnDMNBPJ5D-g" -d "{\"name\":\"Mumbai Central PG\",\"description\":\"Modern PG in the heart of Mumbai\",\"location\":{\"address\":\"456 SV Road, Andheri West\",\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"pincode\":\"400058\",\"coordinates\":{\"lat\":19.1136,\"lng\":72.8697}},\"price\":{\"perNight\":600,\"perMonth\":18000,\"currency\":\"INR\"},\"images\":[{\"url\":\"https://images.unsplash.com/photo-1586023492125-27b2c045efd7\",\"caption\":\"Main view\"}],\"amenities\":[\"WiFi\",\"AC\",\"Parking\",\"Kitchen\",\"Security\"],\"roomTypes\":[{\"type\":\"Single\",\"available\":5,\"total\":10,\"price\":2000},{\"type\":\"Double\",\"available\":3,\"total\":8,\"price\":1500}],\"category\":\"PG\",\"gender\":\"Co-ed\",\"contact\":{\"phone\":\"9876543210\",\"email\":\"mumbai@hostelfinder.com\"}}"

echo Created Mumbai Central PG

REM Create hostel 2
curl -s -X POST http://localhost:5000/api/hostels -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmIzMzc1YjZjMDVmNTlkODdkNzlkMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0NDM4OTg5LCJleHAiOjE3NjUwNDM3ODl9.-hAw8A_j3evNLOBKbdtQetKNGmsNEZ9LnDMNBPJ5D-g" -d "{\"name\":\"GoNest Hostel Bengaluru\",\"description\":\"Budget-friendly hostel near IT hubs\",\"location\":{\"address\":\"123 5th Block, Koramangala\",\"city\":\"Bengaluru\",\"state\":\"Karnataka\",\"country\":\"India\",\"pincode\":\"560095\",\"coordinates\":{\"lat\":12.9352,\"lng\":77.6245}},\"price\":{\"perNight\":500,\"perMonth\":15000,\"currency\":\"INR\"},\"images\":[{\"url\":\"https://images.unsplash.com/photo-1564013799919-ab600027ffc6\",\"caption\":\"Main view\"}],\"amenities\":[\"WiFi\",\"AC\",\"Laundry\",\"Kitchen\",\"Study Room\"],\"roomTypes\":[{\"type\":\"Dormitory\",\"available\":10,\"total\":20,\"price\":1500},{\"type\":\"Double\",\"available\":4,\"total\":6,\"price\":1800}],\"category\":\"Hostel\",\"gender\":\"Co-ed\",\"contact\":{\"phone\":\"9876543211\",\"email\":\"bengaluru@hostelfinder.com\"}}"

echo Created GoNest Hostel Bengaluru
echo.
echo Data seeding completed!
echo Login: admin@hostelfinder.com / Admin@123456

del temp_token.json 2>nul
