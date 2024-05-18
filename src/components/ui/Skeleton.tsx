type SkeletonProps = {
  height: number | string;
  width: number | string;
};
export default function Skeleton({ height, width }: SkeletonProps) {
  return <div className="skeleton" style={{ height, width }}></div>;
}
