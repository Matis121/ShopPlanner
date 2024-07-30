import { ReactElement } from "react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadCrumbItem = {
  name: string;
  href: string;
};

type ContentTitleProps = {
  cardsAmount: number;
  children: ReactElement;
  breadCrumb: BreadCrumbItem[];
};

const ContentTitle: React.FC<ContentTitleProps> = ({
  cardsAmount,
  children,
  breadCrumb,
}) => {
  console.log(breadCrumb);

  const DisplaySearch = (cardsAmount: number) => {
    if (cardsAmount > 0) {
      return <>{children}</>;
    }
    return null;
  };

  const breadCrumbElement = () => {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <div className="h-[24px] w-[1.5px] rounded-lg bg-blue-400 dark:bg-neutral-400"></div>
          {breadCrumb.map((element, idx) => (
            <React.Fragment key={idx}>
              {idx === breadCrumb.length - 1 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-base">
                    {element.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-base" href={element.href}>
                    {element.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
              {idx < breadCrumb.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  return (
    <>
      <div className="mt-2">{breadCrumbElement()}</div>
      <div
        className={`w-full pt-6 xl:pb-12 flex items-center justify-end relative ${cardsAmount > 0 ? "pb-32" : "pb-12"}`}
      >
        {DisplaySearch(cardsAmount)}
      </div>
    </>
  );
};

export default ContentTitle;
