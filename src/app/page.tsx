import Image from "next/image";

export default function Home() {
  return (
    <main className=" min-h-screen ">
      <div className="absolute -z-10 top-0 w-screen h-screen">
        <Image
          src="https://cdn.bypassai.ai/web-cdn/bypass/public/apple/images/banner.jpg"
          alt="Grubby.ai logo"
          fill
          className="mx-auto "
        />
      </div>
      <div className="z-10">
        <h1 className="text-4xl font-bold text-center">Welcome to Grubby.ai</h1>
        <p className="text-center">AI for the rest of us</p>
      </div>
    </main>
  );
}
