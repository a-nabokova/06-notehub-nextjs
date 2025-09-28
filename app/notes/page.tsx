import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import fetchNotes  from '../../lib/api';
import NotesClient from './Notes.client'

 


  const NotesPage = async ({
  params,
}: {
  params: { search: string; page: string };
}) => {
  const queryClient = new QueryClient();

   const { search = '', page: pageStr = '1' } = params;
  const page = Number(pageStr);
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page, perPage],
    queryFn: () => fetchNotes( page, perPage, search),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default NotesPage;