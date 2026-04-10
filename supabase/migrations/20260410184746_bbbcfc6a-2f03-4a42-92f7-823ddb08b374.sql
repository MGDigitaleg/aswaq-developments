-- Replace stock mall interior image with ASWAQ Mercado Mall render for "7 Reasons" articles
UPDATE blog_articles 
SET image_url = 'https://avchqjysvyebmyugstno.supabase.co/storage/v1/object/public/blog-images/mercado-interior-aswaq.webp'
WHERE slug = '7-reasons-mall-unit-stronger-than-standalone';

-- Replace generic render with ASWAQ Arena Mall for "Best Areas" articles  
UPDATE blog_articles
SET image_url = 'https://avchqjysvyebmyugstno.supabase.co/storage/v1/object/public/blog-images/arena-mall-aswaq.webp'
WHERE slug = 'best-areas-shop-mall-shorouk';

-- Replace generic render with ASWAQ City Hub for "Commercial Units Guide" articles
UPDATE blog_articles
SET image_url = 'https://avchqjysvyebmyugstno.supabase.co/storage/v1/object/public/blog-images/cityhub-mall-aswaq.webp'
WHERE slug = 'guide-buying-commercial-units-shorouk';