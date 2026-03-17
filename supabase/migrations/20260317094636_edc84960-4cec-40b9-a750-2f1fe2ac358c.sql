
ALTER TABLE public.careers ADD COLUMN IF NOT EXISTS title_ar TEXT;
ALTER TABLE public.careers ADD COLUMN IF NOT EXISTS description_ar TEXT;

UPDATE public.careers SET 
  title_ar = 'مهندس مبيعات تقني',
  description_ar = 'نبحث عن مهندس مبيعات تقنية في مجال الكابلات الكهربائية و الأسلاك - حديث التخرج

**المسؤوليات:**
- إتمام الصفقات
- الحفاظ على علاقات العملاء
- تطوير وتنفيذ استراتيجيات مبيعات فعالة
- تحليل بيانات المبيعات
- تحديد فرص البيع الجديدة

**المؤهلات:**
- درجة البكالوريوس في الهندسة الميكانيكية / الكهربائية (مفضل)
- خبرة من 3 إلى 5 سنوات في هندسة مبيعات التقنية
- مهارات ممتازة في التواصل والتعامل مع الآخرين
- سجل حافل بالنجاح في توليد العملاء المحتملين وإتمام الصفقات والحفاظ على علاقات العملاء
- مهارات قوية في حل المشكلات والتفاوض
- القدرة على العمل بشكل مستقل وضمن فريق
- إتقان حزمة مايكروسوفت أوفيس

**المؤهلات الإضافية:**
- وجود سيارة يعتبر ميزة إضافية
- إتقان اللغة الإنجليزية
- الخبرة في مجال "الأسلاك والكابلات" تعتبر ميزة إضافية

**الامتيازات:**
- راتب تنافسي
- فرصة لإحداث تأثير حقيقي على الشركة
- فرصة للنمو الوظيفي والتقدم'
WHERE slug = 'technical-sales-engineer';

UPDATE public.careers SET 
  title_ar = 'Senior Sales',
  description_ar = '(AswaQ Developments)

#Hiring a Senior Sales Executive

**Advantages:**
▪️ Daily Fresh leads.
▪️ Competitive salary based on your experience.
▪️ High commission scheme & Gifts.
▪️ Attractive package.
▪️ Two days off Per Week.
▪️ Annual Leaves.

**Location:** Sheraton.

**Requirements:**
▪️ Experience in Real Estate or Development 3 years or higher.
▪️ Female & Male.
▪️ Solid negotiation, sales, and communication skills.

If you are interested in joining us, you can send your CV to us.
hr@aswaq-egypt.com
Or
On WhatsApp (01281911197), don''t hesitate to join or recommend a friend.

Best of luck'
WHERE slug = 'senior-sales';
