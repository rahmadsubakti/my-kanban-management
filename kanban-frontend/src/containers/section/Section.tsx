import './section.scss';

type sectionType = {
  children: any
}

export const SideSection = ({children}:sectionType) => 
  <section className="side-section">{children}</section>

export const MainSection = ({children}:sectionType) => 
  <section className="main-section">{children}</section>