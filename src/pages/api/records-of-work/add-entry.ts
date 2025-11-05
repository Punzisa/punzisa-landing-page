import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';

const recordsOfWorkPath = path.resolve(process.cwd(), 'src/data/records-of-work.json');

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const recordId = parseInt(formData.get('recordId') as string);
  const week = parseInt(formData.get('week') as string);
  const work_covered = formData.get('work_covered');
  const resources_references = formData.get('resources_references');
  const method_strategies = formData.get('method_strategies');
  const learners_progress = formData.get('learners_progress');
  const hod_remarks = formData.get('hod_remarks');

  try {
    const recordsOfWorkData = await fs.readFile(recordsOfWorkPath, 'utf-8');
    const recordsOfWork = JSON.parse(recordsOfWorkData);

    const record = recordsOfWork.find(r => r.id === recordId);

    if (record) {
      const newEntry = {
        week,
        work_covered,
        resources_references,
        method_strategies,
        learners_progress,
        hod_remarks
      };
      record.weekly_entries.push(newEntry);
      await fs.writeFile(recordsOfWorkPath, JSON.stringify(recordsOfWork, null, 2));
    }

    return redirect(`/teacher/records-of-work/${recordId}`);
  } catch (error) {
    console.error('Error adding weekly entry:', error);
    return new Response('Error adding weekly entry', { status: 500 });
  }
};
