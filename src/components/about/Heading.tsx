import TextIn from "../anim/TextIn";

type HeadingProps = {
  children: React.ReactNode;
};

const Heading = ({ children }: HeadingProps) => {
  return (
    <div className="border-b border-border-light lg:mb-4 mb-2 px-2 py-1">
      <h5 className="uppercase">
        <div className="text-complimentary">
          <TextIn delay={400}>{children as string}</TextIn>
        </div>
      </h5>
    </div>
  );
};
export default Heading;
