import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';

const lessonPlansPath = path.resolve(process.cwd(), 'src/data/lesson-plans.json');

export const POST: APIRoute = async ({ request, redirect }) => {
  console.log('API route hit');
  const formData = await request.formData();
  console.log('Form data:', formData);
  const title = formData.get('title');
  const subject = formData.get('subject');
  const className = formData.get('class');
  const presentation = formData.get('presentation');
  const teachingGuide = formData.get('teaching_guide');
  console.log('Received data:', { title, subject, className, presentation, teachingGuide });

  try {
    console.log('Reading lesson plans file...');
    const lessonPlansData = await fs.readFile(lessonPlansPath, 'utf-8');
    const lessonPlans = JSON.parse(lessonPlansData);

    const newLessonPlan = {
      id: lessonPlans.length + 1,
      title,
      subject,
      class: className,
      tabs: [
        { title: 'Presentation', content: presentation },
        { title: 'Teaching Guide', content: teachingGuide }
      ]
    };

    lessonPlans.push(newLessonPlan);
    await fs.writeFile(lessonPlansPath, JSON.stringify(lessonPlans, null, 2));

    return redirect('/teacher/lesson-plans');
  } catch (error) {
    console.error('Error saving lesson plan:', error);
    return new Response('Error saving lesson plan', { status: 500 });
  }
};
