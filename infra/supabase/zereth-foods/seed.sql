insert into cakes (name, slug, category, base_price, description, image_url, gallery) values
('Vanilla Bliss','vanilla-bliss','Birthday',20000,'Light sponge with vanilla buttercream.','https://images.unsplash.com/photo-1541976076758-347942db1970', '[]'::jsonb),
('Chocolate Dream','chocolate-dream','Kids',25000,'Rich chocolate layers and ganache.','https://images.unsplash.com/photo-1599785209796-d3b4e2a3c8d2','[]'::jsonb),
('Red Velvet Royale','red-velvet-royale','Wedding',30000,'Classic red velvet with cream cheese.','https://images.unsplash.com/photo-1541781774459-bb2af2f05b55','[]'::jsonb),
('Citrus Sunshine','citrus-sunshine','Seasonal',22000,'Zesty lemon with buttercream.','https://images.unsplash.com/photo-1514515153352-9fcb1fd90f9b','[]'::jsonb),
('Caramel Whisper','caramel-whisper','Birthday',28000,'Caramel layers with sea salt.','https://images.unsplash.com/photo-1541782814459-bb2af2f05b55','[]'::jsonb),
('Berry Garden','berry-garden','Wedding',32000,'Berries and cream delight.','https://images.unsplash.com/photo-1542838132-92c53300491e','[]'::jsonb);

-- sample customer and order
with cust as (
  insert into customers (name, phone, email) values ('Ada Lovelace','+2347000000000','ada@example.com') returning id
), ord as (
  insert into orders (customer_id, total_price, delivery_datetime, status, notes, channel)
  select id, 50000, now() + interval '2 days', 'New', 'Allergy: peanuts', 'web' from cust returning id
)
insert into order_items (order_id, cake_id, flavor, price)
select (select id from ord), (select id from cakes where slug='vanilla-bliss'), 'vanilla', 50000;
