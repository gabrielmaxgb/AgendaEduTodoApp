import React from 'react';
import { ScreenTitle, ScreenSubtitle } from './index';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = (props: PageHeaderProps) => {
  const { title, subtitle } = props;

  return (
    <>
      <ScreenTitle>{title}</ScreenTitle>
      {subtitle ? <ScreenSubtitle>{subtitle}</ScreenSubtitle> : null}
    </>
  );
}


export default PageHeader;
