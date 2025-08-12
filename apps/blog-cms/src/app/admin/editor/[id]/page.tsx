import EditorClient from './editor-client';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostEditorPage({ params }: PageProps) {
  // Resolve the params promise to get the actual params
  const resolvedParams = await params;
  
  return <EditorClient postId={resolvedParams.id} />;
}
