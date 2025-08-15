-- Seed sample data for NXTSCHOLAR

-- Insert categories
INSERT INTO public.categories (name, description, icon) VALUES
('Technology & IT', 'Learn programming, web development, and digital skills', 'laptop'),
('Business & Entrepreneurship', 'Develop business skills and entrepreneurial mindset', 'briefcase'),
('Health & Wellness', 'Courses on health, nutrition, and personal wellness', 'heart'),
('Arts & Culture', 'Explore creative arts and African cultural heritage', 'palette');

-- Insert sample instructor profile
INSERT INTO public.profiles (id, email, full_name, role) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'instructor@nxtscholar.com', 'Dr. Amara Banda', 'instructor');

-- Insert featured courses
INSERT INTO public.courses (title, description, thumbnail_url, instructor_id, category_id, price, is_featured, is_published, duration_hours, level) VALUES
(
  'Web Development Fundamentals',
  'Learn HTML, CSS, and JavaScript to build modern websites. Perfect for beginners starting their tech journey.',
  '/placeholder.svg?height=200&width=300',
  '550e8400-e29b-41d4-a716-446655440000',
  (SELECT id FROM public.categories WHERE name = 'Technology & IT'),
  0,
  true,
  true,
  40,
  'beginner'
),
(
  'Small Business Management',
  'Essential skills for managing and growing a small business in Africa. Covers finance, marketing, and operations.',
  '/placeholder.svg?height=200&width=300',
  '550e8400-e29b-41d4-a716-446655440000',
  (SELECT id FROM public.categories WHERE name = 'Business & Entrepreneurship'),
  0,
  true,
  true,
  25,
  'intermediate'
),
(
  'Digital Marketing Essentials',
  'Master social media marketing, content creation, and online advertising to grow your business.',
  '/placeholder.svg?height=200&width=300',
  '550e8400-e29b-41d4-a716-446655440000',
  (SELECT id FROM public.categories WHERE name = 'Business & Entrepreneurship'),
  0,
  true,
  true,
  30,
  'beginner'
),
(
  'Traditional African Art & Crafts',
  'Explore the rich heritage of African art and learn traditional crafting techniques.',
  '/placeholder.svg?height=200&width=300',
  '550e8400-e29b-41d4-a716-446655440000',
  (SELECT id FROM public.categories WHERE name = 'Arts & Culture'),
  0,
  true,
  true,
  20,
  'beginner'
);

-- Insert sample lessons for the first course
INSERT INTO public.lessons (course_id, title, description, duration_minutes, order_index, is_free) VALUES
(
  (SELECT id FROM public.courses WHERE title = 'Web Development Fundamentals'),
  'Introduction to HTML',
  'Learn the basics of HTML and create your first webpage',
  45,
  1,
  true
),
(
  (SELECT id FROM public.courses WHERE title = 'Web Development Fundamentals'),
  'CSS Styling Basics',
  'Style your HTML with CSS to make beautiful websites',
  60,
  2,
  false
),
(
  (SELECT id FROM public.courses WHERE title = 'Web Development Fundamentals'),
  'JavaScript Fundamentals',
  'Add interactivity to your websites with JavaScript',
  75,
  3,
  false
);
