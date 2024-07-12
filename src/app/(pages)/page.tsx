import ModeSelect from "@/components/Homepage/ModeSelect";
import Results from "@/components/Homepage/Results";
import Tiptap from "@/components/Homepage/TipTapEditor";
import Image from "next/image";

export default function Home() {
  const results = {
    text: "",
    mode: "Simple",
  };
  const loading = false;
  return (
    <main className=" min-h-screen ">
      <div className="absolute -z-10 top-0 w-screen h-screen bg-gradient-to-r from-[#48629b] to-[#622d91]"></div>
      <div className="z-10 h-full text-white relative  px-4 pb-[109px] pt-[128px] md:pb-16 md:pt-20 2xl:pt-[80px]">
        <h2 className="text-4xl w-fit mx-auto font-extrabold text-center hero_gradient text-transparent">
          Grubby AI Detection
        </h2>
        <p className="mb-12 mt-3 text-center text-white sm:text-base md:mb-8">
          Make your AI text 100% undetectable with BypassAI - your trusted AI
          detection remover to create plagiarism-free, human-like text.
        </p>
        <div className="mx-auto h-full w-full max-w-[1200px]">
          <div className=" flex w-full flex-col  overflow-hidden rounded-lg">
            <div className="relative flex flex-col lg:flex-row">
              <div className="flex-1 h-fit w-full">
                <div className="flex min-h-[48px] items-center bg-blue-600 px-6 py-2 text-sm text-white ">
                  <div className="flex gap-4">
                    <label htmlFor="mode">Mode: </label>
                    <ModeSelect />
                  </div>
                </div>
                <div className="relative flex h-[500px] flex-col bg-white pb-4 md:rounded-b-none 2xl:h-[410px]">
                  <div className="group relative flex-1 px-4 pt-4">
                    <div className="w-full h-full">
                      <Tiptap />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 h-fit">
                <div className="flex min-h-[48px] items-center bg-blue-600 px-6 py-2 text-sm text-white justify-end  lg:rounded-none">
                  <div className="">
                    <div></div>
                    <div className="flex w-fit cursor-pointer items-center gap-x-1 text-[#DBD9FB] hover:text-[#c1bff4]">
                      <span className="i-cus--a-facehappy h-4 w-4"></span>
                      <span className="text-sm">Usage guidelines</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[500px] bg-[#f4f5f9] md:rounded-none 2xl:h-[410px]">
                  <div className="h-full w-full">
                    <Results results={results} loading={loading} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
