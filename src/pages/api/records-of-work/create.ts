import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';

const recordsOfWorkPath = path.resolve(process.cwd(), 'src/data/records-of-work.json');

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const subject = formData.get('subject');
  const grade = formData.get('grade');
  const term = formData.get('term');
  const year = formData.get('year');

  try {
    const recordsOfWorkData = await fs.readFile(recordsOfWorkPath, 'utf-8');
    const recordsOfWork = JSON.parse(recordsOfWorkData);

    const newRecordOfWork = {
      id: recordsOfWork.length + 1,
      subject,
      grade,
      term,
      year,
      weekly_entries: []
    };

    recordsOfWork.push(newRecordOfWork);
    await fs.writeFile(recordsOfWorkPath, JSON.stringify(recordsOfWork, null, 2));

    return redirect('/teacher/records-of-work');
  } catch (error) {
    console.error('Error saving record of work:', error);
    return new Response('Error saving record of work', { status: 500 });
  }
};
