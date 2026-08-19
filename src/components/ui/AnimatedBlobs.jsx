export default function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 animate-blob"
        style={{
          background:
            'radial-gradient(circle at center, rgba(124, 58, 237, 0.4) 0%, rgba(124, 58, 237, 0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-15 animate-blob-delayed"
        style={{
          background:
            'radial-gradient(circle at center, rgba(0, 229, 255, 0.3) 0%, rgba(0, 229, 255, 0.05) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
