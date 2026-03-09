export default function Spinner({ size = 32 }: { size?: number }) {
  return (
    <div className="flex justify-center items-center py-16">
      <div
        className="animate-spin rounded-full border-4 border-zinc-300 border-t-black"
        style={{ width: size, height: size }}
      />
    </div>
  );
}