interface ContentTitleProps {
  title: string;
}

const ContentTitle: React.FC<ContentTitleProps> = ({ title }) => {
  return (
    <div className="py-6">
      <h2 className="font-semibold text-3xl">{title}</h2>
    </div>
  );
};

export default ContentTitle;
