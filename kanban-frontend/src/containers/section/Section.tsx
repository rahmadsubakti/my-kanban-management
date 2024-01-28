import { useEffect } from 'react';
import { useBoardDetail } from '@/utils/stateStore';
import { BoardDetailRoute } from '@/utils/route';

import './section.scss';

type sectionType = {
  children: any
}

export const SideSection = ({children}:sectionType) => 
  <section className="side-section">{children}</section>

export const MainSection = ({children}:sectionType) => {
  const { getBoardDetail } = useBoardDetail();
  //const boardId = '5b7f0dd9-1a92-4d46-b8fe-8615f14cb73e';
  const boardId = BoardDetailRoute.useLoaderData();

  useEffect(() => {
    getBoardDetail(boardId);
  }, [boardId])

  return (
    <section className="main-section">{children}</section>
  )
}